<template>
  <div class="content bg-grey">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      1:1 스타일링 후기
    </div>

    <ul class="review-list">
      <li
        class="review-list--item"
        @click="goMenu('StylingDirectDetail', item.ReviewId)"
        v-for="item in itemList"
        :key="'my_re_li_it_' + item.ReviewId"
      >
        <div class="top">
          <div class="info">
            <div class="img-wrap">
              <img src="" alt="" />
            </div>
            <p class="name">
              <strong>{{ item.UserName }}</strong
              >님
            </p>
            <p class="date">2021/11/29 15:00</p>
            <div class="startRadio disabled">
              <label class="startRadio__box">
                <input
                  type="radio"
                  :name="'star_' + item.ReviewId"
                  :value="0.5"
                  v-model="item.Rate"
                />
                <span class="startRadio__img"></span>
              </label>
              <label class="startRadio__box">
                <input
                  type="radio"
                  :name="'star_' + item.ReviewId"
                  :value="1"
                  v-model="item.Rate"
                />
                <span class="startRadio__img"></span>
              </label>
              <label class="startRadio__box">
                <input
                  type="radio"
                  :name="'star_' + item.ReviewId"
                  :value="1.5"
                  v-model="item.Rate"
                />
                <span class="startRadio__img"></span>
              </label>
              <label class="startRadio__box">
                <input
                  type="radio"
                  :name="'star_' + item.ReviewId"
                  :value="2"
                  v-model="item.Rate"
                />
                <span class="startRadio__img"></span>
              </label>
              <label class="startRadio__box">
                <input
                  type="radio"
                  :name="'star_' + item.ReviewId"
                  :value="2.5"
                  v-model="item.Rate"
                />
                <span class="startRadio__img"></span>
              </label>
              <label class="startRadio__box">
                <input
                  type="radio"
                  :name="'star_' + item.ReviewId"
                  :value="3"
                  v-model="item.Rate"
                />
                <span class="startRadio__img"></span>
              </label>
              <label class="startRadio__box">
                <input
                  type="radio"
                  :name="'star_' + item.ReviewId"
                  :value="3.5"
                  v-model="item.Rate"
                />
                <span class="startRadio__img"></span>
              </label>
              <label class="startRadio__box">
                <input
                  type="radio"
                  :name="'star_' + item.ReviewId"
                  :value="4"
                  v-model="item.Rate"
                />
                <span class="startRadio__img"></span>
              </label>
              <label class="startRadio__box">
                <input
                  type="radio"
                  :name="'star_' + item.ReviewId"
                  :value="4.5"
                  v-model="item.Rate"
                />
                <span class="startRadio__img"></span>
              </label>
              <label class="startRadio__box">
                <input
                  type="radio"
                  :name="'star_' + item.ReviewId"
                  :value="5"
                  v-model="item.Rate"
                />
                <span class="startRadio__img"></span>
              </label>
            </div>
          </div>
          <div class="photo" v-if="item.Images.length > 0">
            <template v-if="item.Images.length > 1">
              <div class="photo-wrap">
                <img
                  :src="'/api/persnal/review/image/' + item.Images[0]"
                  alt=""
                />
              </div>
              <div class="photo-wrap">
                <img
                  :src="'/api/persnal/review/image/' + item.Images[1]"
                  alt=""
                />
                <div class="more" v-if="item.Images.length > 2">
                  <span class="num">+{{ item.Images.length - 2 }}</span>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="photo-wrap">
                <img
                  :src="'/api/persnal/review/image/' + item.Images[0]"
                  alt=""
                />
              </div>
            </template>
          </div>
        </div>
        <div class="bottom">
          {{ item.Content }}
        </div>
      </li>
      <li class="review-list--item type2">
        <div class="left">
          <strong class="tit">[1:1 스타일링] 후기 작성 하기</strong>
          (21.01.08 요청)
        </div>
        <div class="right">
          <button
            type="button"
            class="btn plus"
            @click="goMenu('MyStylingReviewWrite', null)"
          >
            +
          </button>
        </div>
      </li>
      <li class="review-list--item no">
        <div class="text">작성 가능한 후기가 없습니다.</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyStylingReview",
  components: {},
  data() {
    return { itemList: [] };
  },
  created() {
    this.getReview();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest, id) {
      if (id != null) {
        this.$router.push({
          name: dest,
          query: { id: id },
        });
      } else {
        this.$router.push({
          name: dest,
        });
      }
    },
    getReview() {
      this.$apiGET("/api/mypage/review").then(({ data }) => {
        this.itemList = data.contents;
      });
    },
  },
};
</script>
