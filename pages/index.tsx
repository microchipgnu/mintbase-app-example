import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
//import Products from '../components/Products'
import BasicTabs from '../components/BasicTabs'
//import Collectibles from '../components/Collectibles'
import { useWallet } from '../services/providers/MintbaseWalletContext'
//import Access from '../components/access'
import client from '../public/data/client.json'

const Home = () => {
  //const { wallet, isConnected, details } = useWallet()
  return (
    <>
      <Head>
        <title>{client.Title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <Navbar /> */}
      <Hero />
      {/* <Tabs1 /> */}
      <BasicTabs/>
      {/* <Products storeId={process.env.STOREID!} /> */}
      {/* {isConnected && (
      <Collectibles storeId={wallet?.activeAccount?.accountId!}/>
      )} */}
      
{/* <h2 className="mb-3 text-xl text-center font-semibold tracking-widest uppercase text-gray-500 title-font md:text-4xl px-6 py-12"><a href="http://opensea.io/SevenDeadStars" target="_blank" rel="noreferrer">View the official <b>{client.Title}</b> OpenSea Store</a></h2> */}

      <Footer />
    </>
  )
}

export default Home
