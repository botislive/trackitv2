import { useAtom } from "jotai"
import { expensesbyyearAtom } from "../atoms"

function YearSummary() {
    const[expensesbyyear]=useAtom(expensesbyyearAtom)
    console.log(expensesbyyear)

    return (
    <div>
        <div>
            <h1>Year Summary is:</h1>
        </div>

        <div>
            {expensesbyyear.map((expense) => (
                <div key={expense.id}>
                    <p>{expense.amount}</p>
                    <p>{expense.category}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default YearSummary