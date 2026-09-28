<template>
  <div class="content">
    <div class="content-top center p-t--40 p-b--40">
      <img
        src="../../public/images/icon/check_round.svg"
        alt=""
        class="img check"
      />
      <h2 class="tit">회원가입이 완료 되었습니다</h2>
      <p class="sub">
        {{ $store.state.user.Name }}님의 가입을 축하합니다.<br />
        유아더와 함께 당신의 스타일을 찾아보세요.
      </p>
    </div>
    <div class="btn-wrap">
      <button type="button" class="btn btn-full btn-primary" @click="goResult">
        메인페이지로 이동
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoinCom",
  components: {},
  data() {
    return {};
  },
  methods: {
    goResult() {
      this.$router.push({
        name: "Home",
        // query: { name: "Query 프로그래밍 방식", age: 2 },
      });
    },
  },
};
</script>
