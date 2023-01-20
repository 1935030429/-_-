import { createStore } from 'vuex'
import { getLyrics } from '../request/api/item.js'
import { LoginU } from '../request/api/home.js'
export default createStore({
  state: {
    playlist: [{
      al: {//播放列表
        id: 34925123,
        name: "Love On The Brain (Don Diablo Remix)",
        pic: 3250156394106879,
        picUrl: "http://p3.music.126.net/3F_8ukky5fQi5Y_tJPKxzA==/3250156394106879.jpg",
        pic_str: ""
      },
      id: 436147423,
      name: '',
    }],
    lyricsList: {},//歌词
    playListIndex: 0,
    isBtnShow: true,
    detailShow: false,//歌曲详情页
    currentTime: 0,//当前歌曲时间
    duration: 0,//歌曲总时长
    isLogin: false,//登录状态
    isFooterShow: true,//显示底部组件
    token: '',
    user: {},
  },
  mutations: {
    updateIsBtnShow: function (state, value) {
      state.isBtnShow = value
    },
    updatePlayList: function (state, value) {
      state.playlist = value
      console.log(112)
      console.log(state.playlist)
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList: function (state, value) {
      state.lyricsList = value
    },
    updateCurrentTime: function (state, value) {
      //console.log(state.currentTime)
      state.currentTime = value
    },
    updateDuration: function (state, value) {
      state.duration = value
    },
    pushPlayList: function (state, value) {
      state.playlist.push(value)
    },
    updateIsLogin: function (state, value){
      state.isLogin = true
    },
    updateToken: function (state, value){
      state.token = value
      localStorage.setItem('token', state.token)
    },
    updateUser: function (state, value){
      state.user = value
    }
  },
  actions: {
    getLyrics: async function (context, value) {
      let res = await getLyrics(value)
      console.log(res)
      context.commit("updateLyricList", res.data.lrc)
    },
    getU: async function (context, value){
      let res = await LoginU(value)
      console.log(res)
      return res;
    }
  },
  modules: {
  }
})
