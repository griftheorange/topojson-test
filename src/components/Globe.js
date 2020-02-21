import React, { Component } from 'react';
import Country from './Country'
import * as d3 from 'd3'

import { feature } from 'topojson-client'

import countriesTopo from '../resources/world-countries.json'
import continentsTopo from '../resources/world-continents.json'

class Globe extends Component {

    //imports file as topoJSON, translates to geoJSON format with 'topojson-client' 'feature' function
    constructor(){
        console.log(countriesTopo)
        console.log(continentsTopo)
        super()
        // let data = feature(countriesTopo, countriesTopo.objects.countries1).features
        let data = feature(continentsTopo, continentsTopo.objects.continent).features
        this.state = {
            drawingData: data
        }
    }

   
    //gets a D3 path generator from 'getPath' and passes it each geoJSON feature, generating a corresponding path 
    genCountries = () => {
        if(this.props.selectable){
            return (
                this.state.drawingData.map((countryData, i) => {
                    return (
                        <>
                        <path d={this.getPath({type:"Sphere"})} 
                              style={{fill:"none", strokeWidth:"0.05px", stroke:"a0a0a0"}}
                              ></path>
                        <Country key={i} 
                                 canvasHolder={this.props.canvasHolder} 
                                 globeRotation={this.props.globeRotation} 
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

    //
    componentDidMount(){
        let getPath = this.getPath

        if(!this.props.selectable){
            let group = d3.select(this.refs.anchor)
            group.selectAll(".countries")
                .data(this.state.drawingData)
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
                .data(this.state.drawingData)
                .enter()
                    .append("path")
                    .classed("countries", true)
                    .attr("style", "stroke: #808080; stroke-width: 0px; fill: #b0b0b0")
                    .attr("d", function(d){return getPath(d)})
    }

    getPath = (datum) => {       
        let projection = d3.geoOrthographic()
            .translate([this.props.canvasHolder.offsetWidth/2, this.props.canvasHolder.offsetHeight/2])
            .scale(this.props.scale)
            .rotate(this.props.globeRotation)

        let path = d3.geoPath()
            .projection(projection)

        return path(datum)
    }

    getRaisedPath = (datum) => {
        let projection = d3.geoOrthographic()
            .translate([this.props.canvasHolder.offsetWidth/2, this.props.canvasHolder.offsetHeight/2])
            .scale(this.props.scale + 10)
            .rotate(this.props.globeRotation)

        let path = d3.geoPath()
            .projection(projection)

        return path(datum)
    }

    render() {
        return (
            <>
                {this.genCountries()}
                <path className="quakeCircles" d={this.getRaisedPath(d3.geoCircle().center([0, 0]).radius(3)())} style={{fill: "red", opacity: "0.5"}}></path>
            <path className="quakeCircles" d={this.getPath(d3.geoCircle().center([0, 0]).radius(3)())} style={{fill: "red", opacity: "0.2"}}></path>
            </>
        );
    }
}

export default Globe;