import Head from 'next/head'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Collectibles from '../components/Collectibles'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import MusicPlayer from '../components/MusicPlayer'

const Home = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
    <>
      <Head>
        <title>Minting Music</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <Navbar /> */}
      <Hero />
      {/* <Products storeId='wildeverse.mintbase1.near' /> */}
      <Products storeId={process.env.STOREID!} />
      {isConnected && (
      // <Collectibles storeId="mintingmusic1.testnet"/>
      <Collectibles storeId={wallet?.activeAccount?.accountId!}/>
      )}
      {/* <MusicPlayer /> */}
      {/* <Products storeId='kk.mintspace2.testnet' /> */}
      
      <Footer />
    </>
  )
}

export default Home
