import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit, Tag } from 'lucide-react'

const categories = ['Food', 'Bills', 'Entertainment', 'Shopping', 'Travel', 'Health']

export default function ExpenseManager({ expenses, onAdd, onRemove, onEdit }) {
  const [form, setForm] = useState({ title: '', amount: '', category: categories[0], date: '', note: '' })
  const [editingId, setEditingId] = useState(null)

  const totalsByCategory = useMemo(() => {
    const map = {}
    for (const c of categories) map[c] = 0
    expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount })
    return map
  }, [expenses])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      id: editingId ?? crypto.randomUUID(),
      title: form.title.trim(),
      amount: Number(form.amount) || 0,
      category: form.category,
      date: form.date || new Date().toISOString().slice(0,10),
      note: form.note.trim(),
    }
    if (!payload.title || payload.amount <= 0) return
    if (editingId) {
      onEdit(payload)
    } else {
      onAdd(payload)
    }
    setForm({ title: '', amount: '', category: categories[0], date: '', note: '' })
    setEditingId(null)
  }

  const startEdit = (exp) => {
    setEditingId(exp.id)
    setForm({ title: exp.title, amount: String(exp.amount), category: exp.category, date: exp.date, note: exp.note || '' })
  }

  return (
    <section id="expenses" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-white/20 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-5 shadow-xl">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">{editingId ? 'Edit Expense' : 'Add Expense'}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="Title" className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 ring-purple-500" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={form.amount} onChange={(e)=>setForm({...form,amount:e.target.value})} placeholder="Amount" className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 ring-purple-500" />
                <input type="date" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 ring-purple-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 ring-purple-500">
                  {categories.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
                <input value={form.note} onChange={(e)=>setForm({...form,note:e.target.value})} placeholder="Note (optional)" className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 ring-purple-500" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-4 py-2 text-white shadow-lg">
                  <Plus size={16}/> {editingId ? 'Save' : 'Add'}
                </button>
                {editingId && (
                  <button type="button" onClick={()=>{setEditingId(null); setForm({ title: '', amount: '', category: categories[0], date: '', note: '' })}} className="rounded-xl px-4 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="mt-6 rounded-2xl border border-white/20 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-5 shadow-xl">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">Category Breakdown</h4>
            <div className="space-y-2">
              {categories.map(c => (
                <div key={c} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background:
                      c === 'Food' ? '#22c55e' :
                      c === 'Bills' ? '#ef4444' :
                      c === 'Entertainment' ? '#a855f7' :
                      c === 'Shopping' ? '#06b6d4' :
                      c === 'Travel' ? '#f59e0b' : '#3b82f6' }} />
                    <span className="text-neutral-700 dark:text-neutral-300">{c}</span>
                  </div>
                  <span className="text-neutral-900 dark:text-white">${totalsByCategory[c]?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/20 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-5 shadow-xl">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Recent Expenses</h3>
            <AnimatePresence initial={false}>
              {expenses.length === 0 ? (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">No expenses yet. Add your first one!</p>
              ) : (
                <ul className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
                  {expenses.map((e) => (
                    <motion.li key={e.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="py-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{e.title}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{e.category} • {e.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-900 dark:text-white">${e.amount.toFixed(2)}</span>
                        <button onClick={()=>startEdit(e)} className="h-8 w-8 grid place-items-center rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                          <Edit size={16} />
                        </button>
                        <button onClick={()=>onRemove(e.id)} className="h-8 w-8 grid place-items-center rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-rose-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
