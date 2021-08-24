import { useEffect, useLayoutEffect, useState } from 'react'

import { useWallet } from '../services/providers/MintbaseWalletContext'

import { gql } from 'apollo-boost'

import { useQuery, useLazyQuery } from '@apollo/client'

import { MetadataField } from 'mintbase'

import Image from 'next/image'
import React, { useRef, forwardRef, useImperativeHandle, Ref } from 'react'
//import * from 'react'

import Collectibles from '../components/Collectibles'

const FETCH_STORE = gql`
  query FetchStore($storeId: String!, $limit: Int = 20, $offset: Int = 0) {
    store(where: { id: { _eq: $storeId } }) {
      id
      name
      symbol
      baseUri
      owner
      minters {
        account
        enabled
      }
      things(limit: $limit, offset: $offset) {
        id
        memo
        metaId
        tokens_aggregate {
          aggregate {
            count
          }
        }
        tokens(limit: 1, offset: 0) {
          id
          minter
          royaltys {
            account
            percent
          }
          splits {
            account
            percent
          }
        }
      }
    }
  }
`

const FETCH_TOKENS = gql`
  query FetchTokensByStoreId($storeId: String!, $limit: Int, $offset: Int) {
    metadata(
      order_by: { thing_id: asc } 
      where: {thing: {storeId: {_eq: $storeId}, tokens: {list: {removedAt: {_is_null: true}}}}}
      limit: $limit
      offset: $offset
      distinct_on: thing_id
    ) {
      id
      media
      animation_url
      title
      thing_id
      thing {
        id
        metaId
        memo
        tokens(distinct_on: id, where: {list: {removedAt: {_is_null: true}}}) {
                 id
                 list {
                   price
                 }
             }
      }
    }
  }
`
// const FETCH_TOKENS = gql`
//   query FetchTokensByStoreId($storeId: String!, $limit: Int, $offset: Int) {
//     token(
//       order_by: { thingId: asc }
//       where: { storeId: { _eq: $storeId }, burnedAt: { _is_null: true } }
//       limit: $limit
//       offset: $offset
//       distinct_on: thingId
//     ) {
//       id
//       thingId
//       thing {
//         id
//         metaId
//         memo
//         tokens {
//           minter         
//         }
//       }
//     }
//   }
// `


const useAudio = (url: string) => {
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(url) : undefined
  );
  
  
const [playing, setPlaying] = useState(false);

const toggle = () => {
  setPlaying(!playing);
}


useLayoutEffect(() => {
    playing ? audio.current?.play() : audio.current?.pause();
  },
  [playing]
);

useEffect(() => {
  audio.current?.addEventListener('ended', () => setPlaying(false));
  return () => {
    audio.current?.removeEventListener('ended', () => setPlaying(false));
  };
}, []);

return [playing, toggle] as const;

};

const useBuy = (tokenID: string, tokenPrice: string) => {
  const { wallet } = useWallet();
  const tokenPriceNumber = Number(tokenPrice) ;
  tokenPrice = (tokenPriceNumber).toLocaleString('fullwide', {useGrouping:false})
  const buy = () => {
    //wallet?.makeOffer(tokenID,tokenPrice,{ marketAddress: "market.mintspace2.testnet"})
    wallet?.makeOffer(tokenID,tokenPrice,{ marketAddress: process.env.marketAddress})
  }
  return buy;
}

const NFT = ({ baseUri, metaId, url, tokens}: { baseUri: string; metaId: string; url: string; tokens: [Token]}) => {
  const [metadata, setMetadata] = useState<{[key: string]: string} | null>(null)
  const { wallet, isConnected, details } = useWallet();
  const fetchMetadata = async (url: string) => {
    const response = await fetch(url)

    const result = await response.json()

    if (!result) return

    setMetadata(result)
  }

  //this position of useAudio is important cause of too many renders in previous call
  
  
  //This line is an expensive line, I don't want it be executed if url is null
  
  //if(url)
  //{
    const [playing, toggle] = useAudio(url);
  //}
     
  const buy = useBuy(tokens[0]['id'],tokens[0].list.price) ;

  useEffect(() => {
    fetchMetadata(`${baseUri}/${metaId}`)
  }, [])

  if (!metadata) return null

  //const url = "https://arweave.net/6tHNANoHLoLOXeARnFPWp5s2ThnGl96GdBh_sMxllkw";
  
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-3 mb-4">
      <div className="h-96">
        <div className="relative items-center min-h-full">
          <a href="#">
            <Image
              alt={metadata[MetadataField.Title]}
              src={metadata[MetadataField.Media]}
              layout="fill"
              objectFit="contain"
            />
          </a>
        </div>
         {url &&
          <button className="playbutton" onClick={toggle}> {playing ? "Pause" : "Play"} </button>
         }
         <div>
         { isConnected &&
         <button className="playbutton" onClick={buy}>Buy</button>
         }
         </div>
      </div>
    </div>
  )
}

const Pagination = () => {
  return (
    <div className="container max-w-4xl mx-auto pb-10 flex justify-between items-center px-3">
      <div className="text-xs">
        <a
          href="#"
          className="bg-gray-500 text-white no-underline py-1 px-2 rounded-lg mr-2"
        >
          Previous
        </a>
        <div className="hidden md:inline">
          <a href="#" className="text-sm px-1 text-gray-900 no-underline">
            1
          </a>
          <a href="#" className="text-sm px-1 text-gray-900 no-underline">
            2
          </a>
          <a href="#" className="text-sm px-1 text-gray-900 no-underline">
            3
          </a>
          <span className="px-2 text-gray">...</span>
          <a href="#" className="text-sm px-1 text-gray-900 no-underline">
            42
          </a>
        </div>
        <a
          href="#"
          className="bg-black text-white no-underline py-1 px-2 rounded-lg ml-2"
        >
          Next
        </a>
      </div>

      <div className="text-sm text-gray-600">
        Per page:
        <select className="bg-white border rounded-lg w-24 h-8 ml-1">
          <option>24</option>
          <option>48</option>
          <option>All</option>
        </select>
      </div>
    </div>
  )
}

type Store = {
  id: string
  name: string
  symbol: string
  baseUri: string
  owner: string
  minters: {
    account: string
    enabled: string
  }[]
}

type Thing = {
  id: string
  metaId: string
  memo: string
  url: string
  tokens: [Token]
}

type Token = {
  id: string
  list: {
    price: string
  }
}


const Products = ({ storeId }: { storeId: string }) => {
  //const { wallet } = useWallet()
  const [store, setStore] = useState<Store | null>(null)
  const [things, setThings] = useState<any>([])

  const [getStore, { loading: loadingStoreData, data: storeData }] =
    useLazyQuery(FETCH_STORE, {
      variables: {
        storeId: '',
        limit: 10,
        offset: 0,
      },
    })

  const [getTokens, { loading: loadingTokensData, data: tokensData }] =
    useLazyQuery(FETCH_TOKENS, {
      variables: {
        storeId: '',
        limit: 10,
        offset: 0,
      },
    })

  useEffect(() => {
    getStore({
      variables: {
        storeId: storeId,
        limit: 10,
        offset: 0,
      },
    })
  }, [])

  useEffect(() => {
    if (!storeData) return

    if (storeData?.store.length === 0) return

    setStore({
      ...storeData.store[0],
    })

    getTokens({
      variables: {
        storeId: storeData.store[0].id,
        limit: 10,
        offset: 0,
      },
    })
  }, [storeData])

  useEffect(() => {
    if (!store || !tokensData) return

    //const things = tokensData.token.map((token: any) => token.thing)
    const things = tokensData.metadata.map((metadata: any) => metadata.thing)
    const url = tokensData.metadata.map((metadata: any) => metadata.animation_url)
  
    for (let i = 0; i < things.length; i++) {
      things[i].url = url[i]
    }

    setThings(things)
  }, [tokensData])

  return (
    <>
    <div className="w-full  px-6 py-12 bg-gray-100 border-t">
      {!loadingStoreData && (
        <>
          <h1 className="mb-3 text-xl text-center font-semibold tracking-widest uppercase text-gray-500 title-font md:text-4xl px-6 py-12">
            {store?.name} Store
          </h1>
          <div className="container max-w-8xl mx-auto pb-10 flex flex-wrap">
            {things.map((thing: Thing) => (
              
              <NFT
                key={thing.metaId}
                baseUri={store?.baseUri || 'https://arweave.net'}
                metaId={thing.metaId}
                url={thing.url}
                tokens={thing.tokens}
              />
            ))}
          </div>
        </>
      )}
    </div>
    </>
  )
}

export default Products



