import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import createRouter from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/global.css'
import { InnerAuthContextProvider } from './context/auth/auth-provider';

function App() {
  const [router] = useState(() => createRouter());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <InnerAuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </InnerAuthContextProvider>
    </>
  )
}

export default App
