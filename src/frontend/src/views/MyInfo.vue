<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      회원 정보 수정
    </div>
    <div class="input-wrap m-t--40">
      <label class="input-label">이름</label>
      <input type="text" class="input-text" :value="user.Name" readonly />
    </div>
    <div class="input-wrap">
      <label class="input-label">아이디</label>
      <input
        type="text"
        class="input-text"
        :value="user.Username"
        placeholder="이메일 입력"
        readonly
      />
    </div>
    <div class="line grey"></div>
    <!-- <div class="input-wrap">
      <label class="input-label">현재 비밀번호</label>
      <input type="password" class="input-text" />
    </div>
    <div class="input-wrap">
      <label class="input-label">새 비밀번호</label>
      <input
        type="password"
        class="input-text"
        placeholder="8자 이상 영문자, 숫자, 특수문자 조합"
      />
    </div>
    <div class="input-wrap">
      <label class="input-label"></label>
      <input type="password" class="input-text" placeholder="비밀번호 확인" />
      <p class="guide type2 right">비밀번호가 확인 되었습니다.</p>
      <p class="guide right">동일한 비밀번호를 입력해주세요.</p>
    </div> -->
    <div class="input-wrap">
      <label class="input-label">휴대폰 번호</label>
      <input type="tel" class="input-text" :value="user.Contact" readonly />
      <!-- <button type="button" class="btn input-btn">인증번호</button> -->
    </div>
    <!-- <div class="input-wrap btn-exist">
      <label class="input-label">인증번호</label>
      <input type="number" class="input-text" />
      <button type="button" class="btn input-btn">인증확인</button>
    </div> -->
    <div class="input-wrap btn-exist">
      <label class="input-label">주소</label>
      <input type="text" class="input-text" :value="Address" readonly />
      <button
        type="button"
        class="btn input-btn type2"
        @click="execDaumPostcode"
      >
        주소찾기
      </button>
    </div>
    <div class="input-wrap">
      <label class="input-label"></label>
      <input type="text" class="input-text" v-model="user.ExtraAddress" />
    </div>
    <div class="line grey"></div>
    <div class="btn-wrap">
      <button
        type="button"
        class="btn btn-half btn-line"
        @click="changePass = true"
      >
        비밀번호 변경
      </button>
      <button
        type="button"
        class="btn btn-half btn-line"
        @click="changePhone = true"
      >
        연락처 변경
      </button>
    </div>
    <div class="input-wrap">
      <label class="input-label">이메일 / SNS<br />수신여부</label>
      <div class="right-wrap">
        <label class="checkbox">
          <input type="checkbox" v-model="user.EmailTerm" />
          <span class="check"></span>
          <span class="text">이메일 수신 동의</span>
          <!-- <span class="text">약관 전체동의</span> -->
        </label>
        <br />
        <label class="checkbox">
          <input type="checkbox" v-model="user.SMSTerm" />
          <span class="check"></span>
          <span class="text">SMS 수신 동의</span>
        </label>
      </div>
    </div>

    <div class="btn-wrap m-t--60">
      <button type="button" class="btn btn-full btn-black" @click="sendInfo">
        회원정보 수정
      </button>
    </div>
    <div class="text-center m-b--20">
      <a class="font-color--grey font-size--14" @click="goMenu('MySecession')"
        >회원탈퇴를 하시겠습니까?</a
      >
    </div>

    <div class="popup" v-bind:class="{ active2: changePass }">
      <div class="popup-dim" @click="closePopup"></div>
      <div class="popup-wrap">
        <div class="popup-tit">
          <button type="button" class="btn close" @click="closePopup"></button>
        </div>
        <div class="popup-con p--0">
          <div class="content-top">
            <h2 class="tit text-center">비밀번호 변경</h2>
            <div class="input-wrap m-t--30">
              <label class="input-label">현재 비밀번호</label>
              <input type="password" class="input-text" v-model="OldPassword" />
              <!-- <p class="guide type2 right">비밀번호가 일치 합니다.</p>
              <p class="guide right">비밀번호가 일치하지 않습니다.</p> -->
            </div>
            <div class="input-wrap">
              <label class="input-label">새 비밀번호</label>
              <input
                type="password"
                class="input-text"
                placeholder="8자 이상 영문자, 숫자, 특수문자 조합"
                v-model="NewPassword"
              />
            </div>
            <div class="input-wrap m-b--40">
              <label class="input-label"></label>
              <input
                type="password"
                class="input-text"
                placeholder="비밀번호 확인"
                v-model="NewPassword_"
              />
              <template v-if="NewPassword || NewPassword_">
                <p class="guide type2 right" v-if="NewPassword == NewPassword_">
                  비밀번호가 일치 합니다.
                </p>
                <p class="guide right" v-else-if="NewPassword_">
                  비밀번호가 일치하지 않습니다.
                </p>
              </template>
            </div>
          </div>
          <div class="btn-wrap type2 m-b--0">
            <button
              type="button"
              class="btn btn-full btn-primary"
              @click="btnPassword"
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="popup" v-bind:class="{ active2: changePhone }">
      <div class="popup-dim" @click="closePopup"></div>
      <div class="popup-wrap">
        <div class="popup-tit">
          <button type="button" class="btn close" @click="closePopup"></button>
        </div>
        <div class="popup-con p--0">
          <div class="content-top">
            <h2 class="tit text-center">연락처 변경</h2>
            <div class="input-wrap m-t--30">
              <label class="input-label">휴대폰 번호</label>
              <input
                type="tel"
                class="input-text"
                v-model="Contact"
                @keyup="phoneNumberMaks(Contact)"
              />
              <button type="button" class="btn input-btn" @click="getVerify">
                인증번호
              </button>
            </div>
            <div class="input-wrap btn-exist m-b--40">
              <label class="input-label">인증번호</label>
              <input type="number" class="input-text" v-model="VerifyKey" />
              <button type="button" class="btn input-btn" @click="checkVerify">
                인증확인
              </button>
            </div>
          </div>
          <div class="btn-wrap type2 m-b--0">
            <button
              type="button"
              class="btn btn-full btn-primary"
              @click="btnContact"
            >
              연락처 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyInfo",
  components: {},
  data() {
    return {
      changePass: false,
      changePhone: false,

      OldPassword: "",
      NewPassword: "",
      NewPassword_: "",

      Contact: "",
      VerifyKey: "",

      user: {
        Contact: "", //전화번호
        Name: "", //이름
        Username: "", //유저아이디
        RoadAddress: "", // 도로명 주소
        JibunAddress: "", // 지번 주소
        ExtraAddress: "", // 상세 주소
        PostCode: "", // 우편 번호
        AddressType: "", //주소 선택 타입 도로명, 지번
        EmailTerm: false, //이메일 약관
        SMSTerm: false, //sms 약관
      },
      Address: "", //주소
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$apiGET("/api/mypage/info/get").then(({ data }) => {
        this.user = data;

        if (this.user.AddressType == "도로명") {
          this.Address = this.user.RoadAddress;
        } else {
          this.Address = this.user.JibunAddress;
        }
      });
    },
    sendInfo() {
      this.$apiPOST("/api/mypage/change/info", {
        RoadAddress: this.user.RoadAddress,
        JibunAddress: this.user.JibunAddress,
        ExtraAddress: this.user.ExtraAddress,
        PostCode: this.user.PostCode,
        AddressType: this.user.AddressType,
        SMSTerm: this.user.SMSTerm,
        EmailTerm: this.user.EmailTerm,
      }).then(({ data }) => {
        console.log(data);
        this.$store.commit("updateError", data.message);
        this.goBack();
      });
    },
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.user.ExtraAddress !== "") {
            this.user.ExtraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.Address = data.roadAddress;
            this.user.AddressType = "도로명";
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.Address = data.jibunAddress;
            this.user.AddressType = "지번";
          }
          this.user.RoadAddress = data.roadAddress;
          this.user.JibunAddress = data.jibunAddress;

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.user.ExtraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.user.ExtraAddress +=
                this.user.ExtraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.user.ExtraAddress !== "") {
              this.user.ExtraAddress = `(${this.user.ExtraAddress})`;
            }
          } else {
            this.user.ExtraAddress = "";
          }
          // 우편번호를 입력한다.
          this.user.PostCode = data.zonecode;
        },
      }).open();
    },
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
    btnPassword() {
      if (this.NewPassword != this.NewPassword_) {
        this.$store.commit("updateError", "비밀번호가 일치하지 않습니다.");
        return;
      }

      this.$apiPOST("/api/mypage/change/password", {
        OldPassword: this.OldPassword,
        NewPassword: this.NewPassword,
      }).then(({ data }) => {
        console.log(data);
        this.closePopup();
        this.$store.commit("updateError", data.message);
      });
    },
    btnContact() {
      this.$apiPOST("/api/mypage/change/contact", {
        Contact: this.Contact,
      }).then(({ data }) => {
        console.log(data);
        this.user.Contact = this.Contact;
        this.closePopup();
        this.$store.commit("updateError", data.message);
      });
    },
    closePopup() {
      this.OldPassword = "";
      this.NewPassword = "";
      this.NewPassword_ = "";
      this.Contact = "";
      this.VerifyKey = "";
      this.changePass = false;
      this.changePhone = false;
    },

    getVerify() {
      this.$apiPOST("/api/mypage/change/contact/check", {
        Contact: this.Contact,
      }).then(({ data }) => {
        console.log(data);
        this.$store.commit("updateError", "인증되었습니다.");
      });
    },
    checkVerify() {
      this.$apiPOST("/api/mypage/change/contact/confirm", {
        Contact: this.Contact,
        VerifyKey: this.VerifyKey,
      }).then(({ data }) => {
        console.log(data);
      });
    },

    phoneNumberMaks(value) {
      if (!value) {
        return "";
      }

      value = value.replace(/[^0-9]/g, "");

      let result = [];
      let restNumber = "";

      // 지역번호와 나머지 번호로 나누기
      if (value.startsWith("02")) {
        // 서울 02 지역번호
        result.push(value.substr(0, 2));
        restNumber = value.substring(2);
      } else if (value.startsWith("1")) {
        // 지역 번호가 없는 경우
        // 1xxx-yyyy
        restNumber = value;
      } else {
        // 나머지 3자리 지역번호
        // 0xx-yyyy-zzzz
        result.push(value.substr(0, 3));
        restNumber = value.substring(3);
      }

      if (restNumber.length === 7) {
        // 7자리만 남았을 때는 xxx-yyyy
        result.push(restNumber.substring(0, 3));
        result.push(restNumber.substring(3));
      } else {
        result.push(restNumber.substring(0, 4));
        result.push(restNumber.substring(4));
      }

      this.Contact = result.filter((val) => val).join("-");
    },
  },
};
</script>
