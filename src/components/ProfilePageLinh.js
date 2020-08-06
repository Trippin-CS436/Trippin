import React from 'react';
import { connect } from "react-redux";
import { updateArchive } from "../actions/updateArchive";
import { logOut } from "../actions/index";
import "./ProfilePageLinh.css";
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from "@react-google-maps/api";
import { EmailShareButton, FacebookShareButton, FacebookMessengerShareButton, EmailIcon, FacebookIcon, FacebookMessengerIcon } from "react-share";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { GoogleLogout } from 'react-google-login';
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import Popup from "reactjs-popup";
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import IconButton from "@material-ui/core/IconButton";
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const { uuid } = require('uuidv4');
const title = "My Itinerary";

const shareUrl = 'http://github.com';

const mapContainerStyle = {
    height: '400px',
    width: '600px',
};

const center = { lat: -28.024, lng: 140.887 };

const locations = [
    { "lat": -31.56391, "lng": 147.154312 },
    { "lat": -33.718234, "lng": 150.363181 },
    { "lat": -33.727111, "lng": 150.371124 },
    { "lat": -33.848588, "lng": 151.209834 },
    { "lat": -33.851702, "lng": 151.216968 },
    { "lat": -34.671264, "lng": 150.863657 },
    { "lat": -35.304724, "lng": 148.662905 },
    { "lat": -36.817685, "lng": 175.699196 },
    { "lat": -36.828611, "lng": 175.790222 },
    { "lat": -37.75, "lng": 145.116667 },
    { "lat": -37.759859, "lng": 145.128708 },
    { "lat": -37.765015, "lng": 145.133858 },
    { "lat": -37.770104, "lng": 145.143299 },
    { "lat": -37.7737, "lng": 145.145187 },
    { "lat": -37.774785, "lng": 145.137978 },
    { "lat": -37.819616, "lng": 144.968119 },
    { "lat": -38.330766, "lng": 144.695692 },
    { "lat": -39.927193, "lng": 175.053218 },
    { "lat": -41.330162, "lng": 174.865694 },
    { "lat": -42.734358, "lng": 147.439506 },
    { "lat": -42.734358, "lng": 147.501315 },
    { "lat": -42.735258, "lng": 147.438 },
    { "lat": -43.999792, "lng": 170.463352 },
]


// ----- not sure what this is used for -------//
// const options = {
//   imagePath:
//     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
// }


class ProfilePageLinh extends React.Component {
    constructor(props) {
        super(props);
        // state itineraries = {itinerary{}, id} -> itinerary = {name, dateRanges[], files, tags, recommended, shared}
        this.state = {names: [],
        itineraries: []};
    }

    componentDidMount() {
        let promises = [];
        let names = [];
        let upcoming= [];
        for (const itineraryID of this.props.authentication.itineraries) {
            promises.push(axios.get("http://localhost:9000/itinerary/" + itineraryID));
        }
        Promise.all(promises).then( response => {
            let i=0;
            for (const itineraryID of this.props.authentication.itineraries) {
                names.push(response[i].data[0].itinerary.name);
                upcoming.push({itinerary: response[i].data[0].itinerary, id: response[i].data[0].id});
                i++;
            }
            this.setState({names: names,
            itineraries: upcoming });
        }).catch( err => console.log(err));
    }

    createKey = (location) => {
        return location.lat + location.lng
    };

    googleLogOut = (response) => {
        this.props.logOut();
        console.log(response);
    };

    googleLogOutFailure = (response) => {
        console.log(response);
    };

    fbLogOut = () => {
        console.log(window);
        console.log("got here!");
        // window.FB.logout((response) => {console.log(response)});
        console.log("got to window.FB");
        console.log(this.props.authentication);
        this.props.logOut();
        console.log(this.props.authentication);
    };

    archivePopup = (itinerary) => {
        return (
            <div>
            <div style={{font: "15px Karla"}}>Do you want to archive this trip?</div>
            <Popup contentStyle={{width: "600px"}}trigger={<button className={"submit-button save-button"}>Yes</button>} modal>
                        {close => (
                            <div className="modal" style={{color: "black"}}>
                                <a className="close" onClick={close}>
                                    Done
                                </a>
                           {this.rating(itinerary)}
                            </div>
                        )}
                    </Popup>
            </div>
        );
    }

    rating=(itinerary) => {
        let val = 0;
        return (
        <div style={{padding: "2rem"}}>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="h3">How was your trip?</Typography>
          <Rating
            name="simple-controlled"
            value={val}
            onChange={(event, newValue) => {
              val = newValue;
              this.updateArchiveServer(itinerary)
            }}
          />
        </Box>
        </div>
        )}

    updateArchiveServer = (payload) => {
        this.props.updateArchive(payload);
        let newItinerariesArray = this.props.authentication.itineraries.slice();
        let indexToRemove = newItinerariesArray.findIndex((item) => {
           return payload.id === item.id;
        });
        newItinerariesArray.splice(indexToRemove, 1);
        // move to archived
        let newArchivedArray = this.props.authentication.archived.slice();
        newArchivedArray.push(payload.id);

        let updateBody = {
           archived: newArchivedArray,
           itineraries: newItinerariesArray
        };
        axios.patch("http://localhost:9000/user/save/archived/" + payload.id, updateBody)
        .then(res => {
            console.log("Archive updated for user: "  + res.data);
        })
        .catch(err => {
            console.log(err);
        });
        axios.patch("http://localhost:9000/itinerary/save/archive" + payload.id, payload)
                    .then(res=> {
                        console.log(res.data);
                    })
                    .catch(err=> {
                        console.log(err);
                    });
    }



    archiveButton = (itinerary) => {
        console.log('Itinerary Archive: ', itinerary);
        let endDate = new Date();
        let compare = new Date();
        if (itinerary.itinerary.dateRanges !== undefined && itinerary.itinerary.dateRanges.length > 0){
        let endDate = new Date(itinerary.itinerary.dateRanges[0].value[1]);
        if (endDate.getTime() < compare.getTime()) {
            return (<Popup contentStyle={{width: "600px"}}trigger={<IconButton aria-label='Notification' >
            <NotificationImportantIcon style={{fill: "white", width: 40, height: 40}} />
      </IconButton>} modal>
                        {close => (
                            <div className="modal" style={{color: "black"}}>
                                <a className="close" onClick={close}>
                                    &times;
                                </a>
                           {this.archivePopup(itinerary)}
                            </div>
                        )}
                    </Popup>
            );
        }
        } else return null;
    }

    render() {
        const StyledButton = withStyles({
            root: {
                position: 'relative',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 7,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                fontSize: '12pt',
                marginLeft: 'auto',
                marginRight: 'auto',
                alignSelf: 'center'
            }
        })(Button);
        const SectionBox = withStyles({
            root: {
                position: 'relative',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 7,
                border: 0,
                color: 'white',
                height: 48,
                width: '80%',
                padding: '30px',
                fontSize: '12pt',
                fontWeight: '500',
                margin: '15px 15px 0px'
            }
        })(Button);
        const SectionButton = withStyles({
            root: {
                position: 'relative',
                background: 'linear-gradient(45deg, #7fdbda 30%, #ade498 90%)',
                borderRadius: 7,
                border: 0,
                color: '#212121',
                height: 45,
                padding: '20px',
                fontSize: '12pt',
                fontWeight: '500',
                margin: '30px 15px',
                textAlign: 'center'
            }
        })(Button);

       


    

        const ItineraryList = () => {
            let returnRendering = [];
            let i=0;
                for (const itineraryID of this.props.authentication.itineraries) {
                    console.log(this.state.itineraries);
                    console.log(this.state.itineraries[0].name);
                    returnRendering.push(
                        <div key={uuid()}>
                        <div style={{width: "85%",  display: "inline"}} key={uuid()}>
                            <SectionBox key={uuid()} href={"itineraries/"+ itineraryID}> {this.state.itineraries[i].itinerary.name}</SectionBox>
                            <div style={{paddingTop:"20px", display: "inline"}}>
                        <EmailShareButton
                            className='center-button'
                            url={"localhost:3000/shared/"+itineraryID}
                            subject={title}
                            body="body"
                        >
                            <EmailIcon size={40} round />
                        </EmailShareButton>
                        </div>
                        <div style={{paddingTop:"20px", display: "inline", marginRight: "10px"}}>
                        <FacebookShareButton
                            className='center-button'
                        url={"localhost:3000/shared/"+itineraryID}
                        quote={title}
                        >
                        <FacebookIcon size={40} round  />
                        </FacebookShareButton>
                        </div>
                        </div>
                        <div  style={{width: "15%", display: "inline"}}> {this.archiveButton(this.state.itineraries[i].itinerary)}</div>
                        </div>);
                    i++;
                }
            return returnRendering;
        };



        const MapWithMarkerClusterer = () => {
            return (
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_API_KEY}
                    libraries={["places"]}>
                    <GoogleMap id='marker-example' mapContainerStyle={mapContainerStyle} zoom={3} center={center}>
                        <MarkerClusterer /*options={options}*/>
                            {(clusterer) =>
                                this.props.authentication.visited.map((location) => (
                                    <Marker key={this.createKey(location)} position={location} clusterer={clusterer} />
                                ))
                            }
                        </MarkerClusterer>
                    </GoogleMap>
                </LoadScript>
            )
        };

        const VerticalTabs = () => {
            const [value, setValue] = React.useState(0);

            const handleChange = (event, newValue) => {
                setValue(newValue);
            };

            return (
                <div>
                    <Tabs
                        orientation="vertical"
                        variant="standard"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                    >
                        <Tab label="Upcoming Trips" href="#upcoming"/>
                        <Tab label="Visited places" href="#visited" />
                        <Tab label="Archived Trips" href="#archived" />

                    </Tabs>

                </div>
            );
        };

        return (
            <React.Fragment>
                <div className="right-panel">
                    <div className="profile-logo-panel">
                        <img className="logo-position" src={require("../assets/trippin-logo.png")}/>
                    </div>
                    <div className="logo-panel-placeholder" />
                    <section id="upcoming" className="section-box">
                        <h2> You have {this.props.authentication.itineraries.length} upcoming Trips in </h2>
                        <ItineraryList/>
                        <SectionButton> NEW ITINERARY </SectionButton>
                    </section>
                    <section id="visited" className="section-box">
                        <h2> You have visited {this.props.authentication.visited.length} places! </h2>
                        <MapWithMarkerClusterer/>
                    </section>
                    <section id="archived" className="section-box">
                        <h2>Look back at your past trips here!</h2>
                    </section>
                </div>
                <div className="profile-left-panel">
                    <div className="profile-img">
                        <img src={this.props.authentication.profilePic} />
                    </div>
                    <div className="left-panel-text">
                        <p> {this.props.authentication.name} </p>
                        <p>Email Address: {this.props.authentication.email}</p>
                        <VerticalTabs />
                    </div>
                    {this.props.authentication.isGoogle ? (<GoogleLogout
                        render={(renderProps) =>  (
                            <StyledButton onClick={renderProps.onClick} disabled={renderProps.disabled}> LOGOUT </StyledButton> )}
                        clientId="839868194801-vofkpao3v7j2ktes9ojrramfk16gk9ec.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={this.googleLogOut}
                        onFailure={this.googleLogOutFailure}
                    >
                    </GoogleLogout>) :
                        (<StyledButton onClick={(e)=>{e.preventDefault(); this.fbLogOut()}}> LOGOUT </StyledButton>)}
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




export default connect(mapStateToProps, { logOut, updateArchive   })(ProfilePageLinh)
