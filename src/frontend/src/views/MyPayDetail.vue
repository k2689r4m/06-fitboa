<template>
  <div>
    <div class="content">
      <div class="content-tit">
        <button type="button" class="btn back" @click="goBack"></button>
        최근 결제 내역
      </div>

      <ul class="pay-list">
        <li class="pay-list--item">
          <div class="top">
            <a @click="goMenu('MyPayCancel')">
              {{ $date(item.PayDateTime).format("YYYY/MM/DD") }}
            </a>
          </div>
          <div class="con">
            <div class="left">
              <p class="tit">{{ item.ProductName }}</p>
              <p class="code">{{ item.MOId }}</p>
            </div>
            <div class="right">
              <p class="price">
                <strong>
                  {{ item.Price | comma }}
                </strong>
                원
              </p>
              <p>
                <template v-if="item.Status == -1"> 해지예약 </template>
                <template v-else-if="item.Status == 0"> 결제 </template>
                <template v-else-if="item.Status == 2"> 취소 </template>
              </p>
            </div>
          </div>
        </li>
      </ul>

      <div class="line full grey m-t--0"></div>

      <div class="content-top">
        <h3 class="sub m-b--20">주문자 정보</h3>
      </div>
      <ul class="text-list p-b--60">
        <li class="text-list--item">
          <span class="left">이름</span>
          <span class="right">{{ item.UserName }}</span>
        </li>
        <li class="text-list--item">
          <span class="left">휴대폰 번호</span>
          <span class="right">{{ item.UserContact }}</span>
        </li>
      </ul>

      <div class="content-top">
        <h3 class="sub m-b--20">결제 금액 정보</h3>
      </div>
      <ul class="text-list p-b--60">
        <li class="text-list--item">
          <span class="left">상품 금액</span>
          <span class="right">{{ item.ProductPrice | comma }}원</span>
        </li>
        <li class="text-list--item">
          <span class="left">할인 금액</span>
          <span class="right font-color--primary" v-if="!item.IsPromotion">
            <span
              class="font-color--grey font-weight--b font-size--10 m-r--10"
              v-if="item.PromotionDiscountType"
            >
              {{ item.PromotionDiscountRate }}% SAVE
            </span>
            0원
          </span>
          <span class="right font-color--primary" v-else>
            <template v-if="item.PromotionDiscountType">
              <span
                class="font-color--grey font-weight--b font-size--10 m-r--10"
              >
                {{ item.PromotionDiscountRate }}% SAVE
              </span>
              {{ item.ProductPrice * (item.PromotionDiscountRate / 100) }}원
            </template>
            <template v-else> {{ item.PromotionDiscountRate }}원 </template>
          </span>
        </li>
        <li class="text-list--item">
          <span class="left">결제 금액</span>
          <span class="right">{{ item.Price | comma }}원</span>
        </li>
      </ul>
    </div>
    <button
      v-if="item.Status == 0"
      type="button"
      class="btn bottom-fix btn-d-grey"
      @click="goMenu('MyPayCancel')"
    >
      결제 취소
    </button>
    <!-- <button type="button" class="btn bottom-fix btn-d-grey" @click="payCancel">
      결제 취소
    </button> -->
    <!-- <div class="popup" v-bind:class="{ active: popupState }">
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
            <p class="sub type2">
              이번달에 유료 콘텐츠 {{ viewCount }} 건을 구독하셨기 때문에<br />
              이번달 결제건 환불이 불가능 합니다.<br />
              단, 다음달 결제건부터 결제가 진행되지 않도록<br />
              서비스 결제 해지 예약이 가능합니다.<br />
              결제 해지 예약을 하시겠습니까?<br />
              문의사항이 있으신 경우 고객센터를 통해<br />
              문의 부탁 드립니다<br />
            </p>
          </div>
        </div>
        <button type="button" class="btn close" @click="popupState = false">
          [취소]
        </button>
        <button type="button" class="btn close">[결제 취소 예약]</button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "MyPayDetail",
  components: {},
  data() {
    return {
      item: {
        PayDateTime: "",
        ProductName: "",
        Price: "",
        ProductNo: "",
        UserName: "",
        UserContact: "",
        Status: 0,
        ProductPrice: 0,
        PromotionDiscountPrice: 0,
        PromotionDiscountRate: 0,
        PromotionDiscountType: 0,
        IsPromotion: 0,
        Type: 0,
      },
      popupState: false,
    };
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  created() {
    this.getItem();
  },
  methods: {
    getItem() {
      this.$apiGET(
        "/api/pay/breakdown/detail?merchantId=" + this.$route.query.id
      ).then(({ data }) => {
        this.item = data;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
        query: { id: this.$route.query.id },
      });
    },
  },
};
</script>
