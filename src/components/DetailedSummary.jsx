import { useAtom } from "jotai"
import {expensesbyyearmonthdayAtom } from "../atoms"

function DetailedSummary() {

    const[expensesbyyearmonthday]=useAtom(expensesbyyearmonthdayAtom)


  return (
    <div>
        
        <div>
            <h1>Detailed Summary is:</h1>
        </div>

        <div>
            {expensesbyyearmonthday.map((expense) => (
                <div key={expense.id}>
                    <p>{expense.amount}</p>
                    <p>{expense.category}</p>
                </div>
            ))}
        </div>

    </div>
  )
}

export default DetailedSummary