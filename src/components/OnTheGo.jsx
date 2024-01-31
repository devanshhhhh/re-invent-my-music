import { useRecoilState, useRecoilValue } from "recoil";
import { playerAtom, processAtom } from "../store/playerAtoms";
import { durationAtom } from "../store/listenInputAtoms";
import { useEffect, useRef } from "react";
import { accessValidation } from "../utils/Access";
import { Player } from "./PlayerComp";
import { CurrentPlaylist } from "./CollectedTunes";
import { Toaster } from "react-hot-toast";

export function OnTheGo(){
    const accessToken=window.sessionStorage.getItem("token");
    useEffect(()=>{
        accessValidation(accessToken);
    }, []);
    const [duration, setDuration]=useRecoilState(durationAtom);
    const processState=useRecoilValue(processAtom);
    const playState=useRecoilValue(playerAtom);
    const durationBoxRef=useRef(null);

    return(<>
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
        <main className="w-full h-screen flex flex-col xl:flex-row gap-4 justify-evenly items-center mt-4 xl:mt-0">
            <div className={`items-center ${playState!=='pause' ?'bg-white':'bg-gray-500'} rounded-3xl w-[300px] md:w-[450px] lg:w-[500px] xl:w-fit h-fit mt-26 p-6 md:p-10`}> 
                <div className='flex flex-row gap-3 justify-start mb-5'>
                    <input ref={durationBoxRef} className={`${playState!=='pause'?'bg-gray-200 text-black placeholder-black border-gray-700':'bg-gray-800 text-white'} text-xs md:text-sm  font-semibold font-mono w-36 md:w-56 border rounded-3xl pl-4 py-3 focus-within:outline-none focus-within:placeholder:opacity-0`} type='text' placeholder='Listen interval' onChange={(e)=>{setDuration(e.target.value)}}></input>
                </div>
                <Player accessToken={accessToken} durationBoxRef={durationBoxRef}/>  
            </div>
            {(processState==true) && <CurrentPlaylist accessToken={accessToken}/>}
        </main>
    </>)
}



