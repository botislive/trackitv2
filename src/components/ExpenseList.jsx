import { useAtom } from 'jotai'
import { filteredexpensesAtom, expensesAtom, deleteExpenseAtom, changePendingAtom, filtermodeAtom } from '../atoms'
import { Trash2, CheckCircle, Clock, Code, Heart, TrendingUp, BookOpen, Filter, LayoutList, CalendarDays } from 'lucide-react'

const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'paid', label: 'Paid' },
    { key: 'tech', label: 'Tech' },
    { key: 'lifestyle', label: 'Lifestyle' },
    { key: 'finance', label: 'Finance' },
    { key: 'education', label: 'Education' },
]

const CAT_META = {
    tech: { icon: Code, color: '#818cf8', badge: 'badge-tech' },
    lifestyle: { icon: Heart, color: '#f472b6', badge: 'badge-lifestyle' },
    finance: { icon: TrendingUp, color: '#4ade80', badge: 'badge-finance' },
    education: { icon: BookOpen, color: '#c084fc', badge: 'badge-education' },
}

function ExpenseRow({ expense, onDelete, onToggle }) {
    const meta = CAT_META[expense.category] || CAT_META.tech
    const CatIcon = meta.icon
    const date = new Date(expense.date)
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleDateString('en-IN', { month: 'short' })
    const year = date.getFullYear()
    const time = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    const dateStr = `${day} ${month} ${year} · ${time}`

    return (
        <div
            className="card animate-slide-in"
            style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'default' }}
        >
            {/* ── Left: Category icon ── */}
            <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: `${meta.color}15`, border: `1px solid ${meta.color}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: meta.color
            }}>
                <CatIcon size={15} />
            </div>

            {/* ── Centre: Tags + Date ── */}
            <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                {/* Badge row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap', marginBottom: 5 }}>
                    <span className={`badge ${meta.badge}`} style={{ flexShrink: 0 }}>{expense.category}</span>
                    {expense.pending
                        ? <span className="badge badge-pending" style={{ gap: 4, flexShrink: 0 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fb923c', display: 'inline-block' }} />
                            pending
                        </span>
                        : <span className="badge badge-paid" style={{ gap: 4, flexShrink: 0 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                            paid
                        </span>
                    }
                </div>
                {/* Date row — never wraps */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CalendarDays size={9} style={{ color: 'rgba(148,163,184,0.4)', flexShrink: 0 }} />
                    <span
                        className="font-mono"
                        style={{
                            fontSize: 10, color: 'rgba(148,163,184,0.5)',
                            letterSpacing: '0.02em', whiteSpace: 'nowrap',
                            overflow: 'hidden', textOverflow: 'ellipsis',
                        }}
                    >
                        {dateStr}
                    </span>
                </div>
            </div>

            {/* ── Right: Amount + Actions ── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                {/* Amount */}
                <p className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap' }}>
                    ₹{Number(expense.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
                {/* Action buttons */}
                <div style={{ display: 'flex', gap: 5 }}>
                    <button
                        className="btn-ghost"
                        title={expense.pending ? 'Mark as Paid' : 'Mark as Pending'}
                        onClick={() => onToggle(expense.id)}
                        style={{ padding: '4px 8px', borderRadius: 7, color: expense.pending ? '#fb923c' : '#4ade80' }}
                    >
                        {expense.pending ? <Clock size={13} /> : <CheckCircle size={13} />}
                    </button>
                    <button
                        className="btn-danger"
                        title="Delete"
                        onClick={() => onDelete(expense.id)}
                        style={{ padding: '4px 8px', borderRadius: 7 }}
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function ExpenseList() {
    const [expenses] = useAtom(expensesAtom)
    const [filtered] = useAtom(filteredexpensesAtom)
    const [, deleteExpense] = useAtom(deleteExpenseAtom)
    const [, changePending] = useAtom(changePendingAtom)
    const [filterMode, setFilterMode] = useAtom(filtermodeAtom)

    if (expenses.length === 0) return null

    return (
        <div>
            {/* Filter Bar */}
            <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Filter size={14} color="var(--muted)" />
                    <span className="font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Filter</span>
                </div>
                <div className="filter-bar">
                    {FILTERS.map(f => (
                        <button
                            key={f.key}
                            className={`btn-outline ${filterMode === f.key ? 'active' : ''}`}
                            onClick={() => setFilterMode(f.key)}
                            style={{ fontSize: 12, padding: '6px 16px' }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <LayoutList size={15} color="var(--muted)" />
                    <h2 className="font-heading" style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.04em' }}>
                        {filtered.length} {filterMode !== 'all' ? filterMode.toUpperCase() + ' ' : ''}EXPENSE{filtered.length !== 1 ? 'S' : ''}
                    </h2>
                </div>
                <span className="font-mono" style={{ fontSize: 11, color: 'rgba(148,163,184,0.4)' }}>
                    {filtered.length}/{expenses.length} shown
                </span>
            </div>

            {/* Empty filtered state */}
            {filtered.length === 0 && (
                <div style={{
                    padding: 40, textAlign: 'center',
                    background: 'rgba(255,255,255,0.02)', borderRadius: 16,
                    border: '1px dashed rgba(255,255,255,0.08)'
                }}>
                    <p className="font-body" style={{ color: 'var(--muted)', fontSize: 14 }}>No expenses match this filter.</p>
                </div>
            )}

            {/* Expense Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.map(expense => (
                    <ExpenseRow
                        key={expense.id}
                        expense={expense}
                        onDelete={deleteExpense}
                        onToggle={changePending}
                    />
                ))}
            </div>
        </div>
    )
}
