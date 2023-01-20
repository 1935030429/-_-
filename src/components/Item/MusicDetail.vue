<template>
  <img :src="musicDetail.al.picUrl" alt="" class="bgimg" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <!--updateDetailShow-->
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <Vue3Marquee style="color: #fff">{{ musicDetail.name }}</Vue3Marquee>
        <span v-for="item in musicDetail.ar" :key="item">
          {{ item.name }}
        </span>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img
      src="@/assets/needle.png"
      alt=""
      class="needle"
      :class="{ needle_active: !isBtnShow }"
    />
    <img src="@/assets/disc-plus.png" alt="" class="disc" />
    <img
      :src="musicDetail.al.picUrl"
      alt=""
      class="ar"
      @click="isLyricShow = true"
      :class="{ ar_active: !isBtnShow, ar_paused: isBtnShow }"
    />
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.02"/>
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goplay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        v-if="isBtnShow"
        @click="play"
        style="height: 1.4rem; width: 1.4rem"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        v-else
        @click="play"
        style="height: 1.4rem; width: 1.4rem"
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goplay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState(["lyricsList", "currentTime", "playListIndex", "playlist", "duration"]),
    lyric: function () {
      let arr;
      if (this.lyricsList.lyric) {
        arr = this.lyricsList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let msec;
          let lrc;
          if (item[10] === "]") {
            msec = item.slice(7, 10);
            lrc = item.slice(11, item.length);
          } else {
            msec = item.slice(7, 9);
            lrc = item.slice(10, item.length);
          }
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(msec);
          //console.log(min, sec, msec, lrc)
          return {
            min,
            sec,
            msec,
            lrc,
            time,
          };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      return arr;
    },
  },
  mounted() {
    console.log(this.musicDetail);
    console.log(this.lyricsList.lyric);
    this.addDuration()
    console.log(this.currentTime)
  },
  props: ["musicDetail", "play", "isBtnShow", "addDuration", "curTime"],
  methods: {
    backHome: function () {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goplay: function (params) {
      //切换上下首
      let index = this.playListIndex + params;
      if (index < 0) {
        index = this.playlist.length - 1;
      }
      if (index > this.playlist.length - 1) {
        index = 0;
      }
      //this.playListIndex+params)%this.playlist.length
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  components: {
    Vue3Marquee,
  },
  watch: {
    currentTime: function (newTime) {
      let p = document.querySelector("p.active");
      //console.log([p])//打印p.active标签的内容
      if (p && p.offsetTop > 300) {
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
      }
      if(newTime === this.duration){
        //this.updatePlayListIndex((this.playListIndex+1)%this.playlist.length)
        this.goplay(1)
      }
    },

  },
};
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(60px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .LeftMarquee {
      width: 2rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  .needle {
    width: 2.4rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .needle_active {
    width: 2.4rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(9deg);
    transition: all 2s;
  }
  .disc {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .ar_active {
    animation-play-state: running;
  }
  .ar_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 7.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  overflow: scroll;
  scroll-behavior: smooth;
  p {
    color: rgb(172, 161, 161);
    margin-bottom: 0.4rem;
  }
  .active {
    color: rgb(147, 189, 144);
    font-size: 0.45rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.3rem;
    margin-top: 0.7rem;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range{
    height: .06rem;
    width: 100%;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    .icon {
      width: 1rem;
      height: 1rem;
      padding: 0 0.3rem;
    }
  }
}
</style>