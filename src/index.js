import React from 'react';
import Amplify from 'aws-amplify';
import ReactDOM from 'react-dom';

import './index.css';
import Application from './Application';
import configuration from './aws-exports';

Amplify.configure(configuration);

ReactDOM.render(<Application />, document.getElementById('root'));
