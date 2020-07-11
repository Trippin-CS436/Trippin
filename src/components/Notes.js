import React from "react";
import  {connect}  from 'react-redux';
import  {addNotes} from './../actions/addNotes'
import Info from "./Info";
import "./Notes.css"

class Notes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentLocation: this.props.location[this.props.idx],
           notesText: this.props.location[this.props.idx].notes,
           index: this.props.idx
           // userImages image object will change when database added: {fileName:"name", fileLoc:"../imgs/name.jpg"}
        };
        this.handleNotesInput = this.handleNotesInput.bind(this);
    }


    handleNotesInput(event) {
        this.setState({
            currentLocation: this.state.currentLocation,
            notesText: event.target.value,
            index: this.state.index
        });
      }

    handleSaveNotes = () => {
        console.log(this.state.notesText);
        this.props.addNotes({
        notes: this.state.notesText,
        index: this.state.index
        });
    }



    render() {
        return(
            <div className="notes">
            <div className="notes-outer">
                <div className="notes-inner">
                    <textarea id="notes-text" value={this.state.notesText} onChange={this.handleNotesInput}>
                        Notes Here 
                    </textarea>
                </div>
                <div id="notes-inner-button">
                    <button id="notes-button" value="notes-button"  type="button" onClick={this.handleSaveNotes}>
                        Save
                    </button>
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        currentLocation: state.currentLocation
    }
}

export default connect(mapStateToProps, {addNotes})(Notes); 

/*

export default class Notes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           userNotes: "",
           // userImages image object will change when database added: {fileName:"name", fileLoc:"../imgs/name.jpg"}
           userImages: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({userNotes: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
      }


    render() {
        return(
            <div className="container"> 
                <Info />
                <div className="userNotes">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            User Notes
                            <input type="text" value={this.state.userNotes} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div className="userImages">
                    <h3>Image Gallery</h3>
                    <div className="imageGallery">
                        {this.userImages.map(image =>
                            <div className="single-image-display">
                                <h4>{image.fileName}</h4>
                                <img src={image.fileLoc} alt=""/>
                            </div>
                        )}
                    </div>
                    </div>
            </div>
        );
    }
}
*/
