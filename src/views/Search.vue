<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      placeholder="方大同"
      v-model="inputKey"
      @keydown.enter="keyWords"
    />
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span
      v-for="item in keyList"
      :key="item"
      class="spanKey"
      @click="searchHis(item)"
    >
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in resultList" :key="i">
      <div class="itemLeft" @click="update_list(item)">
        <span class="itemSpan">{{ i + 1 }}</span>
        <div class="itemName">
          <p>
            {{ item.name }}
          </p>
          <span v-for="(item1, index) in item.artists" :key="index">{{
            item1.name
          }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg
          class="icon"
          aria-hidden="true"
          v-if="item.mvid != 0"
          style="height: 30px"
        >
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon" aria-hidden="true" style="height: 30px">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { getKeyWords } from "@/request/api/home.js";
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      inputKey: "",
      keyList: [],
      resultList: [],
    };
  },
  mounted() {
    this.keyList = JSON.parse(localStorage.getItem("keyList")) || [];
  },
  methods: {
    keyWords: async function () {
      if (this.inputKey) {
        this.keyList.unshift(this.inputKey);
        //去重
        this.keyList = [...new Set(this.keyList)];
        //限制展示长度
        if (this.keyList.length > 10) {
          this.keyList.pop();
        }
        localStorage.setItem("keyList", JSON.stringify(this.keyList));
        let res = await getKeyWords(this.inputKey);
        console.log(res)
        this.resultList = res.data.result.songs;
        this.inputKey = "";
      }
    },
    delHistory: function () {
      localStorage.removeItem("keyList");
      this.keyList = [];
    },
    searchHis: async function (item) {
      let res = await getKeyWords(item);
      this.resultList = res.data.result.songs;
      console.log(res)
    },
    update_list: function(item){
        item.al = item.album
        item.al.picUrl = item.album.artist.img1v1Url
        //item.name = item.artists[0].name
        this.$store.commit("pushPlayList", item)
        this.$store.commit("updatePlayListIndex", this.$store.state.playlist.length-1)
    }
  },
};
</script>
<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    width: 80%;
    margin-left: 0.4rem;
    border: none;
    border-bottom: 0.02rem solid #999;
    padding: 0.05rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-size: 0.3rem;
    font-weight: 650;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(194, 187, 187);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.21rem;
  }
}
.itemList {
    width: 100%;
    padding: .2rem;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem;
    .itemLeft {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemSpan {
        font-size: 0.25rem;
        color: #ccc;
      }
      //padding: 0 .28rem;
      .itemName {
        margin-left: 20px;
        p {
          font-size: 0.26rem;
          font-weight: 800;
        }
        span {
          font-size: 0.2rem;
          color: rgb(160, 152, 152);
        }
      }
    }
    .itemRight {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.1rem;
      .icon {
        height: .8rem;
        width: .8rem;
        padding: .1rem;
      }
    }
  }
}
</style>