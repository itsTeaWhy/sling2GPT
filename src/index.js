import React from 'react';
import { render } from 'react-dom';
import App from './components/App.js';
import * as ReactDOMClient from 'react-dom/client';
import styles from './scss/application.scss';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
// Initial render: Render an element to the root.
root.render(<App tab='home' />);

// During an update, there's no need to pass the container again.
root.render(<App tab='profile' />);
