import { useState } from 'react'
import { ArrowLeft, Calculator } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface EntendendoSalarioProps {
  onBack: () => void
}

export function EntendendoSalario({ onBack }: EntendendoSalarioProps) {
  const [modo, setModo] = useState<'bruto' | 'liquido'>('bruto')
  const [salario, setSalario] = useState('')
  const [cargaHoraria, setCargaHoraria] = useState('220')
  const [percentualImpostos, setPercentualImpostos] = useState('')
  const [descontosFixos, setDescontosFixos] = useState('')
  const [valorComparacao, setValorComparacao] = useState('')

  const parseCurrency = (value: string) => {
    return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const salarioBruto = parseCurrency(salario)
  const carga = parseInt(cargaHoraria) || 220
  const impostos = modo === 'bruto' ? salarioBruto * (parseCurrency(percentualImpostos) / 100) : 0
  const fixos = modo === 'bruto' ? parseCurrency(descontosFixos) : 0
  const totalDescontos = impostos + fixos
  const salarioLiquido = modo === 'bruto' ? salarioBruto - totalDescontos : parseCurrency(salario)
  const valorPorHora = carga > 0 ? salarioLiquido / carga : 0
  const horasPara100 = valorPorHora > 0 ? 100 / valorPorHora : 0
  const horasComparacao = valorPorHora > 0 ? parseCurrency(valorComparacao) / valorPorHora : 0

  const handleValorChange = (value: string, setter: (v: string) => void) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length === 0) {
      setter('')
      return
    }
    const valor = parseInt(numbers) / 100
    setter(valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
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
        <h1 className="font-serif text-2xl font-medium mb-2">Entendendo seu salário</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-6">
          Entenda a diferença entre salário bruto, descontos e salário líquido, e converta valores em horas de trabalho.
        </p>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setModo('bruto')}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
              modo === 'bruto'
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
            )}
          >
            Salário bruto
          </button>
          <button
            onClick={() => setModo('liquido')}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
              modo === 'liquido'
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
            )}
          >
            Salário líquido
          </button>
        </div>

        <div className="card mb-6">
          <div className="space-y-4">
            <div>
              <label className="label mb-2 block">
                {modo === 'bruto' ? 'Salário bruto mensal' : 'Salário líquido mensal'}
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="0,00"
                value={salario}
                onChange={(e) => handleValorChange(e.target.value, setSalario)}
              />
            </div>

            <div>
              <label className="label mb-2 block">Carga horária mensal (horas)</label>
              <input
                type="number"
                className="input-field"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
              />
            </div>

            {modo === 'bruto' && (
              <>
                <div>
                  <label className="label mb-2 block">Percentual de impostos e contribuições</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ex.: 27,5"
                    value={percentualImpostos}
                    onChange={(e) => setPercentualImpostos(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label mb-2 block">Outros descontos fixos (R$)</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="0,00"
                    value={descontosFixos}
                    onChange={(e) => handleValorChange(e.target.value, setDescontosFixos)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {salarioLiquido > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-6"
          >
            <h2 className="font-medium mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[hsl(var(--primary))]" />
              Resultados
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[hsl(var(--secondary))]/50 rounded-lg">
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">Valor líquido por hora</p>
                <p className="font-medium text-[hsl(var(--primary))]">{formatCurrency(valorPorHora)}</p>
              </div>
              
              <div className="p-3 bg-[hsl(var(--secondary))]/50 rounded-lg">
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">Horas para R$ 100</p>
                <p className="font-medium">{horasPara100.toFixed(1)}h</p>
              </div>
              
              <div className="p-3 bg-[hsl(var(--secondary))]/50 rounded-lg">
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">Salário líquido no mês</p>
                <p className="font-medium">{formatCurrency(salarioLiquido)}</p>
              </div>
              
              <div className="p-3 bg-[hsl(var(--secondary))]/50 rounded-lg">
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">Carga horária</p>
                <p className="font-medium">{carga}h</p>
              </div>

              {modo === 'bruto' && (
                <>
                  <div className="p-3 bg-[hsl(var(--secondary))]/50 rounded-lg">
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">Salário bruto</p>
                    <p className="font-medium">{formatCurrency(salarioBruto)}</p>
                  </div>
                  
                  <div className="p-3 bg-[hsl(var(--secondary))]/50 rounded-lg">
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">Total de descontos</p>
                    <p className="font-medium text-[hsl(var(--destructive))]">{formatCurrency(totalDescontos)}</p>
                  </div>
                </>
              )}
            </div>

            <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))] italic">
              Estes valores são comparações educativas, não recomendações financeiras.
            </p>
          </motion.div>
        )}

        <div className="card mb-6">
          <h2 className="font-medium mb-4">Comparar valor em horas</h2>
          
          <div className="mb-4">
            <label className="label mb-2 block">Valor em reais</label>
            <input
              type="text"
              className="input-field"
              placeholder="0,00"
              value={valorComparacao}
              onChange={(e) => handleValorChange(e.target.value, setValorComparacao)}
            />
          </div>

          {parseCurrency(valorComparacao) > 0 && valorPorHora > 0 && (
            <div className="p-4 bg-[hsl(var(--primary))]/5 rounded-lg">
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                Exemplos visuais:
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  Uma compra de <span className="font-medium">{formatCurrency(parseCurrency(valorComparacao))}</span> representa aproximadamente <span className="font-medium">{horasComparacao.toFixed(1)} horas</span> de trabalho.
                </p>
              </div>
              <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))] italic">
                Esta é uma comparação educativa, não uma recomendação financeira.
              </p>
            </div>
          )}
        </div>

        <div className="card mb-6">
          <h2 className="font-serif text-xl font-medium mb-4">Conceitos importantes</h2>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium mb-1">Salário bruto</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                É o valor total que você ganha antes de qualquer desconto. É o valor contratado ou combinado.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Descontos</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                São valores retirados do salário bruto, como impostos (INSS, IRRF) e outros descontos autorizados.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Salário líquido</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                É o valor que você recebe de fato, após todos os descontos. É o dinheiro que entra na sua conta.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">INSS</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Instituto Nacional do Seguro Social. É a contribuição para a previdência social, com alíquotas que variam de 7,5% a 14%.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">IRRF</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Imposto de Renda Retido na Fonte. É o imposto cobrado sobre a renda, com alíquotas que variam de 0% a 27,5%.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Vale-transporte</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Benefício que cobre o deslocamento entre casa e trabalho. O desconto é de até 6% do salário bruto.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Benefícios autorizados</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Podem incluir vale-refeição, vale-alimentação, plano de saúde, entre outros.
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-[hsl(var(--accent))]/10">
          <p className="text-sm text-[hsl(var(--foreground))]">
            <strong>Aviso importante:</strong> As alíquotas e regras mudam. Use os percentuais e descontos do seu próprio holerite. Esta página organiza uma estimativa educativa, não calcula uma folha oficial.
          </p>
        </div>
      </motion.div>
    </div>
  )
}