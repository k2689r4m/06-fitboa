<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      고객센터
    </div>

    <div class="inquiry-top">
      <div class="text">
        1:1 문의하기를 통해 연락주시면 빠르게 답변드리겠습니다.<br />
        월~금 10:00~17:00 (공휴일 제외)
      </div>
    </div>

    <div class="line full d-grey"></div>
    <div class="content-top">
      <h2 class="tit">공지사항</h2>
      <div class="right">
        <button type="button" class="btn" @click="goMenu('MyNotice', null)">
          + 더보기
        </button>
      </div>
    </div>

    <ul class="link-list">
      <li
        class="link-list--item"
        v-for="item in inquiryList"
        :key="'if_' + item.Id"
      >
        <a @click="goMenu('MyNoticeDetail', item.Id)">
          <p class="top">
            {{ $date(item.UpdatedAt).format("YYYY/MM/DD") }}
          </p>
          <p class="tit">{{ item.Title }}</p>
        </a>
      </li>
    </ul>
    <div class="line full d-grey"></div>

    <div class="content-top">
      <h2 class="tit">FAQ</h2>
      <div class="right">
        <button type="button" class="btn" @click="goMenu('MyFAQ', null)">
          + 더보기
        </button>
      </div>
    </div>

    <div class="input-search m-b--30">
      <input
        type="text"
        class="input-text"
        placeholder="자주 묻는 질문을 검색해보세요."
        v-model="search"
      />
      <button type="button" class="btn" @click="getFaqList"></button>
    </div>

    <ul class="link-list m-b--60">
      <li class="link-list--item" v-for="item in faqList" :key="'f_' + item.Id">
        <a @click="goMenu('MyFAQ', null)">
          <p class="tit q">
            {{ item.Title }}
          </p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyCS",
  components: {},
  data() {
    return {
      faqList: [],
      inquiryList: [],
      search: "",
    };
  },
  created() {
    this.getAllItemList();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest, id) {
      if (id != null) {
        this.$router.push({
          name: dest,
          query: { id: id },
        });
      } else {
        this.$router.push({
          name: dest,
        });
      }
    },
    getAllItemList() {
      this.$apiGET("/api/cs?search=" + this.search).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].Type == "FAQ") {
            data[i].state = false;
            this.faqList.push(data[i]);
          } else {
            this.inquiryList.push(data[i]);
          }
        }
      });
    },
    getFaqList() {
      this.$apiGET("/api/cs?search=" + this.search).then(({ data }) => {
        var _faq = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].Type == "FAQ") {
            data[i].state = false;
            _faq.push(data[i]);
          }
        }
        this.faqList = _faq;
      });
    },
  },
};
</script>
