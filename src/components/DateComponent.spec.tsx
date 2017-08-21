import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import DateComponent from './DateComponent';

describe('DateComponent', () => {
	it('can be rendered', () => {
		const component = renderer.create(
			<DateComponent />
		);

		expect(component.toJSON()).toMatchSnapshot();
	});
});
