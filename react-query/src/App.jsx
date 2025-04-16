import { useState } from 'react';
// import './App.css';
import { QueryClient , QueryClientProvider} from '@tanstack/react-query';
import MainComponent from './components/Main';
import PaginationFetchData from './components/PaginationFetchData';
import { BrowserRouter } from 'react-router-dom';
import ScrollingFetchData from './components/ScrollingFetchData';

const queryClient  = new QueryClient();

function App() {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient }>
      <>
      {/* <MainComponent /> */}
      {/* <PaginationFetchData /> */}
      <ScrollingFetchData />
     </>
    </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
