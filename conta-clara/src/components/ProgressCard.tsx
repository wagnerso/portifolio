import { motion } from 'framer-motion'

interface ProgressCardProps {
  aulasConcluidas: number
  totalAulas: number
}

export function ProgressCard({ aulasConcluidas, totalAulas }: ProgressCardProps) {
  const percentual = Math.round((aulasConcluidas / totalAulas) * 100)

  return (
    <motion.div 
      className="card mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-lg font-medium">Seu progresso</h2>
        <span className="text-sm text-[hsl(var(--muted-foreground))]">
          {percentual}%
        </span>
      </div>
      
      <p className="text-[hsl(var(--muted-foreground))] text-sm mb-3">
        {aulasConcluidas} de {totalAulas} aulas concluídas
      </p>
      
      <div className="h-2 bg-[hsl(var(--secondary))] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[hsl(var(--primary))]"
          initial={{ width: 0 }}
          animate={{ width: `${percentual}%` }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
    </motion.div>
  )
}