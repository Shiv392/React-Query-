import { useState } from 'react';
// import './App.css';
import { QueryClient , QueryClientProvider} from '@tanstack/react-query';
import MainComponent from './components/Main';

const queryClient  = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient }>
      <>
      <MainComponent />
     </>
    </QueryClientProvider>
  )
}

export default App
