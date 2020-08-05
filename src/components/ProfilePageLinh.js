import React from 'react';
import {connect} from "react-redux";
import {logOut, updateUserArchived, updateUserItinerary, changeView} from "../actions/index";
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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import { StylesProvider } from '@material-ui/core/styles';
import {Redirect, useHistory} from "react-router";
import {Link} from "react-router-dom";

const title = "My Itinerary";

let shareUrlObjectID = '';


const center = {lat: -28.024, lng: 140.887};

const locations = [
    {"lat": -31.56391, "lng": 147.154312},
    {"lat": -33.718234, "lng": 150.363181},
    {"lat": -33.727111, "lng": 150.371124},
    {"lat": -33.848588, "lng": 151.209834},
    {"lat": -33.851702, "lng": 151.216968},
    {"lat": -34.671264, "lng": 150.863657},
    {"lat": -35.304724, "lng": 148.662905},
    {"lat": -36.817685, "lng": 175.699196},
    {"lat": -36.828611, "lng": 175.790222},
    {"lat": -37.75, "lng": 145.116667},
    {"lat": -37.759859, "lng": 145.128708},
    {"lat": -37.765015, "lng": 145.133858},
    {"lat": -37.770104, "lng": 145.143299},
    {"lat": -37.7737, "lng": 145.145187},
    {"lat": -37.774785, "lng": 145.137978},
    {"lat": -37.819616, "lng": 144.968119},
    {"lat": -38.330766, "lng": 144.695692},
    {"lat": -39.927193, "lng": 175.053218},
    {"lat": -41.330162, "lng": 174.865694},
    {"lat": -42.734358, "lng": 147.439506},
    {"lat": -42.734358, "lng": 147.501315},
    {"lat": -42.735258, "lng": 147.438},
    {"lat": -43.999792, "lng": 170.463352},
]


// ----- not sure what this is used for -------//
// const options = {
//   imagePath:
//     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
// }


class ProfilePageLinh extends React.Component {
    constructor(props) {
        super(props);
        this.props.changeView(-1);
        this.state = {
            names: [],
            shareUrlObjectID: [],
            newTripName: null
        };
    }

    componentDidMount() {
        let promises = [];
        let names = [];
        let shareUrlObjectID = [];
        for (const itineraryID of this.props.authentication.itineraries) {
            promises.push(axios.get("http://localhost:9000/itinerary/" + itineraryID));
        }
        Promise.all(promises).then(response => {
            let i = 0;
            for (const itineraryID of this.props.authentication.itineraries) {
                names.push(response[i].data[0].itinerary.name);
                shareUrlObjectID.push(response[i].data[0]._id);
                i++;
            }
            this.setState({
                names: names,
                shareUrlObjectID: shareUrlObjectID
            });
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
        window.FB.logout((response) => {console.log(response)});
        console.log("got to window.FB");
        console.log(this.props.authentication);
        this.props.logOut();
        console.log(this.props.authentication);
    };

    render() {
        const style = theme =>({
            root: {
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 7,
                border: 0,
                color: 'white',
                [theme.breakpoints.up('md')]: {
                    position: 'relative',
                    height: 48,
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
        const SectionBox = withStyles({
            root: {
                position: 'relative',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 7,
                border: 0,
                color: 'white',
                height: 48,
                width: '83%',
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
                left: "40%"
            }
        })(Button);

        const deleteItineraryFunction = (id) => {
            let updatedIdList = this.props.authentication.itineraries.filter(item => (item !== id));
            axios.patch('http://localhost:9000/user/save/itineraries/' + this.props.authentication.id,
                {itineraries: updatedIdList}).then( res => {
                this.props.updateUserItinerary(updatedIdList);
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
                    <DeleteForeverIcon className={"delete-btn"} color="secondary"/>
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
            let i = 0;
            for (const itineraryID of this.props.authentication.itineraries) {
                console.log(this.state.names[i]);
                returnRendering.push(
                    <div>
                        <SectionBox key={itineraryID}
                                    href={"/itineraries/" + itineraryID}> {this.state.names[i]} </SectionBox>

                        {console.log("shareURL right before set is " + this.state.shareUrlObjectID[i])}
                        <EmailShareButton
                            key={itineraryID}
                            className='center-button'
                            url={"localhost:3000/shared/" + this.state.shareUrlObjectID[i]}
                            subject={title}
                            body="body"
                        >
                            <EmailIcon size={32} round/>
                        </EmailShareButton>
                        <FacebookShareButton
                            key={itineraryID}
                            className='center-button'
                            url={"localhost:3000/shared/" + this.state.shareUrlObjectID[i]}
                            quote={title}
                        >
                            <FacebookIcon size={32} round/>
                        </FacebookShareButton>
                        <DeleteItineraryButton key={itineraryID} name={this.state.names[i]} id={itineraryID}/>
                    </div>);
                i++;
            }
            return returnRendering;
        };

        const mapContainerStyle = {
            height: "300px",
            width: '90%',
            left: '5%',
            marginTop: '10px',
            marginBottom: '10px'
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
                                    <Marker key={this.createKey(location)} position={location} clusterer={clusterer}/>
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
                        <img className="logo-position" src={require("../assets/trippin-logo.png")}/>
                    </div>
                    <div className="logo-panel-placeholder"/>
                    <section id="upcoming" className="section-box">
                        <h2> You have {this.props.authentication.itineraries.length} upcoming Trips in </h2>
                        <ItineraryList/>
                        <SectionButton> <Link to={"/itineraries"}>NEW ITINERARY </Link></SectionButton>
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
        authentication: state.authentication
    };
};


export default connect(mapStateToProps, {logOut, updateUserArchived, updateUserItinerary, changeView})(ProfilePageLinh)
