import { useEffect, useMemo, useState } from 'react'
import {
  Users,
  Package,
  PlusCircle,
  Search,
  Pencil,
  Trash2,
  Ban,
  CheckCircle2,
  Archive,
} from 'lucide-react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackendMany } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'
import TableScroll from '../TableScroll'

const tabs = [
  { id: 'users', label: 'Manage users', icon: Users },
  { id: 'products', label: 'Manage products', icon: Package },
  { id: 'add', label: 'Add product', icon: PlusCircle },
]

const userStatusStyle = {
  active: 'bg-emerald-50 text-emerald-700',
  suspended: 'bg-rose-50 text-rose-700',
  invited: 'bg-amber-50 text-amber-700',
}

const productStatusStyle = {
  active: 'bg-emerald-50 text-emerald-700',
  out_of_stock: 'bg-rose-50 text-rose-700',
  draft: 'bg-slate-100 text-slate-600',
}

const emptyProduct = {
  name: '',
  sku: '',
  category: 'Apparel',
  price: '',
  stock: '',
  status: 'active',
}

export default function ManagePage() {
  const { data, error, loading } = useBackendMany('admin', [
    'users',
    'products',
  ])
  const [tab, setTab] = useState('users')
  const [userQ, setUserQ] = useState('')
  const [productQ, setProductQ] = useState('')
  const [users, setUsers] = useState(null)
  const [products, setProducts] = useState(null)
  const [form, setForm] = useState(emptyProduct)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!data) return
    setUsers(data.users.items)
    setProducts(data.products.items)
  }, [data])

  const filteredUsers = useMemo(() => {
    if (!users) return []
    const q = userQ.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q),
    )
  }, [users, userQ])

  const filteredProducts = useMemo(() => {
    if (!products) return []
    const q = productQ.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [products, productQ])

  useReveal([data, tab, filteredUsers.length, filteredProducts.length, toast])

  function flash(msg) {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  function setUserStatus(id, status) {
    setUsers((list) =>
      list.map((u) => (u.id === id ? { ...u, status } : u)),
    )
    flash(`User ${status === 'active' ? 'activated' : 'suspended'}`)
  }

  function removeUser(id) {
    setUsers((list) => list.filter((u) => u.id !== id))
    flash('User removed (demo)')
  }

  function setProductStatus(id, status) {
    setProducts((list) =>
      list.map((p) => (p.id === id ? { ...p, status } : p)),
    )
    flash('Product status updated')
  }

  function removeProduct(id) {
    setProducts((list) => list.filter((p) => p.id !== id))
    flash('Product removed (demo)')
  }

  function updateForm(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleAddProduct(e) {
    e.preventDefault()
    const price = Number(form.price)
    const stock = Number(form.stock)
    if (!form.name.trim() || !form.sku.trim() || Number.isNaN(price)) {
      flash('Name, SKU, and price are required')
      return
    }
    const item = {
      id: `pr-local-${Date.now()}`,
      name: form.name.trim(),
      sku: form.sku.trim().toUpperCase(),
      category: form.category,
      price,
      stock: Number.isNaN(stock) ? 0 : stock,
      status: form.status,
    }
    setProducts((list) => [item, ...(list ?? [])])
    setForm(emptyProduct)
    setTab('products')
    flash('Product added (demo)')
  }

  if (error) {
    return (
      <div className="admin-page">
        <p className="text-sky-700">{error}</p>
      </div>
    )
  }

  if (loading || !data || users === null || products === null) {
    return (
      <div className="admin-page">
        <SoftLoader label="Loading manage console…" />
      </div>
    )
  }

  const categories = data.products.categories ?? [
    'Footwear',
    'Bags',
    'Apparel',
    'Accessories',
  ]

  return (
    <div className="admin-page gap-3">
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="m-0 text-base font-semibold text-slate-900 sm:text-lg">
            Manage
          </h2>
          <p className="m-0 text-xs text-slate-500 sm:text-sm">
            Users, products, and catalog entry in one place
          </p>
        </div>
        {toast && (
          <p className="m-0 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            {toast}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex shrink-0 gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition sm:px-4 ${
              tab === t.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <t.icon className="h-4 w-4" strokeWidth={1.75} />
            <span className="hidden min-[380px]:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Manage users */}
      {tab === 'users' && (
        <div className="flex flex-col gap-3">
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="m-0 text-sm text-slate-500">
              {filteredUsers.length} users
            </p>
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                value={userQ}
                onChange={(e) => setUserQ(e.target.value)}
                placeholder="Search users…"
                className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none sm:w-48"
              />
            </div>
          </div>
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
            <TableScroll>
              <table className="min-w-[48rem] text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500">
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      User
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Role
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Orders
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Spent
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        <p className="m-0 font-medium text-slate-900">
                          {u.name}
                        </p>
                        <p className="m-0 text-xs text-slate-500">{u.email}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {u.role}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                            userStatusStyle[u.status] ??
                            'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {u.orders}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-medium">
                        ${u.spent.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-1">
                          {u.status === 'suspended' ? (
                            <button
                              type="button"
                              title="Activate"
                              onClick={() => setUserStatus(u.id, 'active')}
                              className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              title="Suspend"
                              onClick={() => setUserStatus(u.id, 'suspended')}
                              className="rounded-lg p-1.5 text-amber-600 hover:bg-amber-50"
                            >
                              <Ban className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            title="Remove"
                            onClick={() => removeUser(u.id)}
                            className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
          </div>
        </div>
      )}

      {/* Manage products */}
      {tab === 'products' && (
        <div className="flex flex-col gap-3">
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="m-0 text-sm text-slate-500">
              {filteredProducts.length} products
            </p>
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 sm:flex-initial">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                  value={productQ}
                  onChange={(e) => setProductQ(e.target.value)}
                  placeholder="Search products…"
                  className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none sm:w-48"
                />
              </div>
              <button
                type="button"
                onClick={() => setTab('add')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-sky-500"
              >
                <PlusCircle className="h-4 w-4" />
                Add product
              </button>
            </div>
          </div>
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
            <TableScroll>
              <table className="min-w-[48rem] text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500">
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Product
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      SKU
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Category
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Price
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Stock
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                        {p.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-500">
                        {p.sku}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {p.category}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">
                        ${p.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {p.stock}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                            productStatusStyle[p.status] ??
                            'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {p.status.replaceAll('_', ' ')}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            title="Mark active"
                            onClick={() => setProductStatus(p.id, 'active')}
                            className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="Archive draft"
                            onClick={() => setProductStatus(p.id, 'draft')}
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="Edit (demo)"
                            onClick={() => {
                              setForm({
                                name: p.name,
                                sku: p.sku,
                                category: p.category,
                                price: String(p.price),
                                stock: String(p.stock),
                                status: p.status,
                              })
                              setTab('add')
                              flash('Loaded into add form (demo edit)')
                            }}
                            className="rounded-lg p-1.5 text-sky-600 hover:bg-sky-50"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="Delete"
                            onClick={() => removeProduct(p.id)}
                            className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
          </div>
        </div>
      )}

      {/* Add product */}
      {tab === 'add' && (
        <div className="overflow-visible">
          <form
            onSubmit={handleAddProduct}
            className="mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <div>
              <h3 className="m-0 text-base font-semibold text-slate-900">
                Add product
              </h3>
              <p className="m-0 mt-1 text-sm text-slate-500">
                Demo form — saves into this session’s product list only.
              </p>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              Product name
              <input
                required
                value={form.name}
                onChange={(e) => updateForm('name', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-sky-400"
                placeholder="e.g. Cloud Runner Sneakers"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                SKU
                <input
                  required
                  value={form.sku}
                  onChange={(e) => updateForm('sku', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-sky-400"
                  placeholder="SHP-XX-000"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Category
                <select
                  value={form.category}
                  onChange={(e) => updateForm('category', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-sky-400"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-sm font-medium text-slate-700">
                Price ($)
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => updateForm('price', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-sky-400"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Stock
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => updateForm('stock', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-sky-400"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Status
                <select
                  value={form.status}
                  onChange={(e) => updateForm('status', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-sky-400"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="out_of_stock">Out of stock</option>
                </select>
              </label>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-500"
              >
                <PlusCircle className="h-4 w-4" />
                Save product
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(emptyProduct)
                  setTab('products')
                }}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
