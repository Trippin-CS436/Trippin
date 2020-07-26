import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone';
import  {connect}  from 'react-redux';
import  {addPhotos} from '../actions/addPhotos';
import Button from '@material-ui/core/Button';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import IconButton from '@material-ui/core/IconButton';
 
export class DropzoneDialogButton extends Component {
    constructor(props) {
        super(props);
        let newArray = this.props.location.slice();
        let indexOfLocation= newArray.findIndex((item) => {
            return this.props.id == item.id;
        });
        this.state = {
            open: false,
            files: [],
            currentLocation: this.props.location[indexOfLocation],
           photos: this.props.location[indexOfLocation].userPhotos,
           index: indexOfLocation
        };
    }
 
    handleClose() {
        this.setState({
            open: false
        });
    }
 
    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.props.addPhotos({files: files, index: this.state.index});
        this.setState({
            files: files,
            open: false,
            photos: this.props.locations[this.state.index].userPhotos
        });

    }
 
    handleOpen() {
        this.setState({
            open: true,
        });
    }
 
    render() {
        let photos = this.props.locations[this.state.index].userPhotos;
        return (
            <div>


                <IconButton aria-label="Add Photo" name="Add Photo" onClick={this.handleOpen.bind(this)}>
                <AddAPhotoOutlinedIcon />
                </IconButton>

                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />

            
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        currentLocation: state.currentLocation,
        locations: state.locations,
    }
}

export default connect(mapStateToProps, {addPhotos})(DropzoneDialogButton); 
