<template>
  <div class="content">
    <div class="content-top">
      <h2 class="tit">스토리</h2>
    </div>
    <div class="list-top type2">
      유아더 에디터들이 들려주는<br />센스있는 남자를 위한 스토리
    </div>
    <div class="search-wrap">
      <div class="input-search wd-100">
        <input type="text" class="input-text" v-model="keyword" />
        <button type="button" class="btn" @click="getItem"></button>
      </div>
    </div>
    <div class="switch-wrap m-t--40">
      맞춤 체형 보기
      <label class="input-switch sm"
        ><input
          type="checkbox"
          v-model="isCustom"
          true-value="true"
          false-value="false"
          @change="changeCustom" /><span></span
      ></label>
    </div>

    <ul class="story-list m-t--30">
      <li
        class="story-list--item"
        @click="goDetail(item.Id)"
        v-for="item in itemList"
        :key="'story_list_' + item.Id"
      >
        <div class="img-wrap">
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
          <img :src="'/api/story/content/image/' + item.Image" alt="" />
        </div>
        <div :class="'text-wrap bg-' + item.BodyType">
          <div class="tit">
            {{ item.Title }}
          </div>
          <span class="badge sm grey">{{ item.Author }}</span>
        </div>
        <button type="button" class="btn bookmark"></button>
      </li>
    </ul>
    <button type="button" class="btn btn-more" @click="getMoreItem">
      <strong>더보기</strong> {{ itemList.length }} / {{ contentsCount }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Story",
  components: {},
  data() {
    return {
      contentsCount: 0,
      page: 1,
      keyword: "",
      isCustom: "false",
      itemList: [],
    };
  },
  created() {
    this.getItem();
  },
  methods: {
    changeCustom() {
      this.$apiGET("/api/check/custom").then(({ data }) => {
        if (data.NeedReg && data.NeedSub && data.NeedBodyType) {
          alert("로그인 필요");
          this.isCustom = "false";
        } else if (!data.NeedReg && data.NeedSub && data.NeedBodyType) {
          alert("구독 필요");
          this.isCustom = "false";
        } else if (!data.NeedReg && !data.NeedSub && data.NeedBodyType) {
          alert("채형등록 필요");
          this.isCustom = "false";
        } else {
          this.page = 1;
          this.getItem();
        }
      });
    },
    getItem() {
      this.$apiGET(
        "/api/story/contents?isCustom=" +
          this.isCustom +
          "&page=" +
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
          "/api/story/contents?isCustom=" +
            this.isCustom +
            "&page=" +
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
    goDetail(id) {
      this.$router.push({
        name: "Detail",
        query: { contentId: id },
      });
    },
  },
};
</script>
