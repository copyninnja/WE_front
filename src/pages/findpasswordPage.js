import React ,{useState,useEffect}  from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {reqfindPassword} from '../api/index'
import { Link } from "react-router-dom";

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

  let timeChange;
  export default function FindPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState();

    const [time, setTime] = useState(60);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [btnContent, setBtnContent] = useState('find password');
  
    useEffect(() => {
      clearInterval(timeChange);
    }, []);
  
    useEffect(() => {
      if (time > 0 && time < 60) {
        setBtnContent(`${time}s to send email again`);
      } else {
        clearInterval(timeChange);
        setBtnDisabled(false);
        setTime(60);
        setBtnContent('find password');
      }
    }, [time]);
  
    const getPhoneCaptcha = () => {
      // 注意，不要使用 setTime(t-1) ： 闭包问题会导致time一直为59
       timeChange = setInterval(() => setTime(t => --t), 1000);
      setBtnDisabled(true);
      reqfindPassword(email);
    };
  


    return  (
        <div className={classes.root}>
<Link to="/"><Button variant="contained">Back</Button></Link>
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
           retrieve password
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
              onChange={val => setEmail(val.target.value)}
            />


            <Button
              type="find password"
              fullWidth
              variant="contained"
              color="primary"
              disabled={btnDisabled}
              className={classes.submit}
              onClick={getPhoneCaptcha}
            >
              {btnContent}
            </Button>
            
          </form>
        </div>
   
      </Container>
      </div>
    )
}


