import { useAtom } from 'jotai'
import { expensesAtom, sumofExpensesAtom, sumofPendingExpensesAtom, themeAtom } from '../atoms'
import AddExpense from './AddExpense'
import ExpenseList from './ExpenseList'
import SummaryPanel from './SummaryPanel'
import { Wallet, TrendingDown, Clock, Activity, Sun, Moon } from 'lucide-react'

function StatCard({ icon: Icon, label, value, glow }) {
    return (
        <div className="stat-card" style={{ border: `1px solid ${glow}22`, position: 'relative', overflow: 'hidden' }}>
            {/* Ambient glow blob */}
            <div style={{
                position: 'absolute', inset: 0, borderRadius: 16, pointerEvents: 'none',
                background: `radial-gradient(circle at 90% 10%, ${glow}10, transparent 60%)`,
            }} />

            {/* Body: column on desktop → horizontal row on mobile */}
            <div className="stat-card-body" style={{ position: 'relative' }}>

                {/* Icon + Label — left side */}
                <div className="stat-label-row" style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                    <div style={{
                        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                        background: `${glow}18`, border: `1px solid ${glow}35`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: glow,
                    }}>
                        <Icon size={14} />
                    </div>
                    <span className="font-body" style={{
                        fontSize: 11, fontWeight: 600, color: 'var(--muted)',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>
                        {label}
                    </span>
                </div>

                {/* Amount — right side on mobile, below on desktop */}
                <p className="font-mono" style={{
                    fontSize: 22, fontWeight: 700, color: glow,
                    lineHeight: 1, letterSpacing: '-0.02em', flexShrink: 0,
                }}>
                    ₹{Number(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>

            </div>
        </div>
    )
}

export default function Dashboard() {
    const [expenses] = useAtom(expensesAtom)
    const [totalSpent] = useAtom(sumofExpensesAtom)
    const [totalPending] = useAtom(sumofPendingExpensesAtom)
    const [theme, setTheme] = useAtom(themeAtom)
    const totalPaid = totalSpent - totalPending

    const isDark = theme === 'dark'
    const toggleTheme = () => setTheme(isDark ? 'light' : 'dark')

    return (
        <div data-theme={theme} style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden', transition: 'background 0.3s ease, color 0.3s ease' }}>

            {/* ── Ambient background ── */}
            <div className="bg-grid-pattern" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
            <div style={{
                position: 'fixed', top: '-15%', left: '-10%', width: '45vw', height: '45vw',
                background: `radial-gradient(circle, var(--ambient-1) 0%, transparent 70%)`,
                filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0
            }} />
            <div style={{
                position: 'fixed', top: '40%', right: '-5%', width: '35vw', height: '35vw',
                background: `radial-gradient(circle, var(--ambient-2) 0%, transparent 70%)`,
                filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
            }} />

            {/* ── Header ── */}
            <header style={{
                borderBottom: '1px solid var(--border)',
                background: 'var(--header-bg)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                position: 'sticky', top: 0, zIndex: 100,
                transition: 'background 0.3s ease',
            }}>
                <div className="header-inner">
                    {/* ── Brand lockup ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {/* Custom SVG mark */}
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <defs>
                                <linearGradient id="brandGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#EA580C" />
                                    <stop offset="100%" stopColor="#F7931A" />
                                </linearGradient>
                            </defs>
                            {/* Rounded square background */}
                            <rect width="34" height="34" rx="9" fill="url(#brandGrad)" />
                            {/* Horizontal crossbar of T */}
                            <rect x="7" y="10" width="20" height="2.8" rx="1.4" fill="white" fillOpacity="0.95" />
                            {/* Vertical stem of T */}
                            <rect x="15.1" y="12.8" width="3.8" height="9" rx="1.4" fill="white" fillOpacity="0.95" />
                            {/* Upward tick — conveys growth/tracking */}
                            <polyline points="12,26 16,21 20,23.5 25,17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.85" />
                        </svg>

                        {/* Wordmark */}
                        <div style={{ lineHeight: 1 }}>
                            <p className="font-heading" style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
                                <span style={{ color: 'var(--fg)' }}>Track</span
                                ><span style={{
                                    background: 'linear-gradient(to right, #F7931A, #FFD600)',
                                    WebkitBackgroundClip: 'text', backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent', color: 'transparent'
                                }}>It</span>
                            </p>
                            <p className="font-mono" style={{ fontSize: 8.5, color: 'var(--muted)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 3, opacity: 0.7 }}>
                                Personal Finance
                            </p>
                        </div>
                    </div>

                    {/* Right: live · count · theme toggle */}
                    <div className="header-right">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="live-dot" />
                            <span className="font-mono header-live-label" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>LIVE</span>
                        </div>
                        <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Activity size={13} color="var(--muted)" />
                            <span className="font-mono header-badge" style={{ fontSize: 11, color: 'var(--muted)' }}>{expenses.length} expense{expenses.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
                        {/* Theme toggle button */}
                        <button
                            onClick={toggleTheme}
                            title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border)',
                                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                color: isDark ? '#FFD600' : '#F7931A',
                                cursor: 'pointer', transition: 'all 0.25s ease', flexShrink: 0,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'var(--primary)'
                                e.currentTarget.style.boxShadow = '0 0 12px -3px rgba(247,147,26,0.4)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'var(--border)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            {isDark ? <Sun size={15} /> : <Moon size={15} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Main content ── */}
            <main className="dashboard-main">

                {/* ── Stats Row ── */}
                <div className="stats-row">
                    <StatCard icon={TrendingDown} label="Total Spent" value={totalSpent} color="#F7931A" glow="#F7931A" />
                    <StatCard icon={Clock} label="Pending" value={totalPending} color="#FB923C" glow="#EA580C" />
                    <StatCard icon={Wallet} label="Paid" value={totalPaid} color="#4ADE80" glow="#22C55E" />
                </div>

                {/* ── Two-column layout ── */}
                <div className="dashboard-grid">
                    {/* Left: Add Expense */}
                    <div className="sidebar-sticky">
                        <AddExpense />
                    </div>

                    {/* Right: Expense List + Summary */}
                    <div className="content-col">
                        <ExpenseList />
                        {expenses.length > 0 && <SummaryPanel />}
                    </div>
                </div>
            </main>
        </div>
    )
}
