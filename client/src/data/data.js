import {forwardRef} from 'react'
import { AddBox,ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,
Search,ViewColumn} from '@material-ui/icons'


export let columns = [
      {title:"Name",field:"name"},
      {title:"Email",field:"email"},
      {title:"Phone Number",field:"phone", align:"center"},
      {title:"Age",field:"age",emptyValue:()=><em>null</em>},
      {title:"Gender",field:"gender",lookup:{M:"Male",F:"Female"}},
      {title:"City",field:"city"},
      {title:"School",field:"fee", type:"currency",currencySetting:{currencyCode:"IMR"}},
    ]


export let data = [
  {    name:"Mohamad", email:"msiysinyuy@gmail.com", phone:"653255547", age:25, gender:"M", city:"Buea", fee:5000 },
  {    name:"musa", email:"nyuy@gmail.com", phone:"653255547", age:null, gender:"M", city:"Buea", fee:5000 },
  {    name:"bib", email:"msiy@gmail.com", phone:"5446465", age:5, gender:"F", city:"Buea", fee:5000 },
  {    name:"John", email:"hoihs@gmail.com", phone:"364764356", age:26, gender:"M", city:"Buea", fee:5000 },
  {    name:"Haba", email:"kjha@gmail.com", phone:"645646364", age:30, gender:"F", city:"Buea", fee:5000 },
  {    name:"Biitan", email:"iw@gmail.com", phone:"52468864", age:20, gender:"M", city:"Buea", fee:5000 },
]

export const title = "Student Information"

export const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
