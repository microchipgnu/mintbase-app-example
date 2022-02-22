import Link from 'next/link'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import Image from 'next/image'
import logo from '../public/images/logo.png'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';


const Header = () => {
  const { wallet, isConnected } = useWallet()
  return (
    <header className="fontFamily header-bg py-2 px-2">
      <div className="container mx-auto max-w-8xl md:flex justify-between items-center">
        <Link href="/" passHref>
          <a className="text-lg py-6 w-full text-center font-semibold md:text-left md:w-auto no-underline flex justify-center items-center">
            <Image src={logo}/>
          </a>
        </Link>

        <div className="w-full md:w-auto mb-6 md:mb-0 text-center md:text-right">
          <div className="flex w-full justify-between">
            {isConnected && (
              <p className="text-lg py-2 px-3 font-semibold text-white">
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
              <AccountBalanceWalletIcon  className='mr-4'/>
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
