import { useState } from 'react'
import { Lock, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Aula, ChecklistState } from '@/types'

interface AulaCardProps {
  aula: Aula
  checklistState: ChecklistState
  onChecklistChange: (aulaId: number, state: { concluida: boolean; itens: boolean[] }) => void
}

export function AulaCard({ aula, checklistState, onChecklistChange }: AulaCardProps) {
  const [expanded, setExpanded] = useState(false)
  const isBlocked = aula.status === 'bloqueada'
  const state = checklistState[aula.id] || { concluida: false, itens: aula.checklist.map(() => false) }
  
  const itensConcluidos = state.itens.filter(Boolean).length
  const totalItens = aula.checklist.length
  const percentualItens = totalItens > 0 ? Math.round((itensConcluidos / totalItens) * 100) : 0

  const handleItemToggle = (index: number) => {
    if (isBlocked) return
    
    const newItens = [...state.itens]
    newItens[index] = !newItens[index]
    const allChecked = newItens.every(Boolean)
    
    onChecklistChange(aula.id, {
      concluida: allChecked,
      itens: newItens
    })
  }

  const handleToggleConcluida = () => {
    if (isBlocked) return
    
    const allChecked = !state.concluida
    onChecklistChange(aula.id, {
      concluida: allChecked,
      itens: aula.checklist.map(() => allChecked)
    })
  }

  return (
    <motion.div
      className={cn(
        "card transition-all",
        isBlocked && "card-blocked",
        !isBlocked && "hover:shadow-md cursor-pointer"
      )}
      layout
    >
      <div 
        className="flex items-start justify-between"
        onClick={() => !isBlocked && setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={cn(
              "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
              aula.status === 'acessivel' && "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]",
              aula.status === 'atual' && "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
              aula.status === 'bloqueada' && "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
            )}>
              {isBlocked ? <Lock className="w-4 h-4" /> : aula.id.toString().padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-serif text-lg font-medium">{aula.titulo}</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{aula.data}</p>
            </div>
          </div>
          
          {!isBlocked && state.itens.some(Boolean) && (
            <div className="ml-11">
              <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <div className="flex-1 h-1.5 bg-[hsl(var(--secondary))] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[hsl(var(--primary))]"
                    style={{ width: `${percentualItens}%` }}
                  />
                </div>
                <span>{itensConcluidos}/{totalItens}</span>
              </div>
            </div>
          )}
        </div>
        
        {!isBlocked && (
          <button
            className="p-1 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            onClick={(e) => {
              e.stopPropagation()
              setExpanded(!expanded)
            }}
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {expanded && !isBlocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
              {aula.descricao && (
                <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
                  {aula.descricao}
                </p>
              )}
              
              <div className="space-y-2 mb-4">
                {aula.checklist.map((item, index) => (
                  <label
                    key={index}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors",
                      state.itens[index] 
                        ? "bg-[hsl(var(--primary))]/5"
                        : "hover:bg-[hsl(var(--secondary))]"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={state.itens[index] || false}
                      onChange={() => handleItemToggle(index)}
                      className="mt-0.5 h-4 w-4 rounded border-[hsl(var(--input))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))]"
                    />
                    <span className={cn(
                      "text-sm",
                      state.itens[index] && "line-through text-[hsl(var(--muted-foreground))]"
                    )}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>

              <button
                onClick={handleToggleConcluida}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                  state.concluida
                    ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                    : "border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))]"
                )}
              >
                <Check className="w-4 h-4" />
                {state.concluida ? 'Aula concluída' : 'Marcar como concluída'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}