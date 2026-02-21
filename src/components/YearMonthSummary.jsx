import { useAtom } from "jotai"
import { expensesbyyearmonthAtom } from "../atoms"

function YearMonthSummary() {
    const[expensesbyyearmonth]=useAtom(expensesbyyearmonthAtom)
    console.log(expensesbyyearmonth)
  return (
    <div>
        <div>
            <h1>Year Month Summary is:</h1>
        </div>
           <div>
            {expensesbyyearmonth.map((expense) => (
                <div key={expense.id}>
                    <p>{expense.amount}</p>
                    <p>{expense.category}</p>
                </div>
            ))}
           </div>
    </div>
  )
}

export default YearMonthSummary