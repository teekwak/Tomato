import * as React from 'react';

import DateComponent from './DateComponent';
import TimerContainer from '../Containers/TimerContainer';

export class App extends React.Component<any, undefined> {
	render() {
		return (
			<div>
				<DateComponent />
				<TimerContainer />
			</div>
		);
	}
}
