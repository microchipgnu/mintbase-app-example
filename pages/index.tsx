import Head from 'next/head'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Collectibles from '../components/Collectibles'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import MusicPlayer from '../components/MusicPlayer'
//import Access from '../components/access'

const Home = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
    <>
      <Head>
        <title>SEVEN DEAD STARS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <Navbar /> */}
      <Hero />
      <Products storeId={process.env.STOREID!} />
      {isConnected && (
      <Collectibles storeId={wallet?.activeAccount?.accountId!}/>
      )}
      
<h2 className="mb-3 text-xl text-center font-semibold tracking-widest uppercase text-gray-500 title-font md:text-4xl px-6 py-12"><a href="http://opensea.io/SevenDeadStars" target="_blank" rel="noreferrer">View the official <b>Seven Dead Stars</b> OpenSea Store</a></h2>

      <Footer />
    </>
  )
}

export default Home
