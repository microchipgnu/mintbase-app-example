import { useEffect, useState } from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/client'
import React from 'react'
import client from '../public/data/client.json'
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';
import { ProductMeta, Token } from '../interfaces/thing.interface';
import NFT from './NFT'



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

      <div className="pt-6 pb-24 w-full mx-auto">
        <div className="grid sm:grid-cols-2  md:grid-cols-3">
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
  )
}

export default Products

