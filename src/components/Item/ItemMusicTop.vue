<template>
  <div>
    <div class="itemMusicTop">
      <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
    <div class="itemTopContent">
      <div class="contentLeft">
        <img :src="playlist.coverImgUrl" alt="" />
        <div class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gl-play-copy"></use>
          </svg>
          <span>{{ changeCount(playlist.playCount) }}</span>
        </div>
      </div>
      <div class="contentRight">
        <p class="rightP_one">{{ playlist.name }}</p>
        <div class="right_img">
          <img :src="playlist.creator.backgroundUrl" alt="" />
          <span>{{ playlist.creator.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <p class="rightP_two">
          <span>{{ playlist.description }}</span>
          <!-- {{ playlist.creator.nickname }} -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </p>
      </div>
    </div>
    <div class="itemTopFooter">
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "@vue/runtime-core";
export default {
  setup(props) {
    console.log(props);
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem().playlist
      ).creator;
    }
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000000) {
        return (num / 10000000).toFixed(1) + "千万";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>
<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  display: flex;
  height: 1rem;
  justify-content: space-between;
  align-items: center;
  //padding: .2rem;
  position: relative;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-size: 25px;
      color: #fff;
    }
    .icon {
      fill: #fff//填充颜色;
    }
  }
  .bgimg {
    width: 100%;
    height: 11rem;
    position: fixed;
    z-index: -1;
    filter: blur(30px);
  }
}
.itemTopContent {
  display: flex;
  justify-content: space-between;
  .contentLeft {
    padding: 0.2rem;
    // height: 3rem;
    // width: 3rem;

    img {
      border-radius: 0.2rem;
      width: 2rem;
      height: 2rem;
    }
    .playCount {
      font-size: 0.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        margin-left: 50px;
        height: 0.25rem;
      }
    //   span {
    //     //padding: 0 0.25rem;
    //   }
    }
  }
  .contentRight {
    display: flex;
    flex-direction: column;
    .rightP_one {
      //font-size: 30%;
      height: 50px;
      padding: 0 0.2rem;
      color: #fff;
    }
    .right_img {
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        margin-left: -20px;
        height: 50px;
        width: 50px;
        border-radius: 0.2rem;
      }
      span {
        font-size: 70%;
        margin-left: -2rem;
      }
      .icon {
        margin-left: -100px;
        height: 0.25rem;
      }
    }
    .rightP_two {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #ccc;
        font-size: 70%;
        height: 25px;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .icon {
        height: 0.25rem;
      }
    }
  }
}
.itemTopFooter {
    height: 80px;
  color: #ccc;
  display: flex;
  justify-content: space-between;
  .footerItem {
    padding: 0 0.4rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    .icon {
      fill: #ccc;
    }
    span {
      padding: 0 0.15rem;
      font-size: 13px;
    }
  }
}
</style>