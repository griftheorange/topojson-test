import React, { Component } from 'react';
import Country from './Country'

import { feature } from 'topojson-client'

import world from '../resources/world-countries.json'

class Countries extends Component {

    constructor(){
        super()
        let countries = feature(world, world.objects.countries1).features
        this.state = {
            countriesData: countries
        }
    }

    genCountries = () => {
        return (
            this.state.countriesData.map((countryData, i) => {
                return <Country key={i} datum={countryData}/>
            })
        )
    }

    render() {
        return (
            <>
                {this.genCountries()}
            </>
        );
    }
}

export default Countries;