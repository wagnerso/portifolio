// ========== RENDERING & EVENTS ==========
// ========== RENDER HELPERS ==========
function renderHeader(formId) {
  const f = FORMS[formId];
  return `
    <header>
      <div class="logo" style="background:${f.color}"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
      <h1 class="font-serif">${f.name}</h1>
    </header>
  `;
}

function renderInstructions(formId) {
  const f = FORMS[formId];
  const answeredCount = getAnsweredCount(formId);
  const hasProgress = answeredCount > 0;
  return `
    <div class="page">
      <div class="card instruction-card">
        <p class="desc">${f.instruction}</p>
        <div class="scale-box">
          <h4>Escala de resposta</h4>
          ${f.options.map(o => `
            <div class="scale-item">
              <div class="scale-dot" style="background:${f.color}">${o.value}</div>
              <span>${o.label}</span>
            </div>
          `).join('')}
        </div>
        ${hasProgress ? `
          <div style="display:flex;flex-direction:column;gap:10px">
            <button class="btn btn-primary" data-continue style="background:${f.color}">Continuar (${answeredCount}/${f.totalItems} respondidas)</button>
            <button class="btn btn-secondary" data-start-new>Iniciar do zero</button>
          </div>
        ` : `
          <button class="btn btn-primary" data-start style="background:${f.color}">Iniciar questionário</button>
        `}
      </div>
      <a href="index.html" class="btn btn-secondary back-btn" style="text-decoration:none;text-align:center;display:block">Voltar</a>
    </div>
  `;
}

function renderQuestion(formId) {
  const f = FORMS[formId];
  const qIndex = state.currentQ;
  const total = f.totalItems;
  const progress = ((qIndex + 1) / total) * 100;
  const isLast = qIndex === total - 1;
  const answered = state.answers[qIndex] !== undefined;
  const hasTimer = autoAdvanceTimer !== null;
  const answeredCount = Object.keys(state.answers).length;
  return `
    <div class="page">
      <button class="btn-link" data-back-confirm>← Voltar ao menu</button>
      <div class="progress-header">
        <span>Pergunta <strong>${qIndex + 1}</strong> de ${total}</span>
        <span>${Math.round(progress)}%</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${progress}%;background:${f.color}"></div></div>
      <div class="card">
        <div class="question-num" style="color:${f.color}">${f.name} — Pergunta ${qIndex + 1}</div>
        <div class="question-text">${f.questions[qIndex]}</div>
        <div class="options-grid">
          ${f.options.map(o => `
            <button class="option-btn ${state.answers[qIndex] === o.value ? 'selected' : ''}" data-value="${o.value}" ${hasTimer ? 'disabled' : ''} style="${state.answers[qIndex] === o.value ? `border-color:${f.color};background:${f.color}11` : ''}">
              <span class="points" style="${state.answers[qIndex] === o.value ? `color:${f.color}` : ''}">${o.value}</span>
              ${o.label}
            </button>
          `).join('')}
        </div>
        <div class="nav-buttons">
          <button class="btn btn-secondary" data-prev ${qIndex === 0 || hasTimer ? 'disabled' : ''}>Anterior</button>
          <button class="btn btn-primary" data-next style="background:${f.color}" ${!answered || hasTimer ? 'disabled' : ''}>${isLast ? 'Finalizar' : 'Próximo'}</button>
        </div>
        <div class="auto-advance" id="auto-advance-container" style="${hasTimer ? '' : 'display:none'}">
          <div class="auto-advance-bar"><div class="auto-advance-fill" id="auto-advance-fill" style="background:${f.color};width:0%"></div></div>
          <div class="auto-advance-text">Próxima pergunta em breve...</div>
        </div>
      </div>
    </div>
  `;
}

function renderResults(formId) {
  const f = FORMS[formId];
  let data;
  if (formId === 'srs2') data = calcSRS2();
  else if (formId === 'bdefs') data = calcBDEFS();
  else data = calcBSI();

  let html = `<div class="page">`;

  const totalPercent = getPercent(data.total, f.maxScore);
  const totalLevel = getRiskLevel(totalPercent, f.interpretation.total);
  html += `
    <div class="card result-total" style="border-top: 4px solid ${f.color}">
      <div class="score" style="color:${f.color}">${data.total}</div>
      <div class="max">de ${f.maxScore} pontos</div>
      <div class="level ${getRiskClass(totalLevel)}">Risco ${totalLevel}</div>
    </div>
  `;

  if (formId === 'srs2') {
    html += `<div class="card"><h3 class="font-serif" style="font-size:1rem;font-weight:500;margin-bottom:16px">Índices DSM-5</h3>`;
    FORMS.srs2.dsm5.forEach((d, i) => {
      const pct = getPercent(data.dsm5Scores[i], d.max);
      const lvl = getRiskLevel(pct, f.interpretation.subscale);
      const color = getRiskColor(lvl);
      html += `
        <div class="subscale-item">
          <div class="subscale-header"><span class="subscale-name">${d.name}</span><span class="subscale-score">${data.dsm5Scores[i]}/${d.max}</span></div>
          <div class="sub-bar"><div class="sub-bar-fill" style="width:${pct}%;background:${color}"></div></div>
          <div class="subscale-level" style="color:${color}">Risco ${lvl}</div>
        </div>
      `;
    });
    html += `</div>`;
  }

  const allSubs = formId === 'bdefs'
    ? FORMS.bdefs.sections.flatMap(s => s.subs)
    : f.subscales;
  const subScores = data.subScores;

  html += `<div class="card"><h3 class="font-serif" style="font-size:1rem;font-weight:500;margin-bottom:16px">Subescalas</h3>`;
  allSubs.forEach((sub, i) => {
    const pct = getPercent(subScores[i], sub.max);
    const lvl = getRiskLevel(pct, f.interpretation.subscale);
    const color = getRiskColor(lvl);
    html += `
      <div class="subscale-item">
        <div class="subscale-header"><span class="subscale-name">${sub.name}</span><span class="subscale-score">${subScores[i]}/${sub.max}</span></div>
        <div class="sub-bar"><div class="sub-bar-fill" style="width:${pct}%;background:${color}"></div></div>
        <div class="subscale-level" style="color:${color}">Risco ${lvl}</div>
      </div>
    `;
  });
  html += `</div>`;

  if (formId === 'bsi') {
    html += `
      <div class="card global-indices">
        <h3 class="font-serif" style="font-size:1rem;font-weight:500;margin-bottom:12px">Índices Globais</h3>
        <div class="global-item"><span>GSI (Índice de Gravidade)</span><span><strong>${data.gsi.toFixed(2)}</strong></span></div>
        <div class="global-item"><span>PST (Sintomas Positivos)</span><span><strong>${data.pst}</strong> de 53</span></div>
        <div class="global-item"><span>PSDI (Distresse Positivo)</span><span><strong>${data.psdi.toFixed(2)}</strong></span></div>
      </div>
    `;
  }

  html += `<div class="card"><div class="clinical-note">${f.clinicalNote}</div></div>`;
  html += `
    <div style="display:flex;flex-direction:column;gap:10px">
      <a href="${formId}.html" class="btn btn-primary" style="background:${f.color};text-decoration:none;text-align:center;display:block">Novo questionário</a>
      <a href="index.html" class="btn btn-secondary" style="text-decoration:none;text-align:center;display:block">Voltar ao Início</a>
    </div>
  `;
  html += `</div>`;
  return html;
}

// ========== COMMON BIND EVENTS ==========
function clearAutoAdvance() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
    autoAdvanceFormId = null;
  }
}

function startAutoAdvance(formId) {
  clearAutoAdvance();
  autoAdvanceFormId = formId;
  
  const fill = document.getElementById('auto-advance-fill');
  const container = document.getElementById('auto-advance-container');
  if (container) container.style.display = '';
  if (fill) {
    fill.style.width = '0%';
    fill.style.transition = 'none';
    fill.offsetHeight; // force reflow
    fill.style.transition = 'width 1s linear';
    fill.style.width = '100%';
  }
  
  autoAdvanceTimer = setTimeout(() => {
    autoAdvanceTimer = null;
    autoAdvanceFormId = null;
    const f = FORMS[formId];
    if (state.currentQ < f.totalItems - 1) {
      state.currentQ++;
      saveFormState(formId);
      renderApp(formId);
    } else {
      clearFormState(formId);
      state.page = 'results';
      renderApp(formId);
    }
  }, 1000);
}

function selectAnswer(formId, value) {
  if (autoAdvanceTimer) return;
  state.answers[state.currentQ] = parseInt(value);
  saveFormState(formId);
  renderApp(formId);
  startAutoAdvance(formId);
}

function advanceQuestion(formId) {
  if (autoAdvanceTimer) return;
  const f = FORMS[formId];
  if (state.answers[state.currentQ] === undefined) return;
  if (state.currentQ < f.totalItems - 1) {
    state.currentQ++;
    saveFormState(formId);
    renderApp(formId);
  } else {
    clearFormState(formId);
    state.page = 'results';
    renderApp(formId);
  }
}

function bindCommonEvents(formId) {
  document.querySelectorAll('[data-start]').forEach(el => {
    el.addEventListener('click', () => {
      clearAutoAdvance();
      clearFormState(formId);
      state.currentQ = 0;
      state.answers = {};
      state.page = 'questionnaire';
      renderApp(formId);
    });
  });

  document.querySelectorAll('[data-continue]').forEach(el => {
    el.addEventListener('click', () => {
      clearAutoAdvance();
      loadFormState(formId);
      state.page = 'questionnaire';
      renderApp(formId);
    });
  });

  document.querySelectorAll('[data-start-new]').forEach(el => {
    el.addEventListener('click', () => {
      clearAutoAdvance();
      clearFormState(formId);
      state.currentQ = 0;
      state.answers = {};
      state.page = 'questionnaire';
      renderApp(formId);
    });
  });

  document.querySelectorAll('[data-back-confirm]').forEach(el => {
    el.addEventListener('click', () => {
      const answeredCount = Object.keys(state.answers).length;
      if (answeredCount > 0) {
        const confirmed = confirm('Tem certeza que deseja voltar ao menu?\n\nSuas respostas serão perdidas.');
        if (!confirmed) return;
      }
      clearAutoAdvance();
      clearFormState(formId);
      state.page = 'instructions';
      state.currentQ = 0;
      state.answers = {};
      renderApp(formId);
    });
  });

  document.querySelectorAll('[data-value]').forEach(el => {
    el.addEventListener('click', () => {
      selectAnswer(formId, el.dataset.value);
    });
  });

  document.querySelectorAll('[data-prev]').forEach(el => {
    el.addEventListener('click', () => {
      if (state.currentQ > 0) {
        clearAutoAdvance();
        state.currentQ--;
        renderApp(formId);
      }
    });
  });

  document.querySelectorAll('[data-next]').forEach(el => {
    el.addEventListener('click', () => {
      advanceQuestion(formId);
    });
  });

  // Keyboard support
  document.onkeydown = function(e) {
    if (state.page !== 'questionnaire') return;
    if (autoAdvanceTimer) return;

    const f = FORMS[formId];
    const key = e.key;

    // Number keys
    if (key >= '0' && key <= '9') {
      const num = parseInt(key);
      const validValues = f.options.map(o => o.value);
      if (validValues.includes(num)) {
        selectAnswer(formId, num);
      }
      return;
    }

    // Enter to advance
    if (key === 'Enter') {
      advanceQuestion(formId);
      return;
    }

    // Arrow keys
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      advanceQuestion(formId);
      return;
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      if (state.currentQ > 0) {
        clearAutoAdvance();
        state.currentQ--;
        renderApp(formId);
      }
      return;
    }
  };
}

function renderApp(formId) {
  const app = document.getElementById('app');
  switch (state.page) {
    case 'instructions': app.innerHTML = renderHeader(formId) + renderInstructions(formId); break;
    case 'questionnaire': app.innerHTML = renderHeader(formId) + renderQuestion(formId); break;
    case 'results': app.innerHTML = renderHeader(formId) + renderResults(formId); break;
  }
  bindCommonEvents(formId);
}
