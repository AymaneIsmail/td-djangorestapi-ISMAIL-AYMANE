import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import createRouter from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/global.css'

function App() {
  const [router] = useState(() => createRouter());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App
