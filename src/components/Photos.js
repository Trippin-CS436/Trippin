import React from "react";
import  {connect}  from 'react-redux';
import  {deletePhoto} from '../actions/deletePhoto';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';


class Photos extends React.Component {
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

    photoDisplay = () => {
        let photosToRender = [];
        if (this.props.locations[this.state.index].userPhotos !== undefined && this.props.locations[this.state.index].userPhotos.length > 0) {
            photosToRender = this.props.locations[this.state.index].userPhotos;
        return(
            <div className="photos">
            <div className="photos-display">
            <Box fontWeight="fontWeightLight" p={2} mb={2}  borderColor="transparent">
                <Typography variant="h5" >User Photos</Typography>
            </Box>
        
        <GridList className="gridList" style={{ transform: 'translateZ(0)', display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-around', spacing: "0"}} cols={5}>
          {photosToRender.map((photo, index) => (
            <GridListTile  key={photo.name} >
            <img src={URL.createObjectURL(photo)} alt="User Image" />
            <GridListTileBar
              title={photo.name}
              actionIcon={
                <IconButton onClick={this.delPhoto} value={index} aria-label={`star ${photo.name}`} >
                  <DeleteForeverIcon />
                </IconButton>
              }
            />
            </GridListTile>
          ))}
        </GridList>
            </div>
            </div>
        );
  } else return <h4>No Images to display. Import Images.</h4>;
  }

  delPhoto = (event) => {
      this.props.deletePhoto({
        locID: this.props.id, 
        imgIndex: event.currentTarget.value
      });
  }



    render() {
       
        return(
            <div className="photos">
            {this.photoDisplay()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        locations: state.locations
    }
}

export default connect(mapStateToProps, {deletePhoto})(Photos); 

