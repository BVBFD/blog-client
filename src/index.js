import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './context/context';
import { hydrate, render } from 'react-dom';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(
    <React.StrictMode>
      <BrowserRouter>
        <ContextProvider>
          <App />
        </ContextProvider>
      </BrowserRouter>
    </React.StrictMode>,
    rootElement
  );
} else {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <ContextProvider>
          <App />
        </ContextProvider>
      </BrowserRouter>
    </React.StrictMode>,
    rootElement
  );
}

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ContextProvider>
//         <App />
//       </ContextProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
