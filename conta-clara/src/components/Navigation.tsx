import { BookOpen, FileText, BookMarked } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'aulas', label: 'Trilha de Aulas', icon: BookOpen },
  { id: 'materiais', label: 'Materiais Complementares', icon: FileText },
  { id: 'glossario', label: 'Glossário', icon: BookMarked },
]

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="flex border-b border-[hsl(var(--border))] mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors",
            "border-b-2 -mb-px",
            activeTab === tab.id
              ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
              : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          )}
        >
          <tab.icon className="w-4 h-4" />
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
        </button>
      ))}
    </nav>
  )
}