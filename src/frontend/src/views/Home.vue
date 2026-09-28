<template>
  <div class="content">
    <!-- 메인 이미지  -->
    <ul class="main-banner" id="mainSlider">
      <VueSlickCarousel v-bind="settings">
        <li class="main-banner--item" @click="goNewPage('https://naver.com')">
          <div class="img-wrap">
            <img src="../../public/images/b1.jpg" alt="" />
          </div>
        </li>
        <li
          class="main-banner--item"
          @click="goNewPage('https://www.youtube.com')"
        >
          <div class="img-wrap">
            <img src="../../public/images/b2.jpg" alt="" />
          </div>
        </li>
      </VueSlickCarousel>
    </ul>

    <div class="content-top">
      <h2 class="tit">최근 콘텐츠</h2>
      <div class="right">
        맞춤 체형 보기
        <!-- this.$store.state.isSub -->
        <label class="input-switch sm">
          <input
            type="checkbox"
            v-model="isCustom"
            true-value="true"
            false-value="false"
            @change="changeCustom"
          />
          <span></span>
        </label>
      </div>
    </div>

    <!-- 목록 리스트 -->
    <ul class="thumbnail-list">
      <li
        class="thumbnail-list--item"
        @click="goDetail(item.Id)"
        v-for="item in itemList"
        :key="'home_list_' + item.Id"
      >
        <div class="img-wrap">
          <img alt="" :src="'api/story/content/image/' + item.Image" />
        </div>
        <div class="tit">
          {{ item.Title }}
        </div>
        <div class="sub">{{ item.Author }}</div>
      </li>
    </ul>

    <!--     
    <ul class="thumbnail-list">
      <ContentList
        :item="item"
        v-for="(item, index) in list"
        :key="'home_content_list_' + index"
      >
      </ContentList>
    </ul>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->

    <div class="popup" id="sub" v-bind:class="{ active: popupState }">
      <div class="popup-dim" @click="popupState = false"></div>
      <div class="popup-wrap">
        <div class="popup-tit">
          <button
            type="button"
            class="btn close"
            @click="popupState = false"
          ></button>
        </div>
        <div class="popup-con">
          <div class="content-top center">
            <h2 class="tit">구독해 주신 회원님께 드리는 선물!</h2>
            <p class="sub">
              신체 사이즈를 입력하시면<br />
              체형을 알려드리고 있습니다.<br />
              줄자를 배송받으실 주소를 입력해 주세요.
            </p>
          </div>
          <div class="input-wrap sm">
            <label class="input-label">수령자</label>
            <input type="text" class="input-text" v-model="user.Name" />
          </div>
          <div class="input-wrap sm">
            <label class="input-label">연락처</label>
            <input type="number" class="input-text sm" v-model="con1" />
            <span class="dash">-</span>
            <input type="number" class="input-text sm" v-model="con2" />
            <span class="dash">-</span>
            <input type="number" class="input-text sm" v-model="con3" />
          </div>
          <div class="input-wrap sm btn-exist">
            <label class="input-label">주소</label>
            <input type="text" class="input-text" v-model="Address" disabled />
            <button
              type="button"
              class="btn input-btn type2"
              @click="execDaumPostcode"
            >
              검색
            </button>
            <label class="input-label"></label>
            <input
              type="text"
              class="input-text m-t--5"
              v-model="user.ExtraAddress"
            />
          </div>
          <div class="btn-wrap">
            <button
              type="button"
              class="btn btn-full btn-primary"
              @click="sendAddress"
            >
              줄자배송 신청
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="popup" id="sub2" v-bind:class="{ active: popupState2 }">
      <div class="popup-dim" @click="popupState2 = false"></div>
      <div class="popup-wrap">
        <div class="popup-tit">
          <button
            type="button"
            class="btn close"
            @click="popupState2 = false"
          ></button>
        </div>
        <div class="popup-con">
          <div class="content-top center">
            <h2 class="tit">멤버십을 구독하시면,</h2>
            <p class="sub">
              매달 회원님의 체형 맞춤 콘텐츠를<br />
              확인하실 수 있습니다.<br />
              <br />
              정기구독 후<br />
              맞춤 스타일을 추천 받으시겠어요?
            </p>
          </div>
          <div class="btn-wrap m-b--0">
            <button
              type="button"
              class="btn btn-full btn-primary"
              @click="goSub"
            >
              추천해주세요
            </button>
            <button
              type="button"
              class="btn btn-full font-color--grey"
              @click="popupState2 = false"
            >
              괜찮아요
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="popup" id="sub3" v-bind:class="{ active: popupState3 }">
      <div class="popup-dim" @click="popupState3 = false"></div>
      <div class="popup-wrap">
        <div class="popup-tit">
          <button
            type="button"
            class="btn close"
            @click="popupState3 = false"
          ></button>
        </div>
        <div class="popup-con">
          <div class="content-top center">
            <h2 class="tit">1:1 스타일링 후기 요청</h2>
            <p class="sub">
              2021.03.06 에 진행하신<br />
              1:1 스타일링은 만족스러우셨나요?<br />
              다른 분들을 위해 후기 작성을<br />부탁드립니다.
            </p>
          </div>
          <div class="btn-wrap type2 m-b--0">
            <button
              type="button"
              class="btn btn-full btn-primary"
              @click="goMenu('MyStylingReview')"
            >
              후기 작성
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="popup" id="sub4" v-bind:class="{ active: popupState4 }">
      <div class="popup-dim" @click="popupState4 = false"></div>
      <div class="popup-wrap">
        <div class="popup-tit">
          <button
            type="button"
            class="btn close"
            @click="popupState4 = false"
          ></button>
        </div>
        <div class="popup-con">
          <div class="content-top center">
            <h2 class="tit">회원님!</h2>
            <p class="sub">
              체형 등록 부탁드립니다.<br />
              마이페이지에서 등록하실 수 있어요!<br />
            </p>
          </div>
          <div class="btn-wrap m-b--0">
            <button
              type="button"
              class="btn btn-full btn-primary"
              @click="goMenu('MyBodyType')"
            >
              체형 등록
            </button>
            <button
              type="button"
              class="btn btn-full font-color--grey"
              @click="popupState4 = false"
            >
              괜찮아요
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ContentList from "@/components/home/ContentList.vue";
// import axios from "axios";
// import InfiniteLoading from "vue-infinite-loading";
import VueSlickCarousel from "vue-slick-carousel";
// const api = "//hn.algolia.com/api/v1/search_by_date?tags=story";

export default {
  name: "Home",
  components: {
    // ContentList,
    // InfiniteLoading,
    VueSlickCarousel,
  },
  data() {
    return {
      // page: 1,
      // list: [],
      isCustom: "false",
      itemList: [],
      settings: {
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2500,
        // edgeFriction: 0.35,
        // infinite: false,
        // speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1,
      },
      popupState: this.$store.state.isSub,
      user: {
        Name: "",
        Contact: "",
        RoadAddress: "",
        JibunAddress: "",
        ExtraAddress: "",
        PostCode: "",
        AddressType: "1",
      },
      Address: "", //주소
      con1: null,
      con2: null,
      con3: null,
      popupState2: false,
      popupState3: this.$store.state.isReview,
      popupState4: false,
    };
  },
  created() {
    this.getItem();
  },
  methods: {
    goNewPage(page) {
      window.open(page);
    },
    changeCustom() {
      this.$apiGET("/api/check/custom").then(({ data }) => {
        if (data.NeedReg && data.NeedSub && data.NeedBodyType) {
          // alert("로그인 필요");
          this.isCustom = "false";
          this.popupState2 = true;
        } else if (!data.NeedReg && data.NeedSub && data.NeedBodyType) {
          // alert("구독 필요");
          this.isCustom = "false";
          this.popupState2 = true;
        } else if (!data.NeedReg && !data.NeedSub && data.NeedBodyType) {
          // alert("채형등록 필요");
          this.isCustom = "false";
          this.popupState4 = true;
        } else {
          this.getItem();
        }
      });
    },
    getItem() {
      this.$apiGET("/api/home/contents?isCustom=" + this.isCustom).then(
        ({ data }) => {
          this.itemList = data;
        }
      );
    },
    goDetail(id) {
      this.$router.push({
        name: "Detail",
        query: { contentId: id },
      });
    },
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          console.log("--------------------");
          console.log(data);
          console.log("--------------------");
          if (this.user.ExtraAddress !== "") {
            this.user.ExtraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.Address = data.roadAddress;
            this.user.AddressType = "도로명";
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.Address = data.jibunAddress;
            this.user.AddressType = "지번";
          }
          this.user.RoadAddress = data.roadAddress;
          this.user.JibunAddress = data.jibunAddress;

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.user.ExtraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.user.ExtraAddress +=
                this.user.ExtraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.user.ExtraAddress !== "") {
              this.user.ExtraAddress = `(${this.user.ExtraAddress})`;
            }
          } else {
            this.user.ExtraAddress = "";
          }
          // 우편번호를 입력한다.
          this.user.PostCode = data.zonecode;
        },
      }).open();
    },
    sendAddress() {
      this.user.Contact = this.con1 + "-" + this.con2 + "-" + this.con3;
      this.$apiPOST("/api/set/bodytype/deliver", this.user).then(() => {
        this.popupState = false;
      });
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
    goSub() {
      if (this.$cookies.get("FL") != null) {
        this.goMenu("MySub");
      } else {
        this.goMenu("Join");
      }
    },
  },
};
</script>
