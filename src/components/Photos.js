import React from "react";
import  {connect}  from 'react-redux';
import  {addPhotos} from '../actions/addPhotos'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Paper } from '@material-ui/core';

class InfoPhotos extends React.Component {
    constructor(props){
        super(props);
        let newArray = this.props.location.slice();
        let indexOfLocation= newArray.findIndex((item) => {
            return this.props.id == item.id;
        });
        this.state = {
            currentLocation: this.props.location[indexOfLocation],
           photos: this.props.location[indexOfLocation].userPhotos,
           index: indexOfLocation
           // userImages image object will change when database added: {fileName:"name", fileLoc:"../imgs/name.jpg"}
        };
    }



    render() {
        
        return(
            <div className="photos">
            <div className="photos-display">
            <Paper elevation={2} style={{maxWidth: 600, maxHeight: 200, overflow: 'auto', margin: "1rem 1rem 1rem 1rem"}}>

        <GridList className="gridList" style={{ display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around', width: 600, height:200, spacing: "0"}} cols={5}>
          {this.state.photos.map((photo, index) => (
            <GridListTile style={{width: "200px"}} key={index} cols={5}>
            <img src={photo.path} alt="Photo" />
            </GridListTile>
          ))}
        </GridList>
        </Paper>

            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        locations: state.locations
    }
}

export default connect(mapStateToProps, {addPhotos})(InfoPhotos); 

