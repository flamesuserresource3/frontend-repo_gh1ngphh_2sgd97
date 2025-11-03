import { motion } from 'framer-motion'
import { Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react'

export default function DashboardOverview({ totals }) {
  const cards = [
    {
      title: 'Total Income',
      value: totals.income.toLocaleString(undefined, { style: 'currency', currency: 'USD' }),
      icon: <ArrowUpRight className="text-emerald-500" size={18} />,
      accent: 'from-emerald-400/20 to-emerald-500/10',
    },
    {
      title: 'Total Expenses',
      value: totals.expenses.toLocaleString(undefined, { style: 'currency', currency: 'USD' }),
      icon: <ArrowDownRight className="text-rose-500" size={18} />,
      accent: 'from-rose-400/20 to-rose-500/10',
    },
    {
      title: 'Balance',
      value: (totals.income - totals.expenses).toLocaleString(undefined, { style: 'currency', currency: 'USD' }),
      icon: <Wallet className="text-indigo-500" size={18} />,
      accent: 'from-indigo-400/20 to-indigo-500/10',
    },
  ]

  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-2xl border border-white/20 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-5 shadow-xl`}
          >
            <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${c.accent}`} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{c.title}</p>
                <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">{c.value}</p>
              </div>
              <div className="h-9 w-9 rounded-xl grid place-items-center bg-white/80 dark:bg-neutral-800/60 border border-white/30 dark:border-neutral-700/60">
                {c.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
