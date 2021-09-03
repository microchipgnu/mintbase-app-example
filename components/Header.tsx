import Link from 'next/link'
import { useWallet } from '../services/providers/MintbaseWalletContext'
//import { PrismaClient } from '@prisma/client';
//import { useEffect, useLayoutEffect, useState } from 'react'
//import Cookies from 'universal-cookie';
//const cookies = new Cookies();
import Image from 'next/image'
import logo from '../public/7ds-logo.png'

// cookies.set('myCat', 'Pacman', { path: '/' });

// async function saveNames(name: string){
//   if(global.window){
//   const response = await fetch('/api/names', {
//     method: 'POST',
//     body: name//JSON.stringify(name)
//   });
//  }
// }

const Header = () => {
  const { wallet, isConnected, details } = useWallet()
  // const [showModal, setShowModal] = useState(false)
  // useEffect(()=>{
  //   // setTimeout(()=>{
  //   //   //check if the cookie is set then only call setshowmodal
  //   //   // if cookie not set: setShow(true); set cookie, 
  //   //   setShowModal(true)
  //   // }, 2000)
  //   if(!(cookies.get('consent')=='true')){
  //     setShowModal(true);
  //     //cookies.set('consent','true',{ path: '/'});
  //   }
  // }, [])//useState(true);

// const setShowCookie = () => {
//   setShowModal(false)
//   cookies.set('consent','true',{ path: '/'});
//   saveNames(wallet?.activeAccount?.accountId!)
// }

  return (
    <header className="w-full px-6 headerstyle">
      <div className="container mx-auto max-w-8xl md:flex justify-between items-center">
        <Link href="/" passHref>
          <a className="text-lg py-6 w-full text-center font-semibold md:text-left md:w-auto no-underline flex justify-center items-center">
            <Image src={logo}/>
          </a>
        </Link>

        <div className="w-full md:w-auto mb-6 md:mb-0 text-center md:text-right">
          <div className="flex flex-row items-center space-x-2">
            {isConnected && (
              <p className="text-lg py-2 px-3 font-semibold">
                {wallet?.activeAccount?.accountId}
              </p>
            )}
            <button
              className="inline-block no-underline bg-black text-white text-sm py-2 px-3"
              onClick={
                isConnected
                  ? () => {
                      wallet?.disconnect()
                      window.location.reload()
                    }
                  : () => {
                      wallet?.connect({ requestSignIn: true })
                    }
              }
            >
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
