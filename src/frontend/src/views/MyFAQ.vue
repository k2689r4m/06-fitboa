<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      FAQ
    </div>

    <ul class="accordion-list bt-none">
      <li
        class="accordion-list--item"
        v-for="item in itemList"
        :key="'f_' + item.Id"
      >
        <button
          type="button"
          class="btn tit"
          @click="item.state = !item.state"
          v-bind:class="{ active: item.state }"
        >
          <span class="text q">
            {{ item.Title }}
          </span>
        </button>
        <div class="con a">
          {{ item.Content }}
        </div>
      </li>
      <!-- <li class="accordion-list--item">
        <button
          type="button"
          class="btn tit"
          @click="togleState2 = !togleState2"
          v-bind:class="{ active: togleState2 }"
        >
          <span class="text q"
            >결제를 완료한 상품을 결제 취소할 수 있나요?</span
          >
        </button>
        <div class="con a">
          모바일에서 중복 결제가 발생된 원인을 파악하여 모바 일 문제 로 확인
          시에는 무료 취소, 무료 반품을 도와드리고 있습니다.<br /><br />

          고객님께서 모바일 결제 시, 오처리하신 부분이라면 취소 비용 또는 반품
          비용이 발생할 수 있는 부분 양해부탁 드립니다.<br /><br />

          고객센터 [1566-1130] 로 문의 또는 1:1문의하기에 글 남겨주 시면 바로
          확인해 드리겠습니다.
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyFAQ",
  components: {},
  data() {
    return { itemList: [] };
  },
  created() {
    this.getItemList();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getItemList() {
      this.$apiGET("/api/cs?typeNum=1").then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          data[i].state = false;
        }
        this.itemList = data;
      });
    },
  },
};
</script>
