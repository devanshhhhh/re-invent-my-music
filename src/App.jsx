import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { LandingPage } from './components/Landing';
import { AuthPage } from './components/Auth';
import { PlaylistGenerator } from './components/PlaylistGenerator';
import { OnTheGo } from './components/OnTheGo';
import { RecoilRoot } from 'recoil';

function App() {

  return (
    <> 
        <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/success' element={<AuthPage/>}/>
            <Route path='/playlistgenerator' element={<PlaylistGenerator/>}/>
            <Route path='/on-the-go' element={<OnTheGo/>}/>
          </Routes>
        </BrowserRouter>
        </RecoilRoot>
    </>
  )
}

export default App
