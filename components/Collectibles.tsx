import { useEffect, useLayoutEffect, useState } from 'react'

import { useWallet } from '../services/providers/MintbaseWalletContext'

import { gql } from 'apollo-boost'

import { useQuery, useLazyQuery } from '@apollo/client'

import { MetadataField } from 'mintbase'

import Image from 'next/image'
import React, { useRef, forwardRef, useImperativeHandle, Ref } from 'react'

import {Player, BigPlayButton} from 'video-react';
import 'video-react/dist/video-react.css';


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
    where: {thing: {tokens: {ownerId: {_eq: $storeId}}}}
    limit: $limit
    offset: $offset
    distinct_on: thing_id
  ) {
    id
    media
    animation_url
    title
    thing_id
    animation_type
    thing {
      id
      metaId
      memo
    }
  }
}
`
// const useAudio = (url: string) => {
//   const audio = useRef<HTMLAudioElement | undefined>(
//     typeof Audio !== "undefined" ? new Audio(url) : undefined
//   );
  
  
// const [playing, setPlaying] = useState(false);

// const toggle = () => setPlaying(!playing);
// //const toggle = setPlaying(!playing);

// useLayoutEffect(() => {
//     playing ? audio.current?.play() : audio.current?.pause();
//   },
//   [playing]
// );

// useEffect(() => {
//   audio.current?.addEventListener('ended', () => setPlaying(false));
//   return () => {
//     audio.current?.removeEventListener('ended', () => setPlaying(false));
//   };
// }, []);

// return [playing, toggle] as const;

// };

const NFT = ({ baseUri, metaId, url, anim_type, tokens}: { baseUri: string; metaId: string; url: string; anim_type: string, tokens: [Token]}) => {
  const [metadata, setMetadata] = useState<{[key: string]: string} | null>(null)

  const fetchMetadata = async (url: string) => {
    const response = await fetch(url)
    const result = await response.json()
    if (!result) return
    setMetadata(result)
  }
  
  const aw = url!=null ? url : "1";
  const anim_url = aw.split("https://arweave.net/").pop();
  const url2 = `https://coldcdn.com/api/cdn/bronil/${anim_url}` ;
  
  useEffect(() => {
    fetchMetadata(`${baseUri}/${metaId}`)
  }, [])
  if (!metadata) return null

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 pb-5 px-3">
     {/* <div className="h-80 lg:h-96"> */}
     <div>
        <div className="bg-gray-300 relative items-center min-h-full">
        {!anim_type &&
          <div className="h-80 lg:h-96 bg-gray-300 py-2 relative items-center min-h-full">        
            <Image
              //alt={metadata[MetadataField.Title]}
              src={metadata[MetadataField.Media]}
              //src={`https://coldcdn.com/api/cdn/bronil/${mediaHash}`}
              layout="fill"
              objectFit="contain"
            />
            <h1>{anim_type}</h1>
            {/* <h1>{url2}</h1> */}
          </div>
        }
        { anim_type &&
        <div className="bg-gray-300 py relative items-center min-h-full">
          <Player
              playsInline={false}
              poster={metadata[MetadataField.Media]}
              src={url2}
          >
            <BigPlayButton position="center" />
          </Player>
        </div> 
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
  anim_type: string
  tokens: [Token]
}

type Token = {
  id: string
  list: {
    price: string
    autotransfer: boolean
    offer: {
      price: string
    }
  }
}

const Collectibles = ({ storeId }: { storeId: string }) => {
  const { wallet, isConnected, details } = useWallet()  
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
    getTokens({
      variables: {
        storeId: storeId, //{wallet?.activeAccount?.accountId},//"mintingmusic1.testnet",
        limit: 10,
        offset: 0,
      },
    })
  },[])

  useEffect(() => {
    //if (!store || !tokensData) return
    if (!tokensData) return

    const things = tokensData.metadata.map((metadata: any) => metadata.thing)
    const url = tokensData.metadata.map((metadata: any) => metadata.animation_url)
    const anim_type = tokensData.metadata.map((metadata: any) => metadata.animation_type)
  
    for (let i = 0; i < things.length; i++) {
      things[i].url = url[i]
      things[i].anim_type = anim_type[i]
    }

    setThings(things)
  }, [tokensData])

  return (
    <div className="w-full  px-6 py-12 bg-gray-100 border-t">
        <>
          <h1 className="mb-3 text-xl text-center font-semibold tracking-widest text-gray-500 title-font md:text-4xl px-6 py-12">
            {wallet?.activeAccount?.accountId}, your collectibles:
          </h1>
          <div className="container max-w-8xl mx-auto pb-10 flex flex-wrap">
            {things.map((thing: Thing) => (
              <>     
              <NFT
                key={thing.metaId}
                baseUri={store?.baseUri || 'https://arweave.net'}
                metaId={thing.metaId}
                url={thing.url}
                anim_type={thing.anim_type}
                tokens={thing.tokens}
              />
              </>
            ))}
          </div>
        </>
    </div>
  )
}

export default Collectibles
