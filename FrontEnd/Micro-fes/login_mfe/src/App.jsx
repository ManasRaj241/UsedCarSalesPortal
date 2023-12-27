import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import Login from './Pages/Login';

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">Login MFE</div>
);
ReactDOM.render(<App />, document.getElementById('app'));
