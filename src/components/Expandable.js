import React from 'react';
import Collapsible from "react-collapsible";
import "./Expandable.css"

class Expandable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentList: [],
            childrenList: [] //list of lists
        };
    }
        componentDidMount() {
            this.setState({
                parentList: this.props.parentList,
                childrenList: this.props.childrenList
            });
        }


        componentDidUpdate(prevProps) {
            if (this.props !== prevProps) {
                this.setState({
                    parentList: this.props.parentList,
                    childrenList: this.props.childrenList
                });
            }
    }
    push() {
        let list = [];
        for (const parent of this.state.parentList) {
            list.push(
                <Collapsible trigger={parent}>
                    {this.state.childrenList[this.state.parentList.indexOf(parent)]}
                </Collapsible>
            )
        }
        return list;
    }
    render() {
        return (
            <div> {this.push()}</div>
        )
    }

}

export default Expandable;