import { useState, useRef } from 'react'
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { ProgressCard } from '@/components/ProgressCard'
import { CheckinSemanal } from '@/components/CheckinSemanal'
import { AulaCard } from '@/components/AulaCard'
import { FocoDaSemana } from '@/components/FocoDaSemana'
import { MaterialCard } from '@/components/MaterialCard'
import { MaterialBloqueado } from '@/components/MaterialBloqueado'
import { MeusGastos } from '@/pages/MeusGastos'
import { EntendendoSalario } from '@/pages/EntendendoSalario'
import { Glossario } from '@/pages/Glossario'
import { aulas } from '@/data/aulas'
import { materiais } from '@/data/materiais'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ChecklistState } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

type Page = 'home' | 'gastos' | 'salario' | 'metas' | 'amortizacao'

function App() {
  const [activeTab, setActiveTab] = useState('aulas')
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [checklistState, setChecklistState] = useLocalStorage<ChecklistState>(
    'conta-clara-checklist',
    {
      1: { concluida: true, itens: [true, true, true] },
      2: { concluida: false, itens: [false, false] },
      3: { concluida: false, itens: [false, false] },
      4: { concluida: false, itens: [false, false] },
      5: { concluida: false, itens: [false, false] },
    }
  )
  
  const aulasRef = useRef<HTMLDivElement>(null)

  const aulasConcluidas = Object.values(checklistState).filter(s => s.concluida).length

  const handleChecklistChange = (aulaId: number, state: { concluida: boolean; itens: boolean[] }) => {
    setChecklistState(prev => ({
      ...prev,
      [aulaId]: state
    }))
  }

  const handleAulaClick = (aulaId: number) => {
    setActiveTab('aulas')
    setTimeout(() => {
      aulasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleMaterialClick = (materialId: string) => {
    switch (materialId) {
      case 'gastos':
        setCurrentPage('gastos')
        break
      case 'salario':
        setCurrentPage('salario')
        break
      case 'metas':
        setCurrentPage('metas')
        break
      case 'amortizacao':
        setCurrentPage('amortizacao')
        break
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'gastos':
        return <MeusGastos onBack={() => setCurrentPage('home')} />
      case 'salario':
        return <EntendendoSalario onBack={() => setCurrentPage('home')} />
      case 'metas':
        return <MaterialBloqueado titulo="Minhas metas" onBack={() => setCurrentPage('home')} />
      case 'amortizacao':
        return <MaterialBloqueado titulo="Amortização financeira" onBack={() => setCurrentPage('home')} />
      default:
        return renderMainContent()
    }
  }

  const renderMainContent = () => (
    <>
      <Header
        titulo="Conta Clara"
        subtitulo="Tati, sua jornada financeira rumo à liberdade."
      />

      <ProgressCard aulasConcluidas={aulasConcluidas} totalAulas={5} />

      <CheckinSemanal />

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'aulas' && (
            <div ref={aulasRef} className="space-y-4 mb-6">
              {aulas.map(aula => (
                <AulaCard
                  key={aula.id}
                  aula={aula}
                  checklistState={checklistState}
                  onChecklistChange={handleChecklistChange}
                />
              ))}
              
              <FocoDaSemana
                aulas={aulas}
                checklistState={checklistState}
                onAulaClick={handleAulaClick}
              />
            </div>
          )}

          {activeTab === 'materiais' && (
            <div className="space-y-3">
              {materiais.map(material => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onClick={() => handleMaterialClick(material.id)}
                />
              ))}
            </div>
          )}

          {activeTab === 'glossario' && <Glossario />}
        </motion.div>
      </AnimatePresence>
    </>
  )

  return (
    <div className="min-h-screen">
      <main className="container-app">
        {renderContent()}
      </main>
    </div>
  )
}

export default App