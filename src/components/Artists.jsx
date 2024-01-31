export function ArtistSelected({artists}){
  if(!artists){
    return <></>
  }
  return(<div className='absolute top-0 grid grid-rows-auto grid-cols-2 lg:grid-cols-3 mt-10 gap-x-4 gap-y-6 self-center md:max-w-screen-md'>
    {artists.map(artist => (<ArtistCard key={artist.id} id={artist.id} artistname={artist.artistname} imageUrl={artist.imageUrl} spotifyUrl={artist.spotifyUrl}/>))}
  </div>)
}

function ArtistCard({id, artistname, imageUrl, spotifyUrl}){
 
  return (
    <a href={spotifyUrl} className="self-center">
    <div key={id} className='h-48 w-32 bg-white rounded-lg flex flex-col gap-2'>
      <img src={imageUrl} className='text-white h-20 w-20 object-fit self-center rounded-full shadow-black shadow-md mt-2'></img>
      <h1 className='font-mono font-bold font-md text-nowrap self-center mt-4'>{artistname}</h1>
    
      <img src="./Spotify_Logo_RGB_Green.png" className="text-xs h-6 w-20 object-fit mt-2 self-center"/>
      </div>
    </a>
  )
}