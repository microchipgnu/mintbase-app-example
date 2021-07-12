import Head from 'next/head'
import styled from 'styled-components'

import { useWallet } from '../components/MintbaseWalletContext'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Head>
        <title>Mintbase Dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Footer />
    </>
  )
}

export default Home
