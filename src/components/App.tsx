import * as React from 'react';

import TimerContainer from '../containers/TimerContainer';
import DateComponent from './DateComponent';

export class App extends React.Component<any, undefined> {
	public render() {
		return (
			<div>
				<DateComponent />
				<TimerContainer />
			</div>
		);
	}
}
