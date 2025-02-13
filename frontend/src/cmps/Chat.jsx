import { useState } from 'react'

export function Chat() {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')

  function sendMsg() {
    if (!input.trim()) return

    const userMsg = { text: input, sender: 'user' }
    setMsgs(prevMsgs => [...prevMsgs, userMsg])
    setInput('')

    setTimeout(() => {
      const botMsg = { text: `You said: "${input}"`, sender: 'bot' }
      setMsgs(prevMsgs => [...prevMsgs, botMsg])
    }, 1000)
  }

  return (
    <div className="chat-container">
      <div className="chat-msgs">
        {msgs.map((msg, index) => (
          <div key={index} className={`chat-msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={e => e.key === 'Enter' && sendMsg()}
        />
        <button className="btn" onClick={sendMsg}>
          Send
        </button>
      </div>
    </div>
  )
}
