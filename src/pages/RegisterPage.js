import React, { Component }   from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {  Redirect } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { register } from '../redux/actions'
import { connect } from 'react-redux'
  import Radio from '@material-ui/core/Radio';
  import RadioGroup from '@material-ui/core/RadioGroup';
  import FormControl from '@material-ui/core/FormControl';
  import FormLabel from '@material-ui/core/FormLabel';
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
  class Register extends Component {
    
    constructor () {
      super()
      this.state = {
        username: '',
        email:'',
        password: '',
        password2: '',
        type: 'personal'
      }
    }
    regis = () => {
      this.props.register(this.state)
      return false;
    }
    handleChange = (name, val) => {
      this.setState({
        [name]: val
      })
    }
    render () {
      const default_type = 'personal'
      const {
        msg,
        redirectTo
      } = this.props
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return  (
      
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      {msg? <div className='error-msg'>{msg}</div>:null}
      <div className={this.props.classes.paper }>
        <Avatar className={this.props.classes.avatar} >
        </Avatar>
        <Typography display="block" component="h1" variant="h5" align='center'>
         Register
        </Typography>
        <form data-cy="form" className={this.props.classes.form} noValidate  >
        <TextField
            variant="outlined"
            margin="normal"
            data-cy="username"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={val => this.handleChange('username', val.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            data-cy="emailinput"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={val => this.handleChange('email', val.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            data-cy="userpassword"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={val => this.handleChange('password', val.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="confirm_password"
            type="password"
            id="confirm_password"
            autoComplete="confirm_password"
            onChange={val => this.handleChange('password2', val.target.value)}
          />
         <FormControl component="fieldset">
    <FormLabel component="legend">User Type</FormLabel>
    <RadioGroup row aria-label="usertype" name="type" defaultValue={default_type} value={this.state.type} id="radiogroup"   >
      <FormControlLabel value="personal" control={<Radio onClick={() => { this.handleChange('type', 'personal')}} />} label="personal" />
      <FormControlLabel value="organization" control={<Radio onClick={() => {this. handleChange('type', 'organization')}} />} label="organization" />
      <FormControlLabel value="other" disabled control={<Radio />} label="other" />
    </RadioGroup>
  </FormControl>
          <FormControlLabel
            control={
              // <Controller as={Checkbox} contro={control} name="remember" color="primary" defaultValue={false}
            <Checkbox  name="remember" color="primary" defaultValue={false} />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={this.props.classes.submit}
            data-cy="Register"
            onClick={this.regis}
          >
            Register
          </Button>

        </form>
      </div>
 
    </Container>
    )
}
}
export default compose(withStyles(styles),connect(state => state.user, { register })) (Register)


