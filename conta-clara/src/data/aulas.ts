import { Aula } from '@/types'

export const aulas: Aula[] = [
  {
    id: 1,
    titulo: 'Psicologia Financeira',
    data: '19/08',
    status: 'acessivel',
    descricao: 'Nesta primeira aula, vamos entender como nossas crenças sobre dinheiro são formadas e como elas afetam nossas decisões diárias. O primeiro passo para assumir o controle é entender a própria mente e reprogramar a forma como enxergamos a nossa vida financeira.',
    checklist: [
      'Refletir sobre o maior gatilho de gastos',
      'Abrir a Conta Cofre (banco digital/corretora)',
      'Trazer todas as contas abertas que tem hoje para análise'
    ]
  },
  {
    id: 2,
    titulo: 'Rastreamento do Dinheiro',
    data: '26/08',
    status: 'atual',
    descricao: 'Agora que entendemos nossa mente, precisamos entender nossa realidade. Aprenda o método prático para saber exatamente para onde o seu dinheiro está indo, sem complicação e sem se sentir culpado por cada gasto.',
    checklist: [
      'Lançar os gastos dos primeiros 7 dias na planilha',
      'Identificar e cortar 1 vazamento invisível (ex: assinatura)'
    ]
  },
  {
    id: 3,
    titulo: 'Reserva e Metas',
    data: '02/09',
    status: 'bloqueada',
    checklist: [
      'Preencher a planilha 70/30 com a renda atual',
      'Definir e carimbar 3 metas no formato SMART'
    ]
  },
  {
    id: 4,
    titulo: 'Financiamento Imobiliário',
    data: '09/09',
    status: 'bloqueada',
    checklist: [
      'Olhar o saldo devedor real no app do banco',
      'Simular 1 amortização extra na calculadora'
    ]
  },
  {
    id: 5,
    titulo: 'Investimentos',
    data: '16/09',
    status: 'bloqueada',
    checklist: [
      'Transferir o primeiro valor para a Conta Cofre',
      'Fazer o primeiro investimento em Renda Fixa'
    ]
  }
]