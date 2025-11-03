import { motion } from 'framer-motion'
import { BarChart3, PieChart } from 'lucide-react'

function TrendChart({ points }) {
  const width = 560
  const height = 160
  const padding = 24
  const maxY = Math.max(...points.map(p=>p.y), 1)
  const stepX = (width - padding * 2) / Math.max(points.length - 1, 1)
  const toX = (i) => padding + i * stepX
  const toY = (y) => height - padding - (y / maxY) * (height - padding * 2)
  const path = points.map((p,i)=>`${i===0?'M':'L'} ${toX(i)} ${toY(p.y)}`).join(' ')

  return (
    <svg width={width} height={height} className="max-w-full h-auto">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="#8b5cf6" strokeWidth="2" />
      <path d={`${path} L ${toX(points.length-1)} ${height - padding} L ${toX(0)} ${height - padding} Z`} fill="url(#grad)" opacity={0.6}/>
    </svg>
  )
}

function Pie({ data }) {
  const total = Object.values(data).reduce((a,b)=>a+b,0) || 1
  let acc = 0
  const colors = {
    Food: '#22c55e', Bills: '#ef4444', Entertainment: '#a855f7', Shopping: '#06b6d4', Travel: '#f59e0b', Health: '#3b82f6'
  }
  const segments = Object.entries(data).filter(([,v])=>v>0).map(([k,v])=>{
    const start = (acc/total)*100; acc += v; const end = (acc/total)*100
    return `${colors[k]} 0 ${end-start}%`
  })
  const gradient = `conic-gradient(${Object.entries(data).filter(([,v])=>v>0).map(([k,v])=>`${colors[k]} ${((acc-=v), (acc/total)*360)+((v/total)*360)}deg`).join(',')})`
  // Fallback: build slices manually
  let current = 0
  const slices = []
  acc = 0
  for (const [k,v] of Object.entries(data)) {
    if (v<=0) continue
    const start = (acc/total)*360
    const angle = (v/total)*360
    acc += v
    slices.push({ k, start, angle, color: colors[k] })
  }
  return (
    <div className="relative h-40 w-40">
      <div className="absolute inset-0 rounded-full" style={{ background: gradient }} />
      <div className="absolute inset-4 rounded-full bg-white dark:bg-neutral-900" />
    </div>
  )
}

export default function Analytics({ trendPoints, categoryTotals }) {
  return (
    <section id="analytics" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="rounded-2xl border border-white/20 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-100">
              <BarChart3 size={18}/> <h3 className="font-semibold">Monthly Trend</h3>
            </div>
          </div>
          <TrendChart points={trendPoints} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="rounded-2xl border border-white/20 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-100">
              <PieChart size={18}/> <h3 className="font-semibold">Category Split</h3>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Pie data={categoryTotals} />
            <div className="space-y-2 text-sm">
              {Object.entries(categoryTotals).map(([k,v]) => (
                <div key={k} className="flex items-center justify-between gap-8">
                  <span className="text-neutral-600 dark:text-neutral-300">{k}</span>
                  <span className="text-neutral-900 dark:text-white font-medium">${v.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
