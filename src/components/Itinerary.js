import React from "react";
import { connect } from 'react-redux';
import {
    changeView,
    renderLocation,
    getCurrentItineraryID,
    saveItinerary,
    itineraryNameChange,
    deleteCountry, deleteCity, deleteLocation, renderCity, renderCountry, setItineraryFromDB
} from '../actions';
import './Itinerary.css';
import './Iteneraries.css';
import Collapsible from "react-collapsible";
import Dates from "./Dates";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from '@material-ui/icons/Save';
import { TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogTitle from '@material-ui/core/DialogTitle';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import {DropzoneDialog} from 'material-ui-dropzone';
import { addFiles } from '../actions/addFiles';
import { updateShare } from '../actions/updateShare';
import { AttachFile,  Description, PictureAsPdf } from '@material-ui/icons';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import PdfSelect from './PdfSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import withStyles from "@material-ui/core/styles/withStyles";

const { uuid } = require('uuidv4');
class Itinerary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            openUpload: false,
            editItinerary: this.props.editName,
            name: this.props.itinerary.name,
            openDialog: false,
            idToDelete: null,
            deletionIsCountry: false,
            nameOfDeletion: null,
            open: false,
            files: this.props.itinerary.files,
            showFiles: false,
            share: false,
        };
    }



    renderItinerary() {
        const content = [];
        const locations = this.props.locations;
        for (const country of this.props.countries) {
            content.push(
                <Collapsible key={country.name} trigger={
                    <div>
                        <div>
                            <h1 className={"country_name"}>{country.name}</h1>
                            <IconButton className={"edit-btn"} aria-label="Delete"  name="Delete">
                                <DeleteForeverIcon color="secondary"
                                                   onClick={(event) => {this.handleDialogOpen(country,true);event.stopPropagation();}}/>
                            </IconButton>
                        </div>
                            <Dates place={country} type={"country"}/>
                    </div>
                }>

                {this.props.cities.filter(function(city){
                    return city.countryID === country.id;
                }).map(function(city,index){
                    return (
                        <div key={index} className="stripe item-font relativeDiv" onClick={() => this.props.changeView(city.id)}>
                            {city.name}
                            <div className={"buttonDivDelete"}>
                                <IconButton  aria-label="Delete"  name="Delete">
                                    <DeleteForeverIcon color="secondary"  onClick={(event) => {this.handleDialogOpen(city,false);event.stopPropagation();}}/>
                                </IconButton>
                            </div>

                        </div>
                    )
                },this)
                }
            </Collapsible>
            )
        }
        return content;
    }
    handleOpenDropzone(){
        this.setState({
            open: true,
            showFiles: false
        });
    }

    handleCloseDropzone(){
        this.setState({
            open: false,
        });
    }
    encoder =(file) => {
        // encode function
        let encode = new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
         reader.onloadend = function() {
        resolve(reader.result);
        }
        });
        return encode.then(fileEncoded => {
            return {base64: fileEncoded, name: file.name, path: file.path, id: uuid()};
        });

        }
    
        async handleSave(files) {
            this.setState({
                files: files,
                open: false
            });
            let fileArray = [];
            files.forEach(file => fileArray.push(this.encoder(file)));
            Promise.all(fileArray).then((filesEncoded) => {
                this.props.addFiles(filesEncoded);
              });
        }

    handlePreviewIcon(fileObject, classes) {
        const {type} = fileObject.file
        const iconProps = {
          className : classes.image,
        }
      
      
        switch (type) {
          case "application/msword":
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return <Description {...iconProps} />
          case "application/pdf":
            return <PictureAsPdf {...iconProps} />
          default:
            return <AttachFile {...iconProps} />
        }
      }


        renderSubComp(){
            if (this.state.showFiles){
                let temp =  this.props.itinerary;
                if (temp !== undefined){
                return <PdfSelect itinerary={temp} />
                } else return <h3>No Files to Display.</h3>;
            } else return null;
      }

      handleOpenFolder(){
          this.setState({
              showFiles: !this.state.showFiles
          })
      }
      
    handleEditItineraryName(){
        if (!this.state.editItinerary){
            this.setState({editItinerary: !this.state.editItinerary});
        }
        else{
            //Do other stuff  first
            if (this.state.name.length > 0){
                this.props.itineraryNameChange(this.state.name);
                this.setState({editItinerary: !this.state.editItinerary});
            }
        }
    }
    keyPressed(e){
        if (e.keyCode == 13){
            if (this.state.name.length > 0 ){
                this.props.itineraryNameChange(this.state.name);
                this.setState({editItinerary: !this.state.editItinerary});
            }
        }
    }

    handleChangeShare(event) {
        this.props.updateShare(event.target.checked);
        this.setState({
            share: event.target.checked
        });
    };

 

    renderItineraryName(){
        //Itinerary is not being edited
        if (!this.state.editItinerary){
            return (
                <div id={"itinerary-div"}>
                    <h1 className={"itinerary_name"}>{this.props.itinerary.name}</h1>
                    <IconButton  className={"edit-btn"} aria-label="Edit" name="Edit" onClick={this.handleEditItineraryName.bind(this)}>
                        <EditOutlinedIcon style={{width: 20, height: 20, fill: "white"}} />
                    </IconButton>
                    <IconButton  aria-label="Attachment" name="Attachment" onClick={this.handleOpenDropzone.bind(this)}>
                    <AttachmentOutlinedIcon className="edit-btn" style={{width:20, height:20, fill: "white"}}/>
                    </IconButton>
                    <IconButton  aria-label="Attachment" name="Attachment" onClick={this.handleOpenFolder.bind(this)}>
                        <FolderOutlinedIcon className="edit-btn" style={{width:20, height:20, fill: "white"}}/>
                    </IconButton>
                   
                    <div style={{display: "inline-block", width: "80%"} }>
                    {this.renderSubComp()}
                    </div>
                    
                    
                    
        
        <DropzoneDialog
        dialogTitle={'Upload Itinerary Files Here'}
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['application/pdf', 'text/plain', 'application/msword']}
                    showPreviews={true}
                    getPreviewIcon={this.handlePreviewIcon.bind(this)}
                    maxFileSize={5000000}
                    submitButtonText={"ADD"}
                    onClose={this.handleCloseDropzone.bind(this)}
                />
    
           
            </div>
            );
        } else{
            const CssTextField = (props) => withStyles({
                root: {
                    marginRight: '10px',
                    '& label.Mui-focused': {
                        color: 'white',
                    },
                    '& label': {
                        color: 'white',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'yellow',
                            color: 'white'
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                },
            })(TextField);
            return(<div id={"itinerary-div"}>
                    <div className="itinerary-btn" style={{paddingTop:10, height: "200%"}}>
                        <TextField id="filled-basic"
                                    label="New Itinerary Name"
                                    variant="outlined"
                                    style={{fill: "white",}}
                                    error ={this.state.name.length === 0 ? true : false }
                                    helperText={this.state.name.length === 0 ? "Itinerary name cannot be empty!" : "" }
                                    defaultValue={this.props.itinerary.name}
                                    onKeyDown={this.keyPressed.bind(this)}
                                    inputProps={{
                                        style: {
                                            fontSize: "2em",
                                            fontWeight: "bold",
                                            color: "white"
                                        }}} // font styling of input text
                                    onChange={this.handleNameChange.bind(this)}/>
                                    <IconButton  aria-label="Edit" name="Edit" onClick={this.handleEditItineraryName.bind(this)}>
                            <SaveIcon style={{width: 20, height: 20, fill: "white"}} className={"edit"}/>
                            </IconButton>
                            <IconButton  aria-label="Attachment" name="Attachment" onClick={this.handleOpenDropzone.bind(this)}>
                        <AttachmentOutlinedIcon className="edit-btn" style={{width:25, height:25, fill: "white"}}/>
                    </IconButton>
                    <IconButton  aria-label="Attachment" name="Attachment" onClick={this.handleOpenFolder.bind(this)}>
                        <FolderOutlinedIcon className="edit-btn" style={{width:25, height:25, fill: "white"}}/>
                    </IconButton>
                    <div style={{display: "inline-block", width: "80%", marginLeft: "1rem", overflow: "hidden"} }>
                    {this.renderSubComp()}
                    </div>
                    
        
        <DropzoneDialog
        dialogTitle={'Upload Itinerary Files Here'}
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['application/pdf', 'text/plain', 'application/msword']}
                    showPreviews={true}
                    getPreviewIcon={this.handlePreviewIcon.bind(this)}
                    maxFileSize={5000000}
                    submitButtonText={"ADD"}
                    onClose={this.handleCloseDropzone.bind(this)}
                />
                                    
            </div>
            </div>

            );
        }
    
    }

    handleOpen() {
        this.setState({
            openUpload: !this.state.openUpload
        });
    }
    handleNameChange(event){
        this.setState({
            name: event.target.value,
        });
    }
    renderDeleteConfirmation() {
        let placeType = this.state.deletionIsCountry ? "country" : "city"

        let deletionMessage = "Are you sure you want to delete the "
            + placeType + " '"+ this.state.nameOfDeletion+"' from '" +
            this.props.itinerary.name + "' ?";
        return (<Dialog
            open={this.state.openDialog}
            onClose={this.handleClose.bind(this)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{deletionMessage}</DialogTitle>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={this.deleteFromItinerary.bind(this)}
                >
                    Delete
                </Button>
                <Button onClick={this.handleClose.bind(this)} variant="contained" color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>)
    }

    handleClose(){
        this.setState({openDialog: false});
    }
    handleDialogOpen(place,isCountry){
        // stopBubbling(this.event);
        this.setState({
            openDialog: true,
            idToDelete: place.id,
            deletionIsCountry: isCountry,
            nameOfDeletion: place.name,});
    }
    deleteFromItinerary(){
        let countries = this.props.countries;
        let cities = this.props.cities;
        let citiesReference = this.props.cities;
        let locations = this.props.locations;
        if (this.state.deletionIsCountry){
            //cascade deletes to every city and location in delete country
            cities = cities.filter((item) => item.countryID === this.state.idToDelete);
            for (const city of cities){
                //Find a new city to display
                if (city.id === this.props.currentView.byID.city){
                    let cityToDisplayIndex = this.props.cities.findIndex((item) => {
                        return city.id !== item.id;
                    });
                    //No city left to display
                    if(cityToDisplayIndex === -1 || countries.length === 1)
                        this.props.changeView(-1);
                    else
                        this.props.changeView(this.props.cities[cityToDisplayIndex].id);
                }
                this.props.deleteCity(city.id);
                locations = locations.filter((item) => item.cityID === city.id);
                for (const location of locations){
                    this.props.deleteLocation(location.id);
                }
            }
            //Delete the country at the end of deleting cities and locations it contains
            this.props.deleteCountry(this.state.idToDelete);
        }
        //Delete button hit for city, cascade deletions to locations and possibly change view
        else{
            //Find a new city to display
            if (this.state.idToDelete === this.props.currentView.byID.city){
                let cityToDisplayIndex = cities.findIndex((item) => {
                    return this.state.idToDelete !== item.id;
                });
                if(cityToDisplayIndex === -1)
                    this.props.changeView(-1);
                else
                    this.props.changeView(cities[cityToDisplayIndex].id);
            }
            this.props.deleteCity(this.state.idToDelete);
            locations = locations.filter((item) => item.cityID === this.state.idToDelete);
            for (const location of locations){
                this.props.deleteLocation(location.id);
            }

        }
        this.handleClose();
    }

    render() {

        return (
            <React.Fragment>
                <div className={"itineraryHeader"}>
                    {this.renderItineraryName()}
                    <FormControlLabel
        control={<Switch checked={this.state.share} onChange={(event) => this.handleChangeShare(event)} color="primary" />}
        label="Public"
      />
                    <Dates place={this.props.itinerary} class={"dates itinerary_dates"} type={"itinerary"}/>
                </div>
               

                {this.renderItinerary()}
                {/*<City/>*/}
                {/*<LocationButton/>*/}
                {/*<SaveButton/>*/}
                {/*<Map className={"map"}/>*/}
                {this.renderDeleteConfirmation()}
            </React.Fragment>
        )
    }

}

//state has entire state of app!!
const mapStateToProps = (state) => { //name is by convention
    return {
        lists: state.lists,
        msgId: state.msgId,
        countries: state.countries,
        cities: state.cities,
        itinerary: state.itinerary,
        locations: state.locations,
        currentView: state.currentView,
    }; //now it will appear as props
};
function stopBubbling(evt){
    evt.stopPropagation();
    evt.cancelBubble = true;
}

const dispatch = {
    addFiles,
    changeView,
    renderLocation,
    renderCity,
    renderCountry,
    getCurrentItineraryID,
    saveItinerary,
    itineraryNameChange,
    deleteCity,
    deleteCountry,
    deleteLocation,
    setItineraryFromDB,
    updateShare
};
export default connect(mapStateToProps, dispatch )(Itinerary);
