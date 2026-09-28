<template>
  <div class="content bg-grey">
    <div class="content-tit">
      <button type="button" class="btn back"></button>
      마이페이지
    </div>
    <div class="mypage-top">
      <strong>{{ $store.state.user.Username }}님 반갑습니다</strong>
      <button
        type="button"
        class="btn btn-underline"
        @click="goMenu('MyCheck')"
      >
        회원정보 수정
      </button>
      <div class="bottom-wrap">
        <button type="button" class="btn btn-logout" @click="btnLogout">
          로그아웃
        </button>
      </div>
    </div>
    <ul class="list-menu">
      <li class="list-menu--item">
        <a v-if="this.$store.state.user.IsSub" @click="goMenu('MySub2')">
          멤버십 구독 및 해지
        </a>
        <a v-else @click="goMenu('MySub')"> 멤버십 구독 및 해지 </a>
      </li>
      <li class="list-menu--item">
        <a @click="goMenu('MyPayList')">최근 결제 내역</a>
      </li>
      <li class="list-menu--item">
        <a @click="goMenu('MyBodyType')">체형 정보</a>
      </li>
      <!-- <li class="list-menu--item">
        <a @click="goMenu('MyCard')">결제 카드 수정</a>
      </li> -->
      <li class="list-menu--item">
        <a @click="goMenu('MyPromotion')">프로모션 코드</a>
      </li>
      <li class="list-menu--item">
        <a @click="goMenu('MyStylingReview')">1:1 스타일링 후기</a>
      </li>
      <li class="list-menu--item">
        <a @click="goMenu('Bookmark')">스크랩</a>
      </li>
    </ul>
    <div class="line-box"></div>
    <ul class="list-menu m-b--60">
      <li class="list-menu--item">
        <label>고객 센터</label>
      </li>
      <li class="list-menu--item">
        <a @click="goMenu('MyCS')">고객 센터</a>
      </li>
      <li class="list-menu--item">
        <a @click="goMenu('MyInquiry')">1:1 문의</a>
      </li>
      <li class="list-menu--item">
        <a @click="goMenu('MyCS')">공지사항 및 FAQ</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyPage",
  components: {},
  data() {
    return {};
  },
  methods: {
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
    btnLogout() {
      this.$apiPOST("/api/user/logout").then(() => {
        this.$cookies.remove("FL");
        this.$store.commit("updateUser", null);
        this.$router.go();
      });
    },
  },
};
</script>
