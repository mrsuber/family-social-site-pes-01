import React from 'react'
import {AdminExpensForm,AdminExpenseList} from '../../../../components'
import {Card, CardHeader,CardContent,Typography,Grid,Divider} from '@material-ui/core'
import useStyles from './styles'


const AdminExpenseMain = () => {
  const classes = useStyles()
  return (
    <Card className={classes.root} style={{margin:"10px 0",width:"100%"}}>
      <CardHeader title="Expense Tracker" subheader="Powered by Speechly"/>
      <CardContent>
        <Typography align="center" variant="h5">Total Balance $100 </Typography>
        <Typography  variant="subtitle1" style={{lineHeight:'1.5em', marginTop:'20px'}}>
        {/* info card...*/}
          Try saying : Add Income for $100 in Category Salary fro monday ...
        </Typography>
        <Divider />
        <AdminExpensForm/>
      </CardContent>
      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AdminExpenseList />
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  )
}

export default AdminExpenseMain
