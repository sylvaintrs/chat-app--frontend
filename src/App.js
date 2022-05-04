import React, { useState } from 'react'
import io from 'socket.io-client';

import './App.css';

function App() {

  const [messages, setMessages] = useState([])

  const socket = io('https://chat-messenger-backend.herokuapp.com/')

  socket.on('SERVER_MSG', msg => {
    setNewMessage(msg)
  })

  function setNewMessage(msg) {
    setMessages([
      ...messages,
      msg
    ])
  }

  function sendMessage(e) {
    e.preventDefault()
    const msg = {
      username: e.target.username.value,
      text: e.target.text.value
    }
    e.target.text.value = ''
    socket.emit('CLIENT_MSG', msg);
    setNewMessage(msg)
  }

  return (
    <div className="App">
      <div className="card">

        <div className="title">Chat messenger</div>

        <div className="messages">
          {messages.map(msg => {
            return (
                <div key={msg}>{msg.username}: {msg.text}</div>
            )
          })}
        </div>

        <form onSubmit={e => sendMessage(e)}>
          <div className="container">
            <input id="username"
                  type="text"
                  placeholder="Username"
                  className="form-control"
            />
            <input id="text"
                  type="text"
                  placeholder="Your message"
                  className="form-control"
            />
            <button type="submit"
                    className="btn btn-primary form-control">
              Send
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default App;
