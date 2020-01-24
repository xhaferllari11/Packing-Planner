function setToken(tripInfo){
    if (tripInfo) {
        localStorage.setItem('trip',JSON.stringify(tripInfo));
    } else {
        localStorage.removeItem('trip');
    }
}

function getToken(user){
    if (user){
        let tripInfo = localStorage.getItem('trip');
        console.log('got item', tripInfo);
        if (tripInfo){
            tripInfo = JSON.parse(tripInfo);
            console.log('asfsrtig',tripInfo)
            if (user._id === tripInfo.user._id){
                return tripInfo;
            } else{
                localStorage.removeItem('trip');
            }
        }
        return tripInfo;    // null if none;
    } else {
        return null;
    };
}

function removeToken(){
    localStorage.removeItem('trip');
}

export default {
    setToken,
    getToken,
    removeToken
}