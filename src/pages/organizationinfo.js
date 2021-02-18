// 帅哥信息完善的路由容器组件
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import HeaderSelector from '../components/header-selector/header-selector'
import { updateUser } from '../redux/actions'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
  import Radio from '@material-ui/core/Radio';
  import RadioGroup from '@material-ui/core/RadioGroup';
  import FormControl from '@material-ui/core/FormControl';
  import FormLabel from '@material-ui/core/FormLabel';
  import { Select} from 'antd';
import { Option } from 'rc-select';
import DatePicker from 'react-date-picker';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

const styles=(theme)=>({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})
class OrganizationInfo extends Component {
  constructor () {
    super()
    this.state = {
      header: '',
      sport: [],
      companyName:'',
      detail: ''
    }
  }

  render () {
      const sports=['badminton','football','basketball','running'];
    const {header,type}=this.props
    if (header) {
        //记得改回来!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //   const path =type==='personal'?'/personal':'/organization'
        const path='./story';
      return <Redirect to={path}/>
    }
    return (
      <div>
       
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={this.props.classes.paper }>
        <Typography display="block" component="h1" variant="h5" align='center'>
        organization information refine
        </Typography>
        <HeaderSelector setHandleHeader={this.setHandleHeader}></HeaderSelector>

        <form data-cy="form" className={this.props.classes.form } noValidate  >
      

           <Select
        id="sport"
        mode="multiple"
        placeholder="Please select your interested sport"
        onChange={this.setSport}
        style={{ width: '100%' }}
      >
         {sports.map(sport => {
              return (
                <Option key={sport} value={sport} style={{height:'100%'}}>
                  {sport}
                </Option>
              );
            })}
      </Select>           
      <TextField
           variant="outlined"
           margin="normal"
           fullWidth
           name="Company Name"
           label="Enter your Company Name"
           type="text"
           id="companyName"
          onChange={val => this.handleChange('companyName', val.target.value)}
        />
           <TextField
           variant="outlined"
           margin="normal"
           fullWidth
           name="Description"
           label="Description of yourself"
           type="text"
           id="Description"
           count={200}
           autoComplete="Write something about your company!"
          onChange={val => this.handleChange('detail', val.target.value)}
        />
         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.props.classes.submit }
            onClick={this.save}
          >
            Save
          </Button>
         
        </form>
      </div>
 
    </Container>
    

       
      </div>
    )
  }
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  // 更新header
  setHandleHeader = header => {
    this.setState({
      header
    })
  }
   // 更新运动
   setSport = sport => {
    //  console.log(sport)
    const newFris=[...sport];
    this.setState({
      sport:newFris
    })
  }

  save = () => {
    // console.log(this.state)
    this.props.updateUser(this.state)
  }
}

export default compose(withStyles(styles),connect(state => state.user, { updateUser })) (OrganizationInfo)
