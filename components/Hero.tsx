import Navbar from '../components/Navbar'
import { Button } from '../styles/styles'
import {
  HeroContainer,
  HeroContent,
  HeroContentText,
  HeroTitle,
  HeroTitleText,
  HeroSubTitle,
  HeroText,
  HeroBtn,
} from '../styles/Hero.styles'

import { useWallet } from '../components/MintbaseWalletContext'

import Link from 'next/link'

const Hero = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
    <div>
      <HeroContainer>
        <Navbar />
        <HeroContent>
          <HeroContentText>
            <HeroTitle>
              <HeroTitleText>
                {isConnected
                  ? wallet?.activeAccount?.accountId
                  : 'Not connected'}
              </HeroTitleText>
            </HeroTitle>
            <HeroSubTitle>
              {isConnected ? `${details.balance} N` : ''}
            </HeroSubTitle>
            {/* <HeroText>Connected to NEAR via Mintbase.js</HeroText> */}
            {/* 
            <Link href={'https://github.com/Mintbase/mintbase-js'} passHref>
              <HeroBtn>
                <Button primary big bigFont bigRadius>
                  Go to Mintbase.js
                </Button>
              </HeroBtn>
            </Link> */}
          </HeroContentText>
        </HeroContent>
      </HeroContainer>
    </div>
  )
}

export default Hero
