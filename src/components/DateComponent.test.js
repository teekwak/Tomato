import React from 'react'; // eslint-disable-line no-unused-vars
import renderer from 'react-test-renderer';
import DateComponent from '../../src/components/DateComponent.js';

test('DateComponent loads', () => {
	const component = renderer.create(
		<DateComponent />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
