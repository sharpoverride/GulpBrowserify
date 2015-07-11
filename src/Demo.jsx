import React from 'react';
import {Two} from './two';

export class Demo extends React.Component {
    render() {
        let two = new Two(),
            result = two.greet('-World');

        return (<h1>{result}</h1>);
    }
}

