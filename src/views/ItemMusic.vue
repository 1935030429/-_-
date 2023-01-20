<template>
  <div>
    <ItemMusicTop :playlist="state.playlist" />
    <ItemMusicList
      :itemList="state.itemList"
      :subscribedCount="state.playlist.subscribedCount"
    />
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import { getMusicItemList, getItemList } from "@/request/api/item.js";
import ItemMusicTop from "@/components/Item/ItemMusicTop.vue";
import ItemMusicList from "@/components/Item/ItemMusicList.vue";
export default {
  setup() {
    const state = reactive({
      playlist: [],
      itemList: [],
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      console.log(id);
      let res = await getMusicItemList(id);
      console.log(res);
      state.playlist = res.data.playlist;
      //获取歌单数据
      //let result = await getItemList(id)
      let result = res.data.playlist.tracks;
      state.itemList = result;
      console.log(result);
      //防止数据丢失，数据存在sessionStorage
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
};
</script>