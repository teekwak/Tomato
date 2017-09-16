import * as React from 'react';

export default class TimerContainer extends React.Component<any, any> {
	private MAXIMUM_MINUTES: number;
	private SECONDS_PER_MINUTE: number;
	private interval: NodeJS.Timer;

	constructor() {
		super();
		this.state = {
			running: false,
			secondsLeft: 0
		};
		this.MAXIMUM_MINUTES = 1;
		this.SECONDS_PER_MINUTE = 3;
		this.interval = null;
	}

	public componentDidMount() {
		this.resetTimer();
		this.calculateCircleStuff();
	}

	public componentWillUnmount() {
		clearInterval(this.interval);
	}

	public decrementSecondsLeft() {
		this.setState({secondsLeft: this.state.secondsLeft - 1}, () => {
			if (this.state.secondsLeft === 0) {
				clearInterval(this.interval);
				this.toggleRunning();
				this.sendNotification();
				this.resetTimer();
				this.resetCircle();
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
		this.setState({secondsLeft: this.MAXIMUM_MINUTES * this.SECONDS_PER_MINUTE}, () => {
			this.resetCircle();
			this.pauseCircle();
		});
	}

	public sendNotification() {
		const myNotification = new Notification('Notification Title', {
			body: 'This is the notification body'
		});

		myNotification.onclick = () => {
			myNotification.close();
		};

		setTimeout(() => {
			myNotification.close();
		}, 5000);
	}

	public startTimer() {
		this.toggleRunning();
		this.interval = setInterval(() => this.decrementSecondsLeft(), 1000);
		this.startCircle();
	}

	public stopTimer() {
		this.toggleRunning();
		clearInterval(this.interval);
		this.pauseCircle();
	}

	public toggleRunning() {
		this.setState({running: !this.state.running});
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
		circle.style.animation = 'countdown ' + this.MAXIMUM_MINUTES * this.SECONDS_PER_MINUTE + 's linear infinite';
	}

	public render() {
		return(
			<div className="timerContainer">
				<svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
					<circle id="countingCircle" cx="250" cy="250" r="200" />
				</svg>

				<div className="timerText">
					{this.getTimeLeft()}
				</div>

				{this.state.running ?
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
