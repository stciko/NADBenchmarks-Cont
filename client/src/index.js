import { ColorModeScript, ChakraProvider, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DatasetDetail from './pages/DatasetDetail';
import DatasetList from './pages/DatasetList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <DatasetList />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'detail/:datasetId',
        element: <DatasetDetail />,
      },
    ],
  },
]);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
