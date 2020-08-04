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
            info: this.props.location[indexOfLocation].info,
           photos: this.props.location[indexOfLocation].info.placePhotoUrls,
           index: indexOfLocation
           // userImages image object will change when database added: {fileName:"name", fileLoc:"../imgs/name.jpg"}
        };
    }




    render() {
        let photos = this.state.photos;
        if (photos === undefined) {
            photos = [];
        }
        console.log('Photos to render', photos);
        return(
            <div className="photos">
            <div className="photos-display">
            <Paper elevation={2} style={{maxWidth: 700, maxHeight: 250, overflow: 'auto', margin: "1rem 1rem 1rem 1rem"}}>

            <GridList className="gridList" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', width: 1000, spacing: "0"}} cols={10}>
          {photos.map((url) => (
            <GridListTile style={{width: "200px", spacing: "0", height: "200px"}} key={url} cols={10}>
            {}
              <img src={url} />
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
        currentLocation: state.currentLocation,
        locations: state.locations
    }
}

export default connect(mapStateToProps, {addPhotos})(InfoPhotos); 

