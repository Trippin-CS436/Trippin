import React from 'react'
import { withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

class Navbar extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.navbar}>
                <Button href="/" className={classes.link}>Home</Button>
                <Button href="/itineraries" className={classes.link}>Itineraries</Button>
                <Button href="/archive" className={classes.link}>Archived Trips</Button>
                <Button href="/list" className={classes.link}>Your Lists</Button>
            </div>
        )
    }
}

const style = {
    navbar: {
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        overflow: "hidden",
        width: "100vw",
        zIndex: "0"
    },
    link: {
        float: "left",
        color: "white",
        textAlign: "center",
        padding: "5px 20px",
        textDecoration: "none",
        fontSize: "17px"
}
};

export default withStyles(style)(Navbar);