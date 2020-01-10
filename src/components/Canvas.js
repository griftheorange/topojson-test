import React, { Component } from 'react';
import Countries from './Countries'

class Canvas extends Component {

    render() {
        return (
            <div className="canvas" id="canvas">
                <svg>
                    <g className="countries">
                        <Countries/>
                    </g>
                </svg> 
            </div>
        );
    }

    ready = (error, data) => {
        console.log(data)
    }

}

export default Canvas;