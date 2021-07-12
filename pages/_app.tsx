import type { AppProps } from 'next/app'
import { WalletProvider } from '../components/MintbaseWalletContext'

import styled, { createGlobalStyle } from 'styled-components'

import GlobalStyles from '../styles/styles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider apiKey={process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY || ''}>
      <GlobalStyles />
      <Component {...pageProps} />
    </WalletProvider>
  )
}
export default MyApp
