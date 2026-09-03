import { useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckinData } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function CheckinSemanal() {
  const [checkin, setCheckin] = useLocalStorage<CheckinData | null>('conta-clara-checkin', null)
  const [formData, setFormData] = useState<CheckinData>(
    checkin || {
      oQueFes: '',
      oQueDificultou: '',
      oQuePercebeu: '',
      compromisso: '',
      timestamp: 0
    }
  )
  const [saved, setSaved] = useState(false)

  const hasAtLeastOneField = formData.oQueFes || formData.oQueDificultou || formData.oQuePercebeu || formData.compromisso

  const handleSave = () => {
    const newCheckin = {
      ...formData,
      timestamp: Date.now()
    }
    setCheckin(newCheckin)
    setFormData(newCheckin)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChange = (field: keyof CheckinData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="font-serif text-xl font-medium mb-2">Reflexão da semana</h2>
      <p className="font-serif text-lg italic text-[hsl(var(--foreground))] mb-1">
        Como foi sua semana?
      </p>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
        Registre o que fizer sentido para você. Não precisa preencher tudo perfeitamente.
      </p>

      <div className="space-y-4">
        <div>
          <label className="label mb-2 block">O que você conseguiu fazer?</label>
          <textarea
            className="input-field min-h-[80px] resize-none"
            placeholder="Ex.: observei meus gastos por alguns dias."
            value={formData.oQueFes}
            onChange={(e) => handleChange('oQueFes', e.target.value)}
          />
        </div>

        <div>
          <label className="label mb-2 block">O que mais dificultou?</label>
          <textarea
            className="input-field min-h-[80px] resize-none"
            placeholder="Ex.: esqueci de anotar os gastos pequenos."
            value={formData.oQueDificultou}
            onChange={(e) => handleChange('oQueDificultou', e.target.value)}
          />
        </div>

        <div>
          <label className="label mb-2 block">O que você percebeu sobre seu dinheiro?</label>
          <textarea
            className="input-field min-h-[80px] resize-none"
            placeholder="Ex.: os gastos por impulso aparecem à noite."
            value={formData.oQuePercebeu}
            onChange={(e) => handleChange('oQuePercebeu', e.target.value)}
          />
        </div>

        <div>
          <label className="label mb-2 block">Qual é seu compromisso para a próxima semana?</label>
          <textarea
            className="input-field min-h-[80px] resize-none"
            placeholder="Ex.: vou registrar cada gasto no mesmo dia."
            value={formData.compromisso}
            onChange={(e) => handleChange('compromisso', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={!hasAtLeastOneField}
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar check-in
        </button>

        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center text-[hsl(var(--primary))]"
              role="status"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">Salvo com sucesso!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}