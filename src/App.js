import React from 'react';
import DateComponent from './components/DateComponent';

class App extends React.Component {
	render() {
		return (
			<div>
				<DateComponent />

				<button onClick={() => {
					let myNotification = new Notification('Notification Title', {
						body: 'This is the notification body'
					});

					myNotification.onclick = () => {
						console.log('Notification clicked')
					};
				}}>create notification</button>
			</div>
		);
	}
}

export default App;
