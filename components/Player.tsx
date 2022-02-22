function Player({src, thumbnail}: {src: string, thumbnail: string}) {

<<<<<<< HEAD

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
=======
    return (
        <div className="">
            <div className="">
            <video id="video" poster={thumbnail} controls controlsList="nodownload">
                <source src={src}/>
            </video>
            </div>
            <style jsx>
                {`
                    video[poster] {
                        height: 17em;
                        object-fit: cover
                    }
                `}
            </style>
        </div>
     );
>>>>>>> c6f2a634e9becce56e88acf7e85080c302be153c
}

export default Player;