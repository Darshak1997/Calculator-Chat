import React from 'react'
import './App.css';
// import { null } from 'mathjs'

// const URL = 'ws://localhost:3030'

//  class ChatMessage extends React.Component {
//    constructor(props){
//      super(props);
//    }
   
export default ({ name, message }) =>
<div className="messages">
  <p>
    <strong>{name}: </strong> <em>{message}</em>
  </p>
</div>

//   ws = new WebSocket(URL)

//   componentDidMount() {
//     this.ws.onopen = () => {
//       // on connecting, do nothing but log it to the console
//       console.log('connected')
//     }

//     this.ws.onmessage = evt => {
//       // on receiving a message, add it to the list of messages
//       const message = JSON.parse(evt.data)
//       this.addMessage(message)
//     }

//     this.ws.onclose = () => {
//       console.log('disconnected')
//       // automatically try to reconnect on connection loss
//       this.setState({
//         ws: new WebSocket(URL),
//       })
//     }
//   }

//   addMessage = message =>
//     this.setState(state => ({ messages: [message, ...state.messages] }))

//   submitMessage = messageString => {
//     // on submitting the ChatInput form, send the message, add it to the list and reset the input
//     const message = { name: this.state.name, message: messageString }
//     this.ws.send(JSON.stringify(message))
//     this.addMessage(message)
//   }

//   render(){
//     return (
//         <p>
//         <strong>{this.props.name}</strong> <em>{this.props.message}</em>
//       </p>
      
//     )
//   }
// }

// export default Display

// render(){
//        return (
//         <p>
//           <strong>{this.props.name}</strong> <em>{this.props.message}</em>
//         </p>
//        )
//      }
//   }

//   export default ChatMessage