import React from 'react';
import './App.css';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import {Descriptions} from 'antd';
import Autocomplete from 'react-google-autocomplete';

Geocode.setApiKey("AIzaSyCsxusP70JLDi6V1JK6IkrMoFZD8rfKPAg");

class App extends React.Component {

  state = {
    address: '',
    city: '',
    area: '',
    state: '',
    zoom: 10,
    hieght: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    }
  }

  componentDidMount() {
    if(navigator.geolocation) {
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
              city: (city)? city : "",
              state: (state)? state: "",
            })
        })
      })
    })
  }}
  

 getCity = (addressArray) => {
      let city = '';
      for(let i = 0; i < addressArray.length; i++) {
        if(addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
          city = addressArray[i].long_name;
          return city;
        }
      }
  }

  getArea = (addressArray) => {
    let area = '';
    for(let i = 0; i < addressArray.length; i++) {
      if(addressArray[i].types[0]) {
        for(let j = 0; j < addressArray.length; j++) {
          if('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
}

getState = (addressArray) => {
  let state = '';
  for(let i = 0; i < addressArray.length; i++) {
    if(addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
      state = addressArray[i].long_name;
      return state;
    }
  }
}

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
        city: (city)? city : "",
        state: (state)? state: "",
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
  }

  onPlaceSelected = (place) => {
    const address = place.formatted_address,
    addressArray = place.address_components;
    //quick fix
    if(address== undefined) {
      return;
    }
    const city = this.getCity(addressArray),
    area = this.getArea(addressArray),
    state = this.getState(addressArray),
    newLat = place.geometry.location.lat(),
    newLng = place.geometry.location.lng();

  
    this.setState({
      address: (address) ? address : "",
      area: (area) ? area : "",
      city: (city)? city : "",
      state: (state)? state: "",
      markerPosition: {
        lat: newLat,
        lng: newLng,
      },
      mapPosition: {
        lat: newLat,
        lng: newLng,
      }
    })
  }
  


  render() {
    //
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      >
        <Marker
          draggable = {true}
          onDragEnd = {this.onMarkerDragEnd}
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng}}
        >
          <InfoWindow>
            <div>
              {this.state.address}
          </div>
          </InfoWindow>
        </Marker>

        <Autocomplete
        style={{width: '100%', height: '40px', paddingLeft: 16, marginTop:2, marginBottom: '2rem'}}
        onPlaceSelected={this.onPlaceSelected}
        types={['(regions)']}
        />
      </GoogleMap>
    ));

    return (

      <div>
    <Descriptions bordered>
    <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
    <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
    <Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
    <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
    </Descriptions>
    
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCsxusP70JLDi6V1JK6IkrMoFZD8rfKPAg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
       </div>
    );
  
  }
}

export default App;
