import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { filterbyyearmonthAtom } from '../atoms';

const DateSelector = () => {
  const [, setfilterbyyearmonth] = useAtom(filterbyyearmonthAtom);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [date, setDate] = useState({
    year: currentYear,
    month: currentMonth
  });

  const months = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2026, i))
  );

  const years = Array.from({ length: 21 }, (_, i) => (currentYear - 10) + i);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputGroup}>
        {/* Month Dropdown */}
        <div style={styles.field}>
          <label style={styles.label}>Month</label>
          <select name="month" value={date.month} onChange={handleUpdate} style={styles.select}>
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
        </div>

        {/* Year Dropdown */}
        <div style={styles.field}>
          <label style={styles.label}>Year</label>
          <select name="year" value={date.year} onChange={handleUpdate} style={styles.select}>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        style={styles.button} 
        onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
        onClick={() => setfilterbyyearmonth(date)}
      >
        Apply Filter
      </button>
    </div>
  );
};

// Modern, high-contrast styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
    backgroundColor: '#f9fafb', // Light grey background for contrast
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    width: 'fit-content',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  inputGroup: {
    display: 'flex',
    gap: '12px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#4b5563', // Darker grey for text
    textTransform: 'uppercase',
    letterSpacing: '0.025em'
  },
  select: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#111827', // Near black text
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
    minWidth: '120px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4f46e5', // Brand indigo
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  }
};

export default DateSelector;