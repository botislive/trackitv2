import { useState } from "react"
import { addnewExpenseAtom, expensesAtom,filtermodeAtom } from "../atoms"
import { useAtom } from "jotai"
import ShowExpenses from "./ShowExpenses"

function Input() {
  const [category, setCategory] = useState("lifestyle")
  const [amount, setAmount] = useState("")

  const [, addNewExpense] = useAtom(addnewExpenseAtom)
  const [expenses] = useAtom(expensesAtom)
  const [,setfiltermode]=useAtom(filtermodeAtom)


  const handleButton = () => {
    if (!amount) return
    addNewExpense({ amount: Number(amount), category })
    setAmount("")
  }

  return (
    <div>
      <h1>Enter your Expenses</h1>

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        type="number"
      />

      <div className="category-container">
        <label>Choose Category:</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="tech">Technology</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="finance">Finance</option>
          <option value="education">Education</option>
        </select>
      </div><br />

      <button onClick={handleButton}>
        Add Expense
      </button><br /><br />
       {expenses.length > 0 && <div>
                    <div>
                      <button onClick={()=>setfiltermode("all")}>All</button>
                      <button onClick={()=>setfiltermode("pending")}>Pending</button>
                      <button onClick={()=>setfiltermode("paid")}>Paid</button>
                      <button onClick={()=>setfiltermode("tech")}>Technology</button>
                      <button onClick={()=>setfiltermode("lifestyle")}>Lifestyle</button>
                      <button onClick={()=>setfiltermode("finance")}>Finance</button>
                      <button onClick={()=>setfiltermode("education")}>Education</button>
                    </div>
                               </div>}

      {expenses.length > 0 && <ShowExpenses />}
    </div>
  )
}

export default Input