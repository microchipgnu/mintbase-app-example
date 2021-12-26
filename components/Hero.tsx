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
          <h1 className="mmtext text-xl leading-tight md:text-3xl text-center text-gray-100 mb-3">
            {client.HeroTitle}
          </h1>
          <p className="mmtext text-md md:text-lg text-center text-white ">
            {client.HeroQuote}
          </p>

        </div>
      </div>
    </>
  )
}

export default Hero
