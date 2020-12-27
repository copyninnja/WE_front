import React ,{useContext}  from "react";
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


const useStyles = makeStyles((theme) => ({
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
  
  export default function Register() {
    const classes = useStyles();
    const {register,handleSubmit}= useForm();
    const context = useContext(AuthContext);

    
    const regis= props =>{
      context.register(props.email,props.password);
     
  }
    return  (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form data-cy="form" className={classes.form} noValidate onSubmit={handleSubmit((data)=>regis(data))}>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              data-cy="emailinput"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              data-cy="userpassword"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                  Forgot password?
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


