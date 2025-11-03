import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DashboardOverview from './components/DashboardOverview'
import ExpenseManager from './components/ExpenseManager'
import Analytics from './components/Analytics'

const initialExpenses = [
  { id: crypto.randomUUID(), title: 'Groceries', amount: 120.45, category: 'Food', date: new Date().toISOString().slice(0,10), note: '' },
  { id: crypto.randomUUID(), title: 'Electric Bill', amount: 80.0, category: 'Bills', date: new Date().toISOString().slice(0,10), note: '' },
  { id: crypto.randomUUID(), title: 'Movie Night', amount: 28.9, category: 'Entertainment', date: new Date().toISOString().slice(0,10), note: '' },
]

function App() {
  const [expenses, setExpenses] = useState(initialExpenses)

  const totals = useMemo(() => {
    const income = 3200 // demo static income for visuals
    const expensesSum = expenses.reduce((a,b)=>a + b.amount, 0)
    return { income, expenses: expensesSum }
  }, [expenses])

  const categoryTotals = useMemo(() => {
    const map = { Food:0, Bills:0, Entertainment:0, Shopping:0, Travel:0, Health:0 }
    expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount })
    return map
  }, [expenses])

  const trendPoints = useMemo(() => {
    // simple 8-point trend using rolling sum for visuals
    const base = [400,520,380,610,450,730,500,620]
    return base.map((y,i)=>({ x: i, y }))
  }, [])

  const handleAdd = (payload) => setExpenses(prev => [{...payload}, ...prev])
  const handleRemove = (id) => setExpenses(prev => prev.filter(e => e.id !== id))
  const handleEdit = (payload) => setExpenses(prev => prev.map(e => e.id === payload.id ? payload : e))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <div className="fixed inset-0 -z-0 pointer-events-none [background:radial-gradient(1200px_circle_at_20%_-10%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(900px_circle_at_80%_0%,rgba(147,51,234,0.12),transparent_40%),radial-gradient(1000px_circle_at_50%_100%,rgba(236,72,153,0.1),transparent_40%)]" />
      <Navbar onAddClick={() => { const el = document.getElementById('expenses'); el?.scrollIntoView({ behavior: 'smooth' }) }} />
      <Hero />
      <DashboardOverview totals={totals} />
      <Analytics trendPoints={trendPoints} categoryTotals={categoryTotals} />
      <ExpenseManager expenses={expenses} onAdd={handleAdd} onRemove={handleRemove} onEdit={handleEdit} />
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-sm text-neutral-500">
        Built with love • Demo visuals only (no backend yet)
      </footer>
    </div>
  )
}

export default App
