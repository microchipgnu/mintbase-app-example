import Link from 'next/link'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import Image from 'next/image'
import logo from '../public/images/logo.png'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';

const Header = () => {
  let [navState, SetNavState] = useState(true)
  const hidden = () => {
    SetNavState(!navState)
    let show = document.querySelector('.navMobile')
    if (navState == true) {
      return show?.classList.remove('hidden')
    }
    return show?.classList.add('hidden')
  }
  const { wallet, isConnected } = useWallet()
  return (
    <header className="fontFamily fixedHeader relative">
      <div className="flex container mx-auto max-w-8xl sm:flex sm:justify-between md:flex xl:px-5 lg:px-6 justify-between items-center ">
        <Link href="/" passHref>
          <a className="text-lg py-6  text-center font-semibold md:text-left md:w-auto no-underline flex justify-center items-center">
            <Image src={logo} alt="cover" />
          </a>
        </Link>

        <div className=" md:mb-0 text-center md:text-right  ">
          <span className='md:hidden p-8 cursor-pointer' onClick={hidden}>
            {navState ? <MenuIcon className='text-white'/> : <CloseIcon className='text-white'/>}
          </span>
          <div className="navMobile hidden md:flex p-4 z-50 bg-[#273359] md:bg-transparent -right-80 md:-mt-8  xl:-mt-10  lg:-mt-8 md:z-50  sm:z-50 sm:mt-8 absolute  mr-80 justify-between">
            {isConnected && (
              <p className="text-lg py-4 px-8 font-semibold text-white">
                {wallet?.activeAccount?.accountId}
              </p>
            )}
            <button
              className="headerBtn"
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
              <AccountBalanceWalletIcon className='mr-4' />
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
