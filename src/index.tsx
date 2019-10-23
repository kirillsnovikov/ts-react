import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Test from './components/Test'

interface IAppProps {
    [key: string]: string;
}

let myprop: IAppProps = {
    title: 'asdf'
}

const App = (props: IAppProps) => {
    return (
        <div id="app">
            <Test />
            <h1>{props.title}</h1>
        </div>
    );
}

ReactDOM.render(
    <App title="Hello, React!" />,
    document.getElementById('root')
);