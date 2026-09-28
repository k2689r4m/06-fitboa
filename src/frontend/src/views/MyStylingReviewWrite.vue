<template>
  <div>
    <div class="content">
      <div class="content-tit">
        <button
          type="button"
          class="btn back"
          @click="popupState = true"
        ></button>
        1:1 스타일링 후기 작성
      </div>

      <div class="input-wrap type2">
        <label class="input-label">별점</label>
        <div class="right">
          1:1 스타일링 서비스에 대해 얼마나 만족하시나요?
          <div class="startRadio">
            <label class="startRadio__box">
              <input
                type="radio"
                name="star"
                :value="0.5"
                id=""
                v-model="review.Rate"
              />
              <span class="startRadio__img"></span>
            </label>
            <label class="startRadio__box">
              <input
                type="radio"
                name="star"
                :value="1"
                id=""
                v-model="review.Rate"
              />
              <span class="startRadio__img"></span>
            </label>
            <label class="startRadio__box">
              <input
                type="radio"
                name="star"
                :value="1.5"
                id=""
                v-model="review.Rate"
              />
              <span class="startRadio__img"></span>
            </label>
            <label class="startRadio__box">
              <input
                type="radio"
                name="star"
                :value="2"
                id=""
                v-model="review.Rate"
              />
              <span class="startRadio__img"></span>
            </label>
            <label class="startRadio__box">
              <input
                type="radio"
                name="star"
                :value="2.5"
                id=""
                v-model="review.Rate"
              />
              <span class="startRadio__img"></span>
            </label>
            <label class="startRadio__box">
              <input
                type="radio"
                name="star"
                :value="3"
                id=""
                v-model="review.Rate"
              />
              <span class="startRadio__img"></span>
            </label>
            <label class="startRadio__box">
              <input
                type="radio"
                name="star"
                :value="3.5"
                id=""
                v-model="review.Rate"
              />
              <span class="startRadio__img"></span>
            </label>
            <label class="startRadio__box">
              <input
                type="radio"
                name="star"
                :value="4"
                id=""
                v-model="review.Rate"
              />
              <span class="startRadio__img"></span>
            </label>
            <label class="startRadio__box">
              <input
                type="radio"
                name="star"
                :value="4.5"
                id=""
                v-model="review.Rate"
              />
              <span class="startRadio__img"></span>
            </label>
            <label class="startRadio__box">
              <input
                type="radio"
                name="star"
                :value="5"
                id=""
                v-model="review.Rate"
              />
              <span class="startRadio__img"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="line full grey"></div>

      <div class="input-wrap type2">
        <label class="input-label">내용</label>
        <div class="right">
          <div class="textarea-wrap">
            <textarea
              class="textarea"
              rows="5"
              placeholder="후기를 작성해주세요"
              v-model="review.Content"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="line full grey"></div>

      <div class="input-wrap type2">
        <label class="input-label">사진첨부</label>
        <div class="right photo-list">
          <label class="input-photo">
            <input
              type="file"
              id="st_re_0"
              ref="st_re_0"
              @change="onFileSelected($event, 0)"
              accept="image/*"
            />
            <img :src="uploadImageFile[0]" alt="" />
          </label>
          <label class="input-photo">
            <input
              type="file"
              id="st_re_1"
              ref="st_re_1"
              @change="onFileSelected($event, 1)"
              accept="image/*"
            />
            <img :src="uploadImageFile[1]" alt="" />
          </label>
          <label class="input-photo">
            <input
              type="file"
              id="st_re_2"
              ref="st_re_2"
              @change="onFileSelected($event, 2)"
              accept="image/*"
            />
            <img :src="uploadImageFile[2]" alt="" />
          </label>
          <label class="input-photo">
            <input
              type="file"
              id="st_re_3"
              ref="st_re_3"
              @change="onFileSelected($event, 3)"
              accept="image/*"
            />
            <img :src="uploadImageFile[3]" alt="" />
          </label>
        </div>
      </div>

      <ul class="check-list m-t--40 m-b--60">
        <li class="check-list--item">
          1:1 스타일링 경험에 대한 솔직한 의견을 부탁드릴게요.
        </li>
        <li class="check-list--item">
          다른 회원분들을 위해 스타일링 이후 달라진 경험을 공유해 주세요.
        </li>
        <li class="check-list--item">
          서비스와 관련이 없는 내용, 욕설 혹은 비속어가 포함된 글은 통보 없이
          삭제 될 수 있습니다.
        </li>
      </ul>

      <div class="btn-wrap">
        <button
          type="button"
          class="btn btn-full btn-primary"
          @click="sendApply"
        >
          후기 작성하기
        </button>
      </div>
    </div>

    <div class="popup" id="sub" v-bind:class="{ active: popupState }">
      <div class="popup-dim" @click="popupState = false"></div>
      <div class="popup-wrap">
        <div class="popup-tit">
          <button type="button" class="btn close"></button>
        </div>
        <div class="popup-con">
          <div class="content-top center">
            <h2 class="tit">후기 작성을 그만하시겠어요?</h2>
            <p class="sub">
              후기 작성을 취소하시는 경우<br />
              작성중인 후기 내용이 저장되지 않을 수 있습니다.<br />
              후기 작성을 취소하시겠습니까?
            </p>
          </div>
          <div class="btn-wrap">
            <button
              type="button"
              class="btn btn-half btn-line sm"
              @click="goBack"
            >
              작성 취소
            </button>
            <button
              type="button"
              class="btn btn-half btn-primary sm"
              @click="popupState = false"
            >
              계속 작성하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyStylingReviewWrite",
  components: {},
  data() {
    return {
      popupState: false,
      review: { Content: "", Rate: 0 },
      files: [null, null, null, null],
      uploadImageFile: [
        require("../../public/images/icon/photo_add.png"),
        require("../../public/images/icon/photo_add.png"),
        require("../../public/images/icon/photo_add.png"),
        require("../../public/images/icon/photo_add.png"),
      ],
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
    sendApply() {
      this.$apiFORM("/api/persnal/review", this.review, this.files).then(
        (re) => {
          if (re != undefined) {
            this.$store.commit("updateError", "리뷰 등록 완료");
            this.goBack();
          }
        }
      );
    },
    onFileSelected(event, idx) {
      var input = event.target;
      if (!this.confirmFileExtension(input.value)) {
        alert("해당 파일은 이미지 파일이 아닙니다.");
        input.value = "";
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (input.files[0].size > maxSize) {
        alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다. ");
        input.value = "";
        return;
      }

      if (input.files && input.files[0]) {
        const dataTransfer = new DataTransfer();

        for (let i = 0; i < 4; i++) {
          if (i == idx) {
            break;
          }

          if (
            !(
              this.$refs["st_re_" + i].files &&
              this.$refs["st_re_" + i].files[0]
            )
          ) {
            dataTransfer.items.add(event.target.files[0]);
            this.$refs["st_re_" + i].files = dataTransfer.files;
            event.target.value = "";
            input = this.$refs["st_re_" + i];
            idx = i;
            break;
          }
        }

        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = (e) => {
          this.uploadImageFile[idx] = e.target.result;
          this.files[idx] = input.files[0];
          this.uploadImageFile.push("1");
          this.uploadImageFile.pop();
        };
      }
    },
    confirmFileExtension(file) {
      var reg = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
      if (file.match(reg)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
