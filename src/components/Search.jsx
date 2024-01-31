import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { searchResultAtom } from '../store/searchAtoms';
import { artistsAtom } from '../store/artistAtoms';
import toast from 'react-hot-toast';

export function SearchFlyout({inputBoxRef}){
  const [searchResult, setSearchResult]=useRecoilState(searchResultAtom);
  const [artists, setArtists]=useRecoilState(artistsAtom);
  const inputRef=useRef(null); 
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearchResult([]);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if(searchResult===undefined || searchResult===null || searchResult.length===0){
    return (<></>)
  }

  return (
    <div ref={inputRef}  className='absolute z-10 top-0 bg-gray-300 bg-opacity-90 h-64 md:h-96 ml-4 w-[194px] md:w-[196px] lg:w-[255px]  rounded-b-3xl overflow-y-auto scrollbar-thin scrollbar-webkit'>
        {searchResult.map(item => (<SearchMenu key={item.id} id={item.id} artistname={item.artistname} imageUrl={item.imageUrl} spotifyUrl={item.spotifyUrl} setArtists={setArtists} artists={artists} setSearchResult={setSearchResult} inputBoxRef={inputBoxRef}/>))}
    </div>)
}

function SearchMenu({id, artistname, imageUrl, spotifyUrl, setArtists, artists, setSearchResult, inputBoxRef}){
  if(id===undefined || id===null){
    return (<></>)
  }
  
  return (<div key={id} className='flex flex-row justify-start gap-4 m-2 p-2 border-b-2 cursor-pointer' onClick={()=>{
    if(artists){
      const isDuplicate = artists.some(artist => artist.id === id);
      if(isDuplicate) {
        toast.error('Artist has already been added');
        return;
      }
    }
      setArtists(artists=>[...artists, {id, artistname, imageUrl, spotifyUrl}]);
      setSearchResult([]);
      inputBoxRef.current.value="";
    }}>
    <img src={imageUrl} className='rounded-full object-fit w-14 h-14 lg:h-16 lg:w-16 self-center shadow-md shadow-black'></img>
    <div className='self-center text-xs md:text-sm font-semibold text-black font-mono'>{artistname}</div>
  </div>)
}
