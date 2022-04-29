import React from 'react'
import {List as MUIList,ListItem,ListItemAvatar,ListItemText,Avatar,ListItemSecondaryAction,IconButton,Slide} from '@material-ui/core'
import {Delete,MoneyOff} from '@material-ui/icons'
import useStyles from './styles'


const AdminExpenseList = () => {
  const classes = useStyles()
  const transactions = [
    {id:1,type:"Income",category:"Salary"}
  ]
  return (
    <MUIList dense={false} className={classes.list}>
        {transactions.map((transaction)=>(
          <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
              <ListItem>
                  <ListItemAvatar>
                      <Avatar className={transaction.type === 'Income'? classes.avatarIncome : classes.avatarExpense}>
                        <MoneyOff />
                      </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={transaction.category}/>
              </ListItem>
          </Slide>
        ))}
    </MUIList>
  )
}

export default AdminExpenseList
