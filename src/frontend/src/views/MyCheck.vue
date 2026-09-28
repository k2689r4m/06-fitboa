<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      회원 정보 수정
    </div>

    <div class="content-top center m-t--60">
      <h2 class="tit">비밀번호 확인</h2>
      <p class="sub">
        회원님의 정보를 안전하게 보호가기 위해<br />비밀번호를 다시 한 번
        확인합니다.
      </p>
    </div>
    <div class="input-wrap m-b--60">
      <input
        type="password"
        class="input-text"
        placeholder="비밀번호를 입력하세요"
        v-model="Password"
      />
    </div>
    <div class="btn-wrap">
      <button type="button" class="btn btn-full btn-black" @click="goResult">
        확인
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCheck",
  components: {},
  data() {
    return { Password: "" };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
    goResult() {
      this.$apiPOST("/api/mypage/change/login/once", {
        Password: this.Password,
      }).then(({ data }) => {
        console.log(data);
        this.$router.replace({
          name: "MyInfo",
        });
      });
    },
  },
};
</script>
