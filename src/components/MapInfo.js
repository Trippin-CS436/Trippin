import React from "react";
import { connect }  from 'react-redux';
import './MapInfo.css';
import AddLocationButton from './AddLocationButton';



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

    phoneRender = () => {
       if (this.state.phone) {
           return (
               <div className="phone">
               <div className="infoLabel">
               Phone Number: 
               </div> 
               <div className="infoDetails">
               {this.state.phone}
               </div>
               </div>
           )
       } return null;
    }

    websiteRender = () => {
        if (this.state.website) {
            return (
                <div className="website">
                <div className="infoLabel">
                Website:
                </div> 
                <div className="infoDetails">
                {this.state.website}
                </div>
                </div>
            )
        } return null;
     }

     ratingRender = () => {
        if (this.state.rating) {
            return (
                <div className="rating">
                <div className="infoLabel">
                Rating
                </div> 
                <div className="infoDetails">
                {this.state.rating}
                </div>
                </div>
            )
        } return null;
     }

     reviewsRender = () => {
        let reviews = this.state.reviews;
        let infoArray = [];
        for (var rev in reviews) {
            // each review has an author_name, author_url, language, rating, text
            infoArray.push(rev["text"] + " by " + rev["author name"]);
        }
        if (this.state.reviews) {
            return (
                <div className="review">
                <div className="infoLabel">
                Reviews
                </div> 
                <div className="infoDetails">
                <ul>
                    {infoArray.map((field) => (
                        <li> {field}</li>
                    ))}
                </ul>
                </div>
                </div>
            )
        } return null;
     }
     photosRender = () => {
        if (this.state.photos) {
            return (
                <div className="photos">
                <div className="infoLabel">
                Photos
                </div> 
                <div className="infoDetails">
                {this.state.photos}
                </div>
                </div>
            )
        } return null;
     }

     

  

    render() {

       return(
            <div>
             <h4>Location Information</h4>
                <div className="mainInfo">


                <div className="phone">
               <div className="infoLabel">
               Phone Number: 
               </div> 
               <div className="infoDetails">
               {this.state.phone}
               </div>
               </div>

               <div className="website">
                <div className="infoLabel">
                Website:
                </div> 
                <div className="infoDetails">
                {this.state.website}
                </div>
                </div>


                <div className="rating">
                <div className="infoLabel">
                Rating:
                </div> 
                <div className="infoDetails">
                {this.state.rating}
                </div>
                </div>

                <div className="review">
                <div className="infoLabel">
                Reviews:
                </div> 
                <div className="infoDetails">
                </div>
                </div>

                </div>

                <div className="addButton">
                <AddLocationButton />
                </div>
                
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    console.log('State',state);
    return { 
        mapLocation: state.mapLocation
    }
}

export default connect(mapStateToProps)(MapInfo); 



