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
            <a>{{ $date(item.PayDateTime).format("YYYY/MM/DD") }}</a>
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
        <h3 class="sub m-b--20">취소 사유</h3>
      </div>
      <div class="checkbox-list m-b--60">
        <label class="checkbox">
          <input
            type="radio"
            v-model="item.CancelType"
            value="콘텐츠 부족"
            :disabled="item.Status != 0"
          />
          <span class="check type2"></span>
          <span class="text">콘텐츠 부족</span>
        </label>
        <label class="checkbox">
          <input
            type="radio"
            v-model="item.CancelType"
            value="체형에 안맞아요"
            :disabled="item.Status != 0"
          />
          <span class="check type2"></span>
          <span class="text">체형에 안맞아요</span>
        </label>
        <label class="checkbox">
          <input
            type="radio"
            v-model="item.CancelType"
            value="서비스 불만족"
            :disabled="item.Status != 0"
          />
          <span class="check type2"></span>
          <span class="text">서비스 불만족</span>
        </label>
        <label class="checkbox">
          <input
            type="radio"
            v-model="item.CancelType"
            value="기타 사유"
            :disabled="item.Status != 0"
          />
          <span class="check type2"></span>
          <span class="text">기타 사유</span>
        </label>
        <div class="textarea-wrap">
          <textarea
            class="textarea"
            placeholder="사유를 입력해주세요"
            rows="3"
            v-model="item.CancelDetail"
            :disabled="item.CancelType != '기타 사유' || item.Status != 0"
          ></textarea>
        </div>
      </div>

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
      @click="payCancel"
    >
      결제 취소
    </button>
    <button
      v-else-if="item.Status == -1"
      type="button"
      class="btn bottom-fix btn-d-grey"
      @click="payCancelCancel"
    >
      해지 예약 철회
    </button>
    <div class="popup" v-bind:class="{ active: popupState }">
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
        <button type="button" class="btn close" @click="payRealCancel(2)">
          [결제 취소 예약]
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPayCancel",
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
        CancelType: "",
        CancelDetail: "",
        ProductPrice: 0,
        PromotionDiscountPrice: 0,
        PromotionDiscountRate: 0,
        PromotionDiscountType: 0,
        IsPromotion: 0,
        Type: 0,
      },
      viewCount: null,
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
    payCancelCancel() {
      this.$apiPOST("/api/pay/cancel/cancel", {
        MerchantId: this.$route.query.id,
      }).then(({ data }) => {
        console.log(data);
        this.$router.go(-1);
        this.$store.commit(
          "updateError",
          "해지 예약이 철회 되었습니다.\n감사합니다 고객님!"
        );
      });
    },
    payCancel() {
      this.$apiPOST("/api/pay/cancel", {
        MerchantId: this.$route.query.id,
      }).then(({ data }) => {
        this.viewCount = data.ReadCount;
        if (data.Is7Days == 1 && data.ReadCount == 0) {
          console.log("즉시환불 가능");
          this.payRealCancel(1);
        } else {
          this.popupState = true;
          console.log("즉시환불 불가능");
        }
      });
    },
    payRealCancel(st) {
      this.popupState = false;
      this.$apiPOST("/api/pay/cancel/detail", {
        MerchantId: this.$route.query.id,
        CancelType: this.item.CancelType,
        CancelDetail: this.item.CancelDetail,
      }).then(({ data }) => {
        console.log(data);
        this.$router.go(-1);

        if (st == 1) {
          this.$store.commit(
            "updateError",
            "결제 취소가 완료 되었습니다.\n고객님께 더욱 더 좋은 콘텐츠로 찾아올 수 있도록\n노력하겠습니다."
          );
        } else {
          this.$store.commit(
            "updateError",
            "서비스 해지 예약이 완료 되었습니다."
          );
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
  },
};
</script>
