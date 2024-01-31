export function AuthPage(){
    const accessToken=new URLSearchParams(window.location.search).get("token");
    if(accessToken===undefined || accessToken===""){
        window.location.href="/"
    }
    window.sessionStorage.setItem("token", accessToken);
    window.location.href="/playlistgenerator";
    return (<></>)
}