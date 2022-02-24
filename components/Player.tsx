import styles from '../public/modules/player.module.css'

function Player({ src, thumbnail, size }: { src?: string, thumbnail: string, size: string }) {

    
    function getStyle() {
           if (size === 'big') return styles['big-player']
           else return styles['small-player']
    }

    console.log(getStyle());
    

    return (
        <div className=''>
            <div className="">
<<<<<<< HEAD
              <video id="video" poster={thumbnail} controls controlsList="nodownload">
                <source src={src}/>
              </video>
=======
                <video id="video" className={getStyle()} poster={thumbnail} controls controlsList="nodownload">
                    <source src={src} />
                </video>
>>>>>>> 46a240152176ff087f7e9c78d7c93a9b547b135c
            </div>
            {/* <style jsx>
                {`
                    video[poster] {
                        height: 17em;
                        object-fit: contain
                    }
<<<<<<< HEAD
                `}  
=======
                `}
>>>>>>> 46a240152176ff087f7e9c78d7c93a9b547b135c
            </style> */}
        </div>
    );
}

export default Player;