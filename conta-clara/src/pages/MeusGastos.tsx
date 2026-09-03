import { useState } from 'react'
import { ArrowLeft, Plus, Trash2, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gasto } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { formatCurrency, formatDate, cn } from '@/lib/utils'

interface MeusGastosProps {
  onBack: () => void
}

const categorias = ['Casa', 'Mercado', 'Transporte', 'Lazer', 'Saúde', 'Outros']

const periodos = [
  { id: '7', label: 'Últimos 7 dias' },
  { id: '30', label: 'Últimos 30 dias' },
  { id: 'all', label: 'Todos os registros' },
]

export function MeusGastos({ onBack }: MeusGastosProps) {
  const [gastos, setGastos] = useLocalStorage<Gasto[]>('conta-clara-gastos', [])
  const [periodo, setPeriodo] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    valor: '',
    data: '',
    descricao: '',
    categoria: 'Outros'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const gastosFiltrados = gastos.filter(gasto => {
    if (periodo === 'all') return true
    const dias = parseInt(periodo)
    const dataGasto = new Date(gasto.data)
    const dataLimite = new Date()
    dataLimite.setDate(dataLimite.getDate() - dias)
    return dataGasto >= dataLimite
  }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())

  const totalPeriodo = gastosFiltrados.reduce((acc, g) => acc + g.valor, 0)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    const valor = parseFloat(formData.valor.replace(/\./g, '').replace(',', '.'))
    if (isNaN(valor) || valor <= 0) {
      newErrors.valor = 'O valor precisa ser maior que zero.'
    }
    
    if (!formData.descricao.trim()) {
      newErrors.descricao = 'A descrição é obrigatória.'
    }
    
    if (!formData.data) {
      newErrors.data = 'A data é obrigatória.'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    
    const valor = parseFloat(formData.valor.replace(/\./g, '').replace(',', '.'))
    
    const newGasto: Gasto = {
      id: Date.now().toString(),
      valor,
      data: formData.data,
      descricao: formData.descricao,
      categoria: formData.categoria,
      timestamp: Date.now()
    }
    
    setGastos([...gastos, newGasto])
    setFormData({ valor: '', data: '', descricao: '', categoria: 'Outros' })
    setShowForm(false)
    setSuccessMessage('Gasto registrado com sucesso!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este gasto?')) {
      setGastos(gastos.filter(g => g.id !== id))
    }
  }

  const handleValorChange = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length === 0) {
      setFormData(prev => ({ ...prev, valor: '' }))
      return
    }
    
    const valor = parseInt(numbers) / 100
    const formatted = valor.toLocaleString('pt-BR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })
    setFormData(prev => ({ ...prev, valor: formatted }))
  }

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
      >
        <h1 className="font-serif text-2xl font-medium mb-2">Meus gastos</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-6">
          Registre um gasto por vez e observe seus hábitos sem julgamento.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {periodos.map(p => (
            <button
              key={p.id}
              onClick={() => setPeriodo(p.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm transition-colors",
                periodo === p.id
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                  : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Total do período</h2>
            <span className="font-serif text-2xl font-medium text-[hsl(var(--primary))]">
              {formatCurrency(totalPeriodo)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary w-full mb-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo gasto
        </button>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="card">
                <h3 className="font-medium mb-4">Registrar gasto</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="label mb-2 block">Valor (R$)</label>
                    <input
                      type="text"
                      className={cn("input-field", errors.valor && "border-[hsl(var(--destructive))]")}
                      placeholder="0,00"
                      value={formData.valor}
                      onChange={(e) => handleValorChange(e.target.value)}
                    />
                    {errors.valor && (
                      <p className="text-sm text-[hsl(var(--destructive))] mt-1" role="alert">
                        {errors.valor}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label mb-2 block">Data</label>
                    <input
                      type="date"
                      className={cn("input-field", errors.data && "border-[hsl(var(--destructive))]")}
                      value={formData.data}
                      onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                    />
                    {errors.data && (
                      <p className="text-sm text-[hsl(var(--destructive))] mt-1" role="alert">
                        {errors.data}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label mb-2 block">Descrição</label>
                    <input
                      type="text"
                      className={cn("input-field", errors.descricao && "border-[hsl(var(--destructive))]")}
                      placeholder="Ex.: supermercado, conta de luz..."
                      value={formData.descricao}
                      onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                    />
                    {errors.descricao && (
                      <p className="text-sm text-[hsl(var(--destructive))] mt-1" role="alert">
                        {errors.descricao}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label mb-2 block">Categoria</label>
                    <select
                      className="input-field"
                      value={formData.categoria}
                      onChange={(e) => setFormData(prev => ({ ...prev, categoria: e.target.value }))}
                    >
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={handleSubmit} className="btn-primary flex-1">
                    Salvar
                  </button>
                  <button 
                    onClick={() => setShowForm(false)} 
                    className="btn-secondary"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-4 mb-6 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] rounded-lg"
              role="status"
            >
              <CheckCircle className="w-5 h-5" />
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3 mb-8">
          {gastosFiltrados.length === 0 ? (
            <div className="card text-center py-8">
              <p className="text-[hsl(var(--muted-foreground))]">
                Nenhum gasto registrado neste período.
              </p>
            </div>
          ) : (
            gastosFiltrados.map(gasto => (
              <motion.div
                key={gasto.id}
                className="card flex items-center gap-4"
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{gasto.descricao}</span>
                    <span className="font-medium text-[hsl(var(--primary))]">
                      {formatCurrency(gasto.valor)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <span>{gasto.categoria}</span>
                    <span>·</span>
                    <span>{formatDate(gasto.data)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(gasto.id)}
                  className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/10 rounded-md transition-colors"
                  aria-label="Excluir gasto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </div>

        <div className="card mb-6">
          <h2 className="font-serif text-xl font-medium mb-4">Planilha 70/30</h2>
          
          <div className="space-y-4 text-sm text-[hsl(var(--muted-foreground))]">
            <p>
              A regra 70/30 é uma referência simples para organizar suas finanças:
            </p>
            
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-medium text-[hsl(var(--foreground))]">70%</span>
                <span>destinado à vida atual: moradia, alimentação, lazer e contas do dia a dia.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-[hsl(var(--foreground))]">30%</span>
                <span>destinado a reserva, metas e futuro.</span>
              </li>
            </ul>
            
            <p>
              A regra é apenas uma referência. A usuária deve adaptar os percentuais à própria realidade.
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="font-serif text-xl font-medium mb-4">Três maneiras de acompanhar seus gastos</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-[hsl(var(--secondary))]/50 rounded-lg">
              <h3 className="font-medium mb-1">Pela web</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Registre os gastos diretamente no Conta Clara.
              </p>
            </div>
            
            <div className="p-4 bg-[hsl(var(--secondary))]/50 rounded-lg">
              <h3 className="font-medium mb-1">Em uma planilha</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Use uma planilha para separar vida atual, reserva, metas e futuro.
              </p>
            </div>
            
            <div className="p-4 bg-[hsl(var(--secondary))]/50 rounded-lg">
              <h3 className="font-medium mb-1">Em um aplicativo</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Mencionar Mobills, Piere ou outro aplicativo de preferência.
              </p>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))] italic">
            O mais importante é manter o hábito de registrar.
          </p>
        </div>
      </motion.div>
    </div>
  )
}