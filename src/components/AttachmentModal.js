import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {DropzoneDialog} from 'material-ui-dropzone';
import { addFiles } from '../actions/addFiles';
import { deleteFile } from '../actions/deleteFile';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { FileIcon, defaultStyles } from 'react-file-icon';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';


class AttachmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: this.props.itinerary.files,
            pdfView: null
        };
    }
 
    handleOpenDropzone(){
        this.setState({
            open: true,
        });
    }

    handleCloseDropzone(){
        this.setState({
            open: false
        });
    }
    handleSave(files){
        this.props.addFiles(files);
        this.setState({
            files: this.props.itinerary.files,
            open: false
        });
        console.log('Upload files: ', files);
    }
    delFile = (event) => {
        this.props.deleteFile(event.currentTarget.value);
    }
    openPDF = (file) => {
        this.setState({
            pdfView: file
        });
    } 
    closePDF = () => {
        this.setState({
            pdfView: null
        });
    }
    displayPDF = () => {
        if (this.state.pdfView !== null && this.state.pdfView !== undefined){
        return ( <div>
            <IconButton className={"btn"} aria-label="Close" name="Close" onClick={this.closePDF()}>
                <CloseIcon />
            </IconButton>


             <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js" >
            <div style={{ height: '750px' }}>
            <Viewer fileUrl={this.state.pdfView.path} />
            </div>
            </Worker>
            </div>
        )} else return null;
    }

    renderFiles = () =>{
        if(this.state.files !== undefined && this.state.files.length > 0){
            let filesRender = this.props.itinerary.files;
            return (
                <div className="files">
                <div className="files-displayed">
                <Box fontWeight="fontWeightLight" p={2} mb={2}  borderColor="transparent">
                    <Typography variant="h5" >Itinerary Files</Typography>
                </Box>
            
            <GridList className="gridList" style={{ transform: 'translateZ(0)', display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-around', spacing: "0"}} cols={5}>
              {filesRender.map((file, index) => (
                <GridListTile  key={file.name} >
                <FileIcon extension="pdf" {...defaultStyles.pdf} onClick={this.openPDF(file)}/>;
                <GridListTileBar
                  title={file.name}
                  actionIcon={
                    <IconButton onClick={this.delFile} value={index} aria-label={`star ${file.name}`} >
                      <DeleteForeverIcon />
                    </IconButton>
                  }
                />
                </GridListTile>
              ))}
            </GridList>
            <div>{this.displayPDF()}</div>
                </div>
                </div>
            );
        } else return <h4>No Files To Display...</h4>
    }

  render() {
    if(!this.props.open) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };



    return (
      <div className="backdrop" style={{backdropStyle}}>
      <IconButton className={"btn"} aria-label="Close" name="Close" onClick={this.props.onClose}>
                <CloseIcon />
        </IconButton>
        <div className="modal" style={{modalStyle}}>
        
          {this.props.children}

          <div className="file-display">
          {this.renderFiles()}
          </div>

          <div className="footer">
          <IconButton className={"btn"} aria-label="Add" name="Add" onClick={this.handleOpenDropzone.bind(this)}>
                <AddBoxOutlinedIcon />
        </IconButton>

        
        <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['application/pdf', 'text/plain', 'application/msword']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleCloseDropzone.bind(this)}
                />
          </div>
        </div>
      </div>
    );
  }
}

AttachmentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = (state) => { 
    return {
        itinerary: state.itinerary,
    }; 
};

export default connect(mapStateToProps, {addFiles})(AttachmentModal);