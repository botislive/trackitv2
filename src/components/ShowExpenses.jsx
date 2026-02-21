import { useAtom } from "jotai"
import { expensesAtom,deleteExpenseAtom,filteredexpensesAtom,changePendingAtom } from "../atoms"
import Summary from "./Summary"

function ShowExpenses() {

    const[expenses]=useAtom(expensesAtom)
    const[,setdeleteExpense]=useAtom(deleteExpenseAtom)
    const[filteredexpenses]=useAtom(filteredexpensesAtom)
    const[,setchangePending]=useAtom(changePendingAtom)

    console.log(expenses)

  return (
    <div>
        <div>
            <h1>The Expenses are:</h1>
        </div>

        <div>
            {filteredexpenses.map((expense) => (
                <div key={expense.id}>
                    <p>{expense.amount}</p>
                    <p>{expense.category}</p>
                    <button onClick={()=>setdeleteExpense(expense.id)}>Delete Expense</button>
                        {expense.pending?<button onClick={()=>setchangePending(expense.id)}>Mark as Paid</button>:
                        <button onClick={()=>setchangePending(expense.id)}>Mark as Pending</button>}
                </div>
            ))}
        </div>
        <div>
            <Summary/>
        </div>
    </div>
  )
}

export default ShowExpenses