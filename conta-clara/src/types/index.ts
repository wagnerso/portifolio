export interface Aula {
  id: number
  titulo: string
  data: string
  status: 'acessivel' | 'atual' | 'bloqueada'
  descricao?: string
  checklist: string[]
}

export interface CheckinData {
  oQueFes: string
  oQueDificultou: string
  oQuePercebeu: string
  compromisso: string
  timestamp: number
}

export interface Gasto {
  id: string
  valor: number
  data: string
  descricao: string
  categoria: string
  timestamp: number
}

export interface Meta {
  id: string
  nome: string
  valor: number
  valorGuardado: number
  prazo?: string
  proximoPasso?: string
  timestamp: number
}

export interface ChecklistState {
  [aulaId: number]: {
    concluida: boolean
    itens: boolean[]
  }
}