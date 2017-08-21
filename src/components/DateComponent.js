import React from 'react';

class DateComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			date: '',
			time: ''
		};
		this.interval = null;
		this.months = [
			'January', 'February', 'March',
			'April', 'May', 'June',
			'July', 'August', 'September',
			'October', 'November', 'December'
		];
	}

	computeCurrentDateAndTime() {
		const dateObject = new Date();
		const month = this.months[dateObject.getMonth()];
		const day = dateObject.getDate();

		let hour = dateObject.getHours();
		let minute = dateObject.getMinutes();
		let second = dateObject.getSeconds();
		let ampm = 'am';

		if(hour == 0) {
			hour = 12;
		} else if (hour > 12) {
			hour -= 12;
			ampm = 'pm';
		}

		if(minute < 10) {
			minute = '0' + minute;
		}

		if(second < 10) {
			second = '0' + second;
		}

		this.setState({
			date: month + ' ' + day,
			time: hour + ':' + minute + ':' + second + ' ' + ampm
		});
	}

	componentDidMount() {
		this.computeCurrentDateAndTime(); // render immediately upon mounting
		this.interval = setInterval(() => this.computeCurrentDateAndTime(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className="dateContainer">
				<h1>{this.state.date}</h1>
				<h3>{this.state.time}</h3>
			</div>
		);
	}
}

export default DateComponent;
