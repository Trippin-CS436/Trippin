import React from "react";
import { connect }  from 'react-redux';
import './MapInfo.css';
import AddLocationButton from './AddLocationButton';
//import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


class MapInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mapLocation: this.props.mapLocation,
            info: this.props.mapLocation.Info,
            phone: this.props.mapLocation.Info.placePhoneNumber,
            website: this.props.mapLocation.Info.placeWebsite,
            status: this.props.mapLocation.Info.placeStatus,
            rating: this.props.mapLocation.Info.placeRating,
            reviews: this.props.mapLocation.Info.placeReviews,
            photos: this.props.mapLocation.Info.placePhotos,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mapLocation !== this.props.mapLocation) {
            this.setState({
                mapLocation: this.props.mapLocation,
                info: this.props.mapLocation.Info,
                phone: this.props.mapLocation.Info.placePhoneNumber,
                website: this.props.mapLocation.Info.placeWebsite,
                status: this.props.mapLocation.Info.placeStatus,
                rating: this.props.mapLocation.Info.placeRating,
                reviews: this.props.mapLocation.Info.placeReviews,
                photos: this.props.mapLocation.Info.placePhotos
            })
        }
    }

     



    render() {
        let ratingValue = 0;
        if (this.state.rating) { ratingValue = parseFloat(this.state.rating.toString()); };
        
       return(
            <div className="mainInfo">
            <Box borderColor="transparent" p={3}>
            <Box  borderColor="transparent" fontWeight="fontWeightBold" p={3}>
            <Typography variant="h3">Location Information</Typography>
            </Box>

           <Box fontWeight="fontWeightLight" component="fieldset"  borderColor="transparent">
            <Typography variant="h5" >Phone Number</Typography>
            <Typography variant="h6"> {this.state.phone}</Typography>
           </Box>

           <Box fontWeight="fontWeightLight" component="fieldset"    borderColor="transparent">
            <Typography variant="h5" >Website</Typography>
            <Typography variant="h6">{this.state.website}</Typography>
           </Box>

            <Box component="fieldset" borderColor="transparent" fontWeight="fontWeightLight">
            <Typography variant="h5">Rating</Typography>
            <Rating name="half-rating-read" defaultValue={0} value={ratingValue} precision={0.1} readOnly />
            </Box>
         
                


                <div className="addButton">
                <AddLocationButton />
                </div>

                </Box>
            </div> 
        )
    }
}

/* const styles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        font: '30px Roboto'
      },
    },
  })); */

const mapStateToProps = (state) => {
    console.log('State',state);
    return { 
        mapLocation: state.mapLocation
    }
}

export default connect(mapStateToProps)(MapInfo); 



