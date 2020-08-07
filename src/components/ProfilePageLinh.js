import React from 'react';
import {connect} from "react-redux";
import {logOut, updateUserItinerary, changeView} from "../actions/index";
import {reset} from '../actions/reset';
import { updateArchive } from "../actions/updateArchive";
import "./ProfilePageLinh.css";
import {GoogleMap, LoadScript, MarkerClusterer, Marker} from "@react-google-maps/api";
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon
} from "react-share";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {GoogleLogout} from 'react-google-login';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Popup from "reactjs-popup";
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import IconButton from "@material-ui/core/IconButton";
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { StylesProvider } from '@material-ui/core/styles';
import {Redirect, useHistory} from "react-router";
import {Link} from "react-router-dom";
import {updateVisited} from "../actions/updateVisited";
import MapWithMarkerClusterer from "./MapWithMarkerClusterer";
import ArchiveIcon from '@material-ui/icons/Archive';


const { uuid } = require('uuidv4');
const title = "My Itinerary";

let shareUrlObjectID = '';

const center = {lat: -28.024, lng: 140.887};

// const locations = [
//     {"lat": -31.56391, "lng": 147.154312},
//     {"lat": -33.718234, "lng": 150.363181},
//     {"lat": -33.727111, "lng": 150.371124},
//     {"lat": -33.848588, "lng": 151.209834},
//     {"lat": -33.851702, "lng": 151.216968},
//     {"lat": -34.671264, "lng": 150.863657},
//     {"lat": -35.304724, "lng": 148.662905},
//     {"lat": -36.817685, "lng": 175.699196},
//     {"lat": -36.828611, "lng": 175.790222},
//     {"lat": -37.75, "lng": 145.116667},
//     {"lat": -37.759859, "lng": 145.128708},
//     {"lat": -37.765015, "lng": 145.133858},
//     {"lat": -37.770104, "lng": 145.143299},
//     {"lat": -37.7737, "lng": 145.145187},
//     {"lat": -37.774785, "lng": 145.137978},
//     {"lat": -37.819616, "lng": 144.968119},
//     {"lat": -38.330766, "lng": 144.695692},
//     {"lat": -39.927193, "lng": 175.053218},
//     {"lat": -41.330162, "lng": 174.865694},
//     {"lat": -42.734358, "lng": 147.439506},
//     {"lat": -42.734358, "lng": 147.501315},
//     {"lat": -42.735258, "lng": 147.438},
//     {"lat": -43.999792, "lng": 170.463352},
// ]


// ----- not sure what this is used for -------//
// const options = {
//   imagePath:
//     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
// }


class ProfilePageLinh extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visited:  this.props.authentication.visited,
        }
    }


    componentDidMount() {
        let promises = [];
        let upcoming= [];
        for (const itineraryID of this.props.authentication.itineraries) {
            promises.push(axios.get("http://localhost:9000/itinerary/" + itineraryID));
        }
        Promise.all(promises).then(response => {
            let i = 0;
            for (const itineraryID of this.props.authentication.itineraries) {
                upcoming.push({itinerary: response[i].data[0].itinerary, id: response[i].data[0].id, shareUrlObjectID: response[i].data[0]._id });
                i++;
            }
            this.props.updateArchive({itineraries: this.props.authentication.itineraries,
                archived: this.props.authentication.archived, profilePageItineraries: upcoming})
        }).catch(err => console.log(err));
        console.log(this.props.authentication);
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
              itinerary.rating = val;
              this.updateArchiveServer(itinerary);
              this.updateVisitedServer();
            }}
          />
        </Box>
        </div>
        )}

    updateArchiveServer = (payload) => {
        //change itineraries state
        console.log("THIS IS RATING: " + payload.rating);
        console.log(payload);

        let newItinerariesArray = this.props.authentication.itineraries.slice();
        let newStateItineraries = this.props.authentication.profilePageItineraries.slice();
        let indexToRemove = newItinerariesArray.findIndex((item) => {
            return payload.id === item.id;
        });
        let indexStateRemove = newStateItineraries.findIndex((item) => {
            return payload.id === item.id;
        });
        newItinerariesArray.splice(indexToRemove, 1);
        newStateItineraries.splice(indexStateRemove, 1);
        // move to archived
        let newArchivedArray = this.props.authentication.archived.slice();
        newArchivedArray.push(payload.id);

        let updateBody = {
            archived: newArchivedArray,
            itineraries: newItinerariesArray
        };

        let itinerary = payload.itinerary;
        itinerary.rating = payload.rating;
        axios.patch("http://localhost:9000/user/save/archived/" + this.props.authentication.id, updateBody)
            .then(res => {
                console.log("Archive updated for user: " + res.data);
                this.props.updateArchive({...updateBody, profilePageItineraries: newStateItineraries});
            })
            .catch(err => {
                console.log(err);
            });
        axios.patch("http://localhost:9000/itinerary/save/archive/" + payload.id, {itinerary:itinerary})
            .then(res=> {
                console.log(res.data);
            })
            .catch(err=> {
                console.log(err);
            });
    };

    updateVisitedServer() {
        let locations = this.props.locations.slice();
        locations = locations.map(loc => ({lat: loc.lat, lng: loc.lon}));
        console.log("=========LOCATIONS==========")
        console.log(locations);

        let visited = this.props.authentication.visited.slice();
        visited = visited.concat(locations);
        console.log(visited);

        let updateBody = {
            visited: visited,
        };

        axios.patch("http://localhost:9000/user/save/visited/" + this.props.authentication.id, updateBody)
            .then(res => {
                this.props.updateVisited(updateBody);
            })
            .catch(err => {
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
            <ArchiveIcon style={{fill: "white", width: 38, height: 38, marginLeft:-55,marginBottom:-5}} />
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
    };


    render() {
        const style = theme =>({
            root: {
                background: '#ec407a',
                borderRadius: 15,
                border: 0,
                color: '#212121',
                fontWeight: '700',
                [theme.breakpoints.up('md')]: {
                    position: 'relative',
                    height: 40,
                    padding: '0 30px',
                    fontSize: '12pt',
                    left: "25%",
                    right: "25%",
                    minWidth: "30px"
                },
                [theme.breakpoints.down('md')]: {
                    position: 'fixed',
                    height: 25,
                    padding: '0 30px',
                    fontSize: '10pt',
                    right: "10px",
                    top: "10px",
                    minWidth: "30px"
                }
            }
        });
        const StyledButton = withStyles(style)(Button);
        const sectionStyle = theme => ({
            root: {
                position: 'relative',
                    background: 'linear-gradient(315deg, #32407b 0%, #515585 74%)',
                    borderRadius: 15,
                    border: 0,
                    color: 'white',
                    height: 48,
                    width: '80%',
                    padding: '30px',
                    fontSize: '10pt',
                    fontWeight: '700',
                    margin: '15px 15px 0px',
                [theme.breakpoints.down('md')]: {
                    width: '90%'
                }
            }
        });
        const SectionBox = withStyles(sectionStyle)(Button);
        const SectionButton = withStyles({
            root: {
                position: 'relative',
                background: "#ec407a",
                borderRadius: 15,
                border: 0,
                color: '#212121',
                height: 45,
                padding: '20px',
                fontSize: '12pt',
                fontWeight: '600',
                margin: '30px 15px',
                left: "40%"
            }
        })(Button);

        const deleteItineraryFunction = (id) => {
            let updatedIdList = this.props.authentication.itineraries.filter(item => (item !== id));
            axios.patch('http://localhost:9000/user/save/itineraries/' + this.props.authentication.id,
                {itineraries: updatedIdList}).then( res => {
                let newStateItineraries = this.props.authentication.profilePageItineraries.filter(item => (item.id !== id));
                this.props.updateArchive({itineraries: updatedIdList, archived: this.props.authentication.archived, profilePageItineraries: newStateItineraries});
                axios.delete('http://localhost:9000/itinerary/delete/' + id).then(resp => console.log(resp)).catch(err => console.log(err));
            }).catch(err => console.log(err));




/*            axios.delete('http://localhost:9000/itinerary/delete/' + id).then( res => {
                updatedIdList = this.props.authentication.itineraries.filter(item => (item !== id));
                this.props.updateUserItinerary(updatedIdList);
                axios.patch('http://localhost:9000/user/save/')
            }).catch(err => console.log(err));*/
        };

        const DeleteItineraryButton = (props) => {
            return (
                <Popup className="widthFix" trigger={
                    <IconButton className="icon-btn" aria-label="Delete"  name="Delete">
                    <DeleteForeverIcon  style={{width: 37, height: 37, fill:"white", top: -5, left:-20}} className={"delete-btn"} color="secondary"/>
                    </IconButton>} modal>
                    {close => (
                        <div className="modal">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <div className="header"> Warning Message </div>
                            <div className="content">
                                Are you sure you want to delete {props.name} trip?
                            </div>
                            <div className="actions">
                                <button
                                    className="modal-button"
                                    onClick={() => {
                                        deleteItineraryFunction(props.id);
                                        close();
                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    className="modal-button"
                                    onClick={() => {
                                        close();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
            )
        };

        const ItineraryList = () => {
            let returnRendering = [];
            let i=0;
                for (const itinerary of this.props.authentication.profilePageItineraries) {
                    returnRendering.push(
                        <div key={uuid()}>
                        <div style={{width: "100%",  display: "inline"}} key={uuid()}>
                            <SectionBox style={{width:"75%"}} key={uuid()} href={"itineraries/"+ itinerary.id}>{itinerary.itinerary.name}</SectionBox>
                            <div style={{paddingTop:"20px", display: "inline"}}>
                        <EmailShareButton
                            key={itinerary.id}
                            className='center-button'
                            url={"localhost:3000/shared/" + itinerary.shareUrlObjectID}
                            subject={title}
                            body={"Check out my Trippin' itinerary, "+ this.props.itinerary.name + "!\n"}
                        >
                            <EmailIcon size={40} round />
                        </EmailShareButton>
                        </div>
                        <div style={{paddingTop:"20px", display: "inline", marginRight: "10px"}}>
                        <FacebookShareButton
                            key={itinerary.id}
                            className='center-button'
                            url={"localhost:3000/shared/" + itinerary.shareUrlObjectID}
                            quote={"Check out my Trippin' itinerary, "+ this.props.itinerary.name + "!\n"}
                        >
                        <FacebookIcon size={40} round  />
                        </FacebookShareButton>
                        </div>
                            <DeleteItineraryButton key={itinerary.id} name={itinerary.itinerary.name} id={itinerary.id}/>
                        </div>
                        <div  style={{width: "25%", display: "inline"}}> {this.archiveButton(itinerary)}</div>
                        </div>);
                    i++;
                }
            return returnRendering;
        };

        const VerticalTabs = () => {
            const [value, setValue] = React.useState(0);

            const handleChange = (event, newValue) => {
                setValue(newValue);
            };

            return (
                <div className="tab-vertical">
                    <Tabs
                        orientation="vertical"
                        variant="standard"
                        value={value}
                        onChange={handleChange}
                        aria-label="Tabs for sections"
                    >
                        <Tab className="noHover" label="Upcoming Trips" href="#upcoming"/>
                        <Tab className="noHover" label="Visited places" href="#visited"/>
                        <Tab className="noHover" label="Archived Trips" href="#archived"/>

                    </Tabs>

                </div>
            );
        };
        const HorizontalTabs = () => {
            const [value, setValue] = React.useState(0);

            const handleChange = (event, newValue) => {
                setValue(newValue);
            };

            return (
                <div className="tab-horizontal">
                    <Tabs
                        orientation="horizontal"
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="Tabs for sections"
                    >
                        <Tab className="noHover" label="Upcoming Trips" href="#upcoming"/>
                        <Tab className="noHover" label="Visited places" href="#visited"/>
                        <Tab className="noHover" label="Archived Trips" href="#archived"/>

                    </Tabs>

                </div>
            );
        };
        return (
            <React.Fragment>
                <div className="right-panel">
                    <div className="profile-logo-panel">
                        <img className="logo-position" src={require("../assets/logo_white.png")}/>
                    </div>
                    <div className="logo-panel-placeholder"/>
                    <section id="upcoming" className="section-box">
                        <h2 className="h2"> You have {this.props.authentication.itineraries.length} upcoming Trips in </h2>
                        <ItineraryList/>
                        <SectionButton className='noHover' href="/itineraries">NEW ITINERARY</SectionButton>
                    </section>
                    <section id="visited" className="section-box">
                        <h2 className="h2"> You have visited {this.props.authentication.visited.length} places! </h2>
                        <MapWithMarkerClusterer/>
                    </section>
                    <section id="archived" className="section-box">
                        <h2 className="h2">Look back at your past trips <a href={'/archive'}>here!</a></h2>
                    </section>
                </div>
                <div className="profile-left-panel">
                    <div className="profile-img">
                        <img src={this.props.authentication.profilePic}/>
                    </div>
                    <div className="left-panel-text">
                        <p> {this.props.authentication.name} </p>
                        <p className="tab-vertical">Email Address: {this.props.authentication.email}</p>
                        <VerticalTabs/>
                        <HorizontalTabs/>
                    </div>
                    {this.props.authentication.isGoogle ? (<GoogleLogout
                            render={(renderProps) => (
                                <StyledButton onClick={renderProps.onClick}
                                              disabled={renderProps.disabled}> LOGOUT </StyledButton>)}
                            clientId="839868194801-vofkpao3v7j2ktes9ojrramfk16gk9ec.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={this.googleLogOut}
                            onFailure={this.googleLogOutFailure}
                        >
                        </GoogleLogout>) :
                        (<StyledButton onClick={(e) => {
                            e.preventDefault();
                            this.fbLogOut()
                        }}> LOGOUT </StyledButton>)}
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
        locations: state.locations,
        itinerary: state.itinerary,
    };
};


export default connect(mapStateToProps, {updateVisited, logOut, updateUserItinerary, changeView, updateArchive, reset})(ProfilePageLinh)
