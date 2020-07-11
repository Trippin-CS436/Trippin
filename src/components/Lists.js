import React from "react";
import { connect } from 'react-redux';
import { addMsg, selectMsg, deleteMsg } from '../actions';
import Popup from "reactjs-popup";
import "./Lists.css";
import Collapsible from "react-collapsible";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Checkbox} from "@material-ui/core";
import "./Expandable.css"
class Lists extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentTargetId: "none",
            currentListId: -1,
            addedCountry: [],
            country: require("../assets/country_state_city"),
            countryList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addList = this.addList.bind(this);
        this.renderCountry = this.renderCountry.bind(this);
    }

    handleChange(event) {
        let targetId = event.target.id;
        this.setState(prevState => ({
            [targetId]: !prevState[targetId]
        }));
        this.setState({currentTargetId: targetId});
        if (this.state.targetId === false) {
            // let countryName = event.target.parentNode.trigger;
            let countryName = "Albania";
            let index = null;

            if (!this.state.addedCountry.includes(countryName)) {
                this.setState({countryList: [{"name": [countryName],
                    "states": {"name": "Berat District"}}]});
                this.setState({addedCountry: [countryName]});


            } else {
                index = this.state.addedCountry.indexOf(countryName);
                this.state.countryList[index].states.push({"name": [[event.target.name]]});
            }
        }
    };

    addList() {
        let newList = {
            "listId": null,
            "listName": "New List",
            "countryList": this.state.countryList
        };
        this.props.addMsg(newList);
        this.setState({
                countryList: []
            });
    }

    renderCountry() {
        const list = [];
        let checkedName = null;
        for (const item of this.state.country) {
            list.push(
                <React.Fragment>
                <Collapsible trigger={item.name} id={item.id}>
                    {item.states.map((state, index) => {
                        checkedName = "checkbox" + index.toString();
                        return (
                            <div className="stripe">
                                <Checkbox checked={this.state.checkedName} onClick={this.handleChange} id={checkedName} name={state.name} />
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
                                        this.addList();
                                        close();
                                    }}
                                >
                                    Add List
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
                <div> {JSON.stringify(this.props.lists[this.props.lists.length-1])} </div>
                <div> {this.state.addedCountry.toString()} </div>
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
