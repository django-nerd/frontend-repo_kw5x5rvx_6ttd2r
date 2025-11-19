import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Products() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')

  async function load() {
    const res = await fetch(`${API}/api/products?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => { load() }, [])

  return (
    <div className="rounded-xl border border-blue-500/20 bg-slate-800/50 p-5">
      <div className="flex gap-3 mb-4">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search products..." className="px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700 flex-1" />
        <button onClick={load} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition">Search</button>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-blue-300">
              <th className="py-2 pr-4">SKU</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Cost</th>
              <th className="py-2 pr-4">Qty</th>
              <th className="py-2 pr-4">Category</th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id} className="border-t border-slate-700/60 text-blue-100">
                <td className="py-2 pr-4">{p.sku}</td>
                <td className="py-2 pr-4">{p.name}</td>
                <td className="py-2 pr-4">${p.price?.toFixed?.(2) ?? p.price}</td>
                <td className="py-2 pr-4">${p.cost?.toFixed?.(2) ?? p.cost}</td>
                <td className="py-2 pr-4">{p.quantity}</td>
                <td className="py-2 pr-4">{p.category || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
