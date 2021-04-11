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
import { Slider } from 'antd';
import moment from 'moment'
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
class MinePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      header: props.header,
      age:props.age,
      gender:props.gender,
      sport: props.sport,
      detail: props.detail,
      acceptDistance:props.acceptDistance
    }
  }
//   componentDidMount(){
//     this.setState({header: this.props.header})
//     this.setState({gender: this.props.gender})
//     this.setState({sport: this.props.sport})
//     this.setState({detail: this.props.detail})
//     this.setState({acceptDistance: this.props.acceptDistance})
//   }
  render () {
    console.log(this.props)

    const sports=['badminton','football','basketball','running'];
    const marks = {
      0: '10km',
      20: '20km',
      50: '50km',
      100: {
        style: {
          color: '#f50',
        },
        label: <strong>&gt;100km</strong>,
      },
    };
    const {header,type}=this.props
    return (
      <div>
       
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={this.props.classes.paper }>
        <Typography display="block" component="h1" variant="h5" align='center'>
               Change  Personal information 
        </Typography>
        <HeaderSelector setHandleHeader={this.setHandleHeader}></HeaderSelector>
        <form data-cy="form" className={this.props.classes.form } noValidate  >
        <div className="container">
          <div className="row">
            <div className="col-sm" >
    <FormLabel component="legend" style={{marginTop:'20px'}}>Please set your birthday</FormLabel>
    </div>
    <div className="col-sm" style={{marginTop:'20px'}}>
    <DatePicker yearPlaceholder={moment(this.props.age).format("MMMM Do YYYY")}  value={this.state.age} showTimeSelect onChange={date =>  this.handleChange('age', date)} />

    </div>
    </div>
    </div>

           <Select
        id="sport"
        mode="multiple"
        placeholder="Please select your interested sport"
        defaultValue={this.props.sport}
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
         <FormControl component="fieldset">
         <div className="container">
          <div className="row">
            <div className="col-sm" >
    <FormLabel component="legend" style={{marginTop:'50px'}}>Gender</FormLabel>
    </div>
    <div className="col-sm">
    <RadioGroup row aria-label="gender" name="gender" defaultValue={this.props.gender} value={this.state.gender} id="radiogroup"   >
      <FormControlLabel value="male" defaultChecked="true" control={<Radio onClick={() => { this.handleChange('gender', 'male')}} />} label="male" />
      <FormControlLabel value="female" control={<Radio onClick={() => {this.handleChange('gender', 'female')}} />} label="female" />
    </RadioGroup>
    </div>
    </div>
    </div>
  </FormControl>
  <p>choose maximum distance of story you would like to receive</p>
  <Slider marks={marks} step={10} defaultValue={this.props.acceptDistance}  onChange={val => this.handleChange('acceptDistance', val)}
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
           defaultValue={this.props.detail}
           autoComplete="Write something about yourself!"
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
    console.log(this.props)
    console.log(this.state)
    this.props.updateUser(this.state)
    return <Redirect to="/"/>

  }

      
}

export default compose(withStyles(styles),connect(state => state.user, { updateUser })) (MinePage)
