export interface Termo {
  id: number
  titulo: string
  descricao: string
}

export const glossario: Termo[] = [
  {
    id: 1,
    titulo: 'Custo de Vida',
    descricao: 'Representa o valor mínimo necessário para passar o mês, incluindo moradia, alimentação básica e contas essenciais.'
  },
  {
    id: 2,
    titulo: 'Despesas Fixas',
    descricao: 'Contas que chegam todos os meses com pouca variação, como aluguel, condomínio e internet.'
  },
  {
    id: 3,
    titulo: 'Despesas Variáveis',
    descricao: 'Gastos que mudam conforme as escolhas diárias, como mercado, delivery, lazer e combustível.'
  },
  {
    id: 4,
    titulo: 'Dor do Pagamento',
    descricao: 'Desconforto psicológico natural ao perceber o dinheiro saindo. Registrar os gastos ajuda a recuperar essa percepção.'
  },
  {
    id: 5,
    titulo: 'Gastos Fantasmas',
    descricao: 'Pequenas cobranças automáticas ou esquecidas, como taxas, anuidades e assinaturas não utilizadas.'
  },
  {
    id: 6,
    titulo: 'Inflação',
    descricao: 'Aumento dos preços ao longo do tempo, reduzindo o poder de compra do dinheiro.'
  },
  {
    id: 7,
    titulo: 'Orçamento',
    descricao: 'Um mapa para decidir os limites de uso do dinheiro sem transformar a organização financeira em uma lista de proibições.'
  },
  {
    id: 8,
    titulo: 'Padrão de Vida',
    descricao: 'Estilo de vida sustentado pelas escolhas e pela renda disponíveis.'
  }
]