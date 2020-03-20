import geoip from "geoip-lite";

export const getLocationFromIP = (ip) => {
    var geo = geoip.lookup(ip);
    if(geo)  {
        return [ geo.ll[1], geo.ll[0] ]
    }
    return [ 0, 0 ]
}