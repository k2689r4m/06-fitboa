<template>
  <div class="content">
    <div class="content-top center">
      <h2 class="tit">비밀번호 재설정</h2>
      <p class="sub">새 비밀번호를 입력해주세요</p>
    </div>
    <div class="input-wrap">
      <input
        type="password"
        class="input-text"
        placeholder="새 비밀번호 (8자 이상 영문자, 숫자, 특수문자 조합)"
        v-model="Password"
      />
    </div>
    <div class="input-wrap">
      <input
        type="password"
        class="input-text"
        placeholder="새 비밀번호 확인"
        v-model="Password_"
      />
      <template v-if="Password && Password_">
        <p v-if="Password != Password_" class="guide">
          비밀번호가 일치하지 않습니다.
        </p>
      </template>
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
  name: "FindPassResult",
  components: {},
  data() {
    return {
      Password: "",
      Password_: "",
    };
  },
  methods: {
    goResult() {
      this.$apiPOST("/api/user/find/change/password", {
        NewPassword: this.Password,
      }).then(({ data }) => {
        this.$store.commit("updateError", data.message);
        this.$router.push({
          name: "Login",
        });
      });

      // this.$router.push({
      //   name: "Login",
      //   // query: { name: "Query 프로그래밍 방식", age: 2 },
      // });
    },
  },
};
</script>
