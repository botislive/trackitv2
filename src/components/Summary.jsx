import { useAtom } from "jotai"
import { sumofExpensesAtom,expensesbyyearmonthAtom,sumofPendingExpensesAtom,filtermodeAtom,expensesbyyearmonthdayAtom,expensesbyyearAtom } from "../atoms"
import Calendar from "./Calendar"
import DetailedSummary from "./DetailedSummary"
import YearDropdown from "./YearDropdown"
import YearSummary from "./YearSummary"
import DateSelector from "./YearMonthDropdown"
import YearMonthSummary from "./YearMonthSummary"

function Summary() {
    const[sumofExpenses]=useAtom(sumofExpensesAtom)
    const[sumofPendingExpenses]=useAtom(sumofPendingExpensesAtom)
    const[filtermode]=useAtom(filtermodeAtom)
    const[expensesbyyearmonthday]=useAtom(expensesbyyearmonthdayAtom)
    const[expensesbyyear]=useAtom(expensesbyyearAtom)
    const[expensesbyyearmonth]=useAtom(expensesbyyearmonthAtom)
    console.log(filtermode)

  return (
    <div>
           {filtermode==="all"  &&
           <div>
        <div>
            Summary is
        </div>
            <p>Total Expenses: {sumofExpenses}</p>
            <p>Total Pending Expenses: {sumofPendingExpenses}</p>


            <div>
              <YearDropdown/>
            </div>

                {expensesbyyear && <div>
                    <YearSummary/>
                </div>
                }


            <div>
                <DateSelector/>
            </div>
             

                {expensesbyyearmonth && <div>
                    <YearMonthSummary/>
                </div>
                }


            <div>
                <Calendar/>
            </div>

            {expensesbyyearmonthday && <div>
                <DetailedSummary/>
            </div>}

        </div>
          
        }
    </div>
  )
}

export default Summary