import React from "react";
import './Iteneraries.css';
import Notes from "./Notes";
import Info from "./Info";
import DropPhotos from "./DropPhotos";
import Photos from "./Photos";
import InfoPhotos from "./InfoPhotos";
import {connect} from "react-redux";
import {deleteLocation} from "../actions";
import './Location.css';
//import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import PhotoAlbumOutlinedIcon from '@material-ui/icons/PhotoAlbumOutlined';

class Location extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showNotes: false,
            showInfo: false,
            showPhotos: false
        };
        this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
        this.handleInfoBtnClick = this.handleInfoBtnClick.bind(this);
        this.handlePhotoBtnClick = this.handlePhotoBtnClick.bind(this);
        this.handleAddPhotoBtnClick = this.handleAddPhotoBtnClick.bind(this);


    }

    handleEditBtnClick() {
        this.setState({
            showNotes: !this.state.showNotes,
            showInfo: false,
            showPhotos: false,
            showAddPhotos: false
        })
    }

    handleInfoBtnClick() {
        this.setState({
            showNotes: false,
            showInfo: !this.state.showInfo,
            showPhotos: false,
            showAddPhotos: false
        })
    }

    handlePhotoBtnClick() {
        this.setState({
            showNotes: false,
            showInfo: false,
            showPhotos: !this.state.showPhotos,
            showAddPhotos: false
        })
    }

    handleAddPhotoBtnClick() {
        this.setState({
            showNotes: false,
            showInfo: false,
            showPhotos: false, 
            showAddPhotos: !this.state.showAddPhotos
        });
    }

    renderSubComp(){
       if (this.state.showNotes) {
           const currLoc = this.props.locations[this.props.idx];
           console.log(currLoc);
         return <Notes location={this.props.locations} idx={this.props.idx} id={this.props.id}/>
        }
        else if (this.state.showInfo) {
            const currLoc = this.props.locations[this.props.idx];
           console.log(currLoc);
            return <Info location={this.props.locations} idx={this.props.idx} id={this.props.id}/>
        }
       else if (this.state.showPhotos) {
           return <InfoPhotos location={this.props.locations} idx={this.props.idx} id={this.props.id}/>
       
    } else 
       return null;
    }

    render() {

        return(
            <div>
            <div className="location-bar">
                <label className={"location"}>{this.props.name} </label>
                <label className={"address"}> {this.props.address}</label>
                <div className={"buttonDiv"}>

                <IconButton className={"btn"} aria-label="Info" name="Info" onClick={this.handleInfoBtnClick}>
                <ExpandMoreOutlinedIcon />
                </IconButton>


                <IconButton className={"btn"} aria-label="Edit" name="Edit" onClick={this.handleEditBtnClick}>
                <NotesOutlinedIcon />
                </IconButton>



                <IconButton className={"btn"} aria-label="Photo" name="Photo" onClick={this.handlePhotoBtnClick}>
                <PhotoAlbumOutlinedIcon />
                </IconButton>
                
                <IconButton aria-label="Photo" name="Photo" >
                <DropPhotos location={this.props.locations} idx={this.props.idx} id={this.props.id}/>
                </IconButton>

                <IconButton className={"btn"} aria-label="Delete"  name="Delete" onClick={() => this.props.deleteLocation(this.props.id)}>
                <DeleteOutlineRoundedIcon />
                </IconButton>




                </div>
            </div>
            <div className="display-notes">
            {this.renderSubComp()}
            </div>
            </div>
        );
    }
}


const mapStateToProps = (state) =>{
    return {
        locations: state.locations,
    };
};

export default connect(mapStateToProps, {deleteLocation})(Location);
