import Head from 'next/head'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Collectibles from '../components/Collectibles'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import MusicPlayer from '../components/MusicPlayer'

//import { PrismaClient, names, Prisma } from '@prisma/client';
//const prisma = new PrismaClient();

async function saveNames(name: string){
  if(global.window){
  const response = await fetch('/api/names', {
    method: 'POST',
    body: name//JSON.stringify(name)
  });
 }
}


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
      {/* <Products storeId='mintingmusic.mintspace2.testnet' /> */}
      {/* <button
               className="inline-block no-underline bg-black text-white text-sm py-2 px-3" 
               onClick={() => saveNames(wallet?.activeAccount?.accountId!)}>
              SubmitName 
      </button>   */}
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
