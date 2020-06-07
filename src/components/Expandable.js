import React from 'react';
import {
    CollapsibleComponent,
    CollapsibleHead,
    CollapsibleContent
} from "react-collapsible-component";

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
    render() {
        let list = [];
        for (const parent of this.state.parentList) {
            list.push(
                <CollapsibleComponent>
                    <CollapsibleHead>
                        {parent}
                    </CollapsibleHead>
                    <CollapsibleContent>
                        {this.state.childrenList[this.state.parentList.indexOf(parent)]}
                    </CollapsibleContent>
                </CollapsibleComponent>
            );
        }
        return list;
    }

}

export default Expandable;