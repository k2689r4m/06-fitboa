<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      1:1 문의
    </div>

    <div class="inquiry-top">
      <div class="text">
        유아더 서비스를 이용하면서 불편한 사항이나<br />
        개선의견이 있다면 문의해주세요.
      </div>
      <button
        type="button"
        class="btn btn-line"
        @click="goMenu('MyInquiryWrite')"
      >
        1:1 문의 등록
      </button>
    </div>

    <ul class="accordion-list">
      <li
        class="accordion-list--item"
        v-for="item in inqList"
        :key="'inq_' + item.Id"
      >
        <div class="top">
          <span class="left">
            {{ $date(item.CreatedAt).format("YYYY/MM/DD") }}
          </span>
          <span class="right">답변대기</span>
        </div>
        <button
          type="button"
          class="btn tit"
          @click="item.state = !item.state"
          v-bind:class="{ active: item.state }"
        >
          <span class="text">{{ item.Title }}</span>
        </button>
        <div class="con">Q. [{{ item.Type }}] {{ item.Content }}<br /></div>
      </li>
      <!-- <li class="accordion-list--item">
        <div class="top">
          <span class="left">2021/08/01</span>
          <span class="right">답변완료</span>
        </div>
        <button
          type="button"
          class="btn tit"
          @click="togleState2 = !togleState2"
          v-bind:class="{ active: togleState2 }"
        >
          <span class="text">구매를 취소했는데 금액이 다르게 들어왔어요.</span>
        </button>
        <div class="con">
          Q. [정산관리] 판매예치금 출금신청은 어떻게 하나요?<br />
          예치금 입금 일정은 어떻게 되나요?<br />
          A.[정산관리 > 중개정산관리 > 판매예치금 관리] 에서 출금신청 이 가
          능합니다.<br />
          - 출금신청 가능시간 : 영업일 기준 9시 ~ 18시 (18시 ~ 09 시 출금신청
          불가)<br />
          - 출금신청 가능시간 내 출금신청 한 건은 익일 판매자의 정산 계좌로
          입금됩니다.
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyInquiry",
  components: {},
  data() {
    return { inqList: [] };
  },
  created() {
    this.getItem();
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
    getItem() {
      this.$apiGET("/api/cs/request").then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          data[i].state = false;
        }
        this.inqList = data;
      });
    },
  },
};
</script>
