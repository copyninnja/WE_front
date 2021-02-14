import React ,{ Component, useState }from "react";
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
import { login } from '../redux/actions'
import { connect } from 'react-redux';

  
  const SignIn =(props)=> {

    const [state,setState] =useState({
      email: '',
      password: ''
    })
    const handleChange = (name, value) => {
      setState({ [name]: value })
    }
    const signin=()=>{
      props.login(state)
      }

     const useStyles=  makeStyles((theme) => ({
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
    }));
    const classes =useStyles();
    return  props.username=="" ? (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form data-cy="form" className={classes.form} noValidate >
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
              onChange={val => handleChange('email', val)}
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
              onChange={val => handleChange('password', val)}
            />

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
              className={classes.submit}
              data-cy="Sign In"
              onClick= {signin}
            >
              Sign In
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
    :(<div>
      <br/>
      <br/>
      <br/>
      <br/>   
      <br/>
      <br/>
      <br/>

      <Link  className=" text-black" to="/">
      You've already loginin,
    Back to HomePage
  </Link>       
  </div>  
  )
}
 
export default connect(state => state.user, { login })(SignIn)


