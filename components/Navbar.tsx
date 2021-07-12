import { useState } from 'react'
import {
  Nav,
  NavbarContainer,
  NavLogo,
  Menu,
  MenuItem,
  MenuLink,
  MenuIcon,
} from '../styles/Navbar.styles'
import Link from 'next/link'

import { useWallet } from '../components/MintbaseWalletContext'

import { IconContext } from 'react-icons'
import { BiMenu, BiX } from 'react-icons/bi'

const Navbar = () => {
  const { wallet, isConnected, details } = useWallet()

  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const closeMenu = () => setClick(false)

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <Nav>
        <NavbarContainer>
          <Link href="/" passHref>
            <NavLogo>
              <a>Mintbase Dev</a>
            </NavLogo>
          </Link>
          <MenuIcon onClick={handleClick}>
            {click ? <BiX /> : <BiMenu />}
          </MenuIcon>

          <Menu onClick={handleClick} click={click}>
            <MenuItem>
              <MenuLink
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
                <a>{isConnected ? 'Disconnect' : 'Connect'}</a>
              </MenuLink>
            </MenuItem>
          </Menu>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  )
}

export default Navbar
