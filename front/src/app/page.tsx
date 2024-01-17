'use client'
import AppForm from '@/components/UI/AppForm/AppForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <AppForm/>
      </main>
    </QueryClientProvider>
  );
}
