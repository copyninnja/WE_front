import React  from "react";
import StoryList from '../components/StoryList';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
const HomePage = () => {


  return (
    <div>

    <Link to="/writestory"><Button variant="contained">Write your story<AddIcon className="fa fa-plus-circle" color="secondary" /></Button></Link>

    <StoryList/>
    </div>
  );
};

export default HomePage;