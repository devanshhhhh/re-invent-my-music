import axios from "axios";
import { accessValidation } from "./Access";
import toast from "react-hot-toast";

export async function createPlaylist(accessToken){
    const apiUrl = 'https://api.spotify.com/v1/me/playlists';

    try{
        const response = await axios.post(apiUrl, {
        name: "re-invented music",
        description: "Created by re-invent",
        public: false
        }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        });

        const playlistId=response.data.id;
        return playlistId;
    } 
    catch(error){
        toast.error('Too few tracks');
        accessValidation(accessToken);
    }
}

export async function addToPlaylist(playlistId, trackUris, accessToken){
    const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    try{
        await axios.post(apiUrl, {
        uris: trackUris,
        },
        {
        headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }});
        return true;

    }
    catch(error){
        toast.error('Too few tracks');
        accessValidation(accessToken);
    }
}