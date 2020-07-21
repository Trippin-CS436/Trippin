import React from 'react';
import GoogleLogin from 'react-google-login';
import {Redirect, withRouter} from 'react-router-dom';
import  FacebookLogin  from 'react-facebook-login';
import {connect} from "react-redux";
import { logInOut, setUser } from "../actions";
// import { TiSocialFacebookCircular } from 'react-icons/lib/ti/social-facebook-circular';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    responseGoogle = (response) => {
        console.log(response);
    };

    responseFacebook = (response) => {
            this.props.logInOut(true);
            this.props.setUser({
                "name": response.name,
                "email": response.email
            });
            console.log(JSON.stringify(this.props.authentication));
            this.props.history.push('/home');
    };

    success = (response) => {
        this.props.logInOut(true);
        this.props.setUser({
            "name": response.getBasicProfile().getGivenName(),
            "email": response.getBasicProfile().getEmail()
        });
        console.log(JSON.stringify(this.props.authentication));
        this.props.history.push('/home');
    };



    render() {
        if (this.props.authentication.loginStatus === true) {
            return (
                <Redirect to="/home" />
            )
        }
        console.log(this.props.authentication);
        return (
            <div className='bg-login'>
                <GoogleLogin
                    clientId="839868194801-vofkpao3v7j2ktes9ojrramfk16gk9ec.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.success}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="google"
                />
                <br/>
                <FacebookLogin
                    appId="197967948192976"
                    autoLoad={true}
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


export default connect(mapStateToProps, { setUser, logInOut })(withRouter(Login));