// State
const state = {
  currentPage: 'home',
  activeTab: 'aulas',
  checklist: JSON.parse(localStorage.getItem('conta-clara-checklist') || 'null') || {
    1: { concluida: true, itens: [true, true, true] },
    2: { concluida: false, itens: [false, false] },
    3: { concluida: false, itens: [false, false] },
    4: { concluida: false, itens: [false, false] },
    5: { concluida: false, itens: [false, false] }
  },
  gastos: JSON.parse(localStorage.getItem('conta-clara-gastos') || '[]'),
  metas: JSON.parse(localStorage.getItem('conta-clara-metas') || '[]'),
  expandedAula: null,
  aulaDetalhe: null,
  salarioTipo: 'clt',
  salarioBruto: '',
  salarioCarga: '160',
  salarioInss: '11',
  salarioIrrf: '15',
  salarioVt: '',
  salarioVr: '',
  salarioOutros: '',
  produtoValor: '',
  salarioCalculado: false,
  produtoCalculado: false,
  showMetaForm: false,
  metaForm: { specific: '', measurable: '', achievable: '', relevant: '', timebound: '' },
  showAposentadoriaForm: false,
  aposentadoriaForm: { idadeAtual: '', idadeAposentadoria: '', rendaMensal: '', reservaAtual: '', taxaAnual: '6' },
  aposentadoriaResult: null
};

// Save to localStorage
function save(key, data) {
  localStorage.setItem(`conta-clara-${key}`, JSON.stringify(data));
}

// Format currency
function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Format date
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR');
}

// Data
const aulas = [
  { id: 1, titulo: 'Psicologia Financeira', data: '19/08', status: 'acessivel', descricao: 'Nesta primeira aula, vamos entender como nossas crenças sobre dinheiro são formadas e como elas afetam nossas decisões diárias. O primeiro passo para assumir o controle é entender a própria mente e reprogramar a forma como enxergamos a nossa vida financeira.', checklist: ['Refletir sobre o maior gatilho de gastos', 'Abrir a Conta Cofre (banco digital/corretora)', 'Trazer todas as contas abertas que tem hoje para análise'], pdf: 'public/aulas/01-Psicologia-Financeira.pdf' },
  { id: 2, titulo: 'Rastreamento do Dinheiro', data: '02/09', status: 'atual', descricao: 'Agora que entendemos nossa mente, precisamos entender nossa realidade. Aprenda o método prático para saber exatamente para onde o seu dinheiro está indo, sem complicação e sem se sentir culpado por cada gasto.', checklist: ['Lançar os gastos dos primeiros 7 dias na planilha', 'Identificar e cortar 1 vazamento invisível (ex: assinatura)'], pdf: 'public/aulas/02-Rastreamento-do-Dinheiro.pdf' },
  { id: 3, titulo: 'Reserva e Metas', data: '09/09', status: 'acessivel', checklist: ['Preencher a planilha 70/30 com a renda atual', 'Definir e carimbar 3 metas no formato SMART'], pdf: 'public/aulas/03-Reserva-e-Metas.pdf' },
  { id: 4, titulo: 'Financiamento Imobiliário', data: '09/09', status: 'bloqueada', checklist: ['Olhar o saldo devedor real no app do banco', 'Simular 1 amortização extra na calculadora'], pdf: null },
  { id: 5, titulo: 'Investimentos', data: '16/09', status: 'bloqueada', checklist: ['Transferir o primeiro valor para a Conta Cofre', 'Fazer o primeiro investimento em Renda Fixa'], pdf: null }
];

const materiais = [
  { id: 'salario', titulo: 'Entendendo seu salário', icone: 'calculator', acessivel: true },
  { id: 'gastos', titulo: 'Meus gastos', icone: 'receipt', acessivel: true },
  { id: 'metas', titulo: 'Minhas metas', icone: 'target', acessivel: true },
  { id: 'aposentadoria', titulo: 'Simulador de Aposentadoria', icone: 'trending-down', acessivel: true },
  { id: 'amortizacao', titulo: 'Amortização financeira', icone: 'trending-down', acessivel: false }
];

const glossario = [
  { id: 1, titulo: 'Custo de Vida', descricao: 'Representa o valor mínimo necessário para passar o mês, incluindo moradia, alimentação básica e contas essenciais.' },
  { id: 2, titulo: 'Despesas Fixas', descricao: 'Contas que chegam todos os meses com pouca variação, como aluguel, condomínio e internet.' },
  { id: 3, titulo: 'Despesas Variáveis', descricao: 'Gastos que mudam conforme as escolhas diárias, como mercado, delivery, lazer e combustível.' },
  { id: 4, titulo: 'Dor do Pagamento', descricao: 'Desconforto psicológico natural ao perceber o dinheiro saindo. Registrar os gastos ajuda a recuperar essa percepção.' },
  { id: 5, titulo: 'Gastos Fantasmas', descricao: 'Pequenas cobranças automáticas ou esquecidas, como taxas, anuidades e assinaturas não utilizadas.' },
  { id: 6, titulo: 'Inflação', descricao: 'Aumento dos preços ao longo do tempo, reduzindo o poder de compra do dinheiro.' },
  { id: 7, titulo: 'Orçamento', descricao: 'Um mapa para decidir os limites de uso do dinheiro sem transformar a organização financeira em uma lista de proibições.' },
  { id: 8, titulo: 'Padrão de Vida', descricao: 'Estilo de vida sustentado pelas escolhas e pela renda disponíveis.' }
];

// Icons
const icons = {
  wallet: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>',
  book: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  file: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>',
  bookmark: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>',
  lock: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  chevronUp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
  chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  plus: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  trash: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
  save: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
  receipt: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/></svg>',
  calculator: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>',
  target: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  trendingDown: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>',
  arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  download: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  externalLink: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>'
};

// Render
function render() {
  const app = document.getElementById('app');
  
  if (state.currentPage === 'home') {
    app.innerHTML = renderHome();
  } else if (state.currentPage === 'aula' && state.aulaDetalhe) {
    app.innerHTML = renderAulaDetalhe(state.aulaDetalhe);
  } else if (state.currentPage === 'gastos') {
    app.innerHTML = renderGastos();
  } else if (state.currentPage === 'salario') {
    app.innerHTML = renderSalario();
  } else if (state.currentPage === 'metas') {
    app.innerHTML = renderMetaPage();
  } else if (state.currentPage === 'aposentadoria') {
    app.innerHTML = renderAposentadoriaPage();
  } else if (state.currentPage === 'amortizacao') {
    app.innerHTML = renderBloqueado('Amortização financeira');
  } else if (state.currentPage === 'glossario') {
    app.innerHTML = renderGlossarioPage();
  }
  
  bindEvents();
}

function renderHome() {
  const aulasConcluidas = Object.values(state.checklist).filter(s => s.concluida).length;
  const percentual = Math.round((aulasConcluidas / 5) * 100);
  
  return `
    <header class="header">
      <div class="header-icon">${icons.wallet}</div>
      <h1 class="font-serif">Conta Clara</h1>
      <p>Tati, sua jornada financeira rumo à liberdade.</p>
    </header>

    <div class="card">
      <div class="progress-header">
        <h2 class="font-serif">Seu progresso</h2>
        <span style="color: var(--muted-foreground); font-size: 0.875rem;">${percentual}%</span>
      </div>
      <p style="color: var(--muted-foreground); font-size: 0.875rem;">${aulasConcluidas} de 5 aulas concluídas</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percentual}%"></div>
      </div>
    </div>

    <nav class="nav">
      <button class="nav-btn ${state.activeTab === 'aulas' ? 'active' : ''}" data-tab="aulas">
        ${icons.book}
        <span class="full">Trilha de Aulas</span>
        <span class="short">Aulas</span>
      </button>
      <button class="nav-btn ${state.activeTab === 'materiais' ? 'active' : ''}" data-tab="materiais">
        ${icons.file}
        <span class="full">Materiais Complementares</span>
        <span class="short">Materiais</span>
      </button>
      <button class="nav-btn ${state.activeTab === 'glossario' ? 'active' : ''}" data-tab="glossario">
        ${icons.bookmark}
        <span class="full">Glossário</span>
        <span class="short">Glossário</span>
      </button>
    </nav>

    ${state.activeTab === 'aulas' ? renderAulas() : ''}
    ${state.activeTab === 'materiais' ? renderMateriais() : ''}
    ${state.activeTab === 'glossario' ? renderGlossario() : ''}
  `;
}

function renderAulas() {
  let html = '';
  
  aulas.forEach(aula => {
    const state_aula = state.checklist[aula.id] || { concluida: false, itens: aula.checklist.map(() => false) };
    const isBlocked = aula.status === 'bloqueada';
    const itensConcluidos = state_aula.itens.filter(Boolean).length;
    const totalItens = aula.checklist.length;
    const percentualItens = totalItens > 0 ? Math.round((itensConcluidos / totalItens) * 100) : 0;
    
    html += `
      <div class="aula-card ${isBlocked ? 'bloqueada' : ''}" data-aula="${aula.id}" ${!isBlocked ? 'style="cursor: pointer;"' : ''}>
        <div class="aula-header">
          <div style="display: flex; align-items: flex-start; gap: 12px; flex: 1;">
            <span class="aula-num ${aula.status}">
              ${isBlocked ? icons.lock : aula.id.toString().padStart(2, '0')}
            </span>
            <div class="aula-info">
              <h3 class="font-serif">${aula.titulo}</h3>
              <p class="data">${aula.data}</p>
              ${!isBlocked && itensConcluidos > 0 ? `
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px; font-size: 0.875rem; color: var(--muted-foreground);">
                  <div style="flex: 1; height: 6px; background: var(--muted); border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; background: var(--moss); width: ${percentualItens}%"></div>
                  </div>
                  <span>${itensConcluidos}/${totalItens}</span>
                </div>
              ` : ''}
            </div>
          </div>
          ${!isBlocked ? `
            <span style="color: var(--muted-foreground);">${icons.chevronRight}</span>
          ` : ''}
        </div>
      </div>
    `;
  });

  return `<div style="margin-bottom: 24px;">${html}</div>`;
}

function renderAulaDetalhe(aulaId) {
  const aula = aulas.find(a => a.id === aulaId);
  if (!aula) return '';
  
  const state_aula = state.checklist[aula.id] || { concluida: false, itens: aula.checklist.map(() => false) };
  const itensConcluidos = state_aula.itens.filter(Boolean).length;
  const totalItens = aula.checklist.length;
  const percentualItens = totalItens > 0 ? Math.round((itensConcluidos / totalItens) * 100) : 0;
  
  return `
    <div class="aula-content-page">
      <button class="page-header" data-back-aula>
        ${icons.arrowLeft}
        Voltar para Trilha de Aulas
      </button>
      
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
        <span class="aula-num atual">${aula.id.toString().padStart(2, '0')}</span>
        <div>
          <h1 class="page-title font-serif">${aula.titulo}</h1>
          <p style="color: var(--muted-foreground);">${aula.data}</p>
        </div>
      </div>
      
      ${aula.descricao ? `
        <div class="card" style="margin-bottom: 16px;">
          <p>${aula.descricao}</p>
        </div>
      ` : ''}
      
      ${aula.pdf ? `
        <div class="pdf-viewer">
          <div class="pdf-header">
            <h3>
              ${icons.file}
              Material da Aula
            </h3>
            <div class="pdf-actions">
              <a href="${aula.pdf}" target="_blank" class="pdf-btn pdf-btn-secondary">
                ${icons.externalLink}
                Abrir em nova aba
              </a>
              <a href="${aula.pdf}" download class="pdf-btn pdf-btn-primary">
                ${icons.download}
                Download
              </a>
            </div>
          </div>
        </div>
      ` : `
        <div class="pdf-viewer">
          <div class="pdf-placeholder">
            ${icons.file}
            <p>Material em breve</p>
          </div>
        </div>
      `}
      
      <div class="tarefas-section">
        <div class="tarefas-header">
          ${icons.checkCircle}
          <h3>Tarefas da Semana</h3>
        </div>
        
        <div class="tarefas-list">
          ${aula.checklist.map((item, idx) => `
            <label class="tarefa-item ${state_aula.itens[idx] ? 'completed' : ''}">
              <input type="checkbox" ${state_aula.itens[idx] ? 'checked' : ''} data-check-detail="${aula.id}-${idx}">
              <span>${item}</span>
            </label>
          `).join('')}
        </div>
        
        <div class="tarefa-progress">
          <div class="tarefa-progress-bar">
            <div class="tarefa-progress-fill" style="width: ${percentualItens}%"></div>
          </div>
          <span class="tarefa-progress-text">${itensConcluidos} de ${totalItens} concluídas</span>
        </div>
      </div>
      
      <div style="margin-top: 24px;">
        <button class="btn-concluir ${state_aula.concluida ? 'concluida' : 'nao-concluida'}" data-concluir-detail="${aula.id}" style="width: 100%;">
          ${icons.check}
          ${state_aula.concluida ? 'Aula concluída' : 'Marcar aula como concluída'}
        </button>
      </div>
    </div>
  `;
}

function renderMateriais() {
  const iconMap = {
    'receipt': icons.receipt,
    'calculator': icons.calculator,
    'target': icons.target,
    'trending-down': icons.trendingDown
  };
  
  return `
    <div style="display: flex; flex-direction: column; gap: 12px;">
      ${materiais.map(m => `
        <button class="material-card ${m.acessivel ? '' : 'bloqueada'}" data-material="${m.id}" ${!m.acessivel ? 'disabled' : ''}>
          <div class="material-icon ${m.acessivel ? 'acessivel' : 'bloqueada'}">
            ${m.acessivel ? iconMap[m.icone] : icons.lock}
          </div>
          <div class="material-info">
            <h3>${m.titulo}</h3>
            ${!m.acessivel ? '<p class="blocked-tag">Bloqueado</p>' : ''}
          </div>
          ${m.acessivel ? `<span class="material-arrow">${icons.chevronRight}</span>` : ''}
        </button>
      `).join('')}
    </div>
  `;
}

function renderGlossario() {
  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${glossario.map(t => `
        <div class="card">
          <h3 class="font-serif" style="margin-bottom: 4px;">${t.titulo}</h3>
          <p style="color: var(--muted-foreground);">${t.descricao}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderMetas() {
  let html = `
    <div style="margin-bottom: 24px;">
      <p style="color: var(--muted-foreground); margin-bottom: 16px; font-size: 0.9rem;">
        Defina suas metas usando o método <strong>SMART</strong>:<br>
        <strong>S</strong>pecífico · <strong>M</strong>ensurável · <strong>A</strong>tingível · <strong>R</strong>elevante · <strong>T</strong>emporal
      </p>
    </div>
  `;

  if (state.showMetaForm) {
    html += `
      <div class="card" style="margin-bottom: 24px;">
        <h3 class="font-serif" style="margin-bottom: 16px;">Nova Meta SMART</h3>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: 500; margin-bottom: 6px; font-size: 0.9rem;">
            <strong style="color: var(--moss);">S</strong> — O que você quer? (Específico)
          </label>
          <input type="text" id="meta-specific" placeholder="Ex: Comprar uma TV de 48 polegadas com tecnologia 4K" 
            value="${state.metaForm.specific}"
            style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: 500; margin-bottom: 6px; font-size: 0.9rem;">
            <strong style="color: var(--moss);">M</strong> — Como medir o progresso? (Mensurável)
          </label>
          <input type="text" id="meta-measurable" placeholder="Ex: Pagando no máximo R$ 2.400" 
            value="${state.metaForm.measurable}"
            style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: 500; margin-bottom: 6px; font-size: 0.9rem;">
            <strong style="color: var(--moss);">A</strong> — É possível? (Atingível)
          </label>
          <input type="text" id="meta-achievable" placeholder="Ex: Consigo juntar R$ 300 por mês" 
            value="${state.metaForm.achievable}"
            style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: 500; margin-bottom: 6px; font-size: 0.9rem;">
            <strong style="color: var(--moss);">R</strong> — Por que é importante? (Relevante)
          </label>
          <input type="text" id="meta-relevant" placeholder="Ex: Para assistir séries favoritas com qualidade" 
            value="${state.metaForm.relevant}"
            style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: 500; margin-bottom: 6px; font-size: 0.9rem;">
            <strong style="color: var(--moss);">T</strong> — Qual o prazo? (Temporal)
          </label>
          <input type="text" id="meta-timebound" placeholder="Ex: Em no máximo 9 meses" 
            value="${state.metaForm.timebound}"
            style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
        </div>
        
        <div style="display: flex; gap: 12px;">
          <button id="save-meta" style="flex: 1; background: var(--moss); color: white; border: none; padding: 12px; border-radius: 8px; font-family: inherit; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
            ${icons.save}
            Salvar Meta
          </button>
          <button id="cancel-meta" style="background: transparent; border: 1px solid var(--border); padding: 12px 16px; border-radius: 8px; font-family: inherit; cursor: pointer; color: var(--muted-foreground);">
            Cancelar
          </button>
        </div>
      </div>
    `;
  } else {
    html += `
      <button id="add-meta" style="width: 100%; background: var(--moss); color: white; border: none; padding: 12px; border-radius: 8px; font-family: inherit; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 24px;">
        ${icons.plus}
        Nova Meta SMART
      </button>
    `;
  }

  if (state.metas.length > 0) {
    html += `<div style="display: flex; flex-direction: column; gap: 16px;">`;
    state.metas.forEach((meta, index) => {
      html += `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <h3 class="font-serif" style="color: var(--moss); margin: 0;">Meta ${index + 1}</h3>
            <button class="delete-meta" data-index="${index}" style="background: transparent; border: none; color: var(--destructive); cursor: pointer; padding: 4px;">
              ${icons.trash}
            </button>
          </div>
          <p style="font-size: 0.9rem; line-height: 1.5; color: var(--bark);">${meta.sentence}</p>
        </div>
      `;
    });
    html += `</div>`;
  } else if (!state.showMetaForm) {
    html += `
      <div class="card" style="text-align: center; color: var(--muted-foreground); padding: 32px;">
        <div style="margin-bottom: 12px; opacity: 0.5;">${icons.target}</div>
        <p>Você ainda não tem metas cadastradas.</p>
        <p style="font-size: 0.875rem; margin-top: 8px;">Clique em "Nova Meta SMART" para começar!</p>
      </div>
    `;
  }

  return html;
}

function renderAposentadoria() {
  let html = `
    <div style="margin-bottom: 24px;">
      <p style="color: var(--muted-foreground); margin-bottom: 16px; font-size: 0.9rem;">
        Descubra quanto precisa investir mensalmente para alcançar sua <strong>independência financeira</strong>.
      </p>
    </div>
  `;

  if (state.showAposentadoriaForm) {
    html += `
      <div class="card" style="margin-bottom: 24px;">
        <h3 class="font-serif" style="margin-bottom: 16px;">Simulador de Aposentadoria</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 6px; font-size: 0.9rem;">
              Sua idade atual
            </label>
            <input type="number" id="aport-idade-atual" placeholder="Ex: 20" 
              value="${state.aposentadoriaForm.idadeAtual}"
              style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
          </div>
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 6px; font-size: 0.9rem;">
              Idade para se aposentar
            </label>
            <input type="number" id="aport-idade-aposentadoria" placeholder="Ex: 50" 
              value="${state.aposentadoriaForm.idadeAposentadoria}"
              style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
          </div>
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: 500; margin-bottom: 6px; font-size: 0.9rem;">
            Quanto deseja receber por mês? (sem INSS)
          </label>
          <input type="text" id="aport-renda-mensal" placeholder="Ex: 5.000" 
            value="${state.aposentadoriaForm.rendaMensal}"
            style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 6px; font-size: 0.9rem;">
              Quanto já tem guardado?
            </label>
            <input type="text" id="aport-reserva-atual" placeholder="Ex: 0" 
              value="${state.aposentadoriaForm.reservaAtual}"
              style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
          </div>
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 6px; font-size: 0.9rem;">
              Taxa real anual (%)
            </label>
            <input type="number" id="aport-taxa-anual" placeholder="Ex: 6" step="0.1"
              value="${state.aposentadoriaForm.taxaAnual}"
              style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
          </div>
        </div>
        
        <div style="display: flex; gap: 12px;">
          <button id="calcular-aposentadoria" style="flex: 1; background: var(--moss); color: white; border: none; padding: 12px; border-radius: 8px; font-family: inherit; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
            ${icons.calculator}
            Calcular
          </button>
          <button id="cancel-aposentadoria" style="background: transparent; border: 1px solid var(--border); padding: 12px 16px; border-radius: 8px; font-family: inherit; cursor: pointer; color: var(--muted-foreground);">
            Limpar
          </button>
        </div>
      </div>
    `;

    if (state.aposentadoriaResult) {
      const r = state.aposentadoriaResult;
      html += `
        <div class="card" style="border-top: 4px solid var(--moss); margin-bottom: 24px;">
          <h3 class="font-serif" style="margin-bottom: 16px; color: var(--moss);">Resultado</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div style="background: var(--cream); padding: 16px; border-radius: 8px; text-align: center;">
              <p style="font-size: 0.8rem; color: var(--muted-foreground); margin-bottom: 4px;">Montante necessário</p>
              <p style="font-size: 1.5rem; font-weight: 600; color: var(--bark);">${formatCurrency(r.montante)}</p>
            </div>
            <div style="background: var(--cream); padding: 16px; border-radius: 8px; text-align: center;">
              <p style="font-size: 0.8rem; color: var(--muted-foreground); margin-bottom: 4px;">Anos até aposentadoria</p>
              <p style="font-size: 1.5rem; font-weight: 600; color: var(--bark);">${r.anos} anos</p>
            </div>
          </div>
          
          <div style="background: var(--cream); padding: 16px; border-radius: 8px; margin-bottom: 12px;">
            <p style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 8px;">Precisa investir por mês:</p>
            <p style="font-size: 1.8rem; font-weight: 600; color: var(--moss);">${formatCurrency(r.investimentoMensal)}</p>
          </div>
          
          <div style="background: var(--cream); padding: 16px; border-radius: 8px;">
            <p style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 8px;">Precisa investir por ano:</p>
            <p style="font-size: 1.4rem; font-weight: 600; color: var(--bark);">${formatCurrency(r.investimentoAnual)}</p>
          </div>
          
          <div style="margin-top: 16px; padding: 12px; background: rgba(74, 93, 74, 0.08); border-radius: 8px;">
            <p style="font-size: 0.8rem; color: var(--muted-foreground);">
              <strong>Taxa mensal:</strong> ${r.taxaMensal.toFixed(2)}% · 
              <strong>Período:</strong> ${r.meses} meses · 
              <strong>Reserva atual:</strong> ${formatCurrency(r.reservaAtual)}
            </p>
          </div>
        </div>
      `;
    }
  } else {
    html += `
      <button id="show-aposentadoria-form" style="width: 100%; background: var(--moss); color: white; border: none; padding: 12px; border-radius: 8px; font-family: inherit; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 24px;">
        ${icons.calculator}
        Abrir Simulador
      </button>
    `;
  }

  return html;
}

function renderGastos() {
  const periodo = state.gastosPeriodo || 'all';
  const gastosFiltrados = state.gastos.filter(g => {
    if (periodo === 'all') return true;
    const dias = parseInt(periodo);
    const dataGasto = new Date(g.data);
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);
    return dataGasto >= dataLimite;
  }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  
  const total = gastosFiltrados.reduce((acc, g) => acc + g.valor, 0);
  
  return `
    <button class="page-header" data-back>
      ${icons.arrowLeft}
      Voltar
    </button>
    
    <h1 class="page-title font-serif">Meus gastos</h1>
    <p class="page-subtitle">Registre um gasto por vez e observe seus hábitos sem julgamento.</p>
    
    <div class="filters">
      <button class="filter-btn ${periodo === '7' ? 'active' : ''}" data-periodo="7">Últimos 7 dias</button>
      <button class="filter-btn ${periodo === '30' ? 'active' : ''}" data-periodo="30">Últimos 30 dias</button>
      <button class="filter-btn ${periodo === 'all' ? 'active' : ''}" data-periodo="all">Todos os registros</button>
    </div>
    
    <div class="card">
      <div class="total-card">
        <h2>Total do período</h2>
        <span class="valor">${formatCurrency(total)}</span>
      </div>
    </div>
    
    <button class="btn-primary" style="width: 100%; margin-bottom: 24px;" id="show-form-gasto">
      ${icons.plus}
      Novo gasto
    </button>
    
    <div id="form-gasto" class="hidden">
      <div class="card">
        <h3 style="font-weight: 500; margin-bottom: 16px;">Registrar gasto</h3>
        <div class="form-group">
          <label>Valor (R$)</label>
          <input type="text" class="form-input" id="gasto-valor" placeholder="0,00">
          <p class="error-msg hidden" id="error-valor">O valor precisa ser maior que zero.</p>
        </div>
        <div class="form-group">
          <label>Data</label>
          <input type="date" class="form-input" id="gasto-data">
          <p class="error-msg hidden" id="error-data">A data é obrigatória.</p>
        </div>
        <div class="form-group">
          <label>Descrição</label>
          <input type="text" class="form-input" id="gasto-desc" placeholder="Ex.: supermercado, conta de luz...">
          <p class="error-msg hidden" id="error-desc">A descrição é obrigatória.</p>
        </div>
        <div class="form-group">
          <label>Categoria</label>
          <select class="form-input" id="gasto-cat">
            <option>Casa</option>
            <option>Mercado</option>
            <option>Transporte</option>
            <option>Lazer</option>
            <option>Saúde</option>
            <option selected>Outros</option>
          </select>
        </div>
        <div class="form-actions">
          <button class="btn-primary" id="save-gasto">Salvar</button>
          <button class="btn-secondary" id="cancel-gasto">Cancelar</button>
        </div>
      </div>
    </div>
    
    <div id="gastos-list">
      ${gastosFiltrados.length === 0 ? `
        <div class="card empty-state">
          <p>Nenhum gasto registrado neste período.</p>
        </div>
      ` : gastosFiltrados.map(g => `
        <div class="gasto-item">
          <div class="gasto-info">
            <div class="gasto-top">
              <span class="desc">${g.descricao}</span>
              <span class="valor">${formatCurrency(g.valor)}</span>
            </div>
            <div class="gasto-meta">
              <span>${g.categoria}</span>
              <span>·</span>
              <span>${formatDate(g.data)}</span>
            </div>
          </div>
          <button class="gasto-delete" data-delete-gasto="${g.id}">${icons.trash}</button>
        </div>
      `).join('')}
    </div>
    
    <div class="card info-section">
      <h2 class="font-serif">Planilha 70/30</h2>
      <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 12px;">A regra 70/30 é uma referência simples para organizar suas finanças:</p>
      <ul style="font-size: 0.875rem; color: var(--muted-foreground); display: flex; flex-direction: column; gap: 8px;">
        <li style="display: flex; align-items: flex-start; gap: 8px;">
          <strong style="color: var(--bark);">70%</strong>
          <span>destinado à vida atual: moradia, alimentação, lazer e contas do dia a dia.</span>
        </li>
        <li style="display: flex; align-items: flex-start; gap: 8px;">
          <strong style="color: var(--bark);">30%</strong>
          <span>destinado a reserva, metas e futuro.</span>
        </li>
      </ul>
      <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-top: 12px;">A regra é apenas uma referência. A usuária deve adaptar os percentuais à própria realidade.</p>
    </div>
    
    <div class="card info-section">
      <h2 class="font-serif">Três maneiras de acompanhar seus gastos</h2>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
        <div class="info-block">
          <h3>Pela web</h3>
          <p>Registre os gastos diretamente no Conta Clara.</p>
        </div>
        <div class="info-block">
          <h3>Em uma planilha</h3>
          <p>Use uma planilha para separar vida atual, reserva, metas e futuro.</p>
        </div>
        <div class="info-block">
          <h3>Em um aplicativo</h3>
          <p>Mencionar Mobills, Piere ou outro aplicativo de preferência.</p>
        </div>
      </div>
      <p class="info-note">O mais importante é manter o hábito de registrar.</p>
    </div>
  `;
}

function renderSalario() {
  const tipoContrato = state.salarioTipo || 'clt';
  const salarioBruto = state.salarioBruto || '';
  const cargaHoraria = state.salarioCarga || '160';
  const inss = state.salarioInss || '11';
  const irrf = state.salarioIrrf || '15';
  const valeTransporte = state.salarioVt || '';
  const valeRefeicao = state.salarioVr || '';
  const outrosDescontos = state.salarioOutros || '';
  const produtoValor = state.produtoValor || '';
  
  const parseCurrency = (v) => parseFloat((v || '0').replace(/\./g, '').replace(',', '.')) || 0;
  const bruto = parseCurrency(salarioBruto);
  const carga = parseInt(cargaHoraria) || 160;
  const inssCalc = bruto * (parseCurrency(inss) / 100);
  const irrfCalc = bruto * (parseCurrency(irrf) / 100);
  const vtCalc = parseCurrency(valeTransporte);
  const vrCalc = parseCurrency(valeRefeicao);
  const outrosCalc = parseCurrency(outrosDescontos);
  const totalDescontos = inssCalc + irrfCalc + vtCalc + vrCalc + outrosCalc;
  const salarioLiquido = bruto - totalDescontos;
  const valorPorHora = carga > 0 ? salarioLiquido / carga : 0;
  
  const horasCem = valorPorHora > 0 ? 100 / valorPorHora : 0;
  
  const produtoValorNum = parseCurrency(produtoValor);
  const horasProduto = valorPorHora > 0 ? produtoValorNum / valorPorHora : 0;
  
  let diasProduto = 0;
  let semanasProduto = 0;
  let horasRestantes = horasProduto;
  
  if (horasProduto > 8) {
    diasProduto = Math.floor(horasProduto / 8);
    horasRestantes = horasProduto % 8;
  }
  
  if (diasProduto > 7) {
    semanasProduto = Math.floor(diasProduto / 7);
    diasProduto = diasProduto % 7;
  }
  
  return `
    <button class="page-header" data-back>
      ${icons.arrowLeft}
      Voltar
    </button>
    
    <h1 class="page-title font-serif">Entendendo seu salário</h1>
    <p class="page-subtitle">Calcule seu salário líquido e descubra quanto tempo você precisa trabalhar para comprar o que deseja.</p>
    
    <div class="mode-toggle">
      <button class="mode-btn ${tipoContrato === 'clt' ? 'active' : ''}" data-salario-tipo="clt">CLT</button>
      <button class="mode-btn ${tipoContrato === 'pj' ? 'active' : ''}" data-salario-tipo="pj">PJ</button>
    </div>
    
    ${tipoContrato === 'clt' ? `
      <div class="card">
        <h3 style="font-weight: 500; margin-bottom: 16px;">Dados do contrato CLT</h3>
        
        <div class="form-group">
          <label>Salário bruto mensal (R$)</label>
          <input type="text" class="form-input" id="salario-bruto" value="${salarioBruto}" placeholder="Ex.: 5.000,00">
        </div>
        
        <div class="form-group">
          <label>Carga horária mensal (horas)</label>
          <input type="number" class="form-input" id="salario-carga" value="${cargaHoraria}" placeholder="160">
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label>INSS (%)</label>
            <input type="text" class="form-input" id="salario-inss" value="${inss}" placeholder="11">
          </div>
          <div class="form-group">
            <label>IRRF (%)</label>
            <input type="text" class="form-input" id="salario-irrf" value="${irrf}" placeholder="15">
          </div>
        </div>
        
        <div class="form-group">
          <label>Vale-transporte (R$)</label>
          <input type="text" class="form-input" id="salario-vt" value="${valeTransporte}" placeholder="0,00">
        </div>
        
        <div class="form-group">
          <label>Vale-refeição (R$)</label>
          <input type="text" class="form-input" id="salario-vr" value="${valeRefeicao}" placeholder="0,00">
        </div>
        
        <div class="form-group">
          <label>Outros descontos (R$)</label>
          <input type="text" class="form-input" id="salario-outros" value="${outrosDescontos}" placeholder="0,00">
        </div>
        
        <button class="btn-primary" style="width: 100%; margin-top: 8px;" id="calcular-salario">
          ${icons.calculator}
          Calcular
        </button>
      </div>
      
      ${state.salarioCalculado && bruto > 0 ? `
        <div class="card">
          <h2 style="font-weight: 500; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            ${icons.calculator}
            Resumo do salário
          </h2>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid var(--border);">
              <span>Salário bruto</span>
              <span style="font-weight: 500;">${formatCurrency(bruto)}</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; color: var(--destructive); font-size: 0.875rem;">
              <span>INSS (${inss}%)</span>
              <span>-${formatCurrency(inssCalc)}</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; color: var(--destructive); font-size: 0.875rem;">
              <span>IRRF (${irrf}%)</span>
              <span>-${formatCurrency(irrfCalc)}</span>
            </div>
            
            ${vtCalc > 0 ? `
              <div style="display: flex; justify-content: space-between; color: var(--destructive); font-size: 0.875rem;">
                <span>Vale-transporte</span>
                <span>-${formatCurrency(vtCalc)}</span>
              </div>
            ` : ''}
            
            ${vrCalc > 0 ? `
              <div style="display: flex; justify-content: space-between; color: var(--destructive); font-size: 0.875rem;">
                <span>Vale-refeição</span>
                <span>-${formatCurrency(vrCalc)}</span>
              </div>
            ` : ''}
            
            ${outrosCalc > 0 ? `
              <div style="display: flex; justify-content: space-between; color: var(--destructive); font-size: 0.875rem;">
                <span>Outros descontos</span>
                <span>-${formatCurrency(outrosCalc)}</span>
              </div>
            ` : ''}
            
            <div style="display: flex; justify-content: space-between; padding-top: 12px; border-top: 2px solid var(--border); font-weight: 600;">
              <span>Total de descontos</span>
              <span style="color: var(--destructive);">${formatCurrency(totalDescontos)}</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; padding-top: 12px; border-top: 2px solid var(--moss); font-size: 1.1rem;">
              <span style="font-weight: 600;">Salário líquido</span>
              <span style="font-weight: 600; color: var(--moss);">${formatCurrency(salarioLiquido)}</span>
            </div>
          </div>
        </div>
        
        <div class="card">
          <h2 style="font-weight: 500; margin-bottom: 16px;">Quanto vale sua hora?</h2>
          
          <div class="results-grid">
            <div class="result-item" style="grid-column: span 2;">
              <label>Valor líquido por hora trabalhada</label>
              <span class="value highlight" style="font-size: 1.5rem;">${formatCurrency(valorPorHora)}</span>
            </div>
          </div>
          
          <div style="margin-top: 16px; padding: 16px; background: rgba(74, 93, 74, 0.05); border-radius: 8px;">
            <p style="font-size: 0.875rem; margin-bottom: 8px;">
              <strong>Cálculo do custo de R$ 100:</strong>
            </p>
            <p style="font-size: 1.25rem; font-weight: 500; color: var(--moss);">
              Para ganhar R$ 100, você precisa trabalhar ${horasCem.toFixed(1)} horas
            </p>
            <p style="font-size: 0.75rem; color: var(--muted-foreground); margin-top: 8px;">
              ${horasCem.toFixed(1)} horas × ${formatCurrency(valorPorHora)}/hora = R$ 100,00
            </p>
          </div>
        </div>
        
        <div class="card">
          <h2 style="font-weight: 500; margin-bottom: 16px;">Quanto tempo para comprar um produto?</h2>
          <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 16px;">
            Informe o valor do produto e descubra quanto tempo você precisa trabalhar para comprá-lo.
          </p>
          
          <div class="form-group">
            <label>Valor do produto (R$)</label>
            <input type="text" class="form-input" id="produto-valor" value="${produtoValor}" placeholder="Ex.: 800,00">
          </div>
          
          <button class="btn-primary" style="width: 100%; margin-top: 8px;" id="calcular-produto">
            ${icons.calculator}
            Calcular
          </button>
          
          ${state.produtoCalculado && produtoValorNum > 0 && valorPorHora > 0 ? `
            <div style="padding: 16px; background: rgba(74, 93, 74, 0.05); border-radius: 8px; margin-top: 16px;">
              <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 8px;">
                Um produto de <strong>${formatCurrency(produtoValorNum)}</strong> representa:
              </p>
              
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
                ${semanasProduto > 0 ? `
                  <p style="font-size: 1.25rem; font-weight: 500; color: var(--moss);">
                    ${semanasProduto} ${semanasProduto === 1 ? 'semana' : 'semanas'}, ${diasProduto} ${diasProduto === 1 ? 'dia' : 'dias'} e ${horasRestantes.toFixed(1)} horas
                  </p>
                ` : diasProduto > 0 ? `
                  <p style="font-size: 1.25rem; font-weight: 500; color: var(--moss);">
                    ${diasProduto} ${diasProduto === 1 ? 'dia' : 'dias'} e ${horasRestantes.toFixed(1)} horas
                  </p>
                ` : `
                  <p style="font-size: 1.25rem; font-weight: 500; color: var(--moss);">
                    ${horasProduto.toFixed(1)} horas
                  </p>
                `}
                
                <p style="font-size: 0.75rem; color: var(--muted-foreground);">
                  ${formatCurrency(produtoValorNum)} ÷ ${formatCurrency(valorPorHora)}/hora = ${horasProduto.toFixed(1)} horas de trabalho
                </p>
              </div>
              
              <p class="info-note" style="margin-top: 12px;">
                Esta é uma comparação educativa, não uma recomendação financeira.
              </p>
            </div>
          ` : ''}
        </div>
      ` : ''}
      
      <div class="card concepts-section">
        <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 500; margin-bottom: 16px;">Conceitos importantes (CLT)</h2>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="concept-item">
            <h3>Salário bruto</h3>
            <p>É o valor total que você ganha antes de qualquer desconto. É o valor contratado ou combinado.</p>
          </div>
          <div class="concept-item">
            <h3>INSS</h3>
            <p>Instituto Nacional do Seguro Social. É a contribuição para a previdência social, com alíquotas que variam de 7,5% a 14% conforme a faixa salarial.</p>
          </div>
          <div class="concept-item">
            <h3>IRRF</h3>
            <p>Imposto de Renda Retido na Fonte. É o imposto cobrado sobre a renda, com alíquotas que variam de 0% a 27,5%.</p>
          </div>
          <div class="concept-item">
            <h3>Vale-transporte</h3>
            <p>Benefício obrigatório que cobre o deslocamento entre casa e trabalho. O desconto é de até 6% do salário bruto.</p>
          </div>
          <div class="concept-item">
            <h3>Vale-refeição / Alimentação</h3>
            <p>Benefício facultativo que pode ser descontado ou não do salário, dependendo da empresa.</p>
          </div>
        </div>
      </div>
      
      <div class="warning-card">
        <p><strong>Aviso importante:</strong> As alíquotas do INSS e IRRF são progressivas e mudam conforme a faixa salarial. Use os percentuais do seu próprio holerite. Esta página organiza uma estimativa educativa, não calcula uma folha oficial.</p>
      </div>
    ` : `
      <div class="card">
        <h3 style="font-weight: 500; margin-bottom: 16px;">Dados do contrato PJ</h3>
        <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 16px;">
          ParaPJ, o cálculo é mais simples. Informe o valor mensal e a carga horária.
        </p>
        
        <div class="form-group">
          <label>Valor mensal (R$)</label>
          <input type="text" class="form-input" id="salario-bruto" value="${salarioBruto}" placeholder="Ex.: 8.000,00">
        </div>
        
        <div class="form-group">
          <label>Carga horária mensal (horas)</label>
          <input type="number" class="form-input" id="salario-carga" value="${cargaHoraria}" placeholder="160">
        </div>
      </div>
      
      ${bruto > 0 ? `
        <div class="card">
          <h2 style="font-weight: 500; margin-bottom: 16px;">Quanto vale sua hora?</h2>
          
          <div class="results-grid">
            <div class="result-item" style="grid-column: span 2;">
              <label>Valor por hora trabalhada</label>
              <span class="value highlight" style="font-size: 1.5rem;">${formatCurrency(valorPorHora)}</span>
            </div>
          </div>
          
          <div style="margin-top: 16px; padding: 16px; background: rgba(74, 93, 74, 0.05); border-radius: 8px;">
            <p style="font-size: 0.875rem; margin-bottom: 8px;">
              <strong>Cálculo do custo de R$ 100:</strong>
            </p>
            <p style="font-size: 1.25rem; font-weight: 500; color: var(--moss);">
              Para ganhar R$ 100, você precisa trabalhar ${horasCem.toFixed(1)} horas
            </p>
            <p style="font-size: 0.75rem; color: var(--muted-foreground); margin-top: 8px;">
              ${horasCem.toFixed(1)} horas × ${formatCurrency(valorPorHora)}/hora = R$ 100,00
            </p>
          </div>
        </div>
        
        <div class="card">
            <h2 style="font-weight: 500; margin-bottom: 16px;">Quanto tempo para comprar um produto?</h2>
            <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 16px;">
              Informe o valor do produto e descubra quanto tempo você precisa trabalhar para comprá-lo.
            </p>
            
            <div class="form-group">
              <label>Valor do produto (R$)</label>
              <input type="text" class="form-input" id="produto-valor" value="${produtoValor}" placeholder="Ex.: 800,00">
            </div>
            
            <button class="btn-primary" style="width: 100%; margin-top: 8px;" id="calcular-produto">
              ${icons.calculator}
              Calcular
            </button>
            
            ${state.produtoCalculado && produtoValorNum > 0 && valorPorHora > 0 ? `
              <div style="padding: 16px; background: rgba(74, 93, 74, 0.05); border-radius: 8px; margin-top: 16px;">
                <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 8px;">
                  Um produto de <strong>${formatCurrency(produtoValorNum)}</strong> representa:
                </p>
                
                <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
                  ${semanasProduto > 0 ? `
                    <p style="font-size: 1.25rem; font-weight: 500; color: var(--moss);">
                      ${semanasProduto} ${semanasProduto === 1 ? 'semana' : 'semanas'}, ${diasProduto} ${diasProduto === 1 ? 'dia' : 'dias'} e ${horasRestantes.toFixed(1)} horas
                    </p>
                  ` : diasProduto > 0 ? `
                    <p style="font-size: 1.25rem; font-weight: 500; color: var(--moss);">
                      ${diasProduto} ${diasProduto === 1 ? 'dia' : 'dias'} e ${horasRestantes.toFixed(1)} horas
                    </p>
                  ` : `
                    <p style="font-size: 1.25rem; font-weight: 500; color: var(--moss);">
                      ${horasProduto.toFixed(1)} horas
                    </p>
                  `}
                  
                  <p style="font-size: 0.75rem; color: var(--muted-foreground);">
                    ${formatCurrency(produtoValorNum)} ÷ ${formatCurrency(valorPorHora)}/hora = ${horasProduto.toFixed(1)} horas de trabalho
                  </p>
                </div>
                
                <p class="info-note" style="margin-top: 12px;">
                  Esta é uma comparação educativa, não uma recomendação financeira.
                </p>
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}
      
        <div class="card concepts-section">
          <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 500; margin-bottom: 16px;">Conceitos importantes (PJ)</h2>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="concept-item">
              <h3>Pessoa Jurídica (PJ)</h3>
              <p>Quando você trabalha como empresa, emiti boleto fiscal. Não há descontos automáticos de INSS ou IRRF.</p>
            </div>
            <div class="concept-item">
              <h3>Impostos mensais</h3>
              <p>O PJ paga impostos mensais (Simples Nacional, Lucro Presumido, etc.) que podem variar de 6% a 11% da receita.</p>
            </div>
            <div class="concept-item">
              <h3>Contabilidade</h3>
              <p>É necessário pagar um contador para emitir notas e fazer a declaração de impostos.</p>
            </div>
          </div>
        </div>
        
        <div class="warning-card">
          <p><strong>Aviso importante:</strong> O cálculo PJ é simplificado. Consulte um contador para saber todos os impostos e obrigações do seu regime tributário.</p>
        </div>
    `}
  `;
}

function renderMetaPage() {
  return `
    <button class="page-header" data-back>
      ${icons.arrowLeft}
      Voltar
    </button>
    
    <h1 class="page-title font-serif">Minhas Metas</h1>
    
    ${renderMetas()}
  `;
}

function renderAposentadoriaPage() {
  return `
    <button class="page-header" data-back>
      ${icons.arrowLeft}
      Voltar
    </button>
    
    <h1 class="page-title font-serif">Simulador de Aposentadoria</h1>
    
    ${renderAposentadoria()}
  `;
}

function renderBloqueado(titulo) {
  return `
    <button class="page-header" data-back>
      ${icons.arrowLeft}
      Voltar
    </button>
    
    <div class="card blocked-content">
      <div class="blocked-icon">${icons.lock}</div>
      <h1 class="page-title font-serif">${titulo}</h1>
      <p class="page-subtitle">Em breve: transforme seus planos em metas possíveis, acompanhe o progresso e escolha o próximo passo.</p>
      <span class="blocked-tag">Bloqueado</span>
    </div>
  `;
}

function renderGlossarioPage() {
  return `
    <button class="page-header" data-back>
      ${icons.arrowLeft}
      Voltar
    </button>
    
    <h1 class="page-title font-serif">Glossário</h1>
    
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${glossario.map(t => `
        <div class="card">
          <h3 class="font-serif" style="margin-bottom: 4px;">${t.titulo}</h3>
          <p style="color: var(--muted-foreground);">${t.descricao}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// Events
function bindEvents() {
  // Tabs
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.dataset.tab;
      render();
    });
  });

  // Back button
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentPage = 'home';
      render();
    });
  });

  // Aula card click - navigate to detail
  document.querySelectorAll('.aula-card:not(.bloqueada)').forEach(card => {
    card.addEventListener('click', () => {
      const aulaId = parseInt(card.dataset.aula);
      state.currentPage = 'aula';
      state.aulaDetalhe = aulaId;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Back from aula detail
  document.querySelectorAll('[data-back-aula]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentPage = 'home';
      state.activeTab = 'aulas';
      state.aulaDetalhe = null;
      render();
    });
  });

  // Checklist
  document.querySelectorAll('[data-check]').forEach(input => {
    input.addEventListener('change', () => {
      const [aulaId, idx] = input.dataset.check.split('-').map(Number);
      const state_aula = state.checklist[aulaId] || { concluida: false, itens: aulas.find(a => a.id === aulaId).checklist.map(() => false) };
      state_aula.itens[idx] = input.checked;
      state_aula.concluida = state_aula.itens.every(Boolean);
      state.checklist[aulaId] = state_aula;
      save('checklist', state.checklist);
      render();
    });
  });

  // Concluir aula
  document.querySelectorAll('[data-concluir]').forEach(btn => {
    btn.addEventListener('click', () => {
      const aulaId = parseInt(btn.dataset.concluir);
      const aula = aulas.find(a => a.id === aulaId);
      const state_aula = state.checklist[aulaId] || { concluida: false, itens: aula.checklist.map(() => false) };
      state_aula.concluida = !state_aula.concluida;
      state_aula.itens = aula.checklist.map(() => state_aula.concluida);
      state.checklist[aulaId] = state_aula;
      save('checklist', state.checklist);
      render();
    });
  });

  // Go to aula
  document.querySelectorAll('[data-goto-aula]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTab = 'aulas';
      render();
    });
  });

  // Checklist in detail view
  document.querySelectorAll('[data-check-detail]').forEach(input => {
    input.addEventListener('change', () => {
      const [aulaId, idx] = input.dataset.checkDetail.split('-').map(Number);
      const aula = aulas.find(a => a.id === aulaId);
      const state_aula = state.checklist[aulaId] || { concluida: false, itens: aula.checklist.map(() => false) };
      state_aula.itens[idx] = input.checked;
      state_aula.concluida = state_aula.itens.every(Boolean);
      state.checklist[aulaId] = state_aula;
      save('checklist', state.checklist);
      render();
    });
  });

  // Concluir aula from detail view
  document.querySelectorAll('[data-concluir-detail]').forEach(btn => {
    btn.addEventListener('click', () => {
      const aulaId = parseInt(btn.dataset.concluirDetail);
      const aula = aulas.find(a => a.id === aulaId);
      const state_aula = state.checklist[aulaId] || { concluida: false, itens: aula.checklist.map(() => false) };
      state_aula.concluida = !state_aula.concluida;
      state_aula.itens = aula.checklist.map(() => state_aula.concluida);
      state.checklist[aulaId] = state_aula;
      save('checklist', state.checklist);
      render();
    });
  });

  // Material click
  document.querySelectorAll('.material-card:not(.bloqueada)').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.material;
      state.currentPage = id;
      render();
    });
  });

  // Gastos
  document.querySelectorAll('[data-periodo]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.gastosPeriodo = btn.dataset.periodo;
      render();
    });
  });

  const showFormGasto = document.getElementById('show-form-gasto');
  if (showFormGasto) {
    showFormGasto.addEventListener('click', () => {
      document.getElementById('form-gasto').classList.toggle('hidden');
    });
  }

  const cancelGasto = document.getElementById('cancel-gasto');
  if (cancelGasto) {
    cancelGasto.addEventListener('click', () => {
      document.getElementById('form-gasto').classList.add('hidden');
    });
  }

  const saveGasto = document.getElementById('save-gasto');
  if (saveGasto) {
    saveGasto.addEventListener('click', () => {
      const valorInput = document.getElementById('gasto-valor');
      const dataInput = document.getElementById('gasto-data');
      const descInput = document.getElementById('gasto-desc');
      
      const valor = parseFloat(valorInput.value.replace(/\./g, '').replace(',', '.'));
      const data = dataInput.value;
      const desc = descInput.value;
      
      let valid = true;
      
      if (isNaN(valor) || valor <= 0) {
        document.getElementById('error-valor').classList.remove('hidden');
        valorInput.classList.add('error');
        valid = false;
      } else {
        document.getElementById('error-valor').classList.add('hidden');
        valorInput.classList.remove('error');
      }
      
      if (!data) {
        document.getElementById('error-data').classList.remove('hidden');
        dataInput.classList.add('error');
        valid = false;
      } else {
        document.getElementById('error-data').classList.add('hidden');
        dataInput.classList.remove('error');
      }
      
      if (!desc.trim()) {
        document.getElementById('error-desc').classList.remove('hidden');
        descInput.classList.add('error');
        valid = false;
      } else {
        document.getElementById('error-desc').classList.add('hidden');
        descInput.classList.remove('error');
      }
      
      if (valid) {
        state.gastos.push({
          id: Date.now().toString(),
          valor,
          data,
          descricao: desc,
          categoria: document.getElementById('gasto-cat').value,
          timestamp: Date.now()
        });
        save('gastos', state.gastos);
        render();
      }
    });
  }

  document.querySelectorAll('[data-delete-gasto]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja excluir este gasto?')) {
        state.gastos = state.gastos.filter(g => g.id !== btn.dataset.deleteGasto);
        save('gastos', state.gastos);
        render();
      }
    });
  });

  // Salary - Tipo contrato
  document.querySelectorAll('[data-salario-tipo]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.salarioTipo = btn.dataset.salarioTipo;
      state.salarioCalculado = false;
      render();
    });
  });

  // Salary - Bruto
  const salarioBruto = document.getElementById('salario-bruto');
  if (salarioBruto) {
    salarioBruto.addEventListener('input', () => {
      state.salarioBruto = salarioBruto.value;
      state.salarioCalculado = false;
    });
  }

  // Salary - Carga horária
  const salarioCarga = document.getElementById('salario-carga');
  if (salarioCarga) {
    salarioCarga.addEventListener('input', () => {
      state.salarioCarga = salarioCarga.value;
      state.salarioCalculado = false;
    });
  }

  // Salary - INSS
  const salarioInss = document.getElementById('salario-inss');
  if (salarioInss) {
    salarioInss.addEventListener('input', () => {
      state.salarioInss = salarioInss.value;
      state.salarioCalculado = false;
    });
  }

  // Salary - IRRF
  const salarioIrrf = document.getElementById('salario-irrf');
  if (salarioIrrf) {
    salarioIrrf.addEventListener('input', () => {
      state.salarioIrrf = salarioIrrf.value;
      state.salarioCalculado = false;
    });
  }

  // Salary - Vale-transporte
  const salarioVt = document.getElementById('salario-vt');
  if (salarioVt) {
    salarioVt.addEventListener('input', () => {
      state.salarioVt = salarioVt.value;
      state.salarioCalculado = false;
    });
  }

  // Salary - Vale-refeição
  const salarioVr = document.getElementById('salario-vr');
  if (salarioVr) {
    salarioVr.addEventListener('input', () => {
      state.salarioVr = salarioVr.value;
      state.salarioCalculado = false;
    });
  }

  // Salary - Outros descontos
  const salarioOutros = document.getElementById('salario-outros');
  if (salarioOutros) {
    salarioOutros.addEventListener('input', () => {
      state.salarioOutros = salarioOutros.value;
      state.salarioCalculado = false;
    });
  }

  // Calcular salário
  const calcularSalario = document.getElementById('calcular-salario');
  if (calcularSalario) {
    calcularSalario.addEventListener('click', () => {
      state.salarioCalculado = true;
      render();
    });
  }

  // Produto valor
  const produtoValor = document.getElementById('produto-valor');
  if (produtoValor) {
    produtoValor.addEventListener('input', () => {
      state.produtoValor = produtoValor.value;
      state.produtoCalculado = false;
    });
  }

  // Calcular produto
  const calcularProduto = document.getElementById('calcular-produto');
  if (calcularProduto) {
    calcularProduto.addEventListener('click', () => {
      state.produtoCalculado = true;
      render();
    });
  }

  // Metas SMART
  const addMeta = document.getElementById('add-meta');
  if (addMeta) {
    addMeta.addEventListener('click', () => {
      state.showMetaForm = true;
      state.metaForm = { specific: '', measurable: '', achievable: '', relevant: '', timebound: '' };
      render();
    });
  }

  const cancelMeta = document.getElementById('cancel-meta');
  if (cancelMeta) {
    cancelMeta.addEventListener('click', () => {
      state.showMetaForm = false;
      render();
    });
  }

  const saveMeta = document.getElementById('save-meta');
  if (saveMeta) {
    saveMeta.addEventListener('click', () => {
      const specific = document.getElementById('meta-specific').value.trim();
      const measurable = document.getElementById('meta-measurable').value.trim();
      const achievable = document.getElementById('meta-achievable').value.trim();
      const relevant = document.getElementById('meta-relevant').value.trim();
      const timebound = document.getElementById('meta-timebound').value.trim();

      if (!specific || !measurable || !achievable || !relevant || !timebound) {
        alert('Por favor, preencha todos os campos SMART.');
        return;
      }

      const sentence = `${specific}, ${timebound}, ${measurable}. ${relevant}.`;
      
      state.metas.push({
        id: Date.now(),
        specific,
        measurable,
        achievable,
        relevant,
        timebound,
        sentence,
        createdAt: new Date().toISOString()
      });

      save('metas', state.metas);
      state.showMetaForm = false;
      render();
    });
  }

  document.querySelectorAll('.delete-meta').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      if (confirm('Tem certeza que deseja excluir esta meta?')) {
        state.metas.splice(index, 1);
        save('metas', state.metas);
        render();
      }
    });
  });

  // Aposentadoria
  const showAposentadoriaForm = document.getElementById('show-aposentadoria-form');
  if (showAposentadoriaForm) {
    showAposentadoriaForm.addEventListener('click', () => {
      state.showAposentadoriaForm = true;
      render();
    });
  }

  const cancelAposentadoria = document.getElementById('cancel-aposentadoria');
  if (cancelAposentadoria) {
    cancelAposentadoria.addEventListener('click', () => {
      state.showAposentadoriaForm = false;
      state.aposentadoriaResult = null;
      state.aposentadoriaForm = { idadeAtual: '', idadeAposentadoria: '', rendaMensal: '', reservaAtual: '', taxaAnual: '6' };
      render();
    });
  }

  const calcularAposentadoria = document.getElementById('calcular-aposentadoria');
  if (calcularAposentadoria) {
    calcularAposentadoria.addEventListener('click', () => {
      const idadeAtual = parseInt(document.getElementById('aport-idade-atual').value);
      const idadeAposentadoria = parseInt(document.getElementById('aport-idade-aposentadoria').value);
      const rendaMensal = parseFloat(document.getElementById('aport-renda-mensal').value.replace(/\./g, '').replace(',', '.'));
      const reservaAtual = parseFloat(document.getElementById('aport-reserva-atual').value.replace(/\./g, '').replace(',', '.')) || 0;
      const taxaAnual = parseFloat(document.getElementById('aport-taxa-anual').value);

      if (isNaN(idadeAtual) || isNaN(idadeAposentadoria) || isNaN(rendaMensal) || isNaN(taxaAnual)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
      }

      if (idadeAposentadoria <= idadeAtual) {
        alert('A idade de aposentadoria deve ser maior que a idade atual.');
        return;
      }

      const anos = idadeAposentadoria - idadeAtual;
      const meses = anos * 12;
      const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
      const montante = rendaMensal / taxaMensal;
      
      const fator = Math.pow(1 + taxaMensal, meses);
      const investimentoMensal = (montante - reservaAtual * fator) * taxaMensal / (fator - 1);
      const investimentoAnual = investimentoMensal * 12;

      state.aposentadoriaForm = {
        idadeAtual: document.getElementById('aport-idade-atual').value,
        idadeAposentadoria: document.getElementById('aport-idade-aposentadoria').value,
        rendaMensal: document.getElementById('aport-renda-mensal').value,
        reservaAtual: document.getElementById('aport-reserva-atual').value,
        taxaAnual: document.getElementById('aport-taxa-anual').value
      };

      state.aposentadoriaResult = {
        montante,
        investimentoMensal,
        investimentoAnual,
        anos,
        meses,
        taxaMensal: taxaMensal * 100,
        reservaAtual
      };

      render();
    });
  }
}

// Initial render
render();
