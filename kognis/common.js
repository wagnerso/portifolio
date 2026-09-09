// ========== FORM DATA ==========
const FORMS = {
  srs2: {
    id: 'srs2', name: 'SRS-2', fullName: 'Escala de Responsividade Social', color: '#FF3B30',
    totalItems: 65, maxScore: 260, period: 'últimos 6 meses',
    instruction: 'Em cada questão, por favor selecione a opção que melhor descreva o comportamento da pessoa nos <strong>últimos 6 meses</strong>.',
    options: [
      { value: 1, label: 'Não é verdade' },
      { value: 2, label: 'Algumas vezes é verdade' },
      { value: 3, label: 'Muitas vezes é verdade' },
      { value: 4, label: 'Quase sempre é verdade' }
    ],
    reverseItems: [3,7,11,12,15,17,21,22,26,32,38,40,43,45,48],
    subscales: [
      { name: 'Consciência Social', items: [2,7,25,42,46,52,54,56], max: 32 },
      { name: 'Cognição Social', items: [5,10,19,23,28,30,40,44,48,55,58,62], max: 48 },
      { name: 'Comunicação Social', items: [1,3,6,9,11,13,16,18,20,21,22,29,32,35,36,37,39,43,45,47,49,57], max: 88 },
      { name: 'Motivação Social', items: [12,15,27,34,41,50,51,59,64,65], max: 44 },
      { name: 'Maneirismos Restritos/Repetitivos', items: [4,8,14,17,24,26,31,33,38,53,60,61], max: 48 }
    ],
    dsm5: [
      { name: 'SCI (Comunicação e Interação Social)', subscales: [0,1,2,3], max: 212 },
      { name: 'RRB (Interesses Restritos e Comportamentos Repetitivos)', subscales: [4], max: 48 }
    ],
    interpretation: { total: [[50,'Baixo'],[70,'Moderado'],[Infinity,'Alto']], subscale: [[0.40,'Baixo'],[0.65,'Moderado'],[Infinity,'Alto']] },
    clinicalNote: 'Este relatório contém pontuações brutas de triagem. A interpretação clínica definitiva deve considerar o histórico e o Escore T normatizado.',
    questions: [
      'Parece estar isolado(a) das outras pessoas, mesmo quando está em grupo.',
      'Expressa suas emoções de forma inadequada à situação.',
      'Parece confiante e seguro(a) ao interagir com os outros.',
      'Tem interesses ou maneirismos estranhos ou bizarros.',
      'Não compreende o significado de expressões faciais ou linguagem corporal dos outros.',
      'Prefere realizar atividades sozinho(a) a participar de jogos ou atividades em grupo.',
      'É capaz de manter contato visual adequado durante uma conversa.',
      'Fica excessivamente focado(a) em partes de objetos ou em tópicos muito específicos.',
      'Evita iniciar interações sociais com outras pessoas.',
      'Leva as coisas ao pé da letra; tem dificuldade para entender piadas ou ironias.',
      'Comunica-se bem e de forma recíproca com pessoas da sua idade.',
      'Consegue expressar seus sentimentos de maneira clara e compreensível.',
      'Apresenta um tom de voz monótono, robótico ou excessivamente formal.',
      'Parece excessivamente sensível a certos barulhos, texturas ou luzes.',
      'Demonstra interesse genuíno pelas ideias e sentimentos dos outros.',
      'Evita ou não responde quando outras pessoas tentam interagir com ele(a).',
      'Gosta ou insiste em manter rotinas rígidas e fica muito frustrado(a) se mudarem.',
      'Tem dificuldade em responder de forma fluida e natural em diálogos cotidianos.',
      'Reage de forma exagerada ou incompreensível a pequenas mudanças no ambiente.',
      'Interrompe os outros com frequência ou fala sem notar se os outros estão prestando atenção.',
      'Consegue imitar as ações dos outros em situações sociais de forma natural.',
      'Participa ativamente de conversas que envolvem dar e receber feedback emocional.',
      'Não percebe quando está incomodando ou frustrando as pessoas ao seu redor.',
      'Faz movimentos repetitivos com as mãos, dedos ou corpo (como balançar ou flapar).',
      'Sabe quando é o momento certo para entrar ou sair de uma conversa em grupo.',
      'Parece muito focado(a) em acumular ou organizar objetos de maneiras específicas.',
      'Responde com facilidade a interações amigáveis ou sorrisos de outras pessoas.',
      'Tem dificuldade para se colocar no lugar do outro ou entender a perspectiva alheia.',
      'Fala sobre assuntos do seu próprio interesse sem perceber o desinteresse do ouvinte.',
      'Apresenta dificuldade para ler o clima social ou a atmosfera de um ambiente.',
      'Mostra apego incomum a objetos que não têm uma função óbvia.',
      'É capaz de compreender e responder adequadamente ao humor dos outros.',
      'Fica muito focado(a) em detalhes minuciosos e perde a visão geral da situação.',
      'Busca a companhia de outras pessoas quando quer se divertir ou compartilhar algo.',
      'Usa expressões faciais que não combinam com o que está dizendo ou sentindo.',
      'Dificilmente inicia um diálogo, mesmo quando deseja muito alguma coisa.',
      'Repete palavras ou frases curtas ditas por outros (ecolalia) fora de contexto.',
      'Parece ter um limiar de dor muito alto ou muito baixo para ferimentos cotidianos.',
      'Tem consciência do impacto que suas palavras ou atitudes causam nos outros.',
      'Interpreta de forma errada as intenções de pessoas amigáveis, achando que o estão atacando.',
      'Demonstra iniciativa para consolar alguém que está nitidamente triste ou chorando.',
      'Percebe facilmente quando alguém está tentando enganá-lo(a) ou passar a perna.',
      'Mantém um vocabulário ou forma de falar excessivamente maduro ou técnico para sua idade.',
      'Confunde-se com facilidade em interações sociais que envolvem muitas regras subtis.',
      'Alinha objetos em filas perfeitas de forma persistente e fica tenso se alguém mexer.',
      'Identifica sentimentos comuns como medo, raiva ou alegria nos outros com facilidade.',
      'Usa gestos corporais de maneira estranha ou inadequada para se comunicar.',
      'Reconhece quando os outros estão agindo com sarcasmo ou de deboche.',
      'Gosta de compartilhar conquistas ou momentos felizes com familiares e amigos.',
      'Fica visivelmente feliz quando outras pessoas se aproximam para brincar ou conversar.',
      'Demonstra forte desejo de ser aceito(a) e fazer parte de grupos sociais.',
      'Fita o espaço vazio ou parece "desconectado(a)" do mundo ao seu redor com frequência.',
      'Preocupa-se excessivamente que os objetos estejam exatamente no mesmo lugar de sempre.',
      'Reconhece pistas subtis do ambiente social que indicam que uma atividade mudou.',
      'Dificilmente percebe que está sendo alvo de piadas ou exclusão por parte de um grupo.',
      'Sabe ler expressões sutis de tédio ou cansaço na pessoa com quem está conversando.',
      'Fixa-se em determinados assuntos a ponto de cansar as pessoas ao redor.',
      'Acredita piamente em tudo o que lhe dizem, demonstrando ingenuidade extrema.',
      'Reage positivamente a elogios ou demonstrações de afeto e carinho.',
      'Apresenta tiques ou maneirismos motores quando está muito ansioso(a) ou animado(a).',
      'Usa o olhar de forma coordenada com a fala e com os gestos nas interações.',
      'Tem sérias dificuldades para prever as consequências sociais das suas ações.',
      'Apresenta um padrão de piscar, farejar ou fazer sons repetitivos sem perceber.',
      'Valoriza a opinião que seus amigos e familiares têm a seu respeito.',
      'Demonstra reciprocidade social e afetiva equilibrada no dia a dia.'
    ]
  },

  bdefs: {
    id: 'bdefs', name: 'BDEFS', fullName: 'Escala de Déficits de Execução Funcional', color: '#007AFF',
    totalItems: 64, maxScore: 256, period: 'últimos 6 meses',
    instruction: 'Em cada questão, por favor selecione a opção que melhor descreva o comportamento da pessoa nos <strong>últimos 6 meses</strong>.',
    options: [
      { value: 1, label: 'Raramente ou nunca' },
      { value: 2, label: 'Às vezes' },
      { value: 3, label: 'Frequentemente' },
      { value: 4, label: 'Muito frequentemente' }
    ],
    sections: [
      { name: 'Déficits de Autorregulação', start: 1, end: 21, max: 84, subs: [
        { name: 'Gestão de Tempo e Prazos', items: [1,2,3,4,5], max: 20 },
        { name: 'Planejamento e Organização', items: [6,7,8,9,10], max: 20 },
        { name: 'Motivação e Foco', items: [11,12,13,14,15], max: 20 },
        { name: 'Auto-disciplina e Priorização', items: [16,17,18,19,20,21], max: 24 }
      ]},
      { name: 'Déficits Cognitivos', start: 22, end: 45, max: 96, subs: [
        { name: 'Memória e Antecipação', items: [22,23,24,25], max: 16 },
        { name: 'Organização de Pensamentos', items: [26,27,28,29,30], max: 20 },
        { name: 'Criação de Soluções', items: [31,32,33,34], max: 16 },
        { name: 'Compreensão e Expressão', items: [35,36,37,38,39,40], max: 24 },
        { name: 'Atenção e Concentração', items: [41,42,43,44,45], max: 20 }
      ]},
      { name: 'Autocontrole e Impulsividade', start: 46, end: 64, max: 76, subs: [
        { name: 'Tolerância e Impaciência', items: [46,47,48], max: 12 },
        { name: 'Autocontrole', items: [49,50,51,52,53], max: 20 },
        { name: 'Impulsividade', items: [54,55,56,57,58], max: 20 },
        { name: 'Regras e Consequências', items: [59,60,61], max: 12 },
        { name: 'Comportamento de Risco', items: [62,63,64], max: 12 }
      ]}
    ],
    interpretation: { total: [[35,'Baixo'],[50,'Moderado'],[Infinity,'Alto']], subscale: [[0.40,'Baixo'],[0.65,'Moderado'],[Infinity,'Alto']] },
    clinicalNote: 'Pontuações elevadas refletem maiores dificuldades na autorregulação, funções executivas e autocontrole no cotidiano. Cruze este escore com os percentis oficiais da tabela de Barkley de acordo com a faixa etária do paciente.',
    questions: [
      'Procrastino ou adio fazer as coisas até o último minuto.',
      'Tenho pouca noção de tempo.',
      'Desperdicio ou administro mal o meu tempo.',
      'Sou despreparado para trabalhos ou tarefas a mim atribuídas.',
      'Não cumprio os prazos das tarefas.',
      'Tenho problemas para planejar com antecedência ou para me preparar para eventos futuros.',
      'Esqueço de fazer coisas que deveria fazer.',
      'Parece que eu não consigo cumprir as metas que estabeleço para mim mesmo.',
      'Me atraso para o trabalho ou compromissos agendados.',
      'Parece que eu não consigo manter em mente coisas das quais preciso me lembrar de fazer.',
      'Parece que eu não consigo finalizar as coisas, a menos que tenham um prazo final imediato.',
      'Tenho dificuldade em julgar quanto tempo irei gastar para fazer algo ou para ir a algum lugar.',
      'Tenho dificuldade em me motivar para começar a trabalhar.',
      'Tenho dificuldade para me motivar a continuar com o meu trabalho e terminá-lo.',
      'Fico desmotivado para me preparar com antecedência para coisas que devo fazer.',
      'Tenho problemas em completar uma atividade antes de iniciar uma nova.',
      'Tenho dificuldades em fazer aquilo que eu digo a mim mesmo para fazer.',
      'Tenho dificuldades em cumprir promessas ou compromissos que eu possa ter assumido com outras pessoas.',
      'Tenho falta de auto-disciplina.',
      'Tenho dificuldades em me organizar ou em fazer meu trabalho de acordo com sua prioridade ou importância; não consigo "priorizar" bem.',
      'Acho difícil começar ou continuar a fazer coisas que preciso terminar.',
      'Parece que eu não consigo antecipar o futuro tanto ou tão bem quanto os outros.',
      'Parece que eu não consigo me lembrar do que ouvi ou li anteriormente.',
      'Tenho dificuldades em organizar meus pensamentos.',
      'Quando me apresentam coisas complicadas de se fazer, eu não consigo manter as informações na cabeça para fazer igual ou fazer corretamente.',
      'Tenho problemas quando preciso avaliar várias opções para fazer as coisas e ponderar as suas consequências.',
      'Tenho dificuldades para dizer o que eu quero dizer.',
      'Sou incapaz de criar ou inventar tantas soluções para problemas quanto os outros.',
      'As palavras parecem me faltar quando quero explicar alguma coisa para os outros.',
      'Tenho dificuldade em expressar meus pensamentos por escrito tão bem ou tão rapidamente quanto os outros.',
      'Sinto que não sou tão criativo ou inventivo quanto os outros com o mesmo nível de inteligência.',
      'Quando tento cumprir metas ou compromissos, não me acho capaz de pensar em tantas maneiras de fazer as coisas como os outros.',
      'Tenho dificuldade em aprender atividades novas e complexas tão bem como os outros.',
      'Tenho dificuldades em explicar as coisas na ordem ou sequência apropriada.',
      'Não consigo concluir minhas explicações tão rapidamente como os outros.',
      'Tenho dificuldades em fazer as coisas na ordem ou sequência apropriada.',
      'Sou incapaz de pensar e reagir rapidamente ou de modo tão eficiente quanto outras pessoas quando ocorrem eventos inesperados.',
      'Eu sou mais lento do que outros para resolver problemas que encontro no meu dia a dia.',
      'Fico facilmente distraído por pensamentos irrelevantes quando eu tenho que me concentrar em algo.',
      'Sou incapaz de entender o que eu leio tão bem quanto eu deveria. Tenho que reler o material para entender seu significado.',
      'Não consigo focar minha atenção em tarefas ou no trabalho tão bem quanto os outros.',
      'Fico facilmente confuso.',
      'Não consigo manter a minha concentração na leitura, em formulários, em palestras ou no trabalho.',
      'Acho difícil focar no que é importante diante do que não é importante quando estou fazendo alguma coisa.',
      'Parece que eu não consigo processar informações de modo tão rápido ou preciso quanto os outros.',
      'Acho difícil tolerar esperas; impaciente.',
      'Tomo decisões impulsivamente.',
      'Sou incapaz de inibir minhas reações ou respostas a situações ou aos outros.',
      'Tenho dificuldade em parar minhas atividades ou comportamento quando deveria.',
      'Tenho dificuldade em mudar meu comportamento quando me falam sobre os meus erros.',
      'Faço comentários impulsivos para os outros.',
      'Sou propenso a fazer coisas sem considerar as consequências.',
      'Mudo meus planos no último minuto por um capricho ou impulso de último minuto.',
      'Não levo em consideração fatos relevantes do passado ou experiências passadas antes de responder as situações.',
      'Não tenho consciência das coisas que eu falo ou faço.',
      'Tenho dificuldade em ser objetivo com as coisas que mexem comigo.',
      'Acho difícil assumir as perspectivas de outras pessoas sobre um problema ou uma situação.',
      'Não penso nem falo as coisas comigo mesmo antes de fazer algo.',
      'Tenho dificuldade para seguir as regras em uma situação.',
      'Tenho tendência a dirigir mais rápido que os outros.',
      'Não tolero muito bem situações frustrantes.',
      'Não consigo inibir minhas emoções tão bem quanto os outros.',
      'Não olho para frente e não penso sobre quais serão os resultados futuros antes de fazer alguma coisa.',
      'Eu me envolvo em atividades de risco mais do que os outros estão propensos a fazer.'
    ]
  },

  bsi: {
    id: 'bsi', name: 'BSI', fullName: 'Inventário Breve de Sintomas', color: '#34C759',
    totalItems: 53, maxScore: 212, period: 'últimos 7 dias',
    instruction: 'Nas próximas páginas, há uma lista de problemas que as pessoas apresentam de vez em quando. Leia cada um atentamente e selecione a resposta que melhor descreva <strong>O QUANTO ESSE PROBLEMA O(A) INCOMODOU OU O(A) ANGUSTIOU AO LONGO DOS ÚLTIMOS SETE DIAS, INCLUINDO O DIA DE HOJE</strong>.',
    options: [
      { value: 0, label: 'Nada' },
      { value: 1, label: 'Um pouco' },
      { value: 2, label: 'Moderadamente' },
      { value: 3, label: 'Muito' },
      { value: 4, label: 'Extremamente' }
    ],
    subscales: [
      { name: 'Somatização', items: [2,7,11,23,25,29,30,33,37], max: 36 },
      { name: 'Obsessivo-Compulsivo', items: [5,9,24,26,27,32,36], max: 28 },
      { name: 'Sensibilidade Interpessoal', items: [20,21,22,42,44,48], max: 24 },
      { name: 'Depressão', items: [5,14,15,16,17,18], max: 24 },
      { name: 'Ansiedade', items: [1,2,12,19,39,45], max: 24 },
      { name: 'Hostilidade', items: [6,13,40,41,46], max: 20 },
      { name: 'Fobia', items: [8,28,31,43,47], max: 20 },
      { name: 'Ideação Paranoide', items: [4,10,34,48,51], max: 20 },
      { name: 'Psicoticismo', items: [34,39,40,41,52,53], max: 24 }
    ],
    interpretation: { total: [[25,'Baixo'],[50,'Moderado'],[Infinity,'Alto']], subscale: [[0.30,'Baixo'],[0.60,'Moderado'],[Infinity,'Alto']] },
    clinicalNote: 'O BSI avalia a gravidade de sintomas psicopatológicos em 9 dimensões. O GSI é o indicador mais sensível de distress psicológico. Compare os escores com os valores normativos da tabela de Derogatis (1993) de acordo com o sexo e a faixa etária do paciente.',
    questions: [
      'Nervosismo ou agitação interna por medo.',
      'Sensação de desmaio ou tontura.',
      'A ideia de que outras pessoas podem controlar seus pensamentos.',
      'Sentir que outras pessoas são culpadas pela maioria dos seus problemas.',
      'Dificuldade para lembrar as coisas.',
      'Sentir que fica perturbado(a) ou irritado(a) com facilidade.',
      'Dores no coração ou tórax.',
      'Sentir medo em locais ao ar livre ou nas ruas.',
      'Pensar sobre acabar com a própria vida.',
      'Sentir que não é possível confiar na maioria das pessoas.',
      'Falta de apetite.',
      'Sentir medo repentinamente, sem motivo.',
      'Ataques de mau humor que você não consegue controlar.',
      'Sentir-se solitário(a) mesmo estando perto de pessoas.',
      'Sentir bloqueio para concluir tarefas e ações que inicia.',
      'Sentir-se solitário.',
      'Sentir-se triste.',
      'Sentir desinteresse pelas coisas.',
      'Sentir-se com medo.',
      'Sentir-se magoado com facilidade.',
      'Sentir que as pessoas não gostam de você ou estão sendo hostis.',
      'Sentir-se inferior às outras pessoas.',
      'Náusea ou dor estomacal.',
      'Sentir que outras pessoas estão te vigiando ou falando sobre você.',
      'Dificuldade para dormir.',
      'Precisar se certificar constantemente de tudo o que você faz.',
      'Dificuldade para tomar decisões.',
      'Sentir medo de viajar de ônibus, metrô ou trem.',
      'Dificuldades na respiração relacionadas a recuperar o fôlego.',
      'Sentir ondas de frio ou de calor.',
      'Sentir necessidade de evitar certas coisas, locais ou atividades porque assustam você.',
      'Sentir que sua cabeça "deu um branco".',
      'Dormência ou formigamento em algumas partes do corpo.',
      'A ideia de que você deve ser punido(a) pelos seus pecados.',
      'Sentir falta de esperança sobre o futuro.',
      'Dificuldade em se concentrar.',
      'Sentir fraqueza em algumas partes do corpo.',
      'Sentir-se tenso(a) ou nervoso(a).',
      'Pensamentos de morte ou morrer.',
      'Sentir vontade de bater, machucar ou ferir alguém.',
      'Sentir vontade de quebrar ou destruir coisas.',
      'Sentir-se constrangido(a) com relação a outras pessoas.',
      'Sentir-se incomodado(a) em meio a multidões, como em um shopping ou cinema.',
      'Nunca sentir-se conectado(a) a outras pessoas.',
      'Ondas de terror ou pânico.',
      'Discutir frequentemente.',
      'Sentir-se nervoso(a) quando fica sozinho(a).',
      'Sentir que outras pessoas não estão reconhecendo adequadamente as suas realizações.',
      'Sentir-se tão inquieto(a) que não consegue sentar.',
      'Sentir-se inútil.',
      'Sentir que as pessoas vão se aproveitar de você se você permitir.',
      'Sentimento de culpa.',
      'A ideia de que tem algo errado com a sua cabeça.'
    ]
  }
};

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