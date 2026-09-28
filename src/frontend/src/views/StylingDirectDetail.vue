<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      1:1 스타일링 후기
    </div>
    <template v-if="item != null">
      <ul class="review-list type3">
        <li class="review-list--item">
          <div class="top">
            <div class="info">
              <div class="img-wrap">
                <img src="" alt="" />
              </div>
              <p class="name">
                <strong>{{ item.UserName }}</strong
                >님
              </p>
              <p class="date">
                {{ $date(item.CreatedAt).format("YYYY/MM/DD HH:MM") }}
              </p>
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
            <button
              type="button"
              class="btn delete"
              @click="delReview"
              v-if="
                $store.state.user != null && item.UserId == $store.state.user.Id
              "
            >
              삭제하기
            </button>
          </div>
          <div class="photo" v-if="item.Images.length > 0">
            <div
              class="photo-wrap"
              v-for="(img, idx) in item.Images"
              :key="'st_di_de_ph_' + idx"
            >
              <img :src="'/api/persnal/review/image/' + img" alt="" />
            </div>
          </div>
          <div class="bottom">
            {{ item.Content }}
          </div>
        </li>
      </ul>
      <ul class="comment-list type2" v-if="item.AdminReply">
        <li class="comment-list--item re">
          <div class="info">
            <div class="img-wrap">
              <img src="../../public/images/image.png" alt="" />
            </div>
            <div class="text-wrap">
              <span class="name">fitboa</span>
              <span class="date">
                {{ $date(item.AdminReplyUpdatedAt).format("YYYY/MM/DD HH:MM") }}
              </span>
            </div>
          </div>
          <p class="con">
            {{ item.AdminReply }}
          </p>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: "StylingDirectDetail",
  components: {},
  data() {
    return { item: null };
  },
  created() {
    this.getReview();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getReview() {
      this.$apiGET(
        "/api/persnal/review/detail?reviewId=" + this.$route.query.id
      ).then(({ data }) => {
        this.item = data;
      });
    },
    delReview() {
      this.$apiPOST("/api/mypage/delete/review", {
        ReviewId: this.item.ReviewId,
      }).then((re) => {
        if (re != undefined) {
          this.$store.commit("updateError", "리뷰가 삭제되었습니다.");
        }
        this.goBack();
      });
    },
  },
};
</script>
