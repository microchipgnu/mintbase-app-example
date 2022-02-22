import Link from 'next/link'
import React from 'react'
import 'video-react/dist/video-react.css';
import { Token } from '../interfaces/thing.interface';
import Player from './Player'

var _nearApiJs = require("near-api-js");

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
  
      <div className="mb-6 mx-auto cursor-pointer">
        <Link
          href={{
            pathname: '/thing/[thing_id]',
            query: {
              thing_id: thing_id
            },
          }}
          as={`thing/${thing_id}`}
        >
          <div className="transition ease-in-out hover:scale-105 m rounded hover:shadow-2xl shadow-lg m-2 px-3 h-full ">
            <div>
  
              {!animation_type &&
                <img className="w-72 max-h-64 object-cover"
                  //src="https://coldcdn.com/api/cdn/bronil/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                  src={media}//"https://arweave.net/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                  alt={title} />
              }
  
              {animation_type &&
                <div className="max-h-64 max-w-72">
                  <Player src={animation_url} thumbnail={media}></Player>
                </div>
              }
  
              <div className="px-30 mt-4 pt-2 text-center justify-between my-auto">
                <div className="font-black text-lg">{title}</div>
                <>
                  {tokens[0].list.autotransfer &&
                    <div className="font-thin text-base my-2">Price: {price} Near</div>
                  }
                  {/* Put a small auction symbol here */}
                  {!tokens[0].list.autotransfer &&
                    <div className="font-thin text-base my-2">Bid: {currentBid} Near</div>
                  }
                </>
              </div>
            </div>
          </div>
        </Link>
      </div >
    )
  }

  export default NFT
  