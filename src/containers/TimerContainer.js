import React from 'react';

class TimerContainer extends React.Component {
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
		this.setState({secondsLeft: this.MAXIMUM_MINUTES * this.SECONDS_PER_MINUTE});
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
			}		
		});
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
			<div>
				{this.state.secondsLeft < 10 ? '0' + this.state.secondsLeft : this.state.secondsLeft}
				{this.state.started ? 
					<div>
						<button onClick={this.stopTimer.bind(this)}>Pause</button>	
					</div>:
					<div>
						<button onClick={this.startTimer.bind(this)}>Start</button>
						<button onClick={this.resetTimer.bind(this)}>Reset</button>
					</div>				
				}								
			</div>
		);
	}
}

export default TimerContainer;