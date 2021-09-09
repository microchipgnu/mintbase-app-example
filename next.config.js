module.exports = {
  reactStrictMode: true,
  generateEtags: false,
  images: {
    domains: [
      'arweave.net',
      'coldcdn.com',
      'firebasestorage.googleapis.com',
      'pbs.twimg.com',
      'lh3.googleusercontent.com',
      'twitter.com',
      'source.unsplash.com',
      'abs.twimg.com',
    ],
  },
  env: {
    NETWORK: process.env.NETWORK,
    STOREID: process.env.STOREID,
    MINTBASEJS_FACTORY_CONTRACT_NAME: process.env.MINTBASEJS_FACTORY_CONTRACT_NAME
  },
}