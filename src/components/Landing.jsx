import { Carousel } from "@material-tailwind/react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export function LandingPage(){
    const [text1]=useTypewriter({
        words: ['music', 'spotify'],
        loop: {}
    })
    const [text2]=useTypewriter({
        words: ['spotify', 'music'],
        loop: {}
    })
    return (<div className="grid grid-rows-[1fr, auto] min-h-screen">
        <div className="flex flex-col justify-evenly bg-black text-white gap-8 h-full">
            <div className="pt-10 flex flex-row justify-center">
                <img className="self-center h-11 md:h-14 lg:h-24 hover:my-rotate-y-360 mr-2" src="./headphone.png"></img>
                <div className="font-mono cursor-default hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-5xl md:text-7xl lg:text-9xl xl: bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text">r</div>
                <div className="font-mono cursor-default hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text">e</div>
                <div className="font-mono cursor-default hover:transform hover:-translate-y-0 transition-transform duration-300 ease-in-out text-5xl  md:text-7xl lg:text-9xl bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text">-</div>
                <div className="font-mono cursor-default hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text">i</div>
                <div className="font-mono cursor-default hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text">n</div>
                <div className="font-mono cursor-default hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text">v</div>
                <div className="font-mono cursor-default hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text">e</div>
                <div className="font-mono cursor-default hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text">n</div>
                <div className="font-mono cursor-default hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text">t</div>
                <img className="self-center h-12 md:h-16 lg:h-24 hover:animate-spin transition-tranform duration-700 ease-in-out ml-2" src="./vinyl.png"></img>
            </div>
            <div className="flex flex-row justify-center">
                <div className="font-mono font-semibold text-3xl md:text-3xl lg:text-5xl">my 
                <span className="text-blue-600 font-mono font-thin"> {text1}</span>
                <Cursor/>
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <div className="font-mono font-semibold text-3xl md:text-3xl lg:text-5xl">my 
                <span className="text-green-600 font-mono font-thin"> {text2}</span>
                <Cursor/>
                </div>
            </div>
            <div className="max-h-96 max-w-96 md:max-h-128 md:max-w-screen-sm lg:max-h-screen-sm lg:max-w-screen-md xl:max-h-[400px] xl:max-w-screen-lg flex justify-center items-center mx-auto">
                <Carousel transition={{ duration: 1 }} className="rounded-xl m-2">
                    <img
                    src="./playlist.png"
                    alt="image 1"
                    className="h-full w-full object-fit"
                    />
                    <img
                    src="play-onthego.png"
                    alt="image 2"
                    className="h-full w-full object-fit"
                    />
                </Carousel>
            </div>
            <div className="flex justify-center mb-5">
            <button className="self-center py-3 px-8  text-white rounded-3xl max-w-48 text-center shadow-lg shadow-white m-2 normal-case text-md font-light" onClick={()=>{window.location.href="https://re-invent-server.onrender.com/app/login"}}>Login with Spotify</button>
            </div>
        </div>
        <footer className="bg-gradient-to-r from-blue-600 from-10% via-green-500 via-45% to-blue-600 to-90% w-full flex-row justify-center md:pt-4 md:pb-3">
            <div className="flex flex-col md:flex-row gap-5 items-center justify-evenly h-full text-sm md:text-md ">
                <a className="text-nowrap text-center block font-mono font-thin text-white" href="mailto:devanshmuj@gmail.com">Contact the developer</a>
            </div>
        </footer>
    </div>)
}