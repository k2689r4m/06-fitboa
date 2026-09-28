<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      공지사항
    </div>
    <ul class="link-list m-t--20">
      <li class="link-list--item">
        <p class="top">{{ $date(item.UpdatedAt).format("YYYY/MM/DD") }}</p>
        <p class="tit">{{ item.Title }}</p>
      </li>
    </ul>
    <div class="line full"></div>
    <div class="notice-detail">
      {{ item.Content }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MyNoticeDetail",
  components: {},
  data() {
    return {
      item: {
        Content: "",
        Id: null,
        Title: "",
        UpdatedAt: "",
      },
    };
  },
  created() {
    this.getItem();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
    getItem() {
      this.$apiGET("/api/cs/notice?noticeId=" + this.$route.query.id).then(
        ({ data }) => {
          this.item = data;
        }
      );
    },
  },
};
</script>
