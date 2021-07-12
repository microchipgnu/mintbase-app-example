import {
  FooterSection,
  FooterContainer,
  FooterLinkContainer,
  FooterLinksWrapper,
  FooterLinkTitle,
  FooterLink,
  FooterLinks,
  FooterNewsletter,
  FooterNewsletterTitle,
  FooterNewsletterForm,
  FooterLabel,
  FooterBtn,
  FooterNewsletterText,
  FooterNewsletterInput,
  FooterCopyRight,
} from '../styles/Footer.styles'

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        {/* <FooterNewsletter>
          <FooterNewsletterTitle>
            Join our listing for execlusive discounts and new recipes
          </FooterNewsletterTitle>
          <FooterNewsletterText>
            We create new recipes every week and cooking tips
          </FooterNewsletterText>
          <FooterNewsletterForm>
            <FooterLabel htmlFor="email">Email address</FooterLabel>
            <FooterNewsletterInput
              name="email"
              id="email"
              type="email"
              placeholder="Email address"
            />
            <FooterBtn>Submit</FooterBtn>
          </FooterNewsletterForm>
        </FooterNewsletter> */}
        <FooterLinkContainer>
          <FooterLinksWrapper>
            <FooterLinks>
              <FooterLinkTitle>Info</FooterLinkTitle>
              <FooterLink>Mintbase.js</FooterLink>
            </FooterLinks>
          </FooterLinksWrapper>
        </FooterLinkContainer>
        <FooterCopyRight>
          &copy; Copyright {new Date().getFullYear()} ||| Designed and coded
          with ☕️ by Luís Freitas
        </FooterCopyRight>
      </FooterContainer>
    </FooterSection>
  )
}

export default Footer
