<template>
  <div class="content">
    <div class="content-top center">
      <img src="../../public/images/icon/lock.svg" alt="" class="img lock" />
      <h2 class="tit">비밀번호를 변경해주세요!</h2>
      <p class="sub">
        회원님은 3개월 동안<br />
        동일한 비밀번호를 사용하고 계십니다.<br />
        <br />
        소중한 개인정보 보호를 위해<br />
        비밀번호를 주기적으로 변경해주세요.
      </p>
    </div>
    <div class="input-wrap">
      <input type="password" class="input-text" placeholder="현재 비밀번호" />
    </div>
    <div class="input-wrap">
      <input type="password" class="input-text" placeholder="새 비밀번호" />
    </div>
    <div class="input-wrap">
      <input
        type="password"
        class="input-text"
        placeholder="새 비밀번호 확인"
      />
    </div>
    <div class="btn-wrap">
      <button type="button" class="btn btn-full btn-primary">변경하기</button>
    </div>
    <div class="text-center m-b--20">
      <a href="#" class="font-color--grey font-size--14">90일 후 변경하기</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePass",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
