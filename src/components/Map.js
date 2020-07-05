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
import { getLocation } from '../actions';


Geocode.setApiKey(process.env.REACT_APP_API_KEY);

const containerStyle = {
    width: '100%',
    height: '100%'
};


class Map extends React.Component {
    constructor(props) {
    super(props);
    
    this.autocomplete = null;

    this.state = {
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
                                state = this.getState(addressArray);

                            this.setState({
                                address: (address) ? address : "",
                                area: (area) ? area : "",
                                city: (city) ? city : "",
                                state: (state) ? state : "",
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
        console.log(newLng, newLat);

        Geocode.fromLatLng(newLat, newLng)
            .then(response => {
                console.log(response);
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);

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
        console.log('autocomplete: ', autocomplete)
        this.autocomplete = autocomplete
      }

    onPlaceChanged = () => {
        
        const place = this.autocomplete.getPlace();
        console.log(place);
        const address = place.formatted_address,
        addressArray = place.address_components;
        const city = this.getCity(addressArray),
              area = this.getArea(addressArray),
              state = this.getState(addressArray),
              country = this.getCountry(addressArray),
              newLat = place.geometry.location.lat(),
              newLng = place.geometry.location.lng();
        const placeName = place.name;


        this.setState({
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
            }
        })

        // create location object
        const location = {
            placeName: this.state.placeName,
            fulladdress: this.state.address,
            placeArea: this.state.area,
            placeCountry: this.state.country
        }
        // Reducer call to update the name of the facility and address
        console.log(location);
        this.props.getLocation(location);
    };



    render() {


        
        return (

            <div style={{ width: '500px', height: '500px'}}>
                <Descriptions bordered>
                    <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
                    <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
                    <Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
                    <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
                </Descriptions>

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
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
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
          
            </div>
        );

    }
}

export default connect(null, {getLocation})(React.memo(Map));