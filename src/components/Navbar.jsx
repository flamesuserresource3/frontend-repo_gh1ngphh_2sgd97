import { useEffect, useState } from 'react'
import { Wallet, BarChart3, Plus, Moon, Sun } from 'lucide-react'

export default function Navbar({ onAddClick }) {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 dark:bg-neutral-900/60 border-b border-white/20 dark:border-neutral-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 shadow-xl grid place-items-center text-white">
            <Wallet size={18} />
          </div>
          <span className="font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">FluxBudget</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
          <a href="#dashboard" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Dashboard</a>
          <a href="#analytics" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Analytics</a>
          <a href="#expenses" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Expenses</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark((d) => !d)} aria-label="Toggle theme" className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow transition-all">
            {dark ? <Sun size={18} className="text-amber-400"/> : <Moon size={18} className="text-neutral-700"/>}
          </button>
          <button onClick={onAddClick} className="hidden sm:inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg hover:opacity-95 active:opacity-90 transition-all">
            <Plus size={16}/> Add Expense
          </button>
        </div>
      </div>
    </header>
  )
}
