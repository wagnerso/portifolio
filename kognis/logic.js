// ========== STATE, UTILITIES & CALCULATIONS ==========
// ========== STATE ==========
let state = { page: 'instructions', currentQ: 0, answers: {} };
let autoAdvanceTimer = null;
let autoAdvanceFormId = null;

// ========== FORM STATE PER FORM ==========
let formStates = JSON.parse(localStorage.getItem('kognis-form-states') || '{}');

function saveFormState(formId) {
  formStates[formId] = { currentQ: state.currentQ, answers: state.answers };
  localStorage.setItem('kognis-form-states', JSON.stringify(formStates));
}

function loadFormState(formId) {
  const saved = formStates[formId];
  if (saved && Object.keys(saved.answers).length > 0) {
    state.currentQ = saved.currentQ;
    state.answers = saved.answers;
    return true;
  }
  return false;
}

function clearFormState(formId) {
  delete formStates[formId];
  localStorage.setItem('kognis-form-states', JSON.stringify(formStates));
}

function getAnsweredCount(formId) {
  const saved = formStates[formId];
  return saved ? Object.keys(saved.answers).length : 0;
}

// ========== UTILITIES ==========
function getPercent(value, max) { return max > 0 ? (value / max) * 100 : 0; }

function getRiskLevel(percent, thresholds) {
  for (const [threshold, label] of thresholds) {
    if (percent <= threshold) return label;
  }
  return thresholds[thresholds.length - 1][1];
}

function getRiskColor(level) {
  if (level === 'Baixo') return 'var(--risco-baixo)';
  if (level === 'Moderado') return 'var(--risco-medio)';
  return 'var(--risco-alto)';
}

function getRiskClass(level) {
  if (level === 'Baixo') return 'level-baixo';
  if (level === 'Moderado') return 'level-medio';
  return 'level-alto';
}

function getScoreForQuestion(formId, qIndex) {
  const form = FORMS[formId];
  const raw = state.answers[qIndex] || 0;
  if (formId === 'srs2' && form.reverseItems.includes(qIndex + 1)) {
    return 5 - raw;
  }
  return raw;
}

// ========== SCORE CALCULATIONS ==========
function calcSRS2() {
  const form = FORMS.srs2;
  let total = 0;
  const subScores = form.subscales.map(sub => {
    let sum = 0;
    sub.items.forEach(idx => { sum += getScoreForQuestion('srs2', idx - 1); });
    return sum;
  });
  subScores.forEach(s => total += s);
  const dsm5Scores = form.dsm5.map(d => {
    let sum = 0;
    d.subscales.forEach(si => sum += subScores[si]);
    return sum;
  });
  return { total, subScores, dsm5Scores };
}

function calcBDEFS() {
  const form = FORMS.bdefs;
  let total = 0;
  const sectionScores = form.sections.map(sec => {
    let sum = 0;
    sec.subs.forEach(sub => {
      let subSum = 0;
      sub.items.forEach(idx => { subSum += (state.answers[idx - 1] || 0); });
      sum += subSum;
    });
    total += sum;
    return sum;
  });
  const allSubs = form.sections.flatMap(sec => sec.subs);
  const subScores = allSubs.map(sub => {
    let sum = 0;
    sub.items.forEach(idx => { sum += (state.answers[idx - 1] || 0); });
    return sum;
  });
  return { total, sectionScores, subScores };
}

function calcBSI() {
  const form = FORMS.bsi;
  let total = 0;
  for (let i = 0; i < form.totalItems; i++) total += (state.answers[i] || 0);
  const subScores = form.subscales.map(sub => {
    let sum = 0;
    sub.items.forEach(idx => { sum += (state.answers[idx - 1] || 0); });
    return sum;
  });
  const answered = Object.values(state.answers).filter(v => v > 0).length;
  const gsi = total / form.totalItems;
  const pst = answered;
  const psdi = answered > 0 ? total / answered : 0;
  return { total, subScores, gsi, pst, psdi };
}
