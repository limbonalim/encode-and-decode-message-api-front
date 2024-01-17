'use client'
import AppForm from '@/components/AppForm/AppForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <AppForm/>
        <p>
          Поле <b>password</b> должно быть заполненно<br/>
          Если ввести текст в поле <b>decode</b> и переключить <b>switch в положение True</b> и нажать Enter то в поле <b>encode</b> отобразиться зашифрованное сообщение.<br/>
          Если ввести текст в поле <b>encode</b> и переключить <b>switch в положение False</b> и нажать Enter то в поле <b>decode</b> отобразиться расшифрованное сообщение.
        </p>
      </main>
    </QueryClientProvider>
  );
}
