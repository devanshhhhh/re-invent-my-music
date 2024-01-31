import axios from 'axios';
import { useEffect, useRef } from 'react';
import { ArtistSelected } from './Artists';
import { SearchFlyout } from './Search';
import { accessValidation } from '../utils/Access';
import { useRecoilState } from 'recoil';
import { searchInputAtom, searchResultAtom } from '../store/searchAtoms';
import { artistsAtom } from '../store/artistAtoms';
import { createPlaylist, addToPlaylist } from '../utils/PlaylistUtils';
import toast, { Toaster } from 'react-hot-toast';


export function PlaylistGenerator() {
  const accessToken=window.sessionStorage.getItem("token");

  const [searchInput, setSearchInput]=useRecoilState(searchInputAtom);
  const [searchResult, setSearchResult]=useRecoilState(searchResultAtom);
  const [artists, setArtists]=useRecoilState(artistsAtom);
  const inputBoxRef=useRef(null);

  function clearFunction(){
    setSearchInput("");
    setArtists([]);
    setSearchResult([]);
    inputBoxRef.current.value=""; 
  }
  
  function getRandoms(trackpool, n) {
    const arr=trackpool.slice().sort(() => Math.random() - 0.5);
    return arr.slice(0, n);
  }

  async function makePlaylist(){
    let trackpool=[];
    for(let i=0; i<artists.length; i++){
      
      const artistid=artists[i].id;
      const apiUrl = `https://api.spotify.com/v1/artists/${artistid}/top-tracks?market=IN`;
      let result=[];
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        result=response.data.tracks.map(track=>track.uri);
      } 
      catch(error){
        toast.error('Something went wrong!');
        accessValidation(accessToken);
      }
      trackpool=trackpool.concat(result);
    }
    if(trackpool.length<20){
      toast.error('Too few tracks');
      clearFunction();
      return;
    }

    let totalSongs=Math.ceil(trackpool.length*0.75);
    if(totalSongs>100){
      totalSongs=100;
    }
    const myPlaylist=getRandoms(trackpool, totalSongs);
    const playlistId= await createPlaylist(accessToken);
    const res=await addToPlaylist(playlistId, myPlaylist, accessToken);

    if(res===true){
      toast.success('Playlist added successfully');
      clearFunction();
    }
    else{
      toast.error('Something went wrong!');
      accessValidation(accessToken);
    }
  }

  useEffect(()=>{
    accessValidation(accessToken);
  }, []);

  useEffect(()=>{
    const fetchData=async()=>{
      setSearchInput(searchInput.trim());
      if(searchInput===""){
        setSearchResult([]);
        return;
      }
      accessValidation(accessToken);
      try{
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if(response.status===200){
          const imageSelect=(arr)=>{
            if(arr===undefined || arr===null || arr.length===0){
              return null;
            }
            let res=arr[0].url;
            let curr=arr[0].height;
            for(let i=1; i<arr.length; i++){
              if(curr>arr[i].height){
                res=arr[i].url;
                curr=arr[i].height;
              }
            }
            return res;
          }
          const result=response.data.artists.items.map((item)=>{
            
            return{
              id:item.id,
              artistname: item.name,
              imageUrl:imageSelect(item.images),
              spotifyUrl: item.external_urls.spotify
            }
          })
          setSearchResult(result);
        } 
        else{
          toast.error('Something went wrong!');
          accessValidation(accessToken);
        }
      }
      catch (error){
        toast.error('Something went wrong!');
        accessValidation(accessToken);
      }
    };

    fetchData();

  }, [searchInput]);


  let debounceTimeout;
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      setSearchInput(inputValue);
    }, 1000);
  };
  return (
    <div>
    
      <header className='bg-gradient-to-r from-blue-600 from-10% via-green-500 via-45% to-blue-600 to-90% h-14 md:h-20 w-full flex flex-row justify-between pt-4 pb-3'>
        <div className="flex flex-row gap-5 w-full items-center justify-evenly h-full ml-10">
          <a className="text-nowrap text-center block font-mono font-thin text-white text-xs md:text-sm lg:text-md" href='/playlistgenerator'>Playlist generator</a>
          <a className="text-nowrap text-center block font-mono font-thin text-white text-xs md:text-sm lg:text-md" href='/on-the-go'>Playlist on-the-go</a>
        </div>
        <button className='mr-4 self-center' onClick={()=>{sessionStorage.removeItem('token'); accessValidation();}}>
          <svg className="h-6 w-6 md:h-6 md:w-8 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/> 
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
        </button>
      </header>
      <Toaster position='top-center'/>
      <main className='flex flex-col items-center gap-5'>
        <div>
          <div className='flex flex-row gap-4 mt-20'>
            <input ref={inputBoxRef} className='bg-gray-800 text-xs md:text-sm text-white font-semibold font-mono w-56 md:w-56 lg:w-72 self-end border rounded-3xl pl-4 py-3 focus:bg-gray-300 focus:text-black focus:border-black focus-within:outline-none focus-within:placeholder:opacity-0' type='text' placeholder='Search artists' onChange={handleInputChange}></input>
            <div className='flex flex-col md:flex-row gap-2 justify-center items-center'>
              <button className='w-20 h:5 md:h-8 md:w-32 bg-gray-900 text-white rounded-full text-center shadow-md shadow-gray-800 text-xs md:text-md hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out' onClick={clearFunction}>Clear</button>
              <button className='w-20 h:5 md:h-8 md:w-32 bg-gradient-to-r from-blue-600 from-10% via-green-500 via-45% to-blue-600 to-90% text-white rounded-full text-center shadow-md shadow-gray-500 text-xs md:text-md hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out' onClick={makePlaylist}>re-invent</button>
            </div>
          </div>
          <div className='relative flex flex-col'>
            <ArtistSelected artists={artists}/>
            {(searchResult.length > 0) && (<SearchFlyout inputBoxRef={inputBoxRef}/>)}
          </div>
        </div>
      </main>
    </div>
  );
}