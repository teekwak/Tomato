// function doSomething() {
// 	let myNotification = new Notification('Title', {
// 	  body: 'Lorem Ipsum Dolor Sit Amet'
// 	})

// 	myNotification.onclick = () => {
// 	  console.log('Notification clicked')
// 	}
// }

import React from 'react'
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="myDiv" style={{fontWeight: 'bold'}}>Hello Electron!</div>,
  document.getElementById('app')
);
