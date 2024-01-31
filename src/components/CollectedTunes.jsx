import { listenedTracksAtom } from "../store/playerAtoms";
import { addToPlaylist, createPlaylist } from "../utils/PlaylistUtils";
import { accessValidation } from "../utils/Access";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";

export function CurrentPlaylist({accessToken}){
    const [listenedTracks, setListenedTracks]=useRecoilState(listenedTracksAtom);

    async function addToSpotify(){
        try{
            const playlistId=await createPlaylist(accessToken);
            const trackUris=listenedTracks.map(item=>item.trackuri);
            const res=await addToPlaylist(playlistId, trackUris, accessToken);
            if(res===true){
                toast.success('Playlist added successfully');
            }
            else{
                toast.error('Something went wrong!');
                accessValidation(accessToken);
            }
        }
        catch(error){
            toast.error('Something went wrong!');
            accessValidation(accessToken); 
        }

    }

    if(listenedTracks===undefined || listenedTracks===null || listenedTracks.length===0){
        return (<></>)
    }
    return (<div className="items-center rounded-3xl max-h-[400px] w-[300px] md:w-[450px] lg:max-h-[700px] lg:w-[500px] p-10 bg-gradient-to-r from-blue-600 from-10% via-green-500 via-45% to-blue-600 to-90% overflow-y-auto scrollbar-thin scrollbar-webkit">
        <div className="text-white font-mono text-md md:text-2xl lg:text-3xl font-semibold">Collected tunes</div>
        <button className="bg-white text-green-500 shadow-lg shadow-black font-bold rounded-full text-xs md:text-md lg:text-lg w-32 md:w-48 lg:w-56 my-4" onClick={addToSpotify}>Add to my Spotify</button>
        <div >
            {listenedTracks.map(item=><PlaylistCards key={item.trackuri} item={item}/>)}
        </div>
    </div>)
}

function PlaylistCards({key, item}){
    const [listenedTracks, setListenedTracks]=useRecoilState(listenedTracksAtom);
    return(<div key={key} className='flex flex-row gap-4 relative bg-white py-3 px-5  shadow-gray-600  rounded-xl mb-10'>
            <img className='object-fit w-16 h-16 md:h-24 md:w-24 xl:h-36 xl:w-36 rounded-md' src={item.imageurl}></img>

            <div className='flex flex-col'>
            <div className='flex flex-col gap-2 max-w-56'>
                    <a key={item.trackurl} href={item.trackurl} className="font-bold text-md md:text-lg">{item.trackname} </a>
                </div>
                <div className='flex flex-col items-start text-xs md:text-sm lg:text-md font-semibold mt-2 relative'>
                    {item.artists.map(artist=>(<a key={artist.artisturl} href={artist.artisturl}>{artist.artistname}&nbsp;</a>))}
                </div>
                <div>
                    <a key={item.albumurl} href={item.albumurl} className="font-semibold text-xs md:text-md underline">{item.album} </a>
                </div>
                <img src='./Spotify_Logo_RGB_Green.png' className='text-xs h-6 w-20 object-fit mt-4'/>
            </div>
    </div>)
}