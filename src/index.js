import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './context/context';
import { HelmetProvider } from 'react-helmet-async';
import { hydrate, render } from 'react-dom';

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ContextProvider>
//         <HelmetProvider>
//           <App />
//         </HelmetProvider>
//       </ContextProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(app, rootElement);
} else {
  render(app, rootElement);
}
