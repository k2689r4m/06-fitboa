<template>
  <div class="content">
    <div class="content-top center">
      <h2 class="tit">비밀번호 찾기</h2>
    </div>
    <div class="input-wrap btn-exist">
      <input
        type="text"
        class="input-text"
        placeholder="아이디 입력 (이메일)"
        v-model="UserName"
      />
      <button type="button" class="btn input-btn" @click="checkUsername">
        확인
      </button>
    </div>
    <div class="input-wrap">
      <input type="text" class="input-text" placeholder="이름" v-model="Name" />
    </div>
    <div class="input-wrap btn-exist">
      <input
        type="tel"
        class="input-text"
        placeholder="휴대폰 번호 (숫자만 입력)"
        v-model="Contact"
        @keyup="phoneNumberMaks(Contact)"
      />
      <button type="button" class="btn input-btn" @click="getVerify">
        인증 요청
      </button>
    </div>
    <div class="input-wrap">
      <input
        type="number"
        class="input-text"
        placeholder="인증번호 6자리 입력"
        v-model="VerifyKey"
      />
    </div>
    <div class="btn-wrap">
      <button type="button" class="btn btn-full btn-black" @click="goResult">
        비밀번호 재설정
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FindPass",
  components: {},
  data() {
    return {
      UserName: "",
      Name: "",
      Contact: "",
      VerifyKey: "",
      state: false,
    };
  },
  created() {
    if ("Username" in this.$route.query) {
      this.UserName = this.$route.query.Username;
    }
  },
  methods: {
    goResult() {
      if (!this.state) {
        this.$store.commit("updateError", "아이디를 확인 해주세요.");
        return;
      }
      this.$apiPOST("/api/user/find/newpassword", {
        Name: this.Name,
        Contact: this.Contact,
        VerifyKey: this.VerifyKey,
        UserName: this.UserName,
      }).then(({ data }) => {
        console.log(data);
        this.$router.push({
          name: "FindPassResult",
          // query: { Username: data.find.Username },
        });
      });
    },
    getVerify() {
      this.$apiGET(
        "/api/user/verify/password?Name=" +
          this.Name +
          "&Contact=" +
          this.Contact +
          "&UserName=" +
          this.UserName
      ).then(({ data }) => {
        console.log(data);
      });
    },
    checkUsername() {
      this.$apiGET(
        "/api/user/find/password/check?userName=" + this.UserName
      ).then(({ data }) => {
        console.log(data);
        this.$store.commit("updateError", "확인되었습니다.");
        this.state = true;
      });
    },
    phoneNumberMaks(value) {
      if (!value) {
        return "";
      }

      value = value.replace(/[^0-9]/g, "");

      let result = [];
      let restNumber = "";

      // 지역번호와 나머지 번호로 나누기
      if (value.startsWith("02")) {
        // 서울 02 지역번호
        result.push(value.substr(0, 2));
        restNumber = value.substring(2);
      } else if (value.startsWith("1")) {
        // 지역 번호가 없는 경우
        // 1xxx-yyyy
        restNumber = value;
      } else {
        // 나머지 3자리 지역번호
        // 0xx-yyyy-zzzz
        result.push(value.substr(0, 3));
        restNumber = value.substring(3);
      }

      if (restNumber.length === 7) {
        // 7자리만 남았을 때는 xxx-yyyy
        result.push(restNumber.substring(0, 3));
        result.push(restNumber.substring(3));
      } else {
        result.push(restNumber.substring(0, 4));
        result.push(restNumber.substring(4));
      }

      this.Contact = result.filter((val) => val).join("-");
    },
  },
};
</script>
