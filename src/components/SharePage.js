import React, { Component } from 'react'
import ItineraryReadOnly from './ItineraryReadOnly';
import CityReadOnly from './CityReadOnly';

export default class SharePage extends Component {
    render() {
        return (
            <div>
                <ItineraryReadOnly/>
                <CityReadOnly/>
            </div>
        )
    }
}
