import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import {DropzoneDialog} from 'material-ui-dropzone';
import { addFiles } from '../actions/addFiles';
import {PdfViewer} from './PdfViewer';
import './PdfSelect.css';
const { uuid } = require('uuidv4');
class PdfSelect extends Component {
    constructor () {
      super();
      this.state = {
        showModal: false,
        pdfView: false,
        files: [],
        index: 0, 
        open:false
      };
    
    }


  openPdf=(base64URL)=>{
    var win = window.open();
    win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}

    
    renderFiles = () =>{
      if(this.props.itinerary.files !== undefined && this.props.itinerary.files.length > 0){
          let filesRender = this.props.itinerary.files;
          return (
              <div style={{display: "inline"}} className="files-displayed">
        <div style={{display: "inline-block"}}>
        {filesRender.map((file, index) => (
            <div className="display-pdf-name" onClick={() => this.openPdf(file.base64)} style={{float:"left", padding:'0.5rem', outline: "1rem"}} key={uuid()}>{file.name}</div>
          ))}
          </div>
          </div>
          );
      } else return <div style={{width: "200px", height: "200px"}}><span style={{font: "20px Roboto"}}>No Files To Display...</span></div>
  }

    
    render () {
      return (
        <div>
          {this.renderFiles()}
        </div>
       
      );
    }
  }
  
  const mapStateToProps = (state) => { 
    return {
        itinerary: state.itinerary,
    }; 
};
  export default connect(mapStateToProps,  {addFiles})(PdfSelect);