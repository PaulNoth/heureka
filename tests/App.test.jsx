import React from 'react';
import { render } from 'react-native-testing-library';

import App from '../src/App';

describe('<App/>', () => {
    it('has 1 child', () => {
        const tree = render(<App />).toJSON();
        expect(tree.children.length).toBe(2);
    });

    it('renders correctly', () => {
        const tree = render(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
