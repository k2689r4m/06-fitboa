<template>
  <div class="content">
    <div class="content-tit">
      <button type="button" class="btn back" @click="goBack"></button>
      사이즈 입력
    </div>

    <div class="content-top m-t--30 m-b--30">
      <p class="guide">
        사이즈 측정을 할때는<br />
        몸에 딱 맞는 옷을 입고 진행해주세요. (단위 cm)
      </p>
    </div>

    <ul class="bt-input">
      <li class="bt-input--item">
        <div class="left">
          <label>어깨 너비</label>
          <button type="button" class="btn" @click="setGuide(1)">?</button>
        </div>
        <div class="right">
          <input type="number" class="input" v-model="bodyInfo.Shoulder" />
          cm
        </div>
      </li>
      <li class="bt-input--item">
        <div class="left">
          <label>가슴 둘레</label>
          <button type="button" class="btn" @click="setGuide(2)">?</button>
        </div>
        <div class="right">
          <input type="number" class="input" v-model="bodyInfo.Chest" />
          cm
        </div>
      </li>
      <li class="bt-input--item">
        <div class="left">
          <label>허리 둘레</label>
          <button type="button" class="btn" @click="setGuide(3)">?</button>
        </div>
        <div class="right">
          <input type="number" class="input" v-model="bodyInfo.Waist" />
          cm
        </div>
      </li>
      <li class="bt-input--item">
        <div class="left">
          <label>팔 길이</label>
          <button type="button" class="btn" @click="setGuide(4)">?</button>
        </div>
        <div class="right">
          <input type="number" class="input" v-model="bodyInfo.Arm" />
          cm
        </div>
      </li>
      <li class="bt-input--item">
        <div class="left">
          <label>다리 길이</label>
          <button type="button" class="btn" @click="setGuide(5)">?</button>
        </div>
        <div class="right">
          <input type="number" class="input" v-model="bodyInfo.Leg" />
          cm
        </div>
      </li>
      <li class="bt-input--item">
        <div class="left">
          <label>허벅지 둘레</label>
          <button type="button" class="btn" @click="setGuide(6)">?</button>
        </div>
        <div class="right">
          <input type="number" class="input" v-model="bodyInfo.Thigh" />
          cm
        </div>
      </li>
    </ul>

    <div class="btn-wrap">
      <button
        type="button"
        class="btn btn-full btn-primary"
        @click="sendBodySize"
      >
        사이즈 저장
      </button>
    </div>

    <div class="popup" v-bind:class="{ active: btGuide }">
      <div class="popup-dim" @click="closeGuide"></div>
      <div class="popup-wrap">
        <div class="popup-tit">
          <button type="button" class="btn close" @click="closeGuide"></button>
        </div>
        <div class="popup-con">
          <div v-if="btGuideType == 1" class="bt-guide">
            <img src="../../public/images/bt_guide_1.jpg" alt="" />
            <h4 class="tit">어깨 너비</h4>
            <p class="con">
              어깨 너비의 시작점과 끝점은 똑같고<br />
              목을 앞으로 약간 숙이고 포물선으로 측정합니다.
            </p>
          </div>
          <div v-else-if="btGuideType == 2" class="bt-guide">
            <img src="../../public/images/bt_guide_2.jpg" alt="" />
            <h4 class="tit">가슴 둘레</h4>
            <p class="con">
              팔을 벌린 후 유두 (가슴 둘레 중 가장 큰 값)<br />
              를 지나도록 수평으로 둘레를 측정합니다.
            </p>
          </div>
          <div v-else-if="btGuideType == 3" class="bt-guide">
            <img src="../../public/images/bt_guide_3.jpg" alt="" />
            <h4 class="tit">허리 둘레</h4>
            <p class="con">
              장골 (골반뼈 중 툭 튀어나온 부위) 을 기준으로<br />
              바로 위 부분 허리 둘레를 측정합니다.
            </p>
          </div>
          <div v-else-if="btGuideType == 4" class="bt-guide">
            <img src="../../public/images/bt_guide_4.jpg" alt="" />
            <h4 class="tit">팔 길이</h4>
            <p class="con">
              어깨 너비 시작점부터 팔꿈치 중심을 지나서<br />
              손목까지의 길이를 측정합니다.
            </p>
          </div>
          <div v-else-if="btGuideType == 5" class="bt-guide">
            <img src="../../public/images/bt_guide_5.jpg" alt="" />
            <h4 class="tit">다리 길이</h4>
            <p class="con">
              허리 둘레 측정한 장골부터 다리 옆 선을 기준으로<br />
              복숭아뼈 중앙까지의 길이를 측정합니다.
            </p>
          </div>
          <div v-else-if="btGuideType == 6" class="bt-guide">
            <img src="../../public/images/bt_guide_6.jpg" alt="" />
            <h4 class="tit">허벅지 둘레</h4>
            <p class="con">
              다리의 가장 두꺼운 부분을 수평으로<br />
              둘레를 측정합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyBodySize",
  components: {},
  data() {
    return {
      bodyInfo: {
        Shoulder: null,
        Chest: null,
        Waist: null,
        Arm: null,
        Leg: null,
        Thigh: null,
      },
      btGuide: false,
      btGuideType: null,
      // btGuide1: true,
      // btGuide2: false,
      // btGuide3: false,
      // btGuide4: false,
      // btGuide5: false,
      // btGuide6: false,
    };
  },
  methods: {
    setGuide(type) {
      this.btGuideType = type;
      this.btGuide = true;
    },
    closeGuide() {
      this.btGuide = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
    sendBodySize() {
      this.$apiPOST("/api/set/bodytype", this.bodyInfo).then(() => {
        alert(
          "체형을 작성해 주셔서 감사합니다!\n유아더 운영팀에서 체형 확인 후 체형 분류하여\n설정드릴 수 있도록 하겠습니다!"
        );
        this.goMenu("Home");
      });
    },
  },
};
</script>
