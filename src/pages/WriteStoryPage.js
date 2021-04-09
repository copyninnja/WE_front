import React  from "react";
import WriteStory from '../components/WriteStory'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
const HomePage = (props) => {


  return (
    <div>
     <Link to="/story"><Button variant="contained">Back</Button></Link>

    <WriteStory props={props}/>
    </div>
  );
};

export default HomePage;