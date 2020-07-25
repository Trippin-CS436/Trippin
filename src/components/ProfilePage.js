import React from 'react';
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../actions/users";
import "./ProfilePage.css";
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from "@react-google-maps/api";
import { EmailShareButton, FacebookShareButton, FacebookMessengerShareButton, EmailIcon, FacebookIcon, FacebookMessengerIcon } from "react-share";

const title = "My Itinerary";

const shareUrl = 'http://github.com';

const mapContainerStyle = {
  height: '400px',
  width: '600px',
};

const center = { lat: -28.024, lng: 140.887 };

const locations = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
]

// ----- not sure what this is used for -------//
// const options = {
//   imagePath:
//     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
// }


class Profilepage extends React.Component {
  render() {

    function createKey(location) {
      return location.lat + location.lng
    }

    const MapWithMarkerClusterer = () => {
      return (
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_API_KEY}
          libraries={["places"]}>
          <GoogleMap id='marker-example' mapContainerStyle={mapContainerStyle} zoom={3} center={center}>
            <MarkerClusterer /*options={options}*/>
              {(clusterer) =>
                locations.map((location) => (
                  <Marker key={createKey(location)} position={location} clusterer={clusterer} />
                ))
              }
            </MarkerClusterer>
          </GoogleMap>
        </LoadScript>
      )
    }


    // <div class="mask rgba-black-light align-items-center">
    //       <Grid container className="container" spacing={1}>
    //         <Grid item xs>
    //           <div className="profile-container">
    //             <link href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" rel="stylesheet" />
    //             <div className="profile-img">
    //               <img src={this.props.authentication.profilePic} />
    //             </div>
    //             <ul className="ul">
    //               <li> {this.props.authentication.name} </li>
    //               <br />
    //               <li> Email Address: {this.props.authentication.email} </li>
    //               <br />
    //                 You have visited {locations.length} countries
    //                 <li> You have visited {locations.length} countries
    //                   <MapWithMarkerClusterer className="display-map"/>
    //                 </li>
    //             </ul>
    //           </div>
    //         </Grid>
    //       </Grid>
    //       </div>



    return (
        <React.Fragment>
          <div className="profile-bg">
            <div className="mask rgba-black-light align-items-center">
              <Grid container className="container" spacing={2}>
                <Grid item xs>
                  <div className="profile-container">
                    <link href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" rel="stylesheet" />
                    <div className="profile-img">
                      <img src={this.props.authentication.profilePic} />
                      <i className="fa fa-edit"></i>
                    </div>
                    <ul className="ul">
                      <li> {this.props.authentication.name} </li>
                      <br />
                      <li> Email Address: {this.props.authentication.email} </li>
                      <br />
                      <li> You have visited {locations.length} countries
                      <br />
                      </li>
                      <li>
                      <MapWithMarkerClusterer className="display-map" />
                      </li>
                      <br />
                      <li>
                        <EmailShareButton
                            url={shareUrl}
                            subject={title}
                            body="body"
                        >
                          <EmailIcon size={32} round />
                        </EmailShareButton>
                        <FacebookShareButton
                            url={shareUrl}
                            quote={title}

                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </React.Fragment>
    )
  }
}




const mapStateToProps = (state) => {
  return {
          authentication: state.authentication
  };
};




export default connect(mapStateToProps, { getCurrentUserProfile})(Profilepage)