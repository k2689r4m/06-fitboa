<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      스크랩
    </div>

    <div v-for="(book, idx) in bookList" :key="'bo_li_' + idx">
      <div
        class="line full grey font-size--14 font-color--grey p--15 p-l--20 m-t--0 border-top"
      >
        {{ book[0].Date }}
      </div>
      <ul class="thumbnail-list m-b--0">
        <li
          class="thumbnail-list--item"
          v-for="item in book"
          :key="'bo_li_li' + item.ContentId"
          @click="goDetail(item.ContentId, item.TypeNum)"
        >
          <div class="img-wrap">
            <img :src="'/api/story/content/image/' + item.Image" alt="" />
          </div>
          <div class="tit">
            {{ item.Title }}
          </div>
          <div class="sub">{{ item.Author }}</div>
        </li>
      </ul>
    </div>

    <!-- <div
      class="line full grey font-size--14 font-color--grey p--15 p-l--20 m-t--0"
    >
      2021/04
    </div>
    <ul class="thumbnail-list m-b--0">
      <li class="thumbnail-list--item">
        <div class="img-wrap">
          <img src="../../public/images/image.png" alt="" />
        </div>
        <div class="tit">
          [X자형] 선명한 가을 남자 그 컬러, 그리고 가장 중요한 내용 내용 내용
        </div>
        <div class="sub">에디터 오덩이</div>
      </li>
      <li class="thumbnail-list--item">
        <div class="img-wrap">
          <img src="../../public/images/image.png" alt="" />
        </div>
        <div class="tit">[X자형] 선명한 가을 남자 그 컬러, 그리고</div>
        <div class="sub">에디터 오덩이</div>
      </li>
      <li class="thumbnail-list--item">
        <div class="img-wrap">
          <img src="../../public/images/image.png" alt="" />
        </div>
        <div class="tit">[X자형] 선명한 가을 남자 그 컬러, 그리고</div>
        <div class="sub">에디터 오덩이</div>
      </li>
    </ul>

    <div
      class="line full grey font-size--14 font-color--grey p--15 p-l--20 m-t--0 border-top"
    >
      2021/02
    </div>
    <ul class="thumbnail-list m-b--0">
      <li class="thumbnail-list--item">
        <div class="img-wrap">
          <img src="../../public/images/image.png" alt="" />
        </div>
        <div class="tit">
          [X자형] 선명한 가을 남자 그 컬러, 그리고 가장 중요한 내용 내용 내용
        </div>
        <div class="sub">에디터 오덩이</div>
      </li>
      <li class="thumbnail-list--item">
        <div class="img-wrap">
          <img src="../../public/images/image.png" alt="" />
        </div>
        <div class="tit">[X자형] 선명한 가을 남자 그 컬러, 그리고</div>
        <div class="sub">에디터 오덩이</div>
      </li>
      <li class="thumbnail-list--item">
        <div class="img-wrap">
          <img src="../../public/images/image.png" alt="" />
        </div>
        <div class="tit">[X자형] 선명한 가을 남자 그 컬러, 그리고</div>
        <div class="sub">에디터 오덩이</div>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: "Bookmark",
  components: {},
  data() {
    return {
      bookList: [],
    };
  },
  created() {
    this.getBookmarks();
  },
  methods: {
    getBookmarks() {
      this.$apiGET("/api/mypage/bookmarks").then(({ data }) => {
        this.bookList = data;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
    // goDetail(id) {
    //   this.$router.push({
    //     name: "Detail",
    //     query: { contentId: id },
    //   });
    // },
    goDetail(id, type) {
      if (type == 0) {
        this.$router.push({
          name: "Detail",
          query: { contentId: id },
        });
      } else {
        this.$router.push({
          name: "StylingDetail",
          query: { contentId: id },
        });
      }
    },
  },
};
</script>
