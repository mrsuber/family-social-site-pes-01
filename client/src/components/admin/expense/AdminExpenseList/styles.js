import{ makeStyles} from '@material-ui/core/styles'
import {red,green} from '@material-ui/core/colors'

export default makeStyle((theme) =>({
  avatarIncome:{
    color:"#fff",
    backgroundColor:green[500],
  },
  avatarExpense:{
    color:theme.palette.getcontrastText(red[500]),
    backgroundColor:red[500],
  },
  list:{
    maxHeight:'150px',
    overflow:'auto'
  },
}))
