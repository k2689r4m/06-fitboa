<template>
  <div class="content">
    사이즈 입력<br />
    어깨너비 : <input type="number" v-model="bodyInfo.Shoulder" /> <br />
    가슴둘레 : <input type="number" v-model="bodyInfo.Chest" /> <br />
    허리둘레 : <input type="number" v-model="bodyInfo.Waist" /> <br />
    팔길이 : <input type="number" v-model="bodyInfo.Arm" /> <br />
    다리길이 : <input type="number" v-model="bodyInfo.Leg" /> <br />
    허벅지둘레 : <input type="number" v-model="bodyInfo.Thigh" /> <br />
    <br /><button @click="sendBodySize">체형사이즈 입력</button><br /><br />
    체형 직접 선택
  </div>
</template>

<script>
export default {
  name: "BodyType",
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
    };
  },
  created() {},
  methods: {
    sendBodySize() {
      this.$apiPOST("/api/set/bodytype", this.bodyInfo).then(({ data }) => {
        console.log(data);
        alert("체형정보 입력 완료");
        this.goMenu("Home");
      });
    },
    goMenu(dest) {
      this.$router.push({
        name: dest,
      });
    },
  },
};
</script>
