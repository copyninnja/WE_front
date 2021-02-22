import React, { Component }   from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { login } from '../redux/actions'
import { connect } from 'react-redux'

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
  class Login extends Component {
    
    constructor () {
      super()
      this.state = {
        email: '',
        password: ''
      }
    }
      // 登录
  login = () => {
    this.props.login(this.state)
    return false;
  }
    handleChange = (name, val) => {
      this.setState({
        [name]: val
      })
    }
    render () {
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
      {msg ?<div className='error-msg'>{msg}</div>:null}
      <div className={this.props.classes.paper }>
        <Avatar className={this.props.classes.avatar} >
        </Avatar>
        <Typography display="block" component="h1" variant="h5" align='center'>
         Sign in
        </Typography>
        <form data-cy="form" className={this.props.classes.form} noValidate  >
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
            data-cy="Sign In"
            onClick={this.login}
          >
            Sign in
          </Button>
          <Grid container>
              <Grid item xs>
              <Link to="./findpassword" variant="body2">
                  {"forget password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link to="./register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </form>
      </div>
 
    </Container>
    )
}
}
export default compose(withStyles(styles),connect(state => state.user, { login })) (Login)


