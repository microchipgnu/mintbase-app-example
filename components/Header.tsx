import Link from 'next/link'
import { useWallet } from '../services/providers/MintbaseWalletContext'
//import { PrismaClient } from '@prisma/client';
import { useEffect, useLayoutEffect, useState } from 'react'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// cookies.set('myCat', 'Pacman', { path: '/' });

async function saveNames(name: string){
  if(global.window){
  const response = await fetch('/api/names', {
    method: 'POST',
    body: name//JSON.stringify(name)
  });
 }
}

const Header = () => {
  const { wallet, isConnected, details } = useWallet()
  const [showModal, setShowModal] = useState(false)
  useEffect(()=>{
    // setTimeout(()=>{
    //   //check if the cookie is set then only call setshowmodal
    //   // if cookie not set: setShow(true); set cookie, 
    //   setShowModal(true)
    // }, 2000)
    if(!(cookies.get('consent')=='true')){
      setShowModal(true);
      //cookies.set('consent','true',{ path: '/'});
    }
  }, [])//useState(true);

const setShowCookie = () => {
  setShowModal(false)
  cookies.set('consent','true',{ path: '/'});
  saveNames(wallet?.activeAccount?.accountId!)
}

  return (
    <header className="w-full px-6 headerstyle">
      <div className="container mx-auto max-w-8xl md:flex justify-between items-center">
        <Link href="/" passHref>
          <a className="text-lg py-6 w-full text-center font-semibold md:text-left md:w-auto text-green-500 no-underline flex justify-center items-center">
            <img src="minting-music-logo.png"/>
          </a>
        </Link>

        <div className="w-full md:w-auto mb-6 md:mb-0 text-center md:text-right">
          <div className="flex flex-row items-center space-x-2">
            {isConnected && (
              <p className="text-lg py-2 px-3 text-green-500 font-semibold">
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
            {isConnected && showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Disclaimer!
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  To be eligible for airdrops and to use the full features of Minting Music’s Community pages, 
                  Please agree to provide Minting Music with your NEAR Name and permit some centralized user tracking features such as cookies.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    I do not agree
                  </button>
                  <button
                    className="bg-emerald-500 text-red-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowCookie()}
                  >
                    I agree
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
