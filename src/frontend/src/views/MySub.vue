<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      유아더 구독 신청
    </div>
    <div class="content-top center">
      <h2 class="tit">유아더 구독 신청</h2>
      <p class="sub text-left">
        스타일은 살리고 싶지만, 옷을 고르는 데 시간을 투자하긴 힘든 당신에게
        <strong class="font-weight--b">
          유아더는 당신의 체형에 딱 맞는 핏과 패션 트렌드를 추천해 드립니다.
        </strong>
      </p>
    </div>

    <div class="content-top">
      <h2 class="tit">원하는 결제 유형을 선택해주세요</h2>
    </div>
    <div class="box-check">
      <label class="checkbox">
        <input
          type="radio"
          name="box"
          value="M2"
          v-model="userData.period"
          @click="selectType('M2')"
        />
        <p class="text">
          월간 정기결제
          <span class="right">
            ₩ {{ products.MonthlyPrice | comma }} <span>/매월</span>
          </span>
        </p>
      </label>
      <label class="checkbox">
        <input
          type="radio"
          name="box"
          value="Y2"
          v-model="userData.period"
          @click="selectType('Y2')"
        />
        <p class="text">
          연간 정기결제
          <span class="right">
            <span class="cancle">
              ₩ {{ (products.MonthlyPrice * 12) | comma }}
            </span>
            ₩
            {{
              (products.MonthlyPrice * 12 -
                products.MonthlyPrice *
                  12 *
                  (products.YearlyDiscountRate * 0.01))
                | comma
            }}
            <span>/1년</span>
          </span>
        </p>
      </label>
    </div>

    <div class="line"></div>

    <ul class="check-list p-b--40">
      <li
        class="check-list--item"
        v-for="(item, idx) in products.DesList"
        :key="'de_li_' + idx"
      >
        <strong class="font-weight--b">
          {{ item }}
        </strong>
      </li>
    </ul>

    <div class="content-top">
      <h2 class="tit">서비스 결제하기</h2>
      <h3 class="sub m-b--20">프로모션 코드</h3>
    </div>
    <div class="input-wrap btn-exist type3 m-b--5">
      <input
        type="text"
        class="input-text"
        v-model="finalInfo.Prmotions.PromotionCode"
      />
      <button type="button" class="btn input-btn" @click="upProList">
        보유코드
      </button>
    </div>
    <div class="input-wrap m-t--0">
      <label class="input-label"></label>
      <label class="checkbox">
        <input type="checkbox" v-model="checkUse" id="useCheck" />
        <span class="check"></span>
        <span class="text font-size--12"
          >전자상거래법 제9조 제2항. 주문 상품 정보에 동의 (필수)</span
        >
      </label>
    </div>

    <div class="content-top">
      <h2 class="tit"></h2>
      <h3 class="sub m-b--20">결제 금액 정보</h3>
    </div>
    <ul class="text-list p-b--40">
      <li class="text-list--item">
        <span class="left">상품 금액</span>
        <span class="right">{{ finalInfo.Price | comma }}원</span>
      </li>
      <template v-if="finalInfo.Prmotions.PromotionDiscountType == '%'">
        <li class="text-list--item">
          <span class="left">할인 금액</span>
          <span class="right font-color--primary">
            <span class="font-color--grey font-weight--b font-size--10 m-r--10">
              {{ finalInfo.Prmotions.DiscountRate }}% SAVE
            </span>
            -
            {{
              (finalInfo.Price * finalInfo.Prmotions.DiscountRate * 0.01)
                | comma
            }}원
          </span>
        </li>
        <li class="text-list--item">
          <span class="left">결제 금액</span>
          <span class="right">
            {{
              (finalInfo.Price -
                finalInfo.Price * finalInfo.Prmotions.DiscountRate * 0.01)
                | comma
            }}원
          </span>
        </li>
      </template>
      <template v-else>
        <li class="text-list--item">
          <span class="left">할인 금액</span>
          <span class="right font-color--primary">
            -
            {{ finalInfo.Prmotions.PromotionDiscount | comma }}원
          </span>
        </li>
        <li class="text-list--item">
          <span class="left">결제 금액</span>
          <span class="right">
            {{
              (finalInfo.Price - finalInfo.Prmotions.PromotionDiscount) | comma
            }}원
          </span>
        </li>
      </template>
    </ul>

    <div class="btn-wrap">
      <!-- <button type="button" class="btn btn-full btn-primary">
        fitboa 구독하기
      </button> -->
      <form
        id="app"
        @submit="checkForm"
        action="https://inilite.inicis.com/inibill/inibill_card.jsp"
        target="_self"
        method="post"
      >
        <!-- 상점아이디 -->
        <input type="hidden" name="mid" v-model="userData.mid" />
        <!-- 인증구분 ["D" 고정] -->
        <input type="hidden" name="authtype" v-model="userData.authtype" />
        <!-- 주문번호 -->
        <input type="hidden" name="orderid" v-model="userData.orderid" />
        <!-- 거래금액 -->
        <input type="hidden" name="price" v-model="userData.price" />
        <!-- 상품명 -->
        <input type="hidden" name="goodname" v-model="userData.goodname" />
        <!-- 구매자명 -->
        <input type="hidden" name="buyername" v-model="userData.buyername" />

        <!-- 구매자 이메일주소 is null -->
        <!-- <input type="text" name="buyeremail" v-model="userData.buyeremail" /> -->
        <!-- 구매자 휴대폰번호 is null -->
        <!-- <input type="text" name="buyertel" v-model="userData.buyertel" /> -->

        <!-- 결과수신URL -->
        <input type="hidden" name="returnurl" v-model="userData.returnurl" />
        <!-- 전문생성시간 [YYYYMMDDhhmmss] -->
        <input type="hidden" name="timestamp" v-model="userData.timestamp" />
        <!-- 제공기간 ["Y2":년단위결제, "M2":월단위결제, "YYYYMMDDYYYYMMDD":시작일종료일] -->
        <input type="hidden" name="period" v-model="userData.period" />
        <!-- 전문위변조 HASH  -->
        <input type="hidden" name="hashdata" v-model="userData.hashdata" />

        <button type="submit" class="btn btn-full btn-primary" value="Submit">
          유아더 구독하기
        </button>
      </form>
    </div>
    <div class="popup" id="promotion" v-bind:class="{ active2: promotion }">
      <div class="popup-dim" @click="promotion = false"></div>
      <div class="popup-wrap">
        <div class="popup-tit type2">
          <h3 class="tit">프로모션 코드</h3>
          <button
            type="button"
            class="btn close"
            @click="promotion = false"
          ></button>
        </div>
        <div class="popup-con">
          <button type="button" class="btn btn-underline" @click="upAddPro">
            + 신규 코드 등록
          </button>
          <table class="card-table m-t--20 m-b--20">
            <colgroup>
              <col width="30%" />
              <col width="30%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th>일자</th>
                <th>내역</th>
                <th>할인</th>
                <th></th>
              </tr>

              <template v-if="prmotions.length > 0">
                <tr v-for="item in prmotions" :key="item.PromotionId + 'pro'">
                  <td>
                    {{ $date(item.PromotionDate).format("YYYY.MM.DD") }}
                  </td>
                  <td>{{ item.PromotionName }}</td>
                  <td v-if="item.PromotionDiscountType == '%'">
                    {{ item.PromotionDiscount }}%
                  </td>
                  <td v-else>
                    {{ item.PromotionDiscount | comma }}
                  </td>
                  <td class="text-right">
                    <button
                      type="button"
                      class="btn btn-sm btn-black"
                      @click="checkPrmo(item), (promotion = false)"
                    >
                      적용
                    </button>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="4" class="no">
                    보유중인 프로모션 코드가 없습니다.
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="popup"
        id="promotionRegister"
        v-bind:class="{ active: promotionRegister }"
      >
        <div class="popup-dim" @click="promotionRegister = false"></div>
        <div class="popup-wrap">
          <div class="popup-tit">
            <button
              type="button"
              class="btn close"
              @click="promotionRegister = false"
            ></button>
          </div>
          <div class="popup-con">
            <div class="content-top center">
              <h2 class="tit">프로모션 코드 등록</h2>
            </div>
            <div class="input-wrap m-b--60">
              <input
                type="text"
                class="input-text text-center"
                placeholder="프로모션 코드를 입력해 주세요."
                v-model="proCode"
                @paste="pasteFun"
                maxlength="19"
              />
            </div>
            <div class="btn-wrap type2">
              <button
                type="button"
                class="btn btn-full btn-primary sm"
                @click="addPro"
              >
                코드 등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MySub",
  components: {},
  data() {
    return {
      userData: {
        mid: "INIBillTst", //*   streamin01
        authtype: "D",
        orderid: "", //*
        price: "1000",
        goodname: "test01",
        buyername: "testName",
        buyeremail: "testName@test.com",
        buyertel: "010-0000-0000",
        returnurl: "https://youarethe.co.kr/api/pay/inicis",
        closeurl: "https://youarethe.co.kr/mypage/sub",
        timestamp: "", //*
        period: "M2", //["Y2":년단위결제, "M2":월단위결제, "YYYYMMDDYYYYMMDD":시작일종료일]
        hashdata: "",
      },
      liteKey: "b09LVzhuTGZVaEY1WmJoQnZzdXpRdz09", //"4Kxq4jZEtd5tsaaf"
      prmotions: [],
      products: {
        Description: "",
        DesList: [],
        Name: "",
        No: "",
        MonthlyPrice: 0,
        Price: 0,
        YearlyDiscountRate: 0,
      },
      finalInfo: {
        Price: 0,
        Prmotions: { DiscountRate: 0, PromotionDiscountType: "%" },
      },
      isPrmotion: null,
      promotion: false,
      promotionRegister: false,
      proCode: "",
      checkUse: false,
    };
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
    proCode: function (value, old) {
      if (value.length > old.length) {
        value = value.toUpperCase();
        value = value
          .replace(/-/g, "")
          .replace(/^(\w{0,4})(\w{0,4})(\w{0,4})(\w{0,4})$/g, "$1-$2-$3-$4")
          .replace(/(-{1,2})$/g, "");

        this.proCode = value;
      }
    },
  },
  created() {
    this.getPro();
    this.checkMsg();
  },
  mounted() {
    document.getElementById("useCheck").checked = false;
  },
  methods: {
    checkMsg() {
      // this.$route.query.id
      if ("message" in this.$route.query && this.$route.query.message != "") {
        this.$store.commit("updateError", this.$route.query.message);
        delete this.$route.query.message;
        history.replaceState({}, null, location.pathname);
      }
    },
    selectType(st) {
      this.finalInfo.Prmotions = {
        DiscountRate: 0,
        PromotionDiscountType: "%",
      };
      this.isPrmotion = null;
      if (st == "M2") {
        this.finalInfo.Price = this.products.MonthlyPrice;
      } else if (st == "Y2") {
        this.finalInfo.Price =
          this.products.MonthlyPrice * 12 -
          this.products.MonthlyPrice *
            12 *
            (this.products.YearlyDiscountRate * 0.01);
      }
    },
    checkPrmo(val) {
      this.isPrmotion = val;
      if (this.isPrmotion != null) {
        if (
          this.isPrmotion.PromotionIsMonthly &&
          this.isPrmotion.PromotionIsYearly
        ) {
          this.finalInfo.Prmotions = this.isPrmotion;

          this.finalInfo.Prmotions.DiscountRate =
            this.isPrmotion.PromotionDiscount;
        } else if (this.userData.period == "M2") {
          if (this.isPrmotion.PromotionIsMonthly) {
            this.finalInfo.Prmotions = this.isPrmotion;

            this.finalInfo.Prmotions.DiscountRate =
              this.isPrmotion.PromotionDiscount;
          } else {
            this.$store.commit(
              "updateError",
              "해당 프로모션은 월간 결제유형이 아닙니다."
            );
          }
        } else if (this.userData.period == "Y2") {
          if (this.isPrmotion.PromotionIsYearly) {
            this.finalInfo.Prmotions = this.isPrmotion;

            this.finalInfo.Prmotions.DiscountRate =
              this.isPrmotion.PromotionDiscount;
          } else {
            this.$store.commit(
              "updateError",
              "해당 프로모션은 연간 결제유형이 아닙니다."
            );
          }
        }
      } else {
        this.finalInfo.Prmotions = {
          DiscountRate: 0,
          PromotionDiscountType: "%",
        };
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    getPro() {
      this.$apiGET("/api/pay/products").then(({ data }) => {
        this.products = data;
        this.products.DesList = this.products.Description.split("\n");
        this.selectType("M2");
      });
    },
    checkForm(e) {
      if (!this.checkUse) {
        // this.$store.commit("updateUser", "zxzxzx");
        e.preventDefault();
        this.$store.commit(
          "updateError",
          "주문 상품 정보 동의를 확인해주세요."
        );
        return false;
      }

      var sha256 = require("js-sha256");

      this.userData.timestamp = new Date().getTime();

      if ("PromotionId" in this.finalInfo.Prmotions) {
        this.userData.orderid =
          this.userData.period[0] +
          this.products.Id +
          "-" +
          this.$store.state.user.Id +
          "-" +
          this.finalInfo.Prmotions.PromotionId +
          "-" +
          this.userData.timestamp;
      } else {
        this.userData.orderid =
          this.userData.period[0] +
          this.products.Id +
          "-" +
          this.$store.state.user.Id +
          "-" +
          this.userData.timestamp;
      }

      this.userData.hashdata = sha256(
        this.userData.mid +
          this.userData.orderid +
          this.userData.timestamp +
          this.liteKey
      );

      if (this.finalInfo.Prmotions.PromotionDiscountType == "%") {
        this.userData.price =
          this.finalInfo.Price -
          this.finalInfo.Price * this.finalInfo.Prmotions.DiscountRate * 0.01;
      } else {
        this.userData.price =
          this.finalInfo.Price - this.finalInfo.Prmotions.PromotionDiscount;
      }

      this.userData.goodname = this.products.Name;
      // e.preventDefault();
      return true;
    },
    addPro() {
      this.$apiPOST("/api/add/promotions", {
        PromotionCode: this.proCode,
      }).then(({ data }) => {
        this.$store.commit("updateError", data.message);

        this.$apiGET("/api/pay/promotions").then(({ data }) => {
          this.promotionRegister = false;
          this.prmotions = data;
        });
      });
    },
    upProList() {
      this.getProCode();
    },
    upAddPro() {
      this.proCode = "";
      this.promotionRegister = true;
    },
    pasteFun(event) {
      let temp = event.clipboardData.getData("text");

      temp = temp
        .replace(/-/g, "")
        .replace(/^(\w{0,4})(\w{0,4})(\w{0,4})(\w{0,4})$/g, "$1-$2-$3-$4")
        .replace(/(-{1,2})$/g, "");

      this.proCode = temp;
    },
    getProCode() {
      this.$apiGET("/api/pay/promotions").then(({ data }) => {
        this.prmotions = data;
        this.promotion = true;
      });
    },
  },
};
</script>
