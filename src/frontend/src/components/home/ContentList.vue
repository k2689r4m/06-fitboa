<template>
  <li class="thumbnail-list--item">
    <!-- 목록 리스트 -->
    <div class="img-wrap">
      <img src="../../../public/images/image.png" alt="" />
    </div>
    <div class="tit">{{ item.title }}</div>
  </li>
</template>

<script>
export default {
  props: { item: Object },
  name: "ContentList",
  components: {},
  data() {
    return {};
  },
  created() {
    // console.log(this.item);
  },
  methods: {},
};
</script>
