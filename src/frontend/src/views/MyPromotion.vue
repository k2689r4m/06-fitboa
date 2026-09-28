<template>
  <div>
    <div class="content">
      <div class="content-tit">
        <button type="button" class="btn back" @click="goBack"></button>
        프로모션 코드 등록 및 변경
      </div>

      <table class="card-table m-t--20 m-b--60">
        <colgroup>
          <col width="30%" />
          <col width="50%" />
          <col width="20%" />
        </colgroup>
        <tr>
          <th>일자</th>
          <th>내역</th>
          <th>할인</th>
        </tr>
        <tr>
          <td>2021.05.01</td>
          <td>HTR256 주문</td>
          <td>-5,000</td>
        </tr>
        <tr>
          <td>2021.05.01</td>
          <td>신규가입 환영</td>
          <td>+30,000</td>
        </tr>
      </table>

      <div class="btn-wrap">
        <button
          type="button"
          class="btn btn-full btn-black"
          @click="popupState = true"
        >
          신규 코드 등록
        </button>
      </div>
    </div>
    <div v-if="popupState" class="popup active" id="sub">
      <div
        class="popup-dim"
        onclick="popClose(sub)"
        @click="popupState = false"
      ></div>
      <div class="popup-wrap">
        <div class="popup-tit">
          <button
            type="button"
            class="btn close"
            onclick="popClose(sub)"
            @click="popupState = false"
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
            />
          </div>
          <div class="btn-wrap">
            <button type="button" class="btn btn-full btn-primary sm">
              코드 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPromotion",
  components: {},
  data() {
    return {
      popupState: false,
    };
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
  },
};
</script>
