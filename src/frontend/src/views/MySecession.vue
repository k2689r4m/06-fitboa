<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      회원 탈퇴
    </div>

    <ul class="check-list m-t--30 m-b--30">
      <li class="check-list--item">
        회원 탈퇴를 하시게 되면, 결제 후 잔여일이 남아있더라도 유아더의
        유료서비스를 이용하실 수 없습니다.
      </li>
      <li class="check-list--item">
        입력하신 신체사이즈는 전체 삭제되며, 재가입 하셔도 복구가 불가능 합니다.
      </li>
    </ul>

    <div class="line"></div>

    <div class="content-top">
      <h3 class="sub m-b--20 m-t--30">탈퇴 사유</h3>
    </div>
    <div class="checkbox-list m-b--40">
      <label class="checkbox">
        <input
          type="radio"
          name="t1"
          v-model="Content"
          value="유아더의 스타일링 가이드 속 정보 부족"
        />
        <span class="check type2"></span>
        <span class="text">유아더의 스타일링 가이드 속 정보 부족</span>
      </label>
      <label class="checkbox">
        <input
          type="radio"
          name="t1"
          v-model="Content"
          value="유아더의 스토리 속 정보 부족"
        />
        <span class="check type2"></span>
        <span class="text">유아더의 스토리 속 정보 부족</span>
      </label>
      <label class="checkbox">
        <input
          type="radio"
          name="t1"
          v-model="Content"
          value="신체사이즈 정보의 삭제"
        />
        <span class="check type2"></span>
        <span class="text">신체사이즈 정보의 삭제</span>
      </label>
      <label class="checkbox">
        <input
          type="radio"
          name="t1"
          v-model="Content"
          value="유아더 회원 혜택 부족"
        />
        <span class="check type2"></span>
        <span class="text">유아더 회원 혜택 부족</span>
      </label>
      <label class="checkbox">
        <input
          type="radio"
          name="t1"
          v-model="Content"
          value="기타(자유 서술)"
        />
        <span class="check type2"></span>
        <span class="text">기타(자유 서술)</span>
      </label>
      <div class="textarea-wrap">
        <textarea
          class="textarea"
          placeholder="사유를 입력해주세요"
          rows="3"
          v-model="Content_"
          :disabled="Content != '기타(자유 서술)'"
        ></textarea>
      </div>
    </div>

    <div class="line"></div>

    <div class="input-wrap m-b--60">
      <label class="input-label">비밀번호 입력</label>
      <input type="password" class="input-text" v-model="Password" />
    </div>

    <div class="btn-wrap">
      <button type="button" class="btn btn-full btn-black" @click="sendSec">
        회원탈퇴
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MySecession",
  components: {},
  data() {
    return {
      Content: "",
      Content_: "",
      Password: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    sendSec() {
      this.$apiPOST("/api/mypage/withdrawal", {
        Content:
          this.Content != "기타(자유 서술)" ? this.Content : this.Content_,
        LongContent: this.Content != "기타(자유 서술)" ? false : true,
        Password: this.Password,
      }).then(({ data }) => {
        console.log(data);
        this.$store.commit("updateError", data.message);
        this.$router.push({
          name: "Home",
        });
      });
    },
  },
};
</script>
