<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span class="span1"
          >播放全部
          <span>(共{{ itemList.length }}首)</span>
        </span>
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemList" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="itemSpan">{{ i + 1 }}</span>
          <div class="itemName">
            <p>
              {{ item.name }}
            </p>
            <span v-for="(item1, index) in item.ar" :key="index">{{
              item1.name
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true" v-if="item.mv != 0" style="height:30px">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon" aria-hidden="true" style="height: 30px">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  setup(props) {
    console.log(props);
  },
  props: ["itemList", "subscribedCount"],
  methods: {
    playMusic:function(i){
      this.updatePlayList(this.itemList)
      this.updatePlayListIndex(i)
      console.log(111)
    },
    ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
  }
};
</script>
<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 35rem;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .itemListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft {
      width: 4rem;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: .27rem;
      //text-align: center
      margin-left: -30px;
      .span1{
        padding: 0 0.2rem;
        margin-left: -70px;
      }
    }
    .listRight{
        background-color: red;
        border-radius: .4rem;
        height: .6rem;
        width: 2.7rem;
        display: flex;;
        justify-content: space-between;
        align-items: center;
        padding: 0 .39rem;
        .icon{
            height: 25px;
            width: 25px;
            fill: #ccc;
        }
        span{
            font-size: 20px;
            color: #fff;
        }
    }
  }
  .itemList{
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .4rem;
        .itemLeft{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .itemSpan{
                font-size: .25rem;
                color: #ccc;
            }
            //padding: 0 .28rem;
            .itemName{
                margin-left: 20px;
                p{
                    font-size: .26rem;
                    font-weight: 800;
                }
                span{
                    font-size: .2rem;
                    color: rgb(160, 152, 152);
                }
            }
        }
        .itemRight{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .1rem;
            .icon{
                height: .55rem;
            }
        }
    }
  }
}
</style>