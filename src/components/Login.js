import React from 'react';
import GoogleLogin from 'react-google-login';
import  FacebookLogin  from 'react-facebook-login';
import {connect} from "react-redux";
import { logIn, logOut } from "../actions";
import { withRouter } from 'react-router'
// import { TiSocialFacebookCircular } from 'react-icons/lib/ti/social-facebook-circular';
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    responseGoogle = (response) => {
        console.log(response);
    };

    responseFacebook = (response) => {
        console.log(response);
        let name = response.name;
        let email = response.email;
        let profilePic = response.picture.data.url;
        axios.get("http://localhost:9000/user/" + response.email).then(
            res => {
                if (res.data.length > 0) {
                    this.props.logIn({
                       //  id: res.data[0]._id,
                        loginStatus: true,
                        name: name,
                        email: email,
                        profilePic: profilePic,
                        visited: res.data[0].visited,
                        itineraries: res.data[0].itineraries

                    });
                }
                else {
                    axios.post("http://localhost:9000/user/newUser/", {email: email}).then(
                        resp => {
                            this.props.logIn({
                                // id: resp._id,
                                loginStatus: true,
                                name: name,
                                email: email,
                                profilePic: profilePic,
                                visited: [],
                                itineraries: []
                            });
                        }).catch(err => console.log("Err" + err));
                }
            }).catch(err => console.log("Err" + err));
            console.log(JSON.stringify(this.props.authentication));
            this.props.history.push('/');
    };

    success = (response) => {
           let name =  response.getBasicProfile().getGivenName();
           let email =  response.getBasicProfile().getEmail();
           let profilePic =  response.getBasicProfile().getImageUrl();
        axios.get("http://localhost:9000/user/" + email).then(
            res => {
                if (res.data.length > 0) {
                    this.props.logIn({
                        // id: res.data[0].id,
                        loginStatus: true,
                        name: name,
                        email: email,
                        profilePic: profilePic,
                        visited: res.data[0].visited,
                        itineraries: res.data[0].itineraries

                    });
                }
                else {
                    axios.post("http://localhost:9000/user/newUser/", {email: email}).then(
                        resp => {
                            this.props.logIn({
                                // id: resp,
                                loginStatus: true,
                                name: name,
                                email: email,
                                profilePic: profilePic,
                                visited: [],
                                itineraries: []
                            });
                        }).catch(err => console.log("Err" + err));
                }
            }).catch(err => console.log("Err" + err));
        console.log(JSON.stringify(this.props.authentication));
        this.props.history.push('/');

    };



    render() {
        console.log(this.props.authentication);
        return (
            <div className='bg-login'>
                    <img className="smallIcon-login" src={require("../assets/trippin-logo-bottom.png")}></img>
                <br/>
                <GoogleLogin
                    clientId="839868194801-vofkpao3v7j2ktes9ojrramfk16gk9ec.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.success}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="google"
                    redirectUri="http://me.trippin.com:3000/userprofile"
                />
                <br/>
                <FacebookLogin
                    appId="197967948192976"
                    autoLoad={false}
                    icon="fa-facebook"
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    cssClass="facebook"/>
            </div>

        )
    }

};

const mapStateToProps = (state) => { //name is by convention
    return {
        authentication: state.authentication
    }; //now it will appear as props
};


export default connect(mapStateToProps, { logIn, logOut })(withRouter(Login));