import React from "react";
import {makeStyles, withStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { Paper } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import "./InfoPhotos.css"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


class Info extends React.Component {

    constructor(props){
        super(props);
        console.log(this.props.location);
        console.log(this.props.id);
        let newArray = this.props.location.slice();
        let indexOfLocation= newArray.findIndex((item) => {
            return this.props.id == item.id;
        });

        console.log(indexOfLocation);
        console.log(this.props.location[indexOfLocation]);

        this.state = {
            currentLocation: this.props.location[indexOfLocation],
            address: this.props.location[indexOfLocation].address,
            info: this.props.location[indexOfLocation].info,
            phone: this.props.location[indexOfLocation].info.placePhoneNumber,
            website: this.props.location[indexOfLocation].info.placeWebsite,
            status: this.props.location[indexOfLocation].info.placeStatus,
            rating: this.props.location[indexOfLocation].info.placeRating,
            reviews: this.props.location[indexOfLocation].info.placeReviews,
            photos: this.props.location[indexOfLocation].info.placePhotoUrls,
        };
    }

    addressDisplay = () => {
      if (this.state.address !== undefined && this.state.address !== ''){
        return (
          <Box fontWeight="fontWeightLight" p={2} borderColor="transparent">
          <Typography variant="h5" >Address</Typography>
          <Typography variant="subtitle1"> {this.state.address}</Typography>
          </Box>
        )
       } else return null;
      }

      phoneDisplay = () => {
        if (this.state.phone !== undefined && this.state.phone !== ''){
            return (
                <Box fontWeight="fontWeightLight" p={2} borderColor="transparent">
                <Typography variant="h5" >Phone Number</Typography>
                <Typography variant="subtitle1"> {this.state.phone}</Typography>
               </Box>
            )
    } else return null;
}

    websiteDisplay = () => {
        if (this.state.website !== undefined && this.state.website !== ''){
            return (
                <Box fontWeight="fontWeightLight" p={2} borderColor="transparent">
                <Typography variant="h5" >Website</Typography>
                <Typography variant="subtitle1">{this.state.website}</Typography>
               </Box>
            )
    } else return null;
    }

    ratingDisplay = () => {
        
        let ratingValue = 0;
        if (this.state.rating !== undefined && this.state.rating !== ''){
          if (this.state.rating) { ratingValue = parseFloat(this.state.rating.toString()); };
            return (
                <Box borderColor="transparent" mb={1} p={2} fontWeight="fontWeightLight">
                <Typography variant="h5">Rating</Typography>
                <Rating name="half-rating-read" defaultValue={0} value={ratingValue} precision={0.1} readOnly />
                </Box>
            )
    } else return null;
    }

    photoDisplay = () => {
      if (this.state.placePhotoUrls !== undefined && this.state.placePhotoUrls.length > 0){
        return (
          <Box fontWeight="fontWeightLight" p={2} borderColor="transparent">
          <Typography variant="h6" >Location Photos</Typography>
          {this.photoToRender()}
         </Box> 
        )
      }else return null;
    }

    photoToRender = () => {
      let photos = this.state.photos;
      if (this.state.photos !== undefined && this.state.photos !== ''){
      return (
          <div className="photos">
          <div className="photos-display">
          <Paper elevation={2} style={{maxWidth: 700, maxHeight: 200, overflow: 'auto'}}>

      <GridList className="gridList" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', width: 700, height:200, spacing: "0"}} cols={7}>
        {photos.map((url) => (
          <GridListTile style={{width: "100px", spacing: "0"}} key={url} cols={7}>

            <img src={url}  />
          </GridListTile>
        ))}
      </GridList>
      </Paper>

          </div>
          </div>
      );
  } else return null;
}

    reviewDisplay = () => {

        // reviews is an array of reviews
        let reviews = this.state.reviews;
        if ( reviews !== undefined) {
            if (reviews.length > 0) {
            return (
                <Box component="fieldset" style={{marginBottom: "4rem"}}borderColor="transparent" mb={5} p={1} fontWeight="fontWeightLight">
                <Typography variant="h6">Reviews</Typography>
                {this.reviewRender(reviews)}
                </Box>
                
            )
                 }
        }
    }

    reviewRender = (reviews) => {
        return (
            <Paper elevation={2} style={{maxWidth: 600, maxHeight: 300, overflow: 'auto', margin: "2rem 2rem 1rem 2rem"}}>
            <List>
            {reviews.map((review, key) => (
            <ListItem key={`item-${key}-${key}`}>
            {this.reviewCardRender(review)}
          </ListItem>
        ))}
            </List>
          </Paper>
        )
    }

    reviewCardRender = (review) => {
        let author = review.author_name;
        let authorInitial = author.charAt(0);
        let text = review.text;
        let date = review.relative_time_description;
        let rating = review.rating;
        return (

        <Card style={{maxWidth: "500px", padding: "0.5rem 0.5rem"}} layout="vertical">

        <CardHeader
          avatar={
            <Avatar aria-label="Review" style={{backgroundColor: red[500]}}>
              {authorInitial}
            </Avatar>
          }
          title={author}
          subheader={date}
        />
        <Rating name="half-rating-read" defaultValue={0} value={rating || 0} precision={0.1} readOnly />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>

      </Card>
        )
    }




   
      render() {
        let ratingValue = 0;
        if (this.state.rating) { ratingValue = parseFloat(this.state.rating.toString()); };
        
       return(
            <div className="mainInfo">
            <Box borderColor="transparent" p={2}>

              {this.addressDisplay()}

              {this.phoneDisplay()}

              {this.websiteDisplay()}
              
              {this.ratingDisplay()}

              {this.phoneDisplay()}

                 {this.reviewDisplay()}
                </Box>

              


               

                
              
            </div> 
        )
    }

    

}

const styles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        font: '30px Roboto'
      },
    },
  }));

export default withStyles(styles)(Info); 
