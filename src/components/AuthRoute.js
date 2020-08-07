import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = props => {
    const { authentication } = props;
    if (authentication.loginStatus === false) return <Redirect to="/login" />;
    return <Route {...props} />;
};

const mapStateToProps = (state) => ({
    authentication: state.authentication
});

export default connect(mapStateToProps)(AuthRoute);