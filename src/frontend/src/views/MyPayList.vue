<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      최근 결제 내역
    </div>

    <ul class="pay-list">
      <li
        class="pay-list--item"
        v-for="item in itemList"
        :key="'cp_i_' + item.Id"
      >
        <div class="top">
          <a @click="goMenu('MyPayDetail', item.Id)">
            {{ $date(item.PayDateTime).format("YYYY/MM/DD") }}
          </a>
        </div>
        <div class="con">
          <div class="left">
            <p class="tit">
              <!-- Fitboa 월간 정기결제 -->
              {{ item.ProductName }}
            </p>
            <p class="code">
              <!-- DFJR25647 -->
              {{ item.MOId }}
            </p>
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
  </div>
</template>

<script>
export default {
  name: "MyPayList",
  components: {},
  data() {
    return {
      itemList: [],
    };
  },
  created() {
    this.getItemList();
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  methods: {
    getItemList() {
      this.$apiGET("/api/pay/breakdown").then(({ data }) => {
        this.itemList = data;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest, id) {
      this.$router.push({
        name: dest,
        query: { id: id },
      });
    },
  },
};
</script>
