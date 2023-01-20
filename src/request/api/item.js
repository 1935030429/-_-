//获取歌单详情页
import service from "..";
export function getMusicItemList(data){
    return service({
        method: "GET",
        url: `/playlist/detail?id=${data}`
    })
}
//获得歌单所有歌曲
export function getItemList(data){
    return service({
        method: "GET",
        url: `playlist/song/detail?id=${data}`
    })
}
export function getLyrics(data){
    return service({
        method: "GET",
        url: `/lyric?id=${data}`
    })
}
