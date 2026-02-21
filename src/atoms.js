import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";

export const themeAtom = atomWithStorage("trackit-theme", "dark");

export const expensesAtom = atomWithStorage("trackit-expenses", [])

export const filtermodeAtom = atomWithStorage("trackit-filter-mode", "all")

export const addnewExpenseAtom = atom(null, (get, set, { amount, category }) => {
    const newExpense = {
        id: nanoid(),
        amount,
        category,
        pending: true,
        date: new Date(),
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    }
    const currentExpenses = get(expensesAtom)
    set(expensesAtom, [newExpense, ...currentExpenses])

})

export const deleteExpenseAtom = atom(null, (get, set, id) => {
    const currentExpenses = get(expensesAtom)
    set(expensesAtom, currentExpenses.filter((expense) => expense.id !== id))
})


export const filteredexpensesAtom = atom((get) => {
    const filter = get(filtermodeAtom)
    const expenses = get(expensesAtom)
    switch (filter) {
        case "all":
            return expenses
        case "pending":
            return expenses.filter((expense) => expense.pending)
        case "paid":
            return expenses.filter((expense) => !expense.pending)
        case "tech":
            return expenses.filter((expense) => expense.category === "tech")
        case "lifestyle":
            return expenses.filter((expense) => expense.category === "lifestyle")
        case "finance":
            return expenses.filter((expense) => expense.category === "finance")
        case "education":
            return expenses.filter((expense) => expense.category === "education")
        default:
            return expenses

    }
})

export const sumofExpensesAtom = atom((get) => {
    const expenses = get(expensesAtom)
    return expenses.reduce((acc, expense) => acc + expense.amount, 0)
})

export const sumofPendingExpensesAtom = atom((get) => {
    const expenses = get(expensesAtom)
    return expenses.filter((expense) => expense.pending).reduce((acc, expense) => acc + expense.amount, 0)
})


export const changePendingAtom = atom(null, (get, set, id) => {
    const currentExpenses = get(expensesAtom)
    const updatedExpenses = currentExpenses.map((expense) => {
        if (expense.id === id) {
            return { ...expense, pending: !expense.pending }
        }
        return expense
    })
    set(expensesAtom, updatedExpenses)

})

export const expensesbyyearmonthdayAtom = atom(null)
export const expensesbyyearmonthAtom = atom()
export const expensesbyyearAtom = atom()

export const filterbyyearmonthdayAtom = atom(null, (get, set, { year, month, day }) => {
    const expenses = get(expensesAtom)
    const filteredExpenses = expenses.filter((expense) => {
        return expense.year === year && expense.month === month && expense.day === day
    })
    set(expensesbyyearmonthdayAtom, filteredExpenses)
})



export const filterbyyearmonthAtom = atom(null, (get, set, { year, month }) => {
    const expenses = get(expensesAtom);
    const filteredExpenses = expenses.filter((expense) => {
        return expense.year === year && expense.month === month;
    });
    set(expensesbyyearmonthAtom, filteredExpenses);
});


export const filterbyyearAtom = atom(null, (get, set, year) => {
    const expenses = get(expensesAtom);
    const filteredExpenses = expenses.filter((expense) => {
        return expense.year === year;
    });
    set(expensesbyyearAtom, filteredExpenses);
});
