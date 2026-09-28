<template>
  <div class="content">
    <div class="content-top center">
      <h2 class="tit">회원가입</h2>
    </div>
    <div class="input-wrap">
      <label class="input-label">이름</label>
      <input type="text" class="input-text" v-model="user.Name" />
    </div>
    <div class="input-wrap btn-exist">
      <label class="input-label">아이디</label>
      <input
        type="text"
        class="input-text"
        placeholder="이메일 입력"
        v-model="user.UserName"
      />
      <button type="button" class="btn input-btn" @click="btnUsernameCheck">
        중복확인
      </button>
      <p
        class="guide type2 right"
        v-if="this.msgUsername == '사용 가능한 아이디입니다.'"
      >
        사용가능한 아이디입니다.
      </p>
      <p class="guide right" v-else-if="this.msgUsername">
        이미 사용중인 아이디입니다.
      </p>
    </div>
    <div class="input-wrap">
      <label class="input-label">비밀번호</label>
      <input
        type="password"
        class="input-text"
        placeholder="8자 이상 영문자, 숫자, 특수문자 조합"
        v-model="user.Password"
      />
    </div>
    <div class="input-wrap">
      <label class="input-label"></label>
      <input
        type="password"
        class="input-text"
        placeholder="비밀번호 확인"
        v-model="Password_"
      />
      <template v-if="user.Password || Password_">
        <p class="guide type2 right" v-if="user.Password == Password_">
          비밀번호가 확인 되었습니다.
        </p>
        <p class="guide right" v-else-if="Password_">
          동일한 비밀번호를 입력해주세요.
        </p>
      </template>
    </div>
    <div class="input-wrap btn-exist">
      <label class="input-label">휴대폰 번호</label>
      <input
        type="tel"
        class="input-text"
        v-model="user.Contact"
        @keyup="phoneNumberMaks(user.Contact)"
      />
      <button type="button" class="btn input-btn" @click="btnGetVerifyKey">
        인증번호
      </button>
    </div>
    <div class="input-wrap btn-exist">
      <label class="input-label">인증번호</label>
      <input
        type="number"
        class="input-text"
        v-model="user.VerifyKey"
        placeholder="인증번호 6자리 입력"
      />
      <button type="button" class="btn input-btn" @click="btnCheckVerifyKey">
        인증확인
      </button>
    </div>
    <div class="input-wrap btn-exist type2">
      <label class="input-label">주소</label>
      <input
        type="text"
        class="input-text"
        v-model="user.PostCode"
        disabled
        placeholder="우편번호"
      />
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
      <input
        type="text"
        class="input-text"
        placeholder="기본주소"
        disabled
        v-model="Address"
      />
    </div>
    <div class="input-wrap">
      <label class="input-label"></label>
      <input
        type="text"
        class="input-text"
        placeholder="상세 주소를 작성해 주세요"
        v-model="user.ExtraAddress"
      />
    </div>
    <div class="line"></div>
    <div class="checkbox-list p-b--20">
      <label class="checkbox">
        <input type="checkbox" v-model="allTerm" @change="btnAllTerm" />
        <span class="check"></span>
        <span class="text font-weight--b">약관 전체동의</span>
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="user.UseTerm" />
        <span class="check"></span>
        <span class="text">이용약관 (필수)</span>
        <button type="button" class="btn">내용보기</button>
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="user.PrivateTerm" />
        <span class="check"></span>
        <span class="text">개인정보 수집 및 이용 (필수)</span>
        <button type="button" class="btn">내용보기</button>
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="user.EmailTerm" />
        <span class="check"></span>
        <span class="text">이메일 수신 동의</span>
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="user.SmsTerm" />
        <span class="check"></span>
        <span class="text">SMS 수신 동의</span>
      </label>
    </div>
    <div class="btn-wrap">
      <button type="button" class="btn btn-full btn-black" @click="btnSendJoin">
        회원가입
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Join",
  components: {},
  data() {
    return {
      user: {
        Name: "", //이름
        UserName: "", //유저아이디
        Password: "", //비번
        Contact: "", //전화번호
        VerifyKey: "", //인증번호
        VerifyId: "", //인즌번호 id
        RoadAddress: "", // 도로명 주소
        JibunAddress: "", // 지번 주소
        ExtraAddress: "", // 상세 주소
        PostCode: "", // 우편 번호
        AddressType: "", //주소 선택 타입 도로명, 지번
        UseTerm: false, //이용 약관
        PrivateTerm: false, //개인정보 약관
        EmailTerm: false, //이메일 약관
        SmsTerm: false, //sms 약관
      },
      Address: "", //주소
      Password_: "",
      allTerm: false,
      msgUsername: "",
    };
  },
  created() {},
  methods: {
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
    btnUsernameCheck() {
      // console.log(this.$store.state.user);
      // this.$store.commit("updateUser", "123123");
      // console.log(this.$store.state.user);

      if (this.user.UserName) {
        this.$apiPOST("/api/user/check/username", {
          Username: this.user.UserName,
        }).then(({ data }) => {
          this.msgUsername = data.message;
        });
      }
    },
    //폰 번호 마스크
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

      this.user.Contact = result.filter((val) => val).join("-");
    },
    btnAllTerm() {
      if (this.allTerm) {
        this.user.UseTerm = true;
        this.user.PrivateTerm = true;
        this.user.EmailTerm = true;
        this.user.SmsTerm = true;
      } else {
        this.user.UseTerm = false;
        this.user.PrivateTerm = false;
        this.user.EmailTerm = false;
        this.user.SmsTerm = false;
      }
    },
    //인증번호 요청
    btnGetVerifyKey() {
      if (this.user.Contact) {
        this.$apiPOST("/api/user/check/contact", {
          Contact: this.user.Contact,
        }).then(({ data }) => {
          this.user.VerifyKey = data.VerifyKey;
          console.log(this.user.VerifyKey);
        });
      }
    },
    //인증번호 확인
    btnCheckVerifyKey() {
      if (this.user.Contact) {
        this.$apiPOST("/api/user/verify/register", {
          Contact: this.user.Contact,
          VerifyKey: this.user.VerifyKey,
        }).then(({ data }) => {
          this.user.VerifyId = data.Verify.Id;
          this.$store.commit("updateError", "인증되었습니다.");
        });
      }
    },
    btnSendJoin() {
      this.$apiPOST("/api/user/register", this.user).then(({ data }) => {
        console.log(data);
        this.goResult();
      });
    },
    goResult() {
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
        }
        this.$router.push({
          name: "JoinSub",
        });
      });
    },
  },
};
</script>
