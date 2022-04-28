import React from 'react'
import {List as MUIList,ListItem,ListItemAvatar,ListItemText,Avatar,ListItemSecondaryAction,IconButton,Slide} from '@material-ui/core'
import {Delete,MoneyOff} from '@material-ui/icons'
import useStyles from './styles'
const AdminExpenseList = () => {
  const classes = useStyles()
  return (
    <MUIList dense={false} className={classes.list}>

    </MUIList>
  )
}

export default AdminExpenseList
