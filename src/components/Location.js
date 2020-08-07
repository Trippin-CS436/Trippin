import React from "react";
import './Iteneraries.css';
import Notes from "./Notes";
import Info from "./Info";
import DropPhotos from "./DropPhotos";
import Photos from "./Photos";
import InfoPhotos from "./InfoPhotos";
import {connect} from "react-redux";
import {deleteLocation} from "../actions";
import IconButton from '@material-ui/core/IconButton';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import {DropzoneDialog} from 'material-ui-dropzone';
import  {addPhotos} from '../actions/addPhotos';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

class Location extends React.Component {
    constructor(props){
        super(props);
        let newArray = this.props.locations.slice();
        let indexOfLocation= newArray.findIndex((item) => {
            return this.props.id == item.id;
        });
        this.state = {
            showNotes: false,
            showInfo: false,
            showPhotos: false,
            open: false,
            photoFiles: [],
            currentLocation: this.props.locations[indexOfLocation],
           index: indexOfLocation
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

    // Dropzone Functions
    handleClose() {
        this.setState({
            open: false
        });
    }

     encoder =(file) => {
    // encode function
    let encode = new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
     reader.onloadend = function() {
    console.log('RESULT', reader.result);
    resolve(reader.result);
    }
    });
    let testPhoto = null;
    testPhoto = encode.then(photo => {
        return photo;
    });
    return testPhoto;
    }

    async handleSave(photos) {
        this.setState({
            photoFiles: photos,
            open: false
        });
        let photoArray = [];
        photos.forEach(photo => photoArray.push(this.encoder(photo)));
        Promise.all(photoArray).then((photosEncoded) => {
            console.log("Photos: ", photosEncoded);
            this.props.addPhotos({photoFiles: photosEncoded, index: this.state.index});
          });
    }

    handleOpen() {
        this.setState({
            open: true,
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
           console.log(this.state.photo);
           return (
               <div>
              <img src={this.state.photo} />
                <Photos location={this.props.locations} idx={this.props.idx} id={this.props.id}/>
            </div>
           );   
    } else if (this.state.showAddPhotos) {
        return (
            
            <DropzoneDialog
            open={this.state.open}
            onSave={this.handleSave.bind(this)}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp','image/gif', 'video/mpeg']}
            showPreviews={true}
            maxFileSize={100000}
            onClose={this.handleClose.bind(this)}
        />
        )
    }
    
    else 
       return null;
    }

    render() {

        return(
            <div className="outer">
            <div className="location-bar">
                <label className={"location"}>{this.props.name} </label>
                <label className={"address"}> {this.props.address}</label>
                <div className="display-notes">
                    {this.renderSubComp()}
                </div>
                <br className={'media'} />
                <br className={'media-2'} />
            </div>
                <div className={"buttonDiv"}>

                <IconButton className={"btn"} aria-label="Info" name="Info" onClick={this.handleInfoBtnClick}>
                <ExpandMoreOutlinedIcon style={{color: "white"}} />
                </IconButton>


                <IconButton className={"btn"} aria-label="Edit" name="Edit" onClick={this.handleEditBtnClick}>
                <NotesOutlinedIcon style={{color: "white"}}/>
                </IconButton>

                <IconButton className={"btn"} aria-label="Photo" name="Photo" onClick={this.handlePhotoBtnClick}>
                <PhotoCameraOutlinedIcon style={{color: "white"}}/>
                </IconButton>
                
                <IconButton aria-label="AddPhoto" name="AddPhoto" onClick={this.handleOpen.bind(this)} >
                <AddAPhotoOutlinedIcon style={{color: "white"}}/>
                </IconButton>

                <IconButton className={"btn"} aria-label="Delete"  name="Delete" onClick={() => this.props.deleteLocation(this.props.id)}>
                <DeleteOutlineRoundedIcon style={{color: "white"}}/>
                </IconButton>

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

export default connect(mapStateToProps, {deleteLocation, addPhotos})(Location);
