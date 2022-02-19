import client from '../public/data/client.json'

const Footer = () => {
  return (
    <>
      <footer className="footerstyle w-full px-6 border-t fixed inset-x-0 bottom-0">
        <div className="container mx-auto max-w-8xl py-6 flex flex-wrap md:flex-no-wrap justify-between items-center text-sm">
          &copy;{new Date().getFullYear()} {client.Title}. All rights
          reserved.
          <div className="pt-4 md:p-0 text-center md:text-right text-xs">
            <a href="#" className="text-black no-underline hover:underline">
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-black no-underline hover:underline ml-4"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#"
              className="text-black no-underline hover:underline ml-4"
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
