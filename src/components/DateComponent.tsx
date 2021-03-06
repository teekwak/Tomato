import * as React from 'react';

export default class DateComponent extends React.Component<any, any> {
	private interval: NodeJS.Timer;
	private months: string[];

	constructor(props: any) {
		super(props);
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

	public computeCurrentDateAndTime() {
		const dateObject = new Date();
		const month = this.months[dateObject.getMonth()];
		const day = dateObject.getDate();

		let minute: any;
		let second: any;

		let hour = dateObject.getHours();
		minute = dateObject.getMinutes();
		second = dateObject.getSeconds();
		let ampm = 'am';

		if (hour === 0) {
			hour = 12;
		} else if (hour > 12) {
			hour -= 12;
			ampm = 'pm';
		}

		if (minute < 10) {
			minute = '0' + minute;
		}

		if (second < 10) {
			second = '0' + second;
		}

		this.setState({
			date: month + ' ' + day,
			time: hour + ':' + minute + ':' + second + ' ' + ampm
		});
	}

	public componentDidMount() {
		this.computeCurrentDateAndTime();
		this.interval = setInterval(() => this.computeCurrentDateAndTime(), 1000);
	}

	public componentWillUnmount() {
		clearInterval(this.interval);
	}

	public render() {
		return (
			<div className="dateContainer">
				<h1 className="currentDate">{this.state.date}</h1>
				<h3 className="currentTime">{this.state.time}</h3>
			</div>
		);
	}
}
