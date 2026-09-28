<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      1:1 문의
    </div>

    <ul class="text-list m-t--20">
      <li class="text-list--item">
        <span class="left">이름</span>
        <span class="right">
          {{ $store.state.user != null ? $store.state.user.Name : "" }}
        </span>
      </li>
      <li class="text-list--item">
        <span class="left">휴대폰 번호</span>
        <span class="right">
          {{ $store.state.user != null ? $store.state.user.Contact : "" }}
        </span>
      </li>
      <li class="text-list--item">
        <span class="left">이메일</span>
        <span class="right">
          {{ $store.state.user != null ? $store.state.user.Username : "" }}
        </span>
      </li>
    </ul>

    <div class="line d-grey m-t--0"></div>

    <div class="input-wrap type2 m-t--40">
      <label class="input-label">문의</label>
      <div class="right">
        <select class="input-select" v-model="item.Type">
          <option value="-1">문의유형</option>
          <option value="회원정보">회원정보</option>
          <option value="결제">결제</option>
          <option value="배송">배송</option>
          <option value="기타">기타</option>
        </select>
      </div>
    </div>
    <div class="input-wrap type2">
      <label class="input-label">제목</label>
      <div class="right">
        <input type="text" class="input-text" v-model="item.Title" />
      </div>
    </div>
    <div class="input-wrap type2">
      <label class="input-label">내용</label>
      <div class="right">
        <div class="textarea-wrap">
          <textarea
            class="textarea"
            rows="5"
            placeholder="문의 내용을 작성해주세요"
            v-model="item.Content"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="btn-wrap m-t--60">
      <button type="button" class="btn btn-full btn-black" @click="sendInq">
        문의 등록
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyInquiryWrite",
  components: {},
  data() {
    return { item: { Type: "-1", Title: "", Content: "" } };
  },
  created() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
    sendInq() {
      this.item.Contact = this.$store.state.user.Contact;
      this.$apiPOST("/api/cs/request", this.item).then(() => {
        this.goBack();
      });
    },
  },
};
</script>
