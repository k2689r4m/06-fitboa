<template>
  <div>
    <div class="content">
      <div class="content-tit">
        <button type="button" class="btn back" @click="goBack"></button>
        결제 카드 수정
      </div>

      <div class="content-top center">
        <h2 class="tit">결제 카드 등록 및 변경</h2>
      </div>

      <table class="card-table m-b--30">
        <colgroup>
          <col width="25%" />
          <col width="12%" />
          <col width="18%" />
          <col width="35%" />
          <col width="10%" />
        </colgroup>
        <tr>
          <th>등록일</th>
          <th>현황</th>
          <th>카드사</th>
          <th>카드번호</th>
          <th>&nbsp;</th>
        </tr>
        <tr v-for="item in itemList" :key="'c_i_' + item.Id">
          <td>{{ $date(item.CreatedAt).format("YYYY.MM.DD") }}</td>
          <td>{{ item.IsUse ? "사용" : "미사용" }}</td>
          <td>{{ item.CardName }}</td>
          <td>{{ item.CardNo }}</td>
          <td>
            <button v-if="!item.IsUse" type="button" class="btn delete">
              &times;
            </button>
          </td>
        </tr>
      </table>

      <button type="button" class="btn card-new" @click="popupState = true">
        <div class="plus">+</div>
        신규 카드 등록
      </button>
    </div>
    <div v-if="popupState" class="bottom-fixed type2">
      <div class="content-top center">
        <h2 class="tit">결제 카드 등록</h2>
        <button
          type="button"
          class="btn close"
          @click="popupState = false"
        ></button>
      </div>
      <div class="card-info bg-white">
        <div class="input-wrap">
          <label class="input-label">카드번호</label>
          <input type="number" class="input-text xsm" />
          <input type="number" class="input-text xsm" />
          <input type="number" class="input-text xsm" />
          <input type="number" class="input-text xsm" />
        </div>
        <div class="input-wrap">
          <label class="input-label">유효기간</label>
          <input
            type="number"
            class="input-text xsm"
            placeholder="MM"
          />&nbsp;&nbsp;월
          <input
            type="number"
            class="input-text xsm m-l--10"
            placeholder="YYYY"
          />&nbsp;&nbsp;년
        </div>
        <div class="input-wrap">
          <label class="input-label">비밀번호</label>
          <input
            type="password"
            class="input-text xsm"
            placeholder="앞 2자리"
          />&nbsp;&nbsp;●●
        </div>
        <div class="input-wrap">
          <label class="input-label">생년월일</label>
          <input
            type="password"
            class="input-text"
            placeholder="YYMMDD (6자리)"
          />
        </div>
        <div class="input-wrap">
          <label class="input-label"></label>
          <label class="checkbox">
            <input type="checkbox" />
            <span class="check type2"></span>
            <span class="text">사업자번호 (6자리)</span>
          </label>
        </div>
      </div>
    </div>
    <div v-if="popupState" class="dim" @click="popupState = false"></div>
  </div>
</template>

<script>
export default {
  name: "MyCard",
  components: {},
  data() {
    return {
      popupState: false,
      itemList: [],
    };
  },
  created() {
    this.getItemList();
  },
  methods: {
    getItemList() {
      this.$apiGET("/api/pay/cards").then(({ data }) => {
        this.itemList = data;
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
