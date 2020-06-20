import React from "react";
import { connect } from 'react-redux';
import { addMsg, selectMsg, deleteMsg } from '../actions';
import Popup from "reactjs-popup";
import "./Lists.css";
import Collapsible from "react-collapsible";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Lists extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentListId: -1,
            country: require("../assets/country_state_city"),
            checked: []
        };
    }

    renderCountry() {
        const list = [];
        let checkboxID = -1;
        for (const item of this.state.country) {
            list.push(
                <React.Fragment>
                <Collapsible trigger={item.name} id={item.id}>
                    {item.states.map(function(state) {
                        return (
                            <div className="stripe">
                                <Checkbox checked={false} id={checkboxID++} />
                                {state.name}
                            </div>
                        )})}
                </Collapsible>
                </React.Fragment>);
        }
        return list;
    }

    renderList() {
        const content = [];
        for (const list of this.props.lists) {
            content.push(<Collapsible trigger={list.listName}>
                {list.countryList.map(function(country) {
                        return (<Collapsible trigger={country.name}>
                            {country.states.map(function(state) {
                                return (<div className="stripe">{state.name}</div>)
                            })}
                        </Collapsible>)
                }

                )
                }
            </Collapsible>)
                }
        return content;
        }

    render() {
        return (
            <React.Fragment>
                {this.renderList()}
                <Popup className="widthFix" trigger={<button className="button"> Add List </button>} modal>
                    {close => (
                        <div className="modal">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <div className="header"> Modal Title </div>
                            <div className="content">
                                {this.renderCountry()}
                            </div>
                            <div className="actions">
                                <button
                                    className="button"
                                    onClick={() => {
                                        close();
                                    }}
                                >
                                    close modal
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
            </React.Fragment>
        )
    }

}

//state has entire state of app!!
const mapStateToProps = (state) => { //name is by convention
    return {
        lists: state.lists,
        msgId: state.msgId
    }; //now it will appear as props
};


export default connect(mapStateToProps, { addMsg, selectMsg, deleteMsg })(Lists);
