// In SRC directory

import React from 'react';
import './App.css';
//import Chat from './Chat';
import {Buttons} from './Component/Buttons';
import {Input} from './Component/Input';
import {ClearButton} from './Component/ClearButton'
import ChatMessage from './chatMessage'
import * as math from 'mathjs';
import { element } from 'prop-types';
// import PropTypes from 'prop-types'
// import Button from 'react-bootstrap/Button';
// import * as math from 'https://unpkg.com/mathjs@6.2.3/dist/math.js';

var HOST = window.location.origin.replace(/^https/, 'wss')
// const Html5WebSocket = require('html5-websocket');
// const ReconnectingWebSocket = require('reconnecting-websocket');
let isServerLocal = false;
// var ws_host = 'https://calci-chat.herokuapp.com';
// var ws_port = process.env.PORT || 5000;
// console.log(ws_port)
// if (isServerLocal) {
//     ws_host = 'localhost';
//     ws_port = '3000';
// }
// const HOST = 'ws://localhost:3030'

// const options = { constructor: Html5WebSocket };
// const rws = new ReconnectingWebSocket('ws://' + ws_host + ':' + ws_port + '/ws', undefined);

// const rws = new WebSocket('wss://www.calci-chat.herokuapp.com' + ':' + ws_port + '/ws');

var rws = new WebSocket(HOST);
var el;
// rws.timeout = 1000;

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: "",
      input: "",
      messages1: [],
      messages: [],
      elements: [],
    };
  }

  // ws = new WebSocket(HOST)

  componentDidMount() {

    rws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
      }

    rws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      console.log(JSON.parse(evt.data))
      const val = JSON.parse(evt.data)
      val.forEach(element => this.addMessage(element));
      // this.addMessage(val)
    }

    rws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        rws: new WebSocket(HOST)
        // rws: new WebSocket('wss://www.calci-chat.herokuapp.com' + ':' + ws_port + '/ws'),
      })
    }
  }

  // propTypes = {
  //   onSubmitMessage: PropTypes.func.isRequired,
  // }

  addToInput = val => {
    this.setState({input: this.state.input + val});
  }

  addMessage = val => {
    console.log("efvhbvk: ", JSON.parse(val))
    console.log(this.state.elements)
    this.setState(
      {messages1:  [val, ...this.state.messages1],
      elements: [JSON.parse(val), ...this.state.elements]
      // elements: this.state.elements.add(JSON.parse(val))
      }
      );
  }

  handleEqual = messageString => {
    let message1 = this.state.input + ' = ' + math.evaluate(this.state.input)
    const data = { name: this.state.name, message: message1 }
    console.log("Handle Equal: ",JSON.stringify(data))
    rws.send(JSON.stringify(data))
    this.componentDidMount()
    this.setState(
      { input: message1,
        messages:  [data, ...this.state.messages],
        messages1:  [data, ...this.state.messages1],
      }
      );
      
  }

  render() {
    return (
      <div className="split">
        <div className = "right">
          <div className="calc-wrapper">
            <Input input={this.state.input}></Input>
            <div className="row">
              <Buttons handleClick={this.addToInput}>7</Buttons>
              <Buttons handleClick={this.addToInput}>8</Buttons>
              <Buttons handleClick={this.addToInput}>9</Buttons>
              <Buttons handleClick={this.addToInput}>/</Buttons>
            </div>
            <div className="row">
              <Buttons handleClick={this.addToInput}>4</Buttons>
              <Buttons handleClick={this.addToInput}>5</Buttons>
              <Buttons handleClick={this.addToInput}>6</Buttons>
              <Buttons handleClick={this.addToInput}>*</Buttons>
            </div>
            <div className="row">
              <Buttons handleClick={this.addToInput}>1</Buttons>
              <Buttons handleClick={this.addToInput}>2</Buttons>
              <Buttons handleClick={this.addToInput}>3</Buttons>
              <Buttons handleClick={this.addToInput}>+</Buttons>
            </div>
            <div className="row">
              <Buttons handleClick={this.addToInput}>.</Buttons>
              <Buttons handleClick={this.addToInput}>0</Buttons>
              <Buttons handleClick={() => this.handleEqual()}>=</Buttons>
              <Buttons handleClick={this.addToInput}>-</Buttons>
            </div>
            <div className="row">
              <ClearButton handleClear={() => this.setState({input: ""})}>Clear</ClearButton>
            </div>
          </div>
        </div>
        
        <div className = "left">
          
          <div>
          <h1> Welcome {this.state.name}</h1>
          <form action = "." 
                onSubmit={e => {
                e.preventDefault()
                this.setState({ name: '' })
                }}>
                <label htmlFor="name">
                  <input
                    type="text"
                    id={'name'}
                    placeholder={'Enter your name...'}
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })
                  }
                  />
                </label>
          </form>
          </div>
            {console.log("Console Log: ", this.state.elements)}
            {this.state.elements.map((message, index) => 
              <ChatMessage
              key={index}
              message = {message.message}
              name = {message.name} />,
            )}
            {/* {this.state.elements.forEach(message =>
            // console.log(message.name),
            <ChatMessage
              key = {0}
              message={message.message}
              name={message.name}
            />,
          )} */}
        </div>
      </div>
    )
  }
}

export default App