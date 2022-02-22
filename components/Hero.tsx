import client from '../public/data/client.json'
const Hero = () => {
  return (
    <>
      <div
        className="w-full py-24 px-6 bg-cover bg-no-repeat bg-top relative z-10 object-contain"
        style={{
          backgroundImage:
            "url('images/coverArt.jpg')",
        }}
      >
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="fontFamily text-gradient heroH1">
            {client.HeroTitle}
          </h1>
          <p className="fontFamily heroP text-gradient">
            {client.HeroQuote}
          </p>

        </div>
      </div>
    </>
  )
}

export default Hero
