import React from 'react';
import DateComponent from './components/DateComponent';
import TimerContainer from './containers/TimerContainer';

class App extends React.Component {
	render() {
		return (
			<div>
				<DateComponent />
				<TimerContainer />
			</div>
		);
	}
}

export default App;
