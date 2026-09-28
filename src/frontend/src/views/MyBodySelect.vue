<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      체형 선택
    </div>

    <div class="content-top m-t--30 m-b--30">
      <p class="guide text-center">5가지 체형 중 본인의 체형을 선택해주세요!</p>
    </div>

    <ul class="bt-slide">
      <VueSlickCarousel v-bind="settings" @afterChange="afterChange">
        <li class="bt-slide--item">
          <img src="../../public/images/body_typeA.png" alt="" />
          <strong>A자형 체형</strong>
          <p>
            어깨와 가슴 너비보다<br />
            허벅지가 발달한 체형
          </p>
        </li>
        <li class="bt-slide--item">
          <img src="../../public/images/body_typeI.png" alt="" />
          <strong>I자형 체형</strong>
          <p>
            마른 몸매에 어깨와 다리 간격이<br />
            일자로 떨어지는 체형
          </p>
        </li>
        <li class="bt-slide--item">
          <img src="../../public/images/body_typeO.png" alt="" />
          <strong>O자형 체형</strong>
          <p>
            가슴 너비와 배 둘레가<br />
            허벅지 보다 넓은 체형
          </p>
        </li>
        <li class="bt-slide--item">
          <img src="../../public/images/body_typeV.png" alt="" />
          <strong>V자형 체형</strong>
          <p>
            허벅지나 종아리 두께보다<br />
            어깨가 훨씬 넓은 체형
          </p>
        </li>
      </VueSlickCarousel>
    </ul>

    <div class="btn-wrap">
      <button
        type="button"
        class="btn btn-full btn-primary"
        @click="sendBodyType"
      >
        사이즈 저장
      </button>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

export default {
  name: "MyBodySelect",
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        arrows: true,
        dots: false,
        // edgeFriction: 0.35,
        // infinite: false,
        // speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1,
      },
      bodyType: 1,
    };
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
    afterChange(e) {
      this.bodyType = e + 1;
    },
    sendBodyType() {
      this.$apiPOST("/api/set/selectbody", { BodyType: this.bodyType }).then(
        () => {
          alert(
            "체형을 선택해 주셔서 감사합니다.\n이제 고객님의 체형 맞춤 콘텐츠를 제공드리겠습니다!"
          );
          this.$router.push({
            name: "Home",
          });
        }
      );
    },
  },
};
</script>
