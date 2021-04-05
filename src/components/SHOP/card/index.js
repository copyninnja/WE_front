import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './card.css'
import ShopButton from '../ShopButton';
import moment from 'moment'
import {excerpt} from '../../../util'
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ShopCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {time,category,storage,item_url,item_price,item_name,item_image,item_id,item_description,item_custom1_options,item_custom1_color,item_custom2_options,item_custom2_size}=props;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
  }
  // console.log(typeof(props.image))
  return (
    <div className="card col-sm-3" >
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            WE
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item_name}
        subheader={moment(time).format( "YYYY-MM-DD")}
      />
      <CardMedia
        className={classes.media}
        // image={require("../../../assets/product/shoe1.jpg")}
        image={item_image}
        // image={`shoe${getRandomIntInclusive(1,3)}.jpg`}

        title={category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {excerpt(item_description)}
        </Typography>
      </CardContent>

      
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
              {item_description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    <ShopButton props={props}/>
    </div>
  );
}
