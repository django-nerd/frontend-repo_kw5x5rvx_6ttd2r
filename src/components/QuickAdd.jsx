import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function QuickAdd() {
  const [form, setForm] = useState({ sku: '', name: '', price: '', cost: '', quantity: '' })
  const [message, setMessage] = useState('')

  async function submit(e) {
    e.preventDefault()
    setMessage('')
    try {
      const payload = {
        sku: form.sku,
        name: form.name,
        price: parseFloat(form.price || 0),
        cost: parseFloat(form.cost || 0),
        quantity: parseInt(form.quantity || 0, 10),
        description: '',
        category: '',
        is_active: true,
      }
      const res = await fetch(`${API}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.detail || 'Failed to add product')
      }
      setMessage('Product added')
      setForm({ sku: '', name: '', price: '', cost: '', quantity: '' })
    } catch (e) {
      setMessage(e.message)
    }
  }

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-blue-500/20 bg-slate-800/50 p-5 grid gap-3 md:grid-cols-5">
      <input name="sku" value={form.sku} onChange={onChange} placeholder="SKU" className="px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" required />
      <input name="name" value={form.name} onChange={onChange} placeholder="Name" className="px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" required />
      <input name="price" value={form.price} onChange={onChange} placeholder="Price" type="number" step="0.01" className="px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" required />
      <input name="cost" value={form.cost} onChange={onChange} placeholder="Cost" type="number" step="0.01" className="px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" />
      <input name="quantity" value={form.quantity} onChange={onChange} placeholder="Qty" type="number" className="px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" />
      <div className="md:col-span-5 flex items-center gap-3">
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition">Add Product</button>
        {message && <span className="text-blue-300 text-sm">{message}</span>}
      </div>
    </form>
  )
}
