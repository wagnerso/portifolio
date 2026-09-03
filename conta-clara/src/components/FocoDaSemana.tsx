import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Aula, ChecklistState } from '@/types'

interface FocoDaSemanaProps {
  aulas: Aula[]
  checklistState: ChecklistState
  onAulaClick: (aulaId: number) => void
}

export function FocoDaSemana({ aulas, checklistState, onAulaClick }: FocoDaSemanaProps) {
  const aulaAtual = aulas.find(a => a.status === 'atual')
  
  if (!aulaAtual) return null
  
  const state = checklistState[aulaAtual.id] || { 
    concluida: false, 
    itens: aulaAtual.checklist.map(() => false) 
  }
  
  const itensConcluidos = state.itens.filter(Boolean).length
  const totalItens = aulaAtual.checklist.length
  const todosConcluidos = itensConcluidos === totalItens

  const proximaAcao = aulaAtual.checklist.find((_, index) => !state.itens[index])

  return (
    <motion.div 
      className="card bg-[hsl(var(--primary))]/5 border-[hsl(var(--primary))]/20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h3 className="font-serif text-lg font-medium mb-2">Foco da semana</h3>
      
      {todosConcluidos ? (
        <div>
          <p className="text-[hsl(var(--primary))] font-medium mb-2">
            Parabéns! Você completou todas as ações desta aula!
          </p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Continue assim e prepare-se para a próxima etapa da sua jornada.
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-medium">
              {aulaAtual.id.toString().padStart(2, '0')}
            </span>
            <div>
              <p className="font-medium">{aulaAtual.titulo}</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {itensConcluidos} de {totalItens} ações concluídas
              </p>
            </div>
          </div>
          
          {proximaAcao && (
            <div className="mb-4">
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">Próxima ação:</p>
              <p className="text-sm">{proximaAcao}</p>
            </div>
          )}
          
          <button
            onClick={() => onAulaClick(aulaAtual.id)}
            className="btn-primary w-full"
          >
            Começar ação
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      )}
    </motion.div>
  )
}