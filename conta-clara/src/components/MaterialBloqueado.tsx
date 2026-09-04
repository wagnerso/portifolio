import { ArrowLeft, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

interface MaterialBloqueadoProps {
  titulo: string
  onBack: () => void
}

export function MaterialBloqueado({ titulo, onBack }: MaterialBloqueadoProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--muted))] mb-4">
          <Lock className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />
        </div>
        
        <h1 className="font-serif text-2xl font-medium mb-2">{titulo}</h1>
        
        <p className="text-[hsl(var(--muted-foreground))] max-w-md mx-auto">
          Em breve: transforme seus planos em metas possíveis, acompanhe o progresso e escolha o próximo passo.
        </p>
        
        <div className="mt-6">
          <span className="inline-block px-3 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded-full text-sm">
            Bloqueado
          </span>
        </div>
      </motion.div>
    </div>
  )
}