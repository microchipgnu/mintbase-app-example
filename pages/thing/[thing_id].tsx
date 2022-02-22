import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useWallet } from '../../services/providers/MintbaseWalletContext';
// import { Player, BigPlayButton } from 'video-react';
import { Thing } from '../../interfaces/thing.interface';
import Player from '../../components/Player';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Loader from '../../components/Loader';

var _nearApiJs = require("near-api-js");

const FETCH_TOKEN = gql`
query MyQuery($thing_id: String!) {
    thing(where: {id: {_eq: $thing_id}}) {
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
      metadata {
        animation_type
        animation_url
        media
        title
      }
    }
}`



const Product = ({ thing_id }: { thing_id: string }) => {
    const [things, setThing] = useState<Thing[]>([])
    const { wallet, isConnected } = useWallet();
    const [bid, setBid] = useState('0')

    const [getTokens, { loading: loadingTokensData, data: tokensData, fetchMore }] =
        useLazyQuery(FETCH_TOKEN, {
            variables: {
                thing_id: ''
            },
        })
    useEffect(() => {
        getTokens({
            variables: {
                thing_id
            },
        })
    }, [])

    useEffect(() => {
        if (!tokensData) return;
        setThing(tokensData.thing)
    }, [tokensData])

    var tokenPriceNumber
    var price, tokenPrice: string
    things.map((thing: Thing) => {
        tokenPriceNumber = Number(thing.tokens[0].list.price)
        //format keep on giving error without the map implementation, why?
        price = _nearApiJs.utils.format.formatNearAmount((tokenPriceNumber).toLocaleString('fullwide', { useGrouping: false }), 2)
        tokenPrice = (tokenPriceNumber).toLocaleString('fullwide', { useGrouping: false })

    })
    //var tokenPriceNumber = Number(things[0].tokens[0].list.price)
    // var price = _nearApiJs.utils.format.formatNearAmount((tokenPriceNumber).toLocaleString('fullwide', { useGrouping: false }), 2)
    // const tokenPrice = (tokenPriceNumber).toLocaleString('fullwide', { useGrouping: false })

    var buy = () => {
        if (things[0]?.tokens[0].list.autotransfer) {
            wallet?.makeOffer(things[0]?.tokens[0].id, tokenPrice, { marketAddress: process.env.marketAddress })
        }
        else {
            wallet?.makeOffer(things[0]?.tokens[0].id, _nearApiJs.utils.format.parseNearAmount(bid), { marketAddress: process.env.marketAddress })
        }
    }
    var currentBid;
    if (things[0]?.tokens[0].list.offer == null) {
        currentBid = '0'
    }
    else {
        currentBid = _nearApiJs.utils.format.formatNearAmount((Number(things[0]?.tokens[0].list.offer.price)).toLocaleString('fullwide', { useGrouping: false }), 5)
    }

    return (
        <>
            <main className="pt-12 my-8 -pb-2 h-screen ">
                <div className="container mx-auto px-6">
                    <div className=" xl:flex lg:flex md:block sm:block md:h-full md:justify-center">
                        <div className=" xl:w-1/2 xl:h-full lg:w-2/3 md:w-4/5 ">
                        {loadingTokensData && <Loader/>}

                            {!loadingTokensData &&
                                <>
                                    {!things[0]?.metadata.animation_type &&
                                        <img className="w-full"
                                            src={things[0]?.metadata.media}
                                            alt={things[0]?.metadata.title} />
                                    }

                                    {things[0]?.metadata.animation_type &&                                        
                                        <div id="responsiveVideoWrapper" className="video-size">
                                            <Player src={things[0].metadata.animation_url} thumbnail={things[0]?.metadata.media}></Player>
                                        </div>
                                    }
                                    <div className="divider divider-vertical"></div>
                                </>
                            }
                        </div>
                        <div className="priceTag">
                            <h3 className="text-gray-700 uppercase text-lg font-bold">{things[0]?.metadata.title}</h3>


                            {isConnected && things[0]?.tokens[0].list.autotransfer &&
                                <>
                                    <div className='xl:pt-14 xl:pb-5 lg:pt-11 lg:pb-5 md:py-5 sm:py-8'>
                                        <span className='text-gray-500 mt-12 text-sm mx-5'>current price</span> <br />
                                        <span className=" text-xl  flex flex-col sm:flex-row m-5 justify-start  items-center">
                                            <img src="../images/near-protocol-near-logo.png" alt="here" className='w-4 h-4 '/>
                                            <span className='px-2'>{price} </span>
                                        </span>
                                    </div>
                                    <div className="flex items-center pt-2 border-solid  border-t-2 border-full border-gray-200">
                                        <button className="fontFamily buyButton" onClick={buy}>
                                        <AccountBalanceWalletIcon  className='mr-4'/>
                                            Buy
                                        </button>
                                    </div>
                                </>
                            }

                            {
                                isConnected && !things[0]?.tokens[0].list.autotransfer &&
                                <>
                                    <span className="text-gray-500 mt-3">{currentBid} Near</span>
                                    <div>
                                        <input value={bid} type="number" onChange={e => setBid(e.target.value)} />
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <button className="buyButton" onClick={buy}>Bid</button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}


export const getServerSideProps = (params: any) => {
    const thing_id = params.query.thing_id
    return {
        props: {
            thing_id
        }
    }
}

export default Product