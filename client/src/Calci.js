import React, { Component } from 'react'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'

const URL = 'ws://localhost:3030'

class Calci extends Component {
    render(){
        return(
            <div>
                <p>Calculate here</p>
            </div>
        )
    }

}

export default Calci
