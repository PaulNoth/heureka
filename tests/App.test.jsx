import React from 'react';
import { render } from 'react-native-testing-library';

import App from '../src/App';

describe('<App/>', () => {
    it('renders correctly', () => {
        const tree = render(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('has 1 child', () => {
        const tree = render(<App />).toJSON();
        expect(tree.children.length).toBe(2);
    });

    it('has a text rendered', () => {
        const { getByTestId } = render(<App />);
        const element = getByTestId('main-text');
        const text = element.props.children;
        expect(text).toBe('Open up App.js to start working on your app!');
    });
});
