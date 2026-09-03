export interface Material {
  id: string
  titulo: string
  icone: string
  acessivel: boolean
}

export const materiais: Material[] = [
  {
    id: 'gastos',
    titulo: 'Meus gastos',
    icone: 'receipt',
    acessivel: true
  },
  {
    id: 'salario',
    titulo: 'Entendendo seu salário',
    icone: 'calculator',
    acessivel: true
  },
  {
    id: 'metas',
    titulo: 'Minhas metas',
    icone: 'target',
    acessivel: false
  },
  {
    id: 'amortizacao',
    titulo: 'Amortização financeira',
    icone: 'trending-down',
    acessivel: false
  }
]