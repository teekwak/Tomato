import * as React from 'react';

export default class TimerContainer extends React.Component<any, any> {
	private MAXIMUM_MINUTES: number;
	private SECONDS_PER_MINUTE: number;
	private interval: NodeJS.Timer;

	constructor() {
		super();
		this.state = {
			secondsLeft: 0,
			started: false
		};
		this.MAXIMUM_MINUTES = 1;
		this.SECONDS_PER_MINUTE = 10;
		this.interval = null;
	}

	componentDidMount() {
		this.resetTimer();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	decrementSecondsLeft() {
		this.setState({secondsLeft: this.state.secondsLeft - 1}, () => {
			if(this.state.secondsLeft == 0) {
				clearInterval(this.interval);
				this.toggleStarted();
				this.sendNotification();
				this.resetTimer();
			}
		});
	}

	getTimeLeft() {
		const minutesLeft = Math.floor(this.state.secondsLeft / 60);
		const secondsLeft = this.state.secondsLeft % 60;

		if(secondsLeft < 10) {
			return minutesLeft + ':0' + secondsLeft;
		}

		return minutesLeft + ':' + secondsLeft;
	}

	resetTimer() {
		this.setState({secondsLeft: this.MAXIMUM_MINUTES * this.SECONDS_PER_MINUTE});
	}

	sendNotification() {
		let myNotification = new Notification('Notification Title', {
			body: 'This is the notification body'
		});

		myNotification.onclick = () => {
			console.log('Notification clicked');
		};
	}

	startTimer() {
		this.toggleStarted();
		this.interval = setInterval(() => this.decrementSecondsLeft(), 1000);
	}

	stopTimer() {
		this.toggleStarted();
		clearInterval(this.interval);
	}

	toggleStarted() {
		this.setState({started: !this.state.started});
	}

	render() {
		return(
			<div className="timerContainer">
				<div className="timerText">
					{this.getTimeLeft()}
				</div>
				{this.state.started ?
					<div className="timerButtonContainer">
						<button className="timerButton pauseButton" onClick={this.stopTimer.bind(this)}>Pause</button>
					</div>:
					<div className="timerButtonContainer">
						<button className="timerButton startButton" onClick={this.startTimer.bind(this)}>Start<span></span></button>
						<button className="timerButton resetButton" onClick={this.resetTimer.bind(this)}>Reset</button>
					</div>
				}
			</div>
		);
	}
}
