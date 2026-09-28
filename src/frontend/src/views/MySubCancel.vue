<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      구독 해지
    </div>
    <ul class="text-list m-t--20">
      <li class="text-list--item">
        <span class="left">이용기간</span>
        <span class="right">
          {{ $date(info.SubExp).format("YYYY.MM.DD") }} 까지
        </span>
      </li>
      <li class="text-list--item">
        <span class="left">다음 결제일</span>
        <span class="right">{{
          $date(info.NextPay).format("YYYY.MM.DD")
        }}</span>
      </li>
      <li class="text-list--item">
        <span class="left">결제상품</span>
        <span class="right">
          {{ info.PayType == 0 ? "월간 결제" : "연간 결제" }}
        </span>
      </li>
      <li class="text-list--item">
        <span class="left">결제금액</span>
        <span class="right">{{ info.PayPrice | comma }} 원</span>
      </li>
      <li class="text-list--item bottom-line">
        <span class="left">결제수단</span>
        <span class="right">{{ info.CardInfo }}</span>
      </li>
    </ul>
    <div class="btn-wrap m-t--40">
      <button
        type="button"
        class="btn btn-full btn-black"
        @click="goMenu('MyPayCancel', info.MerchantId)"
      >
        구독 해지 예약
      </button>
    </div>
    <div class="text-center font-color--grey font-size--14 text-height--15">
      지금 해지 예약하셔도<br />{{
        $date(info.SubExp).format("YYYY.MM.DD")
      }}까지 이용하실 수 있습니다.
    </div>
  </div>
</template>

<script>
export default {
  name: "MySubCancel",
  components: {},
  data() {
    return {
      info: {
        CardInfo: "",
        IsNextPay: 0,
        NextPay: "2000-01-01",
        PayPrice: "",
        PayType: 0,
        ProductName: "",
        SubExp: "2000-01-01",
        MerchantId: 0,
      },
    };
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  created() {
    this.getInfo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getInfo() {
      this.$apiGET("/api/mypage/unsub/info").then(({ data }) => {
        this.info = data;
      });
    },
    goMenu(dest, id) {
      this.$router.push({
        name: dest,
        query: { id: id, st: true },
      });
    },
  },
};
</script>
