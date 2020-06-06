
import React from "react";
import Info from "./Info";

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
                                <img src={image.fileLoc} alt={}/>
                            </div>
                        )}
                    </div>
                    </div>
            </div>
        );
    }
}
