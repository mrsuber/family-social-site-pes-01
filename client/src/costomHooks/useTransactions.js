import {useContext} from 'react'
import {AdminExpenseTrackerContext} from '../context/context'
import {incomeCategories,expenseCategories,resetCategories} from '../constants/expenseCategories'
// [
//   {id:1,type:'Income', amount:50,category:'Salary'},
//   {id:2,type:'Expense', amount:100,category:'Pets'},
//   {id:3,type:'Income', amount:50,category:'Salary'},
//   {id:4,type:'Income', amount:50,category:'Business'},
// ]
const useTransactions = (title) =>{
  resetCategories();
  const {transactions} = useContext(AdminExpenseTrackerContext)
  const transactionPerType = transactions.filter((t) => t.type === title)
  const total = transactionPerType.reduce((acc, curVal)=>acc += curVal.amount,0);
  const categories = title === "Income" ? incomeCategories : expenseCategories

  console.log({transactionPerType,total,categories})

  transactionPerType.forEach((t)=>{
    const category = categories.find((c) => c.type === t.category)
    if(category) category.amount += t.amount;
  })

  const filteredCategories = categories.filter((c)=>c.amount > 0)

  const chartData = {
    datasets:[{
      data:filteredCategories.map((c) => c.amount),
      backgroundColor:filteredCategories.map((c) => c.color)
    }],
    labels:filteredCategories.map((c) => c.type)
  }

  return {  total, chartData }
}


export default useTransactions;
