import 'react-jinke-music-player/assets/index.css'
import dynamic from 'next/dynamic'
const PlayerWithNoSSR = dynamic(() => import('react-jinke-music-player'), {
  ssr: false,
})

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import React, { useRef, forwardRef, useImperativeHandle, Ref } from 'react'

const FETCH_MUSIC = gql`
  query GetAllMusic {
    metadata(
      where: {
        _and: {
          animation_type: { _ilike: "%audio%" }
          media_hash: { _is_null: false }
        }
      }
    ) {
      media
      animation_url
      animation_hash
      title
    }
  }
`

const MusicPlayer = () => {
  // const [musicList, setMusicList] = useState<any | []>([])
  // const { data, loading } = useQuery(FETCH_MUSIC)

  // useEffect(() => {
  //   if (!data) return

  //   if (data?.metadata.length === 0) return

  //   const musicListRaw = data?.metadata

  //   const _music = musicListRaw.map((item: any) => {
  //     return {
  //       name: item.title,
  //       musicSrc: item.animation_url,//`https://coldcdn.com/api/cdn/bronil/${item.animation_hash}`,
  //       cover: item.media,
  //     }
  //   })

  //   setMusicList(_music)
  // }, [data])

  // const player = useRef();
  //   const playSong = () => {
  //       player.current.src = "https://arweave.net/6tHNANoHLoLOXeARnFPWp5s2ThnGl96GdBh_sMxllkw";
  //       player.current.play();
  //   }
    // return (
    //     <div onClick={() => playSong()}>
    //         <audio ref={player} />
    //         <div>
    //             <h1>Play</h1>
    //             <h1 onClick={() => player.current.pause()}>Pause</h1>
    //         </div>
    //     </div>
    // )

    const useAudio = url => {                
        const audio = useRef<HTMLAudioElement | undefined>(
          typeof Audio !== "undefined" ? new Audio(url) : undefined
        );
        
        
      const [playing, setPlaying] = useState(false);
    
      const toggle = () => setPlaying(!playing);
    
      useEffect(() => {
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
    
      return [playing, toggle];
      
    };
    
      const url = "https://arweave.net/6tHNANoHLoLOXeARnFPWp5s2ThnGl96GdBh_sMxllkw";
      const [playing, toggle] = useAudio(url);
    
      return (
        <div>
          <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        </div>
      )
}

export default MusicPlayer

//working for metadata
// query MyQuery {
//   metadata(where: {_and: {animation_type: {_ilike: "%audio%"}, media_hash: {_is_null: false}, thing: {storeId: {_eq: "mintingmusic.mintspace2.testnet"}}}}) {
//     media
//     animation_url
//     animation_hash
//     title
//     thing_id
//     thing {
//       id
//       metaId
//       tokens {
//         id
//       }
//     }
//   }
// }

//Working for price
// query MyQuery {
//   token(where: {storeId: {_eq: "mintingmusic.mintspace2.testnet"}}, distinct_on: id) {
//     id
//     list {
//       price
//     }
//     thingId
//   }
// }

//working for price and metadata
// query MyQuery {
//   metadata(where: {_and: {media_hash: {_is_null: false}, thing: {storeId: {_eq: "mintingmusic.mintspace2.testnet"}}}}) {
//     media
//     animation_url
//     animation_hash
//     title
//     thing_id
//     thing {
//       id
//       metaId
//       tokens {
//         id
//         list {
//           price
//         }
//       }
//     }
//   }
// }

