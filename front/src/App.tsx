import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import createRouter from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/global.css'
import { InnerAuthContextProvider } from './context/auth/auth-provider';
import { FormProvider } from './context/researcher/form-provider';

function App() {
  const [router] = useState(() => createRouter());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <InnerAuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <FormProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </FormProvider >
        </QueryClientProvider>
      </InnerAuthContextProvider>
    </>
  )
}

export default App
