import React from 'react';
import {connect} from "react-redux";
import {GoogleMap, LoadScript, MarkerClusterer, Marker} from "@react-google-maps/api";

class MapWithMarkerClusterer extends React.Component{
    createKey = (location) => {
        return location.lat + location.lng
    };

    render() {

            const center = {lat: -28.024, lng: 140.887};

            const mapContainerStyle = {
                height: "300px",
                width: '80%',
                left: '10%',
                marginTop: '10px',
                marginBottom: '15px',
            }


            return (
                <React.Fragment>
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_API_KEY}
                    libraries={["places"]}>
                    <GoogleMap id='marker-example' mapContainerStyle={mapContainerStyle} zoom={3} center={center} onLoad={console.log("The Map has finished loading")}>
                        <MarkerClusterer >
                            {(clusterer) =>
                                this.props.authentication.visited.map((location) => (
                                    <Marker key={this.createKey(location)} position={location} clusterer={clusterer}/>
                                ))
                            }
                        </MarkerClusterer>
                    </GoogleMap>
                </LoadScript>
                </React.Fragment>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    }
}


export default connect(mapStateToProps)(MapWithMarkerClusterer)