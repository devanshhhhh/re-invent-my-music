# Summary
- Built on top of Spotify Web API to provide two extra utility features: Playlist generator, Playlist On-the-go
- Backend server that implements OAuth2.0 flow with state management for authorization of Spotify user and returns the access token. This allows the user to authorize the application in order to use the features.
- Playlist generator: User can select desired artists and a randomized private playlist would be added to user’s account with top tracks by the selected artists.
- Playlist On-the-go: Once started, the application collects all the tracks that user plays, later displays all played tracks and gives the option to add all of them in a private playlist with just one click. The service can be paused as well.

Backend repo: <a href='https://github.com/devanshhhhh/spotify-oauth-authorization-flow.git'>Generalised server code</a> <br/>
Deployed website: <a href='https://re-invent-my-music.vercel.app'>re-invent-my-music</a>


### Note: 
Currently the application has not been granted the quota extension by the Spotify. There have been issues with other Spotify accounts trying to use the service yet. I would recommend cloning and using locally till the quota extension is approved.

