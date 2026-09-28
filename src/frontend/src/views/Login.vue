<template>
  <div class="content">
    <div class="content-top center">
      <h2 class="tit">로그인</h2>
    </div>
    <div class="input-wrap">
      <input
        type="text"
        class="input-text"
        placeholder="아이디 (이메일을 입력해 주세요)"
        v-model="userName"
      />
    </div>
    <div class="input-wrap">
      <input
        type="password"
        class="input-text"
        placeholder="비밀번호"
        v-model="password"
      />
    </div>
    <div class="login-bottom">
      <label class="checkbox">
        <input type="checkbox" />
        <span class="check"></span>
        <span class="text">로그인 유지</span>
      </label>
      <div class="right">
        <a @click="goMenu('FindId')">아이디찾기</a>
        <a @click="goMenu('FindPass')">비밀번호 찾기</a>
      </div>
    </div>
    <div class="btn-wrap">
      <button type="button" class="btn btn-full btn-black" @click="btnLogin">
        로그인
      </button>
    </div>
    <div class="login-first">
      유아더가 처음이신가요?
      <a @click="goMenu('Join')">회원가입</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    btnLogin() {
      this.$apiPOST("/api/user/login", {
        UserName: this.userName,
        Password: this.password,
      }).then(({ data }) => {
        if (data.NeedDelivery) {
          this.$store.commit("updateState");
        }

        if (data.ContentReviewNeedCount) {
          this.$store.commit("updateReview");
        }
        this.goMenu("Home");
      });
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
        // query: { name: "Query 프로그래밍 방식", age: 2 },
      });
    },
  },
};
</script>
