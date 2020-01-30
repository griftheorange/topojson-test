import React, { Component } from 'react';
import Globe from './Globe'
import * as d3 from 'd3'

class Canvas extends Component {

    state = {
        mounted: false,
        globeRotation: [0, 0, 23.5],
        selectable: true,
        isRotating: false,
        lamRotationSpeed: 10,
        phiRotationSpeed: 0,
        gamRotationSpeed: 0,
        clock: null,
        scale: 250
    }

    componentDidMount(){
        if(this.state.isRotating){
            this.startClock()
        }
        this.setState({
            mounted: true
        })
    }

    updateRotation = (lam, phi, gam) => {
        let current = this.state.globeRotation
        let update = current

        if(current[0] >= 360){
            update[0] = current[0] - 360
        }

        if(current[1] >= 360){
            update[1] = current[1] - 360
        }
        
        if(current[2] >= 360){
            update[2] = current[2] - 360
        }

        this.setState({
            globeRotation: [update[0]+lam/40, update[1]+phi/40, update[2]+gam/40]
        })
    }

    handleWheel = (evt) => {
        let current = this.state.scale
        this.setState({
            scale: current+evt.deltaY
        })
    } 

    handleChange = (evt) => {
        if(this.clock){
            this.stopClock()
            this.setState({
                lamRotationSpeed: parseFloat(evt.target.value)/2
            }, this.startClock())
        } else {
            this.setState({
                lamRotationSpeed: parseFloat(evt.target.value)/2
            })
        }
    }

    handleLambdaChange = (evt) => {
        let newArr = this.state.globeRotation
        newArr[0] = parseFloat(evt.target.value)
        this.setState({
            globeRotation: newArr
        })
    }

    handlePhiChange = (evt) => {
        let newArr = this.state.globeRotation
        newArr[1] = parseFloat(evt.target.value)
        this.setState({
            globeRotation: newArr
        })
    }

    handleGammaChange = (evt) => {
        let newArr = this.state.globeRotation
        newArr[2] = parseFloat(evt.target.value)
        this.setState({
            globeRotation: newArr
        })
    }

    handleLamRotationChange = (evt) => {
        let speed = parseFloat(evt.target.value)
        if(!Object.is(speed, NaN)){
            this.setState({
                lamRotationSpeed: speed
            })
        }
    }

    handlePhiRotationChange = (evt) => {
        let speed = parseFloat(evt.target.value)
        if(!Object.is(speed, NaN)){
            this.setState({
                phiRotationSpeed: speed
            })
        }
    }

    handleGamRotationChange = (evt) => {
        let speed = parseFloat(evt.target.value)
        if(!Object.is(speed, NaN)){
            this.setState({
                gamRotationSpeed: speed
            })
        }
    }

    toggleSelectable = () => {
        let current = this.state.selectable
        this.setState({
            selectable: !current
        })
    }

    toggleRotation = () => {
        if(this.state.clock){
            this.stopClock()
        } else {
            this.startClock()
        }
    }

    startClock = () => {
        let canvas = this
        let t = d3.timer(function(elapsed){
            canvas.updateRotation(canvas.state.lamRotationSpeed, canvas.state.phiRotationSpeed, canvas.state.gamRotationSpeed)
            if(canvas.state.isRotating == false){
                t.stop()
            }
        }, 25)
        this.setState({
            clock: t,
            isRotating: true
        })
    }

    stopClock = () => {
        this.state.clock.stop()
        this.setState({
            clock: null,
            isRotating: false
        })
    }

    render() {
        let canvas = document.getElementById("canvas")
        return (
            <>
            <div className="topButtons">
                <button onClick={this.toggleSelectable}>Toggle Selectable</button>
                <button onClick={this.toggleRotation}>Toggle Rotation</button>
                <label>λ Rotation Speed: </label>
                <input onChange={this.handleLamRotationChange} type="number" value={this.state.lamRotationSpeed}></input>
                <label>φ Rotation Speed: </label>
                <input onChange={this.handlePhiRotationChange} type="number" value={this.state.phiRotationSpeed}></input>
                <label>γ Rotation Speed: </label>
                <input onChange={this.handleGamRotationChange} type="number" value={this.state.gamRotationSpeed}></input>
            </div>
            <div className="topButtons">
                <label>Lambda Tilt</label>
                {this.state.isRotating ? <input type="number" value={this.state.globeRotation[0]}></input> : <input onChange={this.handleLambdaChange} type="number" value={this.state.globeRotation[0]}></input>}
                <label>Phi Tilt: </label>
                <input onChange={this.handlePhiChange} type="number" value={this.state.globeRotation[1]}></input>
                <span>{" "}</span>
                <label>Gamma Tilt: </label>
                <input onChange={this.handleGammaChange} type="number" value={this.state.globeRotation[2]}></input>
            </div>
            <div onWheel={this.handleWheel} className="canvas" id="canvas">
                <svg>
                    <g className="globe">
                        {this.state.mounted ? <Globe scale={this.state.scale} stopClock={this.stopClock} startClock={this.startClock}isRotating={this.state.isRotating} updateRotation={this.updateRotation} selectable={this.state.selectable} globeRotation={this.state.globeRotation} canvasHolder={canvas}/> : null}
                    </g>
                </svg> 
            </div>
            </>
        );
    }

}

export default Canvas;