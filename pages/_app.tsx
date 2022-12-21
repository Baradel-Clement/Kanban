import React from 'react'
import { AppProps } from 'next/app'
import { HomeContextProvider } from '../context/Home';
import { BoardContextProvider } from '../context/Board';
import { TaskContextProvider } from '../context/Task';
import { SessionProvider } from 'next-auth/react';

import '../styles/index.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <HomeContextProvider>
        <BoardContextProvider>
          <TaskContextProvider>
            <Component {...pageProps} />
          </TaskContextProvider>
        </BoardContextProvider>
      </HomeContextProvider>
    </SessionProvider>
  );
}

export default MyApp
