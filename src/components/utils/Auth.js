export const getLoggedInStatus = () => {
    let isLoggedin=false;
    let auth = localStorage.getItem('persist:auth');
    if(auth){
        auth = JSON.parse(auth);
        if(auth && auth.isAuthenticated==='true') {
            isLoggedin = true;
        }
    }
    return isLoggedin;
}
