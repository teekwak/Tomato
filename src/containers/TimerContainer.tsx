import * as React from 'react';

export default class TimerContainer extends React.Component<any, any> {
	private MAXIMUM_MINUTES: number;
	private MILLISECONDS_PER_SECOND: number;
	private SECONDS_PER_MINUTE: number;
	private MAXIMUM_MILLISECONDS: number;
	private TIMEOUT_TIME: number;

	constructor() {
		super();
		this.state = {
			actualMillisecondsLeft: 0,
			expectedMillisecondsLeft: 0,
			running: false,
			startTimestamp: null,
		};
		this.MAXIMUM_MINUTES = 1; // FIXME: this should be in the state as a prop instead
		this.MILLISECONDS_PER_SECOND = 1000;
		this.SECONDS_PER_MINUTE = 10;
		this.MAXIMUM_MILLISECONDS = this.MAXIMUM_MINUTES * this.SECONDS_PER_MINUTE * this.MILLISECONDS_PER_SECOND;
		this.TIMEOUT_TIME = 100;
	}

	public componentDidMount() {
		this.calculateCircleStuff();
		this.resetTimer();
	}

	public startTimer() {
		this.setState({
			running: true,
			startTimestamp: new Date().getTime(),
		}, () => {
			setTimeout(this.countdown.bind(this), 100);
			this.startCircle();
		});
	}

	public countdown() {
		if (this.state.running) {
			if (this.state.expectedMillisecondsLeft > 0) {
				const timeoutStart = new Date().getTime();

				this.setState({
					actualMillisecondsLeft: this.state.actualMillisecondsLeft - (timeoutStart - this.state.startTimestamp),
					expectedMillisecondsLeft: this.state.expectedMillisecondsLeft - this.TIMEOUT_TIME,
					startTimestamp: timeoutStart
				}, () => {
					const diff = this.state.expectedMillisecondsLeft - this.state.actualMillisecondsLeft;
					setTimeout(this.countdown.bind(this), this.TIMEOUT_TIME - diff);
				});
			} else {
				this.setState({
					running: false
				}, () => {
					this.resetTimer();
					this.sendNotification();
				});
			}
		}
	}

	public pauseTimer() {
		this.setState({ running : false }, () => {
			this.pauseCircle();
		});
	}

	public resetTimer() {
		this.setState({
			actualMillisecondsLeft: this.MAXIMUM_MILLISECONDS,
			expectedMillisecondsLeft: this.MAXIMUM_MILLISECONDS
		}, () => {
			this.resetCircle();
			this.pauseCircle();
			console.log('restarted!!!');
		});
	}

	public sendNotification() {
		const myNotification = new Notification('Tomato', {
			body: 'You\'re done! Go take a 5 minute break...'
		});

		myNotification.onclick = () => {
			myNotification.close();
		};

		setTimeout(() => {
			myNotification.close();
		}, 4500);
	}

	public resetCircle() {
		const circle = document.getElementById('countingCircle');
		const clone = circle.cloneNode(true);
		circle.parentNode.replaceChild(clone, circle);
	}

	public pauseCircle() {
		document.getElementById('countingCircle').style.webkitAnimationPlayState = 'paused';
	}

	public startCircle() {
		document.getElementById('countingCircle').style.webkitAnimationPlayState = 'running';
	}

	public calculateCircleStuff() {
		const circle = document.getElementById('countingCircle');
		const radius = circle.getAttribute('r');
		const circumference = (2 * Math.PI * parseFloat(radius)).toString();

		circle.style.strokeDasharray = circumference;
		circle.style.strokeDashoffset = circumference;
		circle.style.animation = 'countdown ' + this.MAXIMUM_MINUTES * this.SECONDS_PER_MINUTE + 's linear forwards';
	}

	public getTimeLeft() {
		const minutesLeft = Math.floor(this.state.expectedMillisecondsLeft / 1000 / 60);
		const secondsLeft = Math.ceil(this.state.expectedMillisecondsLeft / 1000) % 60;

		if (secondsLeft < 10) {
			return minutesLeft + ':0' + secondsLeft;
		}

		return minutesLeft + ':' + secondsLeft;
	}

	public render() {
		return (
			<div className="timerContainer">
	 			<svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
	 				<circle id="backgroundCircle" cx="250" cy="250" r="200" />
	 				<circle id="countingCircle" cx="250" cy="250" r="200" />
	 				<text id="timerText">{this.getTimeLeft()}</text>
	 			</svg>

	 			{this.state.running ?
	 				<div className="timerButtonContainer">
	 					<button className="timerButton pauseButton" onClick={this.pauseTimer.bind(this)}>Pause</button>
	 				</div> :
	 				<div className="timerButtonContainer">
	 					<button className="timerButton startButton" onClick={this.startTimer.bind(this)}>Start<span></span></button>
	 					<button className="timerButton resetButton" onClick={this.resetTimer.bind(this)}>Reset</button>
	 				</div>
	 			}
			</div>
		);
	}
}
