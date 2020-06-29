import React from 'react';
import QRCode from 'react-qr-code';
import APIUtil from '../utils/apiutil';

export default class MyQRCode extends React.Component {
    constructor(){
        super();
        this.state = {
            id: ""
        };
    }

    componentDidMount() {
        APIUtil.getSelfInfo((status, data) => {
            console.log(data);
            this.setState({id: data._id});
        })
    }

    render() {
        return(
            <>
                {this.state.id != "" ? <QRCode value={this.state.id} /> : "Loading..."}
            </>
        )
    }
}