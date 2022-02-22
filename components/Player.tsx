function Player({src, thumbnail}: {src: string, thumbnail: string}) {

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
}

export default Player;