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

    logInfo(response, name, email, profilePic, method) {
        console.log("http://localhost:9000/user/" + email);
        axios.get("http://localhost:9000/user/" + email).then(
            res => {
                if (res.data.length > 0) {
                    this.props.logIn({
                        id: res.data[0]._id,
                        isGoogle: method,
                        loginStatus: true,
                        name: name,
                        email: email,
                        profilePic: profilePic,
                        visited: res.data[0].visited,
                        itineraries: res.data[0].itineraries,
                        archived: res.data[0].archived
                    });
                } else {
                    axios.post("http://localhost:9000/user/newUser/", {email: email}).then(
                        resp => {
                            this.props.logIn({
                                id: resp,
                                isGoogle: method,
                                loginStatus: true,
                                name: name,
                                email: email,
                                profilePic: profilePic,
                                visited: [],
                                itineraries: [],
                                archived: []
                            });
                        }).catch(err => console.log("Err" + err));
                }
                this.props.history.push('/userprofile');
            }).catch(err => console.log("Err" + err));
    };

    responseGoogle = (response) => {
        console.log(response);
    };

    responseFacebook = (response) => {
        console.log(response);
        let name = response.name;
        let email = response.email;
        let profilePic = response.picture.data.url;
        this.logInfo(response, name, email, profilePic, false);
    };

    success = (response) => {
           let name =  response.getBasicProfile().getGivenName();
           let email =  response.getBasicProfile().getEmail();
           let profilePic =  response.getBasicProfile().getImageUrl();
           profilePic = profilePic.split("96-c")[0] + "140-c";
           console.log("----This is the Profile Pic After Substring-------");
           console.log(profilePic);
           this.logInfo(response, name, email, profilePic, true);
        console.log(JSON.stringify(this.props.authentication));
    };



    render() {
        console.log(window);
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
                    fields="name,email,picture.type(large)"
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