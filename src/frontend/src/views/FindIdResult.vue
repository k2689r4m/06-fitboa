<template>
  <div class="content">
    <div class="content-top center">
      <h2 class="tit">아이디 찾기 결과</h2>
    </div>
    <div class="find-result">
      <p>입력하신 정보로 조회된 결과는<br />다음과 같습니다.</p>
      <div class="box">{{ $route.query.Username }}</div>
    </div>
    <div class="find-more">
      <a @click="goPass">비밀번호가 기억나지 않으세요?</a>
    </div>
    <div class="btn-wrap">
      <button type="button" class="btn btn-full btn-black" @click="goResult">
        로그인
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FindIdResult",
  components: {},
  data() {
    return {};
  },
  methods: {
    goResult() {
      this.$router.push({
        name: "Login",
        // query: { name: "Query 프로그래밍 방식", age: 2 },
      });
    },
    goPass() {
      this.$router.push({
        name: "FindPass",
        query: { Username: this.$route.query.Username },
      });
    },
  },
};
</script>
