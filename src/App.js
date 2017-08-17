import React from 'react';
import DateContainer from './DateContainer';

class App extends React.Component {
  render() {
    return (
      <div>
        <DateContainer />

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
