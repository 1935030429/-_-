<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playlist[playListIndex].al.picUrl" alt="" />
      <div class="footerlr">
        <p>{{ playlist[playListIndex].name }}</p>
        <span>横滑可以切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isBtnShow">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicDetail="playlist[playListIndex]"
        :play="play"
        :isBtnShow="isBtnShow"
        :addDuration="addDuration"
        :curTime="curTime"
      />
    </van-popup>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from "@/components/Item/MusicDetail.vue";
export default {
  data() {
    return {
      Interval: 0,
      curTime: 0
    };
  },
  computed: {
    ...mapState(["playlist", "playListIndex", "isBtnShow", "detailShow"]),
  },
  methods: {
    //判断音乐的播放暂停状态
    play: function () {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsBtnShow(false);
        this.updateTime(); //播放就调用函数传值
      } else {
        this.$refs.audio.pause();
        this.updateIsBtnShow(true);
        clearInterval(this.Interval); //暂停清除定时器
      }
    },
    addDuration:function(){
      this.updateDuration(this.$refs.audio.duration)
      console.log(this.$refs)
    },
    updateTime: function () {
      this.Interval = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 15);
    },
    ...mapMutations([
      "updateIsBtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
  },
  onMounted() {
    this.$store.dispatch("getLyrics", this.playlist[this.playListIndex].id);
    this.curTime = this.$refs.audio.currentTime
    //this.updateTime();
  },
  updated() {
    this.addDuration()
    this.$store.dispatch("getLyrics", this.playlist[this.playListIndex].id);
  },
  watch: {
    playListIndex: function () {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsBtnShow(false);
      }
    },
    playlist: function () {
      if (this.isBtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsBtnShow(false);
      }
    },
  },
  components: {
    MusicDetail,
  },
};
</script>
<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 100%;
      border-radius: 50%;
    }
    .footerlr {
      padding: 0.2rem;
    }
    p {
      font-size: 0.26rem;
      font-weight: 600;
    }
    span {
      font-size: 0.2rem;
      color: #ccc;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>