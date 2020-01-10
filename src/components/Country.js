import React, { Component } from 'react';

import * as d3 from 'd3'
import topojson from 'topojson'
import * as d3proj from 'd3-geo-projection'

class Country extends Component {

    constructor(){
        super()        
        
        this.state = {
            color: '#b0b0b0',
            pathD: null,
            pathB: null, 
            stroke: '#808080',
            strokeWidth: '0px',
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
        console.log(this.props.datum.properties.name)
    }

    genPathFunction = () => {
        let container = document.getElementById("canvas")

        let projection = d3.geoOrthographic()
            .translate([container.offsetWidth/2, container.offsetHeight/2])
            .scale(200)
            .rotate([0, 0, 23.5])

        let path = d3.geoPath()
            .projection(projection)

        return path
    }

    componentDidMount(){
        this.setState({
            pathD: this.genPathFunction()(this.props.datum),
            pathB: this.genPathFunction()({type: "Sphere"})
        })
    }

    render() {
        return (
            <>
            <path d={this.state.pathB}
                  style={{fill:"none", strokeWidth:"0.1px", stroke:"a0a0a0"}}></path>
            <path onMouseOver={this.handleMouseOver} 
                  onMouseOut={this.handleMouseOut} 
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}
                  onClick={this.handleClick}
                  className="country" 
                  d={this.state.pathD} 
                  style={{fill:this.state.color, stroke:this.state.stroke, strokeWidth:this.state.strokeWidth}}></path>
            </>
        );
    }
}

export default Country;