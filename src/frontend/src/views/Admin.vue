<template>
  <div class="content">
    제목: <input type="text" v-model="con.Title" /><br />
    바디타입:
    <select v-model="con.BodyType">
      <option :value="0">all</option>
      <option :value="1">a</option>
      <option :value="2">b</option>
      <option :value="3">c</option>
      <option :value="4">d</option>
      <option :value="5">e</option>
    </select>
    <br />
    이미지 커트라인:<input type="number" v-model="con.Threshold" /><br />
    타입:
    <select v-model="con.Type">
      <option :value="'스토리'">스토리</option>
      <option :value="'스타일링 가이드'">스타일링 가이드</option>
      <!-- <option :value="'1:1 스타일링'">1:1 스타일링</option> -->
    </select>
    <br />
    <button @click="initImg">이미지삭제</button
    ><button @click="sendContent">저장</button>
    <br />
    <br />
    <input
      type="file"
      id="st_re_0"
      ref="st_re_0"
      accept="image/*"
      multiple
      @change="onFileSelected"
    />
    <br />
    <br />
    <div v-for="(img, idx) in imgList" :key="'a_img_' + idx">
      <img :src="img" alt="" height="280" width="180" />
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "Admin",
  components: {},
  data() {
    return {
      con: {
        Title: "",
        BodyType: 0,
        Threshold: 0,
        Type: "스토리",
      },
      uploadImageFile: [require("../../public/images/icon/photo_add.png")],
      imgList: [],
      files: [],
    };
  },
  created() {},
  methods: {
    initImg() {
      this.files = [];
      this.imgList = [];
      this.$refs["st_re_0"].value = "";
    },
    onFileSelected(event) {
      var input = event.target;
      //   this.files = [];

      if (input.files && input.files[0]) {
        for (let i = 0; i < input.files.length; i++) {
          var reader = new FileReader();
          reader.readAsDataURL(input.files[i]);
          reader.onload = (e) => {
            this.imgList.push(e.target.result);
            this.files.push(input.files[i]);
          };
        }
      }
    },
    sendContent() {
      this.$apiFORM("/admin/api/content", this.con, this.files).then((re) => {
        if (re != undefined) {
          alert("등록 완료");
          this.$router.go();
        }
      });
    },
  },
};
</script>
