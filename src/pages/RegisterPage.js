import React, { Component }   from "react";
import {AuthContext} from '../contexts/authContext';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  useForm from 'react-hook-form';
import { register } from '../redux/actions'
import { connect ,useSelector } from 'react-redux'
  import Radio from '@material-ui/core/Radio';
  import RadioGroup from '@material-ui/core/RadioGroup';
  import FormControl from '@material-ui/core/FormControl';
  import FormLabel from '@material-ui/core/FormLabel';
import  './form.css';
  
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
      console.log(this.state);
      this.props.register(this.state)
    }
    handleChange = (name, val) => {
      this.setState({
        [name]: val
      })
    }
    render () {
      const default_type='personal'
  const {msg,redirectTo}=this.props
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return  (
      
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className='paper'>
        <Avatar variant="circular" sizes='large'>
        </Avatar>
        <Typography display="block" component="h1" variant="h5" align='center'>
         Register
        </Typography>
        <form data-cy="form" className='form' noValidate  >
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
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className='submit'
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
export default connect(state => state.user, { register })(Register)


