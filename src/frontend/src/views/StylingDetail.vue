<template>
  <div class="content">
    <div class="styling-top">
      <ul class="styling-list type3">
        <li class="styling-list--item">
          <!-- <div class="img-wrap">
            <img
              :src="'/api/style/styleguide/image/' + infoItem.Image"
              alt=""
            />
          </div> -->
          <div class="text-wrap">
            <span v-if="!bodyType" class="badge sm white">무료</span>
            <span v-else :class="'badge type-' + bodyType"
              >{{ bodyType }}자형</span
            >
            <div class="tit">
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

    <div class="line"></div>

    <div class="detail-con" v-bind:class="{ nonmember: !userState }">
      <img
        :src="'/api/style/styleguide/image/' + img.Image"
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
      <div class="more-con prev bg-blue" v-if="nextItem.prev != null">
        <a @click="goRouter(nextItem.prev.Id, 'StylingDetail')">
          <div class="img-wrap">
            <img
              :src="'/api/story/content/image/' + nextItem.prev.Image"
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

      <div class="more-con next bg-yellow" v-if="nextItem.next != null">
        <a @click="goRouter(nextItem.next.Id, 'StylingDetail')">
          <div class="text-wrap">
            <div class="tit">다음 콘텐츠</div>
            <div class="sub">
              {{ nextItem.next.Title }}
            </div>
          </div>
          <div class="img-wrap">
            <img
              :src="'/api/story/content/image/' + nextItem.next.Image"
              alt=""
            />
          </div>
        </a>
      </div>

      <div class="comment-wrap">
        <h3 class="tit">리뷰</h3>
        <ul class="comment-list">
          <li class="comment-list--item">
            <div class="info">
              <div class="img-wrap">
                <img src="" alt="" />
              </div>
              <div class="text-wrap">
                <span class="name">AAA 님</span>
                <span class="date">2021/11/29 15:00</span>
              </div>
            </div>
            <p class="con">
              회사에 다니다보니 신경쓰기 힘들었는데! 정말 고마운 콘텐츠에요
              대박나세요.
            </p>
            <button type="button" class="btn btn-re">답글</button>
          </li>
          <li class="comment-list--item re">
            <div class="info">
              <div class="img-wrap">
                <img src="../../public/images/image.png" alt="" />
              </div>
              <div class="text-wrap">
                <span class="name">유아더</span>
                <span class="date">2021/11/29 15:00</span>
              </div>
            </div>
            <p class="con">
              감사합니다! 더욱 더 즐거운 콘텐츠로 찾아올께요! 같이 멋진 코디
              함께 해요!
            </p>
            <button type="button" class="btn btn-re">답글</button>
          </li>
          <li class="comment-list--item">
            <div class="info">
              <div class="img-wrap">
                <img src="../../public/images/image.png" alt="" />
              </div>
              <div class="text-wrap">
                <span class="name">AAA 님</span>
                <span class="date">2021/11/29 15:00</span>
              </div>
            </div>
            <p class="con">
              회사에 다니다보니 신경쓰기 힘들었는데! 정말 고마운 콘텐츠에요
              대박나세요.
            </p>
            <button type="button" class="btn btn-re">답글</button>
          </li>
          <li class="comment-list--item">
            <div class="info">
              <div class="img-wrap">
                <img src="../../public/images/image.png" alt="" />
              </div>
              <div class="text-wrap">
                <span class="name">AAA 님</span>
                <span class="date">2021/11/29 15:00</span>
              </div>
            </div>
            <p class="con">
              회사에 다니다보니 신경쓰기 힘들었는데! 정말 고마운 콘텐츠에요
              대박나세요.
            </p>
            <button type="button" class="btn btn-re">답글</button>
          </li>
        </ul>
        <div class="comment-input">
          <textarea
            class="textarea"
            placeholder="리뷰 쓰기..."
            rows="3"
          ></textarea>
          <div class="bottom">
            <button type="button" class="btn">리뷰등록</button>
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
  name: "StylingDetail",
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
        // this.getHighView();
        // this.getReveiw();
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
    getNextItem() {
      this.$apiGET(
        "/api/style/styleguide/next?contentId=" + this.$route.query.contentId
      ).then(({ data }) => {
        this.nextItem = data;
      });
    },
    getItem() {
      this.$apiGET(
        "/api/style/styleguide/content?contentId=" + this.$route.query.contentId
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
