import { useEffect, useState } from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import React from 'react'
import client from '../public/data/client.json'
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';
import { ProductMeta, Token } from '../interfaces/thing.interface';

var _nearApiJs = require("near-api-js");


const FETCH_TOKENS = gql`
query FetchTokensByStoreId($storeId: String!, $limit: Int, $offset: Int) {
  metadata(order_by: {thing: {createdAt: desc}}, where: {thing: 
    {storeId: {_eq: $storeId }, tokens: {list: {removedAt: {_is_null: true}}}}}, 
    limit: $limit, offset: $offset) {
    id
    media
    animation_url
    title
    animation_type
    thing {
      id
      tokens(distinct_on: id, where: {list: {removedAt: {_is_null: true}}}) {
        id
        list {
          price
          autotransfer
          offer {
            price
          }
        }
      }
    }
    }
}`

const NFT = ({ thing_id, media, title, animation_url, animation_type, tokens }: { thing_id: string; media: string; title: string; animation_url: string; animation_type: string, tokens: Token[] }) => {

  const tokenPriceNumber = Number(tokens[0].list.price);
  // Number.toLocaleString() rounds after 16 decimal places, so be careful
  const price = _nearApiJs.utils.format.formatNearAmount((tokenPriceNumber).toLocaleString('fullwide', { useGrouping: false }), 2);


  var currentBid
  if (tokens[0].list.offer == null) {
    currentBid = '0'
  }
  else {
    currentBid = _nearApiJs.utils.format.formatNearAmount((Number(tokens[0].list.offer.price)).toLocaleString('fullwide', { useGrouping: false }), 5)
  }

  // CDN the url, it will be faster
  return (

    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <Link
        href={{
          pathname: '/thing/[thing_id]',
          query: {
            thing_id: thing_id
          },
        }}
        as={`thing/${thing_id}`}
      >
        <div className="transition ease-in-out hover:scale-105 max-w-sm rounded overflow-hidden shadow-lg m-2 px-3">
          <div>

            {!animation_type &&
              <img className="w-full"
                //src="https://coldcdn.com/api/cdn/bronil/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                src={media}//"https://arweave.net/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                alt={title} />
            }

            {animation_type &&
              < Player
                playsInline={false}
                poster={media}
                src={animation_url}
                className="items-center"
              >
                <BigPlayButton position="center" />
              </Player>
            }

            <div className="px-30 py-2">
              <div className="text-left font-bold text-lg">{title}</div>
              {tokens[0].list.autotransfer &&
                <div className="text-right font-bold text-base my-2">Price: {price} Near</div>
              }
              {/* Put a small auction symbol here */}
              {!tokens[0].list.autotransfer &&
                <div className="text-right font-bold text-base my-2">Bid: {currentBid} Near</div>
              }
            </div>
          </div>
        </div>
      </Link>
    </div >
  )
}



const Products = ({ storeId }: { storeId: string }) => {
  const [metaData, setMetaData] = useState<ProductMeta[]>([])

  const [getTokens, { loading: loadingTokensData, data: tokensData, fetchMore }] =
    useLazyQuery(FETCH_TOKENS, {
      variables: {
        storeId: '',
        limit: 15,
        offset: 0,
      },
    })

  useEffect(() => {

    getTokens({
      variables: {
        storeId: storeId,
        limit: 50,
        offset: 0,
      },
    })
  }, [])

  useEffect(() => {
    if (!tokensData) return;
    setMetaData(tokensData.metadata)
  }, [tokensData])

  return (
    <>
      <div className="bg-fixed bg-gradient-to-r from-slate-50 to-slate-100 w-full px-6 py-10 bg-gray-100 border-t">
        <>
          <h1 className="drop-shadow-lg text-xl text-center font-semibold tracking-widest uppercase text-gray-500 title-font md:text-4xl px-6 py-8">
            {client.Title} Near Store
          </h1>
          <div className="container mx-auto pb-10 justify-center">
            <div className="flex flex-wrap">
              {metaData.map((meta: ProductMeta) => (
                <NFT
                  thing_id={meta.thing.id}
                  media={meta.media}
                  title={meta.title}
                  animation_url={meta.animation_url}
                  animation_type={meta.animation_type}
                  tokens={meta.thing.tokens}
                />
              ))}
            </div>
          </div>
        </>
      </div>
    </>
  )
}

export default Products

