import React from 'react';
import './App.css';
import {
    InfoWindow,
    LoadScript,
    GoogleMap,
    Marker,
    Autocomplete
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Descriptions } from 'antd';
import { connect } from 'react-redux';
import { getLocation } from '../actions/getLocation';
import MapInfo from "./MapInfo";
import { resetMap } from "../actions/resetMap";



Geocode.setApiKey(process.env.REACT_APP_API_KEY);

const containerStyle = {
    width: '100%',
    height: '100%',
    marginTop: '1rem',
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
};




class Map extends React.Component {
    constructor(props) {
    super(props);
    
    this.autocomplete = null;

    this.state = {
        placeId: '',
        placeName: '',
        address: '',
        city: '',
        area: '',
        state: '',
        country: '',
        zoom: 10,
        height: 400,
        mapPosition: {
            lat: 0,
            lng: 0,
        },
        markerPosition: {
            lat: 0,
            lng: 0,
        }
    };
}

    componentDidMount() {
        this.props.resetMap();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    markerPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                }, () => {
                    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
                        .then(response => {
                            const address = response.results[0].formatted_address,
                                addressArray = response.results[0].address_components,
                                city = this.getCity(addressArray),
                                area = this.getArea(addressArray),
                                state = this.getState(addressArray),
                                country = this.getCountry(addressArray);

                            this.setState({
                                address: (address) ? address : "",
                                area: (area) ? area : "",
                                city: (city) ? city : "",
                                state: (state) ? state : "",
                                country: (country)? state : "",
                            })
                        })
                })
            })
        }
    }


    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                state = addressArray[i].long_name;
                return state;
            }
        }
    };

    getCountry = (addressArray) => {
        let country = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
                country = addressArray[i].long_name;
                return country;
            }
        }
    };

    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();
        //console.log(newLng, newLat);

        Geocode.fromLatLng(newLat, newLng)
            .then(response => {
                console.log(response);
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                    console.log(address);

                this.setState({
                    address: (address) ? address : "",
                    area: (area) ? area : "",
                    city: (city) ? city : "",
                    state: (state) ? state : "",
                    markerPosition: {
                        lat: newLat,
                        lng: newLng,
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng,
                    }
                })
            });
    };

    onLoad = (autocomplete) => {
        console.log('autocomplete: ', autocomplete);
        this.autocomplete = autocomplete;
        // this.autocomplete.addListener('place_changed', this.onPlaceChanged);
    };

    onPlaceChanged = () => {
        // if (this.autocomplete !== null) {
            // console.log(this.autocomplete.getPlace())
         
        const place = this.autocomplete.getPlace();
        console.log(place);
        const address = place.formatted_address,
            placeId = place.place_id,
            addressArray = place.address_components;
        const city = this.getCity(addressArray),
              area = this.getArea(addressArray),
              state = this.getState(addressArray),
              country = this.getCountry(addressArray),
              newLat = place.geometry.location.lat(),
              newLng = place.geometry.location.lng();
        const placeName = place.name;

        // location info
        const placeWebsite = place.website;
        const placeReviews = place.reviews;
        const placePhoneNumber = place.formatted_phone_number;
        const placeRating = place.rating;
        const placeTypes = place.types;
        const placeStatus = place.business_status;
        const placePhotos = place.photos;

        let placePhotoUrls = [];

        if (placePhotos !== undefined && placePhotos.length > 0) {
        placePhotoUrls = placePhotos.map((photo) => { return photo.getUrl({'maxWidth': 200, 'maxHeight': 200})});
        }
        
        const info = {
            placeWebsite: placeWebsite,
            placeReviews: placeReviews,
            placePhotos: placePhotos,
            placePhoneNumber: placePhoneNumber,
            placeRating: placeRating,
            placeTypes: placeTypes,
            placeStatus: placeStatus,
            placePhotoUrls: placePhotoUrls
        }

        this.setState({
            placeId: (placeId) ? placeId: "",
            placeName: (placeName) ? placeName : "",
            address: (address) ? address : "",
            area: (area) ? area : "",
            city: (city) ? city : "",
            state: (state) ? state : "",
            country: (country)? country: "",
            markerPosition: {
                lat: newLat,
                lng: newLng,
            },
            mapPosition: {
                lat: newLat,
                lng: newLng,
            },
            info: info
        })

    // } else {
    //     console.log('Autocomplete is not loaded yet!')
    //   }

        // create mapLocation object
        const mapLocation = {
            placeId: this.state.placeId,
            placeName: this.state.placeName,
            fulladdress: this.state.address,
            placeArea: this.state.area,
            placeCountry: this.state.country,
            info: this.state.info,
        }
        // Reducer call to update the name of the facility and address
        console.log('OnPlaceChange call', mapLocation);
        console.log("This is Map Location");
        console.log(mapLocation);
        this.props.getLocation(mapLocation);
    };

/*
    displayDetails = () => {
        if (this.state.placeId !== null && this.state.placeId !== ''){
            return (     
                  <Descriptions bordered layout="horizontal" style={{ width: '70%', padding: "1rem 1rem", margin: "0rem 2rem 0.5rem 4rem",
            backgroundColor: "#ebeced",  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "10px"}}>
                    <Descriptions.Item label="CITY" span={3}>{this.state.city}</Descriptions.Item>
                    <Descriptions.Item label="AREA" span={3}>{this.state.area}</Descriptions.Item>
                    <Descriptions.Item label="STATE" span={3}>{this.state.state}</Descriptions.Item>
                    <Descriptions.Item label="ADDRESS " span={3}>{this.state.address}</Descriptions.Item>
                </Descriptions>
                ) 
        } else return null;
    }
*/

    displayLocationInfo = () => {
        if (this.state.placeId !== null && this.state.placeId !== ''){
            return (     
                <div className="map-info">
                <MapInfo />
                </div>
                ) 
        } else return null;
    }


    render() {


        
        return (

            <div style={{ width: '100%', height: '100%', padding: "0 1rem"}}>

                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_API_KEY}
                    libraries={["places"]}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        zoom={8}
                        center={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >
                        <Marker
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng}}
                            
                        >
                          <InfoWindow position={{ lat: this.state.markerPosition.lat+0.1, lng: this.state.markerPosition.lng}}>
                                <div>
                                    {this.state.address}
                                </div>
                            </InfoWindow>
                        </Marker>
                        <Autocomplete
                         onLoad={this.onLoad}
                         onPlaceChanged={this.onPlaceChanged}
          >
              <input
              type="text"
              placeholder="Input here"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                borderSpacing: '1px',
                width: `400px`,
                height: `32px`,
                marginTop: '0.5rem',
                padding: `0.5rem 1rem`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
            </Autocomplete>
                    </GoogleMap> 
                </LoadScript>

                {this.displayLocationInfo()}
            </div>
        );

    }
}

export default connect(null, {getLocation, resetMap})(React.memo(Map));
