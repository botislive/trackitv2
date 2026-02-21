import { useState } from 'react'
import { useAtom } from 'jotai'
import {
    sumofExpensesAtom, sumofPendingExpensesAtom,
    expensesbyyearAtom, expensesbyyearmonthAtom, expensesbyyearmonthdayAtom,
    filterbyyearAtom, filterbyyearmonthAtom, filterbyyearmonthdayAtom
} from '../atoms'
import { Calendar, ChevronDown, ChevronUp, BarChart2 } from 'lucide-react'

/* ── Shared styles ── */
const panelStyle = {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12,
    overflow: 'hidden',
}
const panelHeaderStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 16px', cursor: 'pointer', userSelect: 'none', transition: 'background 0.2s',
}
const resultRowStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
}

/* ── Sub: Year Filter ────────────────────────────────────────── */
function YearFilter() {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i)
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [, filterByYear] = useAtom(filterbyyearAtom)
    const [yearResults] = useAtom(expensesbyyearAtom)
    const [applied, setApplied] = useState(false)

    const apply = () => { filterByYear(selectedYear); setApplied(true) }

    const total = yearResults ? yearResults.reduce((a, e) => a + e.amount, 0) : 0

    return (
        <div>
            {/* Controls */}
            <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <label className="font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Year</label>
                <div style={{ display: 'flex', gap: 8 }}>
                    <select className="select-field" value={selectedYear} onChange={e => { setSelectedYear(parseInt(e.target.value)); setApplied(false) }}>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <button className="btn-primary" style={{ flexShrink: 0, padding: '0 20px', fontSize: 12 }} onClick={apply}>Filter</button>
                </div>
            </div>
            {/* Results */}
            {applied && yearResults && yearResults.length > 0 && (
                <div>
                    <div style={{ padding: '8px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{yearResults.length} RECORDS · {selectedYear}</span>
                        <span className="font-mono gradient-text" style={{ fontSize: 15, fontWeight: 700 }}>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    {yearResults.map(e => (
                        <div key={e.id} style={resultRowStyle}>
                            <span className={`badge badge-${e.category}`}>{e.category}</span>
                            <span className="font-mono" style={{ fontSize: 13, color: 'var(--fg)' }}>₹{e.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                    ))}
                </div>
            )}
            {applied && yearResults && yearResults.length === 0 && (
                <p className="font-body" style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: 13 }}>No expenses found for {selectedYear}.</p>
            )}
        </div>
    )
}

/* ── Sub: Month+Year Filter ──────────────────────────────────── */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function MonthYearFilter() {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i)
    const [date, setDate] = useState({ year: currentYear, month: currentMonth })
    const [, filterByYearMonth] = useAtom(filterbyyearmonthAtom)
    const [monthResults] = useAtom(expensesbyyearmonthAtom)
    const [applied, setApplied] = useState(false)

    const apply = () => { filterByYearMonth(date); setApplied(true) }
    const total = monthResults ? monthResults.reduce((a, e) => a + e.amount, 0) : 0

    return (
        <div>
            <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <div style={{ flex: 1 }}>
                        <label className="font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Month</label>
                        <select className="select-field" value={date.month} name="month" onChange={e => { setDate(p => ({ ...p, month: parseInt(e.target.value) })); setApplied(false) }}>
                            {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className="font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Year</label>
                        <select className="select-field" value={date.year} name="year" onChange={e => { setDate(p => ({ ...p, year: parseInt(e.target.value) })); setApplied(false) }}>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                </div>
                <button className="btn-primary" style={{ width: '100%', fontSize: 12 }} onClick={apply}>Apply Filter</button>
            </div>
            {applied && monthResults && monthResults.length > 0 && (
                <div>
                    <div style={{ padding: '8px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{monthResults.length} RECORDS · {MONTHS[date.month]} {date.year}</span>
                        <span className="font-mono gradient-text" style={{ fontSize: 15, fontWeight: 700 }}>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    {monthResults.map(e => (
                        <div key={e.id} style={resultRowStyle}>
                            <span className={`badge badge-${e.category}`}>{e.category}</span>
                            <span className="font-mono" style={{ fontSize: 13, color: 'var(--fg)' }}>₹{e.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                    ))}
                </div>
            )}
            {applied && monthResults && monthResults.length === 0 && (
                <p className="font-body" style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: 13 }}>No expenses for {MONTHS[date.month]} {date.year}.</p>
            )}
        </div>
    )
}

/* ── Sub: Day Filter ─────────────────────────────────────────── */
function DayFilter() {
    const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate()
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const currentDay = new Date().getDate()
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

    const [date, setDate] = useState({ year: currentYear, month: currentMonth, day: currentDay })
    const [, filterByDay] = useAtom(filterbyyearmonthdayAtom)
    const [dayResults] = useAtom(expensesbyyearmonthdayAtom)
    const [applied, setApplied] = useState(false)

    const maxDays = getDaysInMonth(date.year, date.month)
    const days = Array.from({ length: maxDays }, (_, i) => i + 1)

    const handleChange = (field, val) => {
        const next = { ...date, [field]: parseInt(val) }
        if (next.day > getDaysInMonth(next.year, next.month)) next.day = getDaysInMonth(next.year, next.month)
        setDate(next)
        setApplied(false)
    }
    const apply = () => { filterByDay(date); setApplied(true) }
    const total = dayResults ? dayResults.reduce((a, e) => a + e.amount, 0) : 0

    return (
        <div>
            <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    {[
                        { label: 'Year', field: 'year', options: years.map(y => ({ val: y, label: y })) },
                        { label: 'Month', field: 'month', options: MONTHS.map((m, i) => ({ val: i, label: m.slice(0, 3) })) },
                        { label: 'Day', field: 'day', options: days.map(d => ({ val: d, label: d })) },
                    ].map(({ label, field, options }) => (
                        <div key={field} style={{ flex: 1 }}>
                            <label className="font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{label}</label>
                            <select className="select-field" value={date[field]} onChange={e => handleChange(field, e.target.value)}>
                                {options.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
                            </select>
                        </div>
                    ))}
                </div>
                <button className="btn-primary" style={{ width: '100%', fontSize: 12 }} onClick={apply}>Apply Filter</button>
            </div>
            {applied && dayResults && dayResults.length > 0 && (
                <div>
                    <div style={{ padding: '8px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{dayResults.length} RECORDS · {MONTHS[date.month].slice(0, 3)} {date.day}, {date.year}</span>
                        <span className="font-mono gradient-text" style={{ fontSize: 15, fontWeight: 700 }}>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    {dayResults.map(e => (
                        <div key={e.id} style={resultRowStyle}>
                            <span className={`badge badge-${e.category}`}>{e.category}</span>
                            <span className="font-mono" style={{ fontSize: 13, color: 'var(--fg)' }}>₹{e.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                    ))}
                </div>
            )}
            {applied && dayResults && dayResults.length === 0 && (
                <p className="font-body" style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: 13 }}>No expenses for this day.</p>
            )}
        </div>
    )
}

/* ── Accordion Panel ─────────────────────────────────────────── */
function AccordionSection({ title, subtitle, icon: Icon, children }) {
    const [open, setOpen] = useState(false)
    return (
        <div style={panelStyle}>
            <div
                style={{ ...panelHeaderStyle, background: open ? 'rgba(247,147,26,0.04)' : 'transparent' }}
                onClick={() => setOpen(o => !o)}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="icon-container icon-container-orange" style={{ width: 32, height: 32, borderRadius: 8 }}>
                        <Icon size={14} />
                    </div>
                    <div>
                        <p className="font-heading" style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.2 }}>{title}</p>
                        <p className="font-body" style={{ fontSize: 11, color: 'var(--muted)' }}>{subtitle}</p>
                    </div>
                </div>
                {open ? <ChevronUp size={16} color="var(--muted)" /> : <ChevronDown size={16} color="var(--muted)" />}
            </div>
            {open && (
                <div className="animate-slide-in">
                    {children}
                </div>
            )}
        </div>
    )
}

/* ── Summary Panel (main export) ─────────────────────────────── */
export default function SummaryPanel() {
    const [totalSpent] = useAtom(sumofExpensesAtom)
    const [totalPending] = useAtom(sumofPendingExpensesAtom)

    return (
        <div>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <BarChart2 size={15} color="var(--muted)" />
                <h2 className="font-heading" style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.04em' }}>
                    DATE FILTERS & BREAKDOWN
                </h2>
            </div>

            {/* Totals strip */}
            <div className="totals-strip">
                {[
                    { label: 'Total Spent', value: totalSpent, color: '#F7931A' },
                    { label: 'Pending', value: totalPending, color: '#fb923c' },
                    { label: 'Cleared', value: totalSpent - totalPending, color: '#4ade80' },
                ].map((item, i) => (
                    <div key={i} className="totals-strip-item">
                        <p className="font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</p>
                        <p className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: item.color }}>
                            ₹{Number(item.value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                ))}
            </div>

            {/* Accordion sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <AccordionSection title="Filter by Year" subtitle="Annual expense breakdown" icon={Calendar}><YearFilter /></AccordionSection>
                <AccordionSection title="Filter by Month & Year" subtitle="Monthly expense breakdown" icon={Calendar}><MonthYearFilter /></AccordionSection>
                <AccordionSection title="Filter by Day" subtitle="Daily expense breakdown" icon={Calendar}><DayFilter /></AccordionSection>
            </div>
        </div>
    )
}
