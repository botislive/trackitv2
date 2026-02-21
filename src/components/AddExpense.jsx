import { useState } from 'react'
import { useAtom } from 'jotai'
import { addnewExpenseAtom } from '../atoms'
import { Plus, IndianRupee, Tag, Zap, Code, Heart, TrendingUp, BookOpen } from 'lucide-react'

const CATEGORIES = [
    { value: 'tech', label: 'Tech', icon: Code, color: '#818cf8' },
    { value: 'lifestyle', label: 'Lifestyle', icon: Heart, color: '#f472b6' },
    { value: 'finance', label: 'Finance', icon: TrendingUp, color: '#4ade80' },
    { value: 'education', label: 'Education', icon: BookOpen, color: '#c084fc' },
]

export default function AddExpense() {
    const [category, setCategory] = useState('lifestyle')
    const [amount, setAmount] = useState('')
    const [, addNewExpense] = useAtom(addnewExpenseAtom)
    const [shake, setShake] = useState(false)

    const handleAdd = () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setShake(true)
            setTimeout(() => setShake(false), 400)
            return
        }
        addNewExpense({ amount: Number(amount), category })
        setAmount('')
    }

    const handleKey = (e) => { if (e.key === 'Enter') handleAdd() }

    const selectedCat = CATEGORIES.find(c => c.value === category)

    return (
        <div className="card-glass" style={{ padding: 24 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div className="icon-container icon-container-orange">
                    <Plus size={18} />
                </div>
                <div>
                    <h2 className="font-heading" style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', lineHeight: 1 }}>Add Expense</h2>
                    <p className="font-body" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Log a new transaction</p>
                </div>
            </div>

            {/* Amount Input */}
            <div style={{ marginBottom: 20 }}>
                <label className="font-mono" style={{ display: 'block', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Amount
                </label>
                <div style={{ position: 'relative' }}>
                    <IndianRupee size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', pointerEvents: 'none' }} />
                    <input
                        className="input-field"
                        style={{
                            paddingLeft: 36,
                            animation: shake ? 'shake 0.4s ease' : 'none',
                        }}
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="0.01"
                    />
                </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: 24 }}>
                <label className="font-mono" style={{ display: 'block', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                    Category
                </label>
                <div className="category-grid">
                    {CATEGORIES.map(cat => {
                        const CatIcon = cat.icon
                        const isSelected = category === cat.value
                        return (
                            <button
                                key={cat.value}
                                onClick={() => setCategory(cat.value)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '10px 12px',
                                    background: isSelected ? `${cat.color}12` : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${isSelected ? cat.color + '60' : 'rgba(255,255,255,0.08)'}`,
                                    borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s ease',
                                    color: isSelected ? cat.color : 'var(--muted)',
                                    boxShadow: isSelected ? `0 0 14px -4px ${cat.color}50` : 'none'
                                }}
                            >
                                <CatIcon size={14} />
                                <span className="font-body" style={{ fontSize: 12, fontWeight: 500 }}>{cat.label}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Submit */}
            <button
                className="btn-primary"
                style={{ width: '100%', fontSize: 13, gap: 8 }}
                onClick={handleAdd}
            >
                <Zap size={15} />
                Add Expense
            </button>

            {/* Selected category info */}
            {selectedCat && (
                <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                    <span className="font-mono" style={{ fontSize: 10, color: 'rgba(148,163,184,0.5)', letterSpacing: '0.06em' }}>
                        Logging to
                    </span>
                    <span className="font-mono" style={{ fontSize: 10, color: selectedCat.color, letterSpacing: '0.06em' }}>
                        {selectedCat.label.toUpperCase()}
                    </span>
                </div>
            )}

            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
        }
      `}</style>
        </div>
    )
}
