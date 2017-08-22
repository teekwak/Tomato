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

	public componentDidMount() {
		this.resetTimer();
	}

	public componentWillUnmount() {
		clearInterval(this.interval);
	}

	public decrementSecondsLeft() {
		this.setState({secondsLeft: this.state.secondsLeft - 1}, () => {
			if (this.state.secondsLeft === 0) {
				clearInterval(this.interval);
				this.toggleStarted();
				this.sendNotification();
				this.resetTimer();
			}
		});
	}

	public getTimeLeft() {
		const minutesLeft = Math.floor(this.state.secondsLeft / 60);
		const secondsLeft = this.state.secondsLeft % 60;

		if (secondsLeft < 10) {
			return minutesLeft + ':0' + secondsLeft;
		}

		return minutesLeft + ':' + secondsLeft;
	}

	public resetTimer() {
		this.setState({secondsLeft: this.MAXIMUM_MINUTES * this.SECONDS_PER_MINUTE});
	}

	public sendNotification() {
		const myNotification = new Notification('Notification Title', {
			body: 'This is the notification body'
		});

		myNotification.onclick = () => {
			console.log('Notification clicked');
		};
	}

	public startTimer() {
		this.toggleStarted();
		this.interval = setInterval(() => this.decrementSecondsLeft(), 1000);
	}

	public stopTimer() {
		this.toggleStarted();
		clearInterval(this.interval);
	}

	public toggleStarted() {
		this.setState({started: !this.state.started});
	}

	public render() {
		return(
			<div className="timerContainer">
				<div className="timerText">
					{this.getTimeLeft()}
				</div>
				{this.state.started ?
					<div className="timerButtonContainer">
						<button className="timerButton pauseButton" onClick={this.stopTimer.bind(this)}>Pause</button>
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
