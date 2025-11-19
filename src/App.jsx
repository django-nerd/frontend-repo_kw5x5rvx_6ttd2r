import Dashboard from './components/Dashboard'
import QuickAdd from './components/QuickAdd'
import Products from './components/Products'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <header className="relative z-10 border-b border-blue-500/20 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Flames" className="w-8 h-8" />
            <h1 className="text-white font-semibold">Simple Shop ERP</h1>
          </div>
          <div className="text-blue-300 text-sm">Manage products, stock, and sales</div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8 space-y-8">
        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Overview</h2>
          <Dashboard />
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Quick Add Product</h2>
          <QuickAdd />
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Products</h2>
          <Products />
        </section>
      </main>
    </div>
  )
}

export default App
