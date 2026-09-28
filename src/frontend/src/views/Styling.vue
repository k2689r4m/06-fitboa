<template>
  <div class="content">
    <div class="content-top">
      <h2 class="tit">스타일링 가이드</h2>
    </div>
    <div class="list-top type2">
      유아더는 매월 두번씩 당신의 체형에 어울리는<br />
      코디를 추천해 드려요
    </div>
    <div class="search-wrap">
      <!-- <div class="right">
        맞춤 체형 보기
        <label class="input-switch sm"
          ><input
            type="checkbox"
            true-value="true"
            false-value="false" /><span></span
        ></label>
      </div> -->
      <div class="input-search wd-100">
        <input type="text" class="input-text" v-model="keyword" />
        <button type="button" class="btn" @click="getItem"></button>
      </div>
    </div>

    <ul class="styling-list m-t--60">
      <li
        class="styling-list--item"
        @click="goDetail(item.Id)"
        v-for="item in itemList"
        :key="'styling_list_' + item.Id"
      >
        <div class="top">
          <span class="badge md badge-line white">2022년 3월호</span>
          <span v-if="item.BodyType == 0" class="badge sm white">무료</span>
          <span v-else-if="item.BodyType == 1" class="badge sm type-A">
            A자형
          </span>
          <span v-else-if="item.BodyType == 2" class="badge sm type-I">
            I자형
          </span>
          <span v-else-if="item.BodyType == 3" class="badge sm type-O">
            O자형
          </span>
          <span v-else-if="item.BodyType == 4" class="badge sm type-V">
            V자형
          </span>
        </div>
        <div class="img-wrap">
          <img :src="'api/style/styleguide/image/' + item.Image" alt="" />
        </div>
        <div :class="'text-wrap bg-' + item.BodyType">
          <div class="tit m-b--20">
            {{ item.Title }}
          </div>
          <span class="badge sm grey">유아더 스타일링 가이드</span>
          <!-- <div class="sub">{{ item.Author }}</div> -->
        </div>
        <button type="button" class="btn bookmark"></button>
      </li>
      <!-- <li class="styling-list--item" @click="goDetail">
        <div class="img-wrap">
          <img src="../../public/images/image2.png" alt="" />
        </div>
        <div class="text-wrap">
          <div class="tit">
            [X자형] 선명한 가을 남자 그 컬러, 그리고 가장 중요한
          </div>
          <div class="sub">에디터 오덩이</div>
        </div>
        <button type="button" class="btn bookmark"></button>
      </li> -->
    </ul>

    <button type="button" class="btn btn-more" @click="getMoreItem">
      <strong>더보기</strong> {{ itemList.length }} / {{ contentsCount }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Styling",
  components: {},
  data() {
    return {
      contentsCount: 0,
      page: 1,
      keyword: "",
      itemList: [],
    };
  },
  created() {
    this.getItem();
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: "StylingDetail",
        query: { contentId: id },
      });
    },
    getItem() {
      this.$apiGET(
        "/api/style/styleguide/contents?page=" +
          this.page +
          "&search=" +
          this.keyword
      ).then(({ data }) => {
        this.itemList = data.contents;
        this.contentsCount = data.contentsCount.ContentsCount;
      });
    },
    getMoreItem() {
      if (this.itemList.length < this.contentsCount) {
        this.$apiGET(
          "/api/style/styleguide/contents?page=" +
            (this.page + 1) +
            "&search=" +
            this.keyword
        ).then(({ data }) => {
          this.itemList.push(...data.contents);
          this.contentsCount = data.contentsCount.ContentsCount;
          this.page++;
        });
      }
    },
  },
};
</script>
