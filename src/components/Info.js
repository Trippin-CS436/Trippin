import React from "react";
import {makeStyles, withStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

class Info extends React.Component {

    constructor(props){
        super(props);
        console.log(this.props.location);
        console.log(this.props.id);
        let newArray = this.props.location.slice();
        let indexOfLocation= newArray.findIndex((item) => {
            return this.props.id === item.id;
        });

        console.log(indexOfLocation);
        console.log(this.props.location[indexOfLocation]);

        this.state = {
            currentLocation: this.props.location[indexOfLocation],
            info: this.props.location[indexOfLocation].info,
            phone: this.props.location[indexOfLocation].info.placePhoneNumber,
            website: this.props.location[indexOfLocation].info.placeWebsite,
            status: this.props.location[indexOfLocation].info.placeStatus,
            rating: this.props.location[indexOfLocation].info.placeRating,
            reviews: this.props.location[indexOfLocation].info.placeReviews,
            photos: this.props.location[indexOfLocation].info.placePhotos,
        };
    }


   
      render() {
        let ratingValue = 0;
        if (this.state.rating) { ratingValue = parseFloat(this.state.rating.toString()); };
        
       return(
            <div className="mainInfo">
            <Box borderColor="transparent" p={3}>

               <Box fontWeight="fontWeightLight" component="fieldset"  borderColor="transparent">
                <Typography variant="h6" >Phone Number</Typography>
                <Typography variant="body2"> {this.state.phone}</Typography>
               </Box>

               <Box fontWeight="fontWeightLight" component="fieldset"    borderColor="transparent">
                <Typography variant="h6" >Website</Typography>
                <Typography variant="body1">{this.state.website}</Typography>
               </Box>

                <Box component="fieldset" borderColor="transparent" fontWeight="fontWeightLight">
                <Typography variant="h6">Rating</Typography>
                <Rating name="half-rating-read" defaultValue={0} value={ratingValue} precision={0.1} readOnly />
                </Box>
                
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
