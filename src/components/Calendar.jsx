import { useState } from 'react';
import { useAtom } from 'jotai';
import { filterbyyearmonthdayAtom } from '../atoms';

// Calendar is now embedded inside SummaryPanel. This file kept for compatibility.
const Calendar = () => {
  const [, setonDateChange] = useAtom(filterbyyearmonthdayAtom);
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const [date, setDate] = useState({ year: 2026, month: 1, day: 21 });

  const handleChange = (field, value) => {
    const newData = { ...date, [field]: parseInt(value) };
    const maxDays = getDaysInMonth(newData.year, newData.month);
    if (newData.day > maxDays) newData.day = maxDays;
    setDate(newData);
  };

  return null; // Logic now lives in SummaryPanel > DayFilter
};

export default Calendar;