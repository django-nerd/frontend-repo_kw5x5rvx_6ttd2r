import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/stats`)
        if (!res.ok) throw new Error('Failed to load stats')
        const data = await res.json()
        setStats(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="text-blue-200">Loading dashboard...</div>
  if (error) return <div className="text-red-300">{error}</div>
  if (!stats) return null

  const c = stats.counts || {}

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card title="Products" value={c.products} />
      <Card title="Customers" value={c.customers} />
      <Card title="Suppliers" value={c.suppliers} />
      <Card title="Sales" value={c.sales} />
      <Card title="Purchases" value={c.purchases} />
      <Card title="Inventory Value" value={`$${(stats.inventory_value || 0).toFixed(2)}`} />
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="rounded-xl border border-blue-500/20 bg-slate-800/50 p-5">
      <div className="text-blue-300 text-sm mb-1">{title}</div>
      <div className="text-white text-2xl font-semibold">{value}</div>
    </div>
  )
}
