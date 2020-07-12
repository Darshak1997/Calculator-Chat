import React from 'react';
import './App.css';
//import Chat from './Chat';
import {Buttons} from './Component/Buttons';
import {Input} from './Component/Input';
import {ClearButton} from './Component/ClearButton'
import ChatMessage from './chatMessage'
import * as math from 'mathjs';
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
// import * as math from 'https://unpkg.com/mathjs@6.2.3/dist/math.js';

const URL = 'ws://localhost:3030'

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: "",
      input: "",
      messages1: [],
      messages: [],

    };
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const val = JSON.parse(evt.data)
      this.addMessage(val)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }

  addToInput = val => {
    this.setState({input: this.state.input + val});
  }

  addMessage = val => {
    console.log(val["message"])
    this.setState(
      {messages1:  [val, ...this.state.messages1]}
      );
  }

  handleEqual = messageString => {
    let message1 = this.state.input + ' = ' + math.evaluate(this.state.input)
    const data = { name: this.state.name, message: message1 }
    this.ws.send(JSON.stringify(data))
    this.setState(
      { input: message1,
        messages:  [data, ...this.state.messages],
        messages1:  [data, ...this.state.messages1]}
      );
      
  }

  // submitMessage = messageString => {
  //   // on submitting the ChatInput form, send the message, add it to the list and reset the input
  //   const data = { name: this.state.name, message: messageString }
  //   this.ws.send(JSON.stringify(data))
  //   this.addMessage(data)
  // }

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
            {this.state.messages1.map((message, index) =>
            <ChatMessage
              key={index}
              message={message.message}
              name={message.name}
            />,
          )}
        
        
        </div>
      </div>
    )
  }
}

export default App