<template>
  <div class="content">
    <div class="styling-top">
      <ul class="styling-list type2">
        <li class="styling-list--item">
          <div class="img-wrap">
            <!-- <img src="../../public/images/image.png" alt="" /> -->
            <img :src="'api/story/content/image/' + infoItem.Image" alt="" />
          </div>
          <div class="text-wrap">
            <span v-if="!bodyType" class="badge sm white">무료</span>
            <span v-else :class="'badge type-' + bodyType"
              >{{ bodyType }}자형</span
            >
            <div class="tit">
              <!-- 선명한 가을 남자 그 컬러, <br />
              그리고 가장 중요한 따듯함 -->
              <div v-html="infoItem.Title"></div>
            </div>
            <div class="sub">
              {{ $date(infoItem.CreatedAt).format("YYYY.MM.DD") }}<br />
              <span class="badge sm grey">{{ infoItem.Author }}</span>
            </div>
          </div>
          <button
            type="button"
            class="btn bookmark"
            @click="btnBookmark"
          ></button>
        </li>
      </ul>
    </div>

    <div class="line m-t--0"></div>

    <div class="detail-con" v-bind:class="{ nonmember: !userState }">
      <img
        :src="'api/story/content/image/' + img.Image"
        v-for="img in itemList"
        :key="'detail_con_img_' + img.OrderNum"
      />
      <div class="bottom-fix">
        <div class="content-top center">
          <h2 class="tit">유아더 콘텐츠 구독</h2>
          <p class="sub">
            유아더 콘텐츠와 함께<br />당신의 스타일을 찾아보세요!
          </p>
        </div>
        <div class="btn-wrap">
          <!-- <button type="button" class="btn btn-full btn-black">
            유아더 회원가입
          </button> -->
          <router-link
            :to="{ name: 'Join' }"
            tag="button"
            class="btn btn-full btn-black"
          >
            유아더 회원가입
          </router-link>
        </div>
        <div class="font-size--14 text-center font-color--grey p-b--20">
          이미 회원이신가요?
          <!-- <a href="#" class="font-color--primary m-l--10">로그인하기</a> -->
          <router-link
            :to="{ name: 'Login' }"
            tag="a"
            class="font-color--primary m-l--10"
          >
            로그인하기
          </router-link>
        </div>
      </div>
    </div>

    <template v-if="userState">
      <!-- 이전 다음 -->
      <div class="more-con prev bg-blue" v-if="nextItem.prev != null">
        <a @click="goRouter(nextItem.prev.Id, 'Detail')">
          <div class="img-wrap">
            <img
              :src="'api/story/content/image/' + nextItem.prev.Image"
              alt=""
            />
          </div>
          <div class="text-wrap">
            <div class="tit">이전 콘텐츠</div>
            <div class="sub">
              {{ nextItem.prev.Title }}
            </div>
          </div>
        </a>
      </div>
      <!-- 이전 다음 -->
      <div class="more-con next bg-yellow" v-if="nextItem.next != null">
        <a @click="goRouter(nextItem.next.Id, 'Detail')">
          <div class="text-wrap">
            <div class="tit">다음 콘텐츠</div>
            <div class="sub">
              {{ nextItem.next.Title }}
            </div>
          </div>
          <div class="img-wrap">
            <img
              :src="'api/story/content/image/' + nextItem.next.Image"
              alt=""
            />
          </div>
        </a>
      </div>

      <!-- 많이 봄 -->
      <div class="more-wrap" v-if="highItem.length > 0">
        <h3 class="tit">많은 분들이 보고 있어요</h3>
        <ul class="more-list">
          <li
            class="more-list--item"
            v-for="item in highItem"
            :key="'detail_more_' + item.Id"
          >
            <a @click="goRouter(item.Id, 'Detail')">
              <div class="img-wrap">
                <img :src="'api/story/content/image/' + item.Image" alt="" />
              </div>
              <div class="text-wrap">
                <div class="tit">
                  {{ item.Title }}
                </div>
                <div class="sub">
                  <span class="badge sm grey">{{ item.Author }}</span>
                  <span class="badge sm type-X">X자형</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <!-- 리뷰 -->
      <div class="comment-wrap">
        <h3 class="tit">리뷰</h3>
        <ul class="comment-list">
          <li
            class="comment-list--item"
            v-bind:class="{ re: item.ParentReviewId != null }"
            v-for="(item, idx) in reviewList"
            :key="'detail_reveiw_' + item.Id"
          >
            <div class="info">
              <div class="img-wrap">
                <img src="" alt="" />
              </div>
              <div class="text-wrap">
                <span class="name">{{ item.Name }} 님</span>
                <span class="date">{{
                  $date(item.CreatedAt).format("YYYY/MM/DD HH:mm")
                }}</span>
              </div>
            </div>
            <p class="con">
              {{ item.Content }}
            </p>
            <!-- <button
              type="button"
              class="btn btn-re"
              @click="sendReview(item.Id, idx)"
            >
              답글
            </button> -->
            <button
              type="button"
              class="btn btn-re"
              @click="btnReReview(idx, true)"
            >
              답글
            </button>

            <div class="re-wrap" v-if="item.reState">
              <div class="comment-input">
                <div class="info">
                  <div class="img-wrap"><img src="" alt="" /></div>
                  <div class="text-wrap">
                    <span class="name">유아더</span>
                  </div>
                </div>
                <textarea
                  placeholder="리뷰 쓰기..."
                  rows="3"
                  class="textarea"
                  v-model="reReviewContent"
                ></textarea>
                <div class="bottom">
                  <button
                    type="button"
                    class="btn"
                    @click="sendReview(item.Id, idx)"
                  >
                    답글등록
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="comment-input" v-if="userState">
          <textarea
            class="textarea"
            placeholder="리뷰 쓰기..."
            rows="3"
            v-model="reviewData.ReviewContent"
          ></textarea>
          <div class="bottom">
            <button type="button" class="btn" @click="sendReview(null, null)">
              리뷰등록
            </button>
          </div>
        </div>
      </div>
    </template>
    <!-- <template v-else>
      <div class="bottom-fixed">
        <div class="content-top center">
          <h2 class="tit">Fitboa 콘텐츠 구독</h2>
          <p class="sub">
            Fitboa 콘텐츠와 함께<br />설렘과 호기심 넘치는 남자가 되어보세요
          </p>
        </div>
        <div class="btn-wrap">
          <router-link
            :to="{ name: 'Join' }"
            tag="button"
            class="btn btn-full btn-black"
          >
            Fitboa 회원가입
          </router-link>
        </div>
        <div class="font-size--14 text-center font-color--grey p-b--20">
          이미 회원이신가요?
          <router-link
            :to="{ name: 'Login' }"
            tag="a"
            class="font-color--primary m-l--10"
          >
            로그인하기
          </router-link>
        </div>
      </div>
    </template> -->
  </div>
</template>

<script>
export default {
  name: "Detail",
  components: {},
  data() {
    return {
      userState: true,
      infoItem: { Image: "" },
      highItem: [],
      nextItem: { next: null, prev: null },
      itemList: [],
      reviewList: [],
      reviewData: {
        ContentId: null,
        ReviewId: null,
        ReviewContent: "",
      },
      reReviewContent: "",
      bodyType: false,
    };
  },
  watch: {
    $route(to, from) {
      if (parseInt(to.query.contentId) != parseInt(from.query.contentId)) {
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.reviewData.ReviewContent = "";
      this.getItem();
      if (this.$cookies.get("FL") != null) {
        this.getNextItem();
        this.getHighView();
        this.getReveiw();
      }
    },
    btnBookmark() {
      if (this.$cookies.get("FL") != null) {
        this.$apiPOST("/api/story/add/bookmark", {
          ContentId: this.infoItem.Id,
          IsAdd: !this.infoItem.Bookmarked,
        }).then(({ data }) => {
          this.$store.commit("updateError", data);
          this.infoItem.Bookmarked = !this.infoItem.Bookmarked;
        });
      } else {
        this.$store.commit("updateError", "회원가입 후 사용 가능");
      }
    },
    changeReview() {
      // if (this.reState) {
      //   for (let i = 0; i < this.reviewList.length; i++) {
      //     this.reviewList[i].reState = false;
      //   }
      //   this.reviewData.ReviewContent = "";
      // }
    },
    btnReReview(idx, st) {
      for (let i = 0; i < this.reviewList.length; i++) {
        this.reviewList[i].reState = false;
      }
      this.reviewList[idx].reState = st;
    },
    sendReview(id, idx) {
      if (id != null) {
        this.$apiPOST("/api/story/content/review", {
          ContentId: parseInt(this.$route.query.contentId),
          ReviewId: id,
          ReviewContent: this.reReviewContent,
        }).then(({ data }) => {
          //[수정필요] 리뷰 작성할시 대댓글 삽입 위치 수정 필요
          data.item.reState = false;
          this.reviewList.splice(idx + 1, 0, data.item);
          this.reReviewContent = null;
          this.reviewList[idx].reState = false;

          alert(data.message);
        });
      } else {
        this.reviewData.ContentId = parseInt(this.$route.query.contentId);
        this.$apiPOST("/api/story/content/review", this.reviewData).then(
          ({ data }) => {
            data.item.reState = false;
            this.reviewList.push(data.item);
            this.reviewData.ReviewContent = null;
            this.reviewData.ReviewId = null;

            alert(data.message);
          }
        );
      }
    },
    getHighView() {
      this.$apiGET(
        "/api/story/content/highviewcontent?contentId=" +
          this.$route.query.contentId
      ).then(({ data }) => {
        this.highItem = data;
      });
    },
    getNextItem() {
      this.$apiGET(
        "/api/story/content/next?contentId=" + this.$route.query.contentId
      ).then(({ data }) => {
        this.nextItem = data;
      });
    },
    getReveiw() {
      this.$apiGET(
        "/api/story/content/review?contentId=" + this.$route.query.contentId
      ).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          data[i].reState = false;
        }

        this.reviewList = data;
      });
    },
    getItem() {
      this.$apiGET(
        "/api/story/content?contentId=" + this.$route.query.contentId
      ).then(({ data }) => {
        if (data.length > 0) {
          this.infoItem = data[0];
          this.itemList = data.filter((re) => {
            return !re.IsThumbnail;
          });

          this.bodyType = this.$getBodyType(this.infoItem.BodyType);

          if (
            this.infoItem.NeedSub &&
            this.$store.state.user != null &&
            this.$store.state.isSub
          ) {
            this.userState = true;
          } else if (this.infoItem.NeedReg && this.$store.state.user != null) {
            this.userState = true;
          } else if (!this.infoItem.NeedSub && !this.infoItem.NeedReg) {
            this.userState = true;
          } else {
            this.userState = false;
          }
        }
      });
    },
    goRouter(id, name) {
      this.$router
        .push({
          name: name,
          query: { contentId: id },
        })
        .catch(() => {});
    },
  },
};
</script>
