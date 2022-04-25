import React from 'react'
import {TextField, Typography,Grid,Button,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core'

import useStyles from './styles'


const AdminExpenseForm = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
          <Typography align="center" variant="subtitle2" gutterBottom></Typography>
      </Grid>

    </Grid>
  )
}

export default AdminExpenseForm
