<template>
  <div class="userTop">
    <div class="name">{{ user.data.profile.nickname }}</div>
    <img :src="user.data.profile.avatarUrl" alt="" class="img" />
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  onMounted: {},
};
</script>
<style lang="less" scoped>
.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>