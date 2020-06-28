import React from 'react';
import APIUtil from '../utils/apiutil';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        APIUtil.getSelfInfo(data => {
            this.data = data;
        });
    }

    render() {
        return(
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
                <h1>bruh</h1>
            </div>
        )
    }
}

