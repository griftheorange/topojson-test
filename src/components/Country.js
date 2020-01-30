import React, { Component } from 'react';

import * as d3 from 'd3'
import topojson from 'topojson'
import * as d3proj from 'd3-geo-projection'
import yeet from '../resources/yeet-sound-effect.mp3'
import africa from '../resources/africa_t3h9tMv.mp3'

class Country extends Component {

    constructor(){
        super()        
        
        this.state = {
            color: '#b0b0b0',
            stroke: '#808080',
            strokeWidth: '0px'
        }
    }

    handleMouseOver = (evt) => {
        this.setState({
            color: 'orange'
        })
    }

    handleMouseOut = (evt) => {
        this.setState({
            color: '#b0b0b0',
            strokeWidth: '0px'
        })
    }

    handleMouseDown = (evt) => {
        this.setState({
            strokeWidth: '1px'
        })
    }

    handleMouseUp = (evt) => {
        this.setState({
            strokeWidth: '0px'
        })
    }

    handleClick = (evt) => {
        console.log(this.props.datum)
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
            <path onMouseOver={this.handleMouseOver} 
                  onMouseOut={this.handleMouseOut} 
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}
                  onClick={this.handleClick}
                  className="country" 
                  id={this.props.datum.properties.name}
                  d={this.getPath(this.props.datum)} 
                  style={{fill:this.state.color, stroke:this.state.stroke, strokeWidth:this.state.strokeWidth}}></path>
            </>
        );
    }
}

export default Country;