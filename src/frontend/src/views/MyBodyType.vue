<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      체형 정보
    </div>

    <div class="content-top m-t--30 m-b--30">
      <p class="guide text-center">
        신체 사이즈 정보를 입력해주시면<br />
        유아더가 회원님의 체형을 알려드립니다.
      </p>
    </div>
    <div class="bt-select">
      <a @click="goMenu('MyBodySelect')">
        <div class="img-wrap">
          <img src="../../public/images/type_select.svg" alt="" />
        </div>
        <div class="text-wrap">
          <strong class="tit">체형 선택 (필수)</strong>
          <div class="bottom">
            줄자 체형 측정이 어려우시다면<br /><strong
              >본인의 체형을 직접 선택</strong
            >해 주세요.<br />
            체형 맞춤 콘텐츠가 제공 됩니다.
          </div>
        </div>
      </a>
    </div>
    <div class="bt-select">
      <a @click="goMenu('MyBodySize')">
        <div class="img-wrap">
          <img src="../../public/images/type_insert.svg" alt="" />
        </div>
        <div class="text-wrap">
          <strong class="tit">사이즈 입력 (권장)</strong>
          <div class="bottom">
            <strong
              >배송받으신 줄자를 활용하여<br />사이즈를 측정해 입력</strong
            >
            해주시면,<br />스타일링 추천에 도움을 드릴 수 있습니다.
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyBodyType",
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
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
