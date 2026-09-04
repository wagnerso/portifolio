import { motion } from 'framer-motion'
import { glossario } from '@/data/glossario'

export function Glossario() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="font-serif text-2xl font-medium mb-6">Glossário</h1>
      
      <div className="space-y-4">
        {glossario.map((termo, index) => (
          <motion.div
            key={termo.id}
            className="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium flex-shrink-0">
                {termo.id.toString().padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-serif text-lg font-medium mb-1">{termo.titulo}</h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">
                  {termo.descricao}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}