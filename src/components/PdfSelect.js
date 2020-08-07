import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import { addFiles } from '../actions/addFiles';
import { deleteFile } from '../actions/deleteFile';
import './PdfSelect.css';
const { uuid } = require('uuidv4');
class PdfSelect extends Component {
    constructor () {
      super();
      this.state = {
        files: [],
        index: 0, 
        open:false
      };
    
    }

    componentDidUpdate(prevProps){
      if (prevProps.itineraries !== this.props.itineraries){

      }
    }


  openPdf=(base64URL)=>{
    var win = window.open();
    win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}

delFile = (file) => {
  this.props.deleteFile(file);
}
    
    renderFiles = () =>{
      if(this.props.itinerary.files !== undefined && this.props.itinerary.files.length > 0){
          let filesRender = this.props.itinerary.files;
          return (
              <div  className="files-displayed">
        <div style={{display: "inline"}}>
        {filesRender.map((file, index) => (
            <Chip label={file.name} key={uuid()} onDelete={() => this.delFile(file.base64)} onClick={() => this.openPdf(file.base64)} style={{float:"right", padding:'0.5rem', marginTop: "1rem", marginBottom: "1rem",width: "100%"}} />
          ))}
          </div>
          </div>
          );
      } else return <div><span style={{font: "20px Roboto", padding: "8px", width: "100%" }}>No Files To Display...</span></div>
  }

    
    render () {
      return (
        <div style={{width: "100%"}}>
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
  export default connect(mapStateToProps,  {addFiles, deleteFile})(PdfSelect);