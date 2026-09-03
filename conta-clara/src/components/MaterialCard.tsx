import { Lock, ChevronRight, Receipt, Calculator, Target, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Material } from '@/data/materiais'

interface MaterialCardProps {
  material: Material
  onClick: () => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  receipt: Receipt,
  calculator: Calculator,
  target: Target,
  'trending-down': TrendingDown,
}

export function MaterialCard({ material, onClick }: MaterialCardProps) {
  const Icon = iconMap[material.icone] || Receipt
  const isBlocked = !material.acessivel

  return (
    <button
      onClick={onClick}
      disabled={isBlocked}
      className={cn(
        "card w-full text-left flex items-center gap-4 transition-all",
        isBlocked 
          ? "card-blocked cursor-not-allowed" 
          : "hover:shadow-md cursor-pointer"
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-12 h-12 rounded-lg",
        isBlocked 
          ? "bg-[hsl(var(--muted))]" 
          : "bg-[hsl(var(--primary))]/10"
      )}>
        {isBlocked ? (
          <Lock className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
        ) : (
          <Icon className="w-5 h-5 text-[hsl(var(--primary))]" />
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium">{material.titulo}</h3>
        {isBlocked && (
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            Bloqueado
          </p>
        )}
      </div>
      
      {!isBlocked && (
        <ChevronRight className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
      )}
    </button>
  )
}