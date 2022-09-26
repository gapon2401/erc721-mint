import React from 'react'
import type { AppProps } from 'next/app'

import '@/css/normalize.css'

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
