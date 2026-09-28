<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      공지사항
    </div>
    <ul class="link-list type2">
      <li
        class="link-list--item"
        v-for="item in inquiryList"
        :key="'iff_' + item.Id"
      >
        <a @click="goMenu('MyNoticeDetail', item.Id)">
          <p class="top">{{ $date(item.UpdatedAt).format("YYYY/MM/DD") }}</p>
          <p class="tit">{{ item.Title }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyNotice",
  components: {},
  data() {
    return {
      inquiryList: [],
    };
  },
  created() {
    this.getItemList();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest, id) {
      this.$router.push({
        name: dest,
        query: { id: id },
      });
    },
    getItemList() {
      this.$apiGET("/api/cs?typeNum=0").then(({ data }) => {
        this.inquiryList = data;
      });
    },
  },
};
</script>
