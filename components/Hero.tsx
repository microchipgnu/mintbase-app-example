import Navbar from '../components/Navbar'

import { useWallet } from '../services/providers/MintbaseWalletContext'
import client from '../public/data/client.json'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
    <>
      <div
        className="w-full py-24 px-6 bg-cover bg-no-repeat bg-top relative z-10"
        style={{
          backgroundImage:
            "url('images/coverArt.jpg')",
        }}
      >
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="fontFamily heroH1">
            {client.HeroTitle}
          </h1>
          <p className="fontFamily heroP">
            {client.HeroQuote}
          </p>

        </div>
      </div>
    </>
  )
}

export default Hero
