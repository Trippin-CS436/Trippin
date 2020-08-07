import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone';
import  {connect}  from 'react-redux';
import  {addPhotos} from '../actions/addPhotos';
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
            photoFiles: [],
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
 
    handleSave(photos) {
        const files = Array.from(photos); // array of photos added to dropzone


        this.setState({
            photoFiles: photos,
            open: false
        });
        console.log('Photo files: ', files);
        this.props.addPhotos({photoFiles: photos, index: this.state.index});
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }
 
    render() {
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
        locations: state.locations,
    }
}

export default connect(mapStateToProps, {addPhotos})(DropzoneDialogButton); 
