import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => {
          let myNotification = new Notification('Notification Title', {
            body: 'This is the notification body'
          })

          myNotification.onclick = () => {
            console.log('Notification clicked')
          }
        }}>create notification</button>
      </div>
    )
  }
}

export default App
