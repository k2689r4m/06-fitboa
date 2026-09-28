<template>
  <div class="content bg-grey">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      멤버십 구독 및 해지
    </div>
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

      <!-- 결과수신URL -->
      <input type="hidden" name="returnurl" v-model="userData.returnurl" />
      <!-- 전문생성시간 [YYYYMMDDhhmmss] -->
      <input type="hidden" name="timestamp" v-model="userData.timestamp" />
      <!-- 제공기간 ["Y2":년단위결제, "M2":월단위결제, "YYYYMMDDYYYYMMDD":시작일종료일] -->
      <input type="hidden" name="period" v-model="userData.period" />
      <!-- 전문위변조 HASH  -->
      <input type="hidden" name="hashdata" v-model="userData.hashdata" />

      <button type="submit" class="btn btn-block" value="Submit">
        <strong>결제 카드 변경</strong>
        <p>정기결제 카드 변경이 필요하신가요?</p>
      </button>
    </form>
    <!-- <button type="button" class="btn btn-block">
      <strong>결제 카드 변경</strong>
      <p>정기결제 카드 변경이 필요하신가요?</p>
    </button> -->
    <div class="line-box sm"></div>
    <button type="button" class="btn btn-block" @click="btnCancel">
      <strong>구독 해지 예약</strong>
      <p>구독 해지 예정이신가요?</p>
    </button>
  </div>
</template>

<script>
export default {
  name: "MySub2",
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
        returnurl: "https://youarethe.co.kr/api/pay/cards/change",
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
        Prmotions: { DiscountRate: 0 },
      },
      isPrmotion: null,
      promotion: false,
      promotionRegister: false,
    };
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  created() {
    this.getPro();
    this.checkMsg();
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
      this.finalInfo.Prmotions = { DiscountRate: 0 };
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
    goBack() {
      this.$router.go(-1);
    },
    getPro() {
      this.$apiGET("/api/pay/myproduct").then(({ data }) => {
        console.log(data);

        this.products.Id = data.ProductId;
        this.products.MonthlyPrice = data.ProductMonthlyPrice;
        this.products.YearlyDiscountRate = data.ProductYearlyDiscountRate;

        if (data.Type == 0) {
          this.userData.period = "M2";
        } else {
          this.userData.period = "Y2";
        }
        this.selectType(this.userData.period);
      });
    },
    checkForm() {
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

      this.userData.price =
        this.finalInfo.Price -
        this.finalInfo.Price * this.finalInfo.Prmotions.DiscountRate * 0.01;

      this.userData.goodname = this.products.Name;
      // e.preventDefault();
      return true;
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
    btnCancel() {
      this.$apiPOST("/api/pay/reservation").then(({ data }) => {
        this.$store.commit("updateError", data.message);
      });
    },
  },
};
</script>
