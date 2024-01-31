import axios from "axios";
import { accessValidation } from "./Access";

export async function getCurrTrack(accessToken) {
    try{
        const response= await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
        })
        const { item } = response.data;
    
        if(!item) {
            return {playing: false};
        }
    
        const artists = item.artists.map(artist => ({
            artistname: artist.name,
            artisturl: artist.external_urls.spotify
        }));
        const album = item.album.name;
        const albumurl = item.album.external_urls.spotify;
        const trackurl = item.external_urls.spotify;
        const trackname = item.name;
        const trackuri = item.uri;
        const imageurl = item.album.images.length > 0 ? item.album.images[0].url : '';
    
        const data = {
            artists,
            album,
            albumurl,
            trackurl,
            trackuri,
            imageurl,
            trackname,
            playing:true
        };
        
      return data;
    }
    catch(error){
      accessValidation(accessToken);
    }
  }
  