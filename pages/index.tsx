import Head from 'next/head'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'

const Home = () => {
  return (
    <>
      <Head>
        <title>Mintbase Engineering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <Navbar /> */}
      <Hero />
      {/* <Products storeId='wildeverse.mintbase1.near' /> */}
      <Products storeId='mintingmusic.mintspace2.testnet' />
      {/* <Products storeId='kk.mintspace2.testnet' /> */}
      
      <Footer />
    </>
  )
}

export default Home
