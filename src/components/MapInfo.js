import React from "react";
import  {connect}  from 'react-redux';
const GOOGLE_API_KEY = process.env.PLACES_API_KEY;
const validFields = ['rating', 'formatted-phone-number', 'website', 'reviews'];
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

class MapInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mapLocation: this.props.mapLocation,
            locName: this.props.mapLocation.Name,
            locAddress: this.props.mapLocation.Address,
            placesId: this.props.mapLocation.PlacesId, 
            info: {}
        };

        this.getInfo = this.getInfo.bind(this);
    }

    
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          this.setState({
            locName: this.props.location.name, 
            locAddress: this.props.location.address
          });
        }
      }

     getInfo = () =>{
        console.log(this.props.mapLocation.PlacesId);
        var request = new Request(proxyUrl+'https://maps.googleapis.com/maps/api/place/details/json?place_id='+ this.props.mapLocation.PlacesId + '&fields=name,rating,website,review,formatted_phone_number&key=AIzaSyAKMiqXKjeoQxSx5OZfz6fti7YXlHUag1Y');
        fetch(request).then(function(response){
            response.json().then(function(data) {
                if (data === undefined || data === ""){
                    return null;
                }
                else if(data.status === "OK"){
                    console.log(data.result);
                return data.result;
            }})
            }).catch((err) => {return null;});
        //then(response => response.json).then(data => console.log(data)).catch((err) => {console.log(err)});
    }


    render() {
       let data = this.getInfo();
       let result;
       if (data === undefined){
           result = [];
       }else {
           result = data.result;
       }
       return(
            <div className={"mainInfo"}>
                <h4>Location Information</h4>
                <ul>
                    {result.map((field) => (
                        <li> {result.field}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        mapLocation: state.mapLocation
    }
}

export default connect(mapStateToProps)(MapInfo); 



