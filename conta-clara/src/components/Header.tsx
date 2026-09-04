import { Wallet } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  titulo: string
  subtitulo?: string
  showIcon?: boolean
}

export function Header({ titulo, subtitulo, showIcon = true }: HeaderProps) {
  return (
    <motion.header 
      className="text-center mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {showIcon && (
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--primary))]/10 mb-4">
          <Wallet className="w-8 h-8 text-[hsl(var(--primary))]" />
        </div>
      )}
      <h1 className="font-serif text-3xl font-medium text-[hsl(var(--foreground))] italic">
        {titulo}
      </h1>
      {subtitulo && (
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          {subtitulo}
        </p>
      )}
    </motion.header>
  )
}