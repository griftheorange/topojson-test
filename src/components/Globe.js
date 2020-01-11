import React, { Component } from 'react';
import Country from './Country'
import * as d3 from 'd3'

import { feature } from 'topojson-client'

import world from '../resources/world-countries.json'

class Globe extends Component {

    constructor(){
        super()
        let countries = feature(world, world.objects.countries1).features
        this.state = {
            countriesData: countries
        }
    }

    getPath = (data) => {        
        let projection = d3.geoOrthographic()
            .translate([this.props.canvasHolder.offsetWidth/2, this.props.canvasHolder.offsetHeight/2])
            .scale(this.props.scale)
            .rotate(this.props.globeRotation)

        let path = d3.geoPath()
            .projection(projection)

        return path(data)
    }

    genCountries = () => {
        if(this.props.selectable){
            return (
                this.state.countriesData.map((countryData, i) => {
                    return (
                        <>
                        <path d={this.getPath({type:"Sphere"})} 
                              style={{fill:"none", strokeWidth:"0.05px", stroke:"a0a0a0"}}></path>
                        <Country key={i} 
                                 canvasHolder={this.props.canvasHolder} 
                                 globeRotation={this.props.globeRotation} 
                                 key={i} 
                                 scale={this.props.scale} 
                                 datum={countryData}/>
                        </>
                    )
                })
            )
        } else {
            return (
                <>
                <path d={this.getPath({type:"Sphere"})} 
                      style={{fill:"none", strokeWidth:"0.2px", stroke:"a0a0a0"}}></path>
                <g className="rotating" ref="anchor"></g>

                </>
            )
        }
    }

    componentDidMount(){
        let getPath = this.getPath

        if(!this.props.selectable){
            let group = d3.select(this.refs.anchor)
            group.selectAll(".countries")
                .data(this.state.countriesData)
                .enter()
                    .append("path")
                    .classed("countries", true)
                    .attr("style", "stroke: #808080; stroke-width: 0px; fill: #b0b0b0")
                    .attr("d", function(d){return getPath(d)})

        }
    }

    componentDidUpdate(){
        let getPath = this.getPath

        let group = d3.select(this.refs.anchor)
            group.selectAll(".countries").remove()

            group.selectAll(".countries")
                .data(this.state.countriesData)
                .enter()
                    .append("path")
                    .classed("countries", true)
                    .attr("style", "stroke: #808080; stroke-width: 0px; fill: #b0b0b0")
                    .attr("d", function(d){return getPath(d)})
    }

    render() {
        return (
            <>
                {this.genCountries()}
            </>
        );
    }
}

export default Globe;