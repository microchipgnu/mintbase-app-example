import client from '../public/data/client.json'

const Footer = () => {
  return (
    <>
      <footer className="footerstyle fontFamily fixed bottom-0">
        <div className="container mx-auto max-w-8xl py-6 flex flex-wrap md:flex-no-wrap justify-between items-center text-sm">
          &copy;{new Date().getFullYear()} {client.Title}. All rights
          reserved.
          <div className="pt-4 md:p-0 text-center md:text-right text-xs">
            <a href="#" className="footerLink">
              Privacy Policy
            </a>
            <a
              href="#"
              className="footerLink"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#"
              className="footerLink"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
