import { playerAtom, processAtom, currTrackAtom, listenedTracksAtom } from "../store/playerAtoms";
import { durationAtom } from "../store/listenInputAtoms";
import { useEffect, useRef, useState } from "react";
import { getCurrTrack } from "../utils/PlaybackUtils";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessValidation } from "../utils/Access";

export function Player({accessToken, durationBoxRef}){
    return(<>
        <Controls accessToken={accessToken} durationBoxRef={durationBoxRef}/>
        <CurrentlyPlaying accessToken={accessToken}/> 
    </>)
}

function CurrentlyPlaying({accessToken}){
    const playState=useRecoilValue(playerAtom);
    const duration=useRecoilValue(durationAtom);
    const [currTrack, setCurrTrack]=useRecoilState(currTrackAtom);
    const processState=useRecoilValue(processAtom);
    const [called, setCalled]=useState(false);
    const [listenedTracks, setListenedTracks]=useRecoilState(listenedTracksAtom);
    const intervalRef=useRef(null);
    
    useEffect(()=>{
        function setIt(res){
            setCurrTrack(res);   
        }
        async function getter(){
            const res=await getCurrTrack(accessToken);
            setIt(res);
        }
        if(playState==='start' && called===false){
            let del=10;
            let dur=NaN;
            if(/^[0-9]+$/.test(duration)){
                dur=parseInt(duration)
            }
            if(dur>del){
                if(dur>60){
                    del=60;
                }
                else{
                    del=dur;
                }
            }
            setCalled(true);
            const timer=setInterval(()=>{getter()}, del*1000);
            intervalRef.current=timer;
        }
        if((playState==='pause' || playState==='stop')){
            clearInterval(intervalRef.current);
            setCalled(false);
        }
    }, [playState, called]);

    
    useEffect(()=>{
        if(currTrack.albumurl===undefined){
            return;
        }
        const curr=JSON.stringify(currTrack);
        const listened=listenedTracks.map(item=>JSON.stringify(item));
        if(!listened.includes(curr)){
            setListenedTracks(listenedTracks=>[...listenedTracks, currTrack]);
        }
    }, [currTrack])

    if(playState==="stop" || (playState==='pause' && processState!=true)){
        return (<></>)
    }
    
    if((playState==='pause' && processState===true) || currTrack.playing===false || currTrack.album===undefined){
        return(<>
            <div className={`flex py-3 px-5 rounded-t-xl ${playState==='stop'?'bg-red-500':'bg-gray-800'}`}>
            <h1 className='text-white text-md md:text-3xl font-mono font-semibold'>Currently playing</h1>
            </div>
            <div className={`flex flex-row gap-4 ${playState!=='pause'?'bg-gray-100':'bg-gray-700'} py-3 px-5 shadow-inner shadow-gray-600  rounded-b-xl`}>
                <img></img>
                <div className={`${playState!=='pause'?'text-black':'text-gray-300'} text-xs md:text-md font-thin`}>
                    {playState==='pause'? 'Play your favourie music in Spotify' :'Playback paused in Spotify'}
                </div>
            </div>
        </>)
    }
    
    return (<>
        <div className='bg-gradient-to-r from-blue-600 from-10% via-green-500 via-45% to-blue-600 to-90% flex py-3 px-5  rounded-t-xl'>
            <h1 className='text-white text-xl md:text-3xl font-mono font-semibold'>Currently playing</h1>
        </div>
        <div className={`flex flex-row gap-4 ${playState!=='pause'?'bg-gray-100':'bg-gray-700'} py-3 px-5 shadow-inner shadow-gray-600  rounded-b-xl`}>

            <img className='object-fit h-24 w-24 md:h-36 md:w-36 lg:h-46 lg:w-46 rounded-md' src={currTrack.imageurl}></img>
            <div className='flex flex-col'>
                <div className='flex flex-col gap-2 max-w-56'>
                    <a key={currTrack.trackurl} href={currTrack.trackurl} className="font-bold text-md md:text-lg">{currTrack.trackname} </a>
                </div>
                <div className='flex flex-col items-start text-xs md:text-sm lg:text-md font-semibold mt-2 relative'>
                    {currTrack.artists.map(artist=>(<a key={artist.artisturl} href={artist.artisturl}>{artist.artistname}&nbsp;</a>))}
                </div>
                <div>
                    <a key={currTrack.albumurl} href={currTrack.albumurl} className="font-semibold text-xs md:text-md underline">{currTrack.album} </a>
                </div>
                <img src='./Spotify_Logo_RGB_Green.png' className='text-xs h-6 w-20 object-fit mt-4'/>
            </div>
        </div>
    </>)
}

function Controls({accessToken, durationBoxRef}){
    const [playState, setPlayState]=useRecoilState(playerAtom);
    const [processState, setProcessState]=useRecoilState(processAtom);
    const [currTrack, setCurrTrack]=useRecoilState(currTrackAtom);
    const [listenedTracks, setListenedTracks]=useRecoilState(listenedTracksAtom);
    return (<>
        <div className='flex flex-row gap-4 justify-center items-center mb-5'>
            <button className={`${playState==='pause'?'bg-white text-black':'bg-black text-white'} text-xs md:text-sm w-20 md:w-24 h-8 md:h-10 rounded-xl active:bg-white active:text-black`} onClick={()=>{setPlayState("pause");}}>
                <div className='flex flex-row gap-2 items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 w- 4md:w-6 md:h-6">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                </svg>
                Pause
                </div>
            </button>
            <button className={`${playState==='start'?'bg-green-500':'bg-black'} text-white text-xs md:text-sm w-20 md:w-24 h-8 md:h-10 rounded-xl active:bg-white active:text-black`} onClick={async()=>{
                setPlayState("start"); 
                if(!processState){
                    accessValidation(accessToken);
                    setProcessState(true);
                }
            }}>
                <div className='flex flex-row gap-2 items-center justify-center active:bg-white active:text-black'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
                Start
                </div>
            </button>
            
            <button className={`${playState==='stop'?'bg-red-500':'bg-black'} text-white text-xs md:text-sm w-20 md:w-24 h-8 md:h-10 rounded-xl active:bg-white active:text-black`} onClick={()=>{
                setPlayState("stop"); 
                setProcessState(false); 
                setCurrTrack({});
                setListenedTracks([]);
                durationBoxRef.current.value="";
            }}>
                <div className='flex flex-row gap-2 items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                </svg>
                Stop
                </div>
            </button>
        </div>
    </>)
}