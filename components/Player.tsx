import { useState } from 'react';
function Player({src}: {src: string}) {
    const [playIcon, setPlayIcon] = useState<string>('play');
    const [volumeIcon, setVolumeIcon] = useState<string>('sound');


    const playPause = (e: any) => {
        e.stopPropagation()
        playIcon == 'play' ?  setPlayIcon('pause') : setPlayIcon('play')   
    }

    const muteUnmute = (e: any) => {
        e.stopPropagation()
        volumeIcon == 'sound' ?  setVolumeIcon('mute') : setVolumeIcon('sound')   
    }

    return ( 
      <div className="">
        <video id="video-size" controls autoPlay muted loop className='video-size rounded-md'>
          <source src={src}/>
        </video>
      </div>      

    );
}

export default Player;