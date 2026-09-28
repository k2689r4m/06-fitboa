<template>
  <div>
    <header class="header">
      <button type="button" class="btn menu" @click="menuState = true"></button>
      <h1 class="header-logo" @click="goMenu('Home')"></h1>
      <button type="button" class="btn bookmark" @click="goBookMark"></button>
    </header>
    <div class="left-menu" id="leftMenu" v-bind:class="{ active: menuState }">
      <div class="dim" @click="menuState = false"></div>
      <div class="con">
        <div class="top">
          <h1 class="logo"></h1>
          <button
            type="button"
            class="btn close"
            @click="menuState = false"
          ></button>
        </div>
        <div class="tit arrow" v-if="$store.state.user">
          {{ $store.state.user.Name }}님
          <span v-if="bodyType" :class="'badge round type-' + bodyType">
            {{ bodyType }}자형
          </span>
          <!-- (체형:
          {{
            $store.state.user.BodyType != null
              ? $store.state.user.BodyType
              : "미등록"
          }}) -->
          <button
            type="button"
            class="btn my"
            @click="goMenu('MyPage')"
          ></button>
        </div>
        <a class="tit" v-else @click="goMenu('Login')">로그인</a>
        <ul class="menu-list">
          <li class="menu-list--item">
            <a @click="goMenu('Styling')">스타일링 가이드</a>
          </li>
          <li class="menu-list--item">
            <a @click="goMenu('Story')">스토리</a>
          </li>
          <li class="menu-list--item">
            <a @click="goMenu('StylingDirect')">1:1 스타일링</a>
          </li>
          <li class="menu-list--item" v-if="$store.state.user">
            <a @click="btnLogout">로그아웃</a>
          </li>
        </ul>
        <div
          class="setting"
          id="setting"
          v-bind:class="{ active: settingState }"
        >
          <button
            type="button"
            class="btn btn-close"
            @click="settingState = false"
          ></button>
          <div class="tit">이벤트 수신 동의</div>
          <ul class="setting-list">
            <li class="setting-list--item">
              SMS 수신
              <label class="input-switch">
                <input type="checkbox" v-model="SMSTerm" @change="changeSMS" />
                <span></span>
              </label>
            </li>
            <li class="setting-list--item">
              이메일 수신
              <label class="input-switch">
                <input
                  type="checkbox"
                  v-model="EmailTerm"
                  @change="changeEmail"
                />
                <span></span>
              </label>
            </li>
          </ul>
          <div class="tit m-t--60">고객센터</div>
          <ul class="setting-list">
            <li class="setting-list--item">
              <a href="#">고객센터 바로가기</a>
            </li>
            <li class="setting-list--item"><a href="#">문의 전화</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="popup" v-bind:class="{ active: this.$store.state.errorST }">
      <div class="popup-dim" @click="alertClose"></div>
      <div class="popup-wrap">
        <div class="popup-tit">
          <button type="button" class="btn close" @click="alertClose"></button>
        </div>
        <div class="popup-con">
          <div class="content-top center">
            <p class="sub type2">{{ this.$store.state.error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HeaderMenu",
  components: {},
  data() {
    return {
      menuState: false,
      settingState: false,
      SMSTerm: false,
      EmailTerm: false,
      bodyType: false,
    };
  },
  created() {
    this.checkLogin();
  },
  mounted() {},
  watch: {
    $route: "checkLogin",
  },
  methods: {
    goBookMark() {
      if (this.$cookies.get("FL") != null) {
        this.goMenu("Bookmark");
      } else {
        this.$store.commit("updateError", "회원 가입 후 이용 가능합니다.");
      }
    },
    alertClose() {
      this.$store.commit("updateClose");
    },
    changeSMS() {
      this.$apiPOST("/api/set/smsagree", { IsOn: this.SMSTerm }).then(
        ({ data }) => {
          if (data == "success") {
            this.$store.state.user.SMSTerm = this.SMSTerm;
          } else {
            this.SMSTerm = this.$store.state.user.SMSTerm;
          }
        }
      );
    },
    changeEmail() {
      this.$apiPOST("/api/set/emailagree", { IsOn: this.EmailTerm }).then(
        ({ data }) => {
          if (data == "success") {
            this.$store.state.user.EmailTerm = this.EmailTerm;
          } else {
            this.EmailTerm = this.$store.state.user.EmailTerm;
          }
        }
      );
    },
    btnLogout() {
      this.$apiPOST("/api/user/logout").then(() => {
        this.menuState = false;
        this.settingState = false;
        this.$cookies.remove("FL");
        this.$store.commit("updateUser", null);
        this.$router.go();
      });
    },
    checkLogin() {
      if (this.$cookies.get("FL") != null) {
        this.$apiGET("/api/user/getinfo").then(({ data }) => {
          if ("FL" in data) {
            if (!data.FL) {
              this.$store.commit("updateUser", null);
              this.$router.go();
            }
          } else {
            this.SMSTerm = data.SMSTerm;
            this.EmailTerm = data.EmailTerm;
            this.$store.commit("updateUser", data);
            this.bodyType = this.$getBodyType(data.BodyType);
          }
        });
      } else {
        // this.$cookies.keys().forEach((cookie) => this.$cookies.remove(cookie));
        this.$store.commit("updateUser", null);
      }
    },
    goMenu(dest) {
      this.$router
        .push({
          name: dest,
          // query: { name: "Query 프로그래밍 방식", age: 2 },
        })
        .catch(() => {});
      this.menuState = false;
    },
    // btnSendSub() {
    //   this.$apiPOST("/api/user/subscription").then(() => {
    //     this.$store.commit("updateState");
    //     alert("구독 완료");
    //     this.$router.go();
    //   });
    // },
  },
};
</script>
