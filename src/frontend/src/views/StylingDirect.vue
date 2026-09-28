<template>
  <div>
    <div class="content">
      <div class="direct-top">
        <img src="../../public/images/prepare_img.png" alt="" />
        <!-- <p class="con">
          썸네일 이미지 작업에서<br />
          1:1 스타일링 가이드에 대한 설명이<br />
          들어갈겁니다.
        </p> -->
      </div>

      <div class="content-top">
        <h2 class="tit">1:1 스타일링</h2>
        <p class="sub font-color--d-grey m-b--40">
          스타일링 가이드보다 섬세한 맞춤 서비스를 원하시나요?<br />
          전문 스타일리스트가 나만을 위해 코디해주는<br />
          1:1 스타일링을 만나보세요.
        </p>
      </div>

      <!-- <div class="box-check">
        <label class="checkbox">
          <input type="radio" name="box" checked="" />
          <p class="text">
            일반 회원가
            <span class="right"> ₩ 20,000 </span>
          </p>
        </label>
        <label class="checkbox">
          <input type="radio" name="box" />
          <p class="text">
            멤버십 회원가
            <span class="right">
              <span class="cancle">₩ 20,000</span>
              ₩ 10,000
            </span>
          </p>
        </label>
      </div> -->

      <div class="line full"></div>

      <div class="content-top">
        <h2 class="tit">상세내용</h2>
      </div>
      <div class="detail-con"></div>

      <div class="line full m-t--60"></div>

      <div class="content-top">
        <h2 class="tit">
          1:1 스타일링 후기<span class="m-l--10 font-size--14"
            >({{ itemCount }}건)</span
          >
        </h2>
      </div>

      <ul class="review-list type2">
        <li
          class="review-list--item"
          @click="goMenu('StylingDirectDetail', item.ReviewId)"
          v-for="item in itemList"
          :key="'st_re_li_it_' + item.ReviewId"
        >
          <div class="top">
            <div class="info">
              <div class="img-wrap">
                <img src="" alt="" />
              </div>
              <p class="name">
                <strong> {{ item.UserName }} </strong>님
              </p>
              <p class="date">
                {{ $date(item.CreatedAt).format("YYYY/MM/DD HH:MM") }}
              </p>
              <div class="startRadio disabled">
                <label class="startRadio__box">
                  <input
                    type="radio"
                    :name="'star_' + item.ReviewId"
                    :value="0.5"
                    v-model="item.Rate"
                  />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input
                    type="radio"
                    :name="'star_' + item.ReviewId"
                    :value="1"
                    v-model="item.Rate"
                  />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input
                    type="radio"
                    :name="'star_' + item.ReviewId"
                    :value="1.5"
                    v-model="item.Rate"
                  />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input
                    type="radio"
                    :name="'star_' + item.ReviewId"
                    :value="2"
                    v-model="item.Rate"
                  />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input
                    type="radio"
                    :name="'star_' + item.ReviewId"
                    :value="2.5"
                    v-model="item.Rate"
                  />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input
                    type="radio"
                    :name="'star_' + item.ReviewId"
                    :value="3"
                    v-model="item.Rate"
                  />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input
                    type="radio"
                    :name="'star_' + item.ReviewId"
                    :value="3.5"
                    v-model="item.Rate"
                  />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input
                    type="radio"
                    :name="'star_' + item.ReviewId"
                    :value="4"
                    v-model="item.Rate"
                  />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input
                    type="radio"
                    :name="'star_' + item.ReviewId"
                    :value="4.5"
                    v-model="item.Rate"
                  />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input
                    type="radio"
                    :name="'star_' + item.ReviewId"
                    :value="5"
                    v-model="item.Rate"
                  />
                  <span class="startRadio__img"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="bottom">
            {{ item.Content }}
          </div>
          <div class="photo" v-if="item.Images.length > 0">
            <template v-if="item.Images.length > 1">
              <div class="photo-wrap">
                <img
                  :src="'/api/persnal/review/image/' + item.Images[0]"
                  alt=""
                />
              </div>
              <div class="photo-wrap">
                <img
                  :src="'/api/persnal/review/image/' + item.Images[1]"
                  alt=""
                />
                <div class="more" v-if="item.Images.length > 2">
                  <span class="num">+{{ item.Images.length - 2 }}</span>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="photo-wrap">
                <img
                  :src="'/api/persnal/review/image/' + item.Images[0]"
                  alt=""
                />
              </div>
            </template>
          </div>
        </li>
        <!-- <li class="review-list--item" @click="goMenu('StylingDirectDetail')">
          <div class="top">
            <div class="info">
              <div class="img-wrap">
                <img src="" alt="" />
              </div>
              <p class="name"><strong>aaa</strong>님</p>
              <p class="date">2021/11/29 15:00</p>
              <div class="startRadio disabled">
                <label class="startRadio__box">
                  <input type="radio" name="star2" checked="" />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input type="radio" name="star2" checked="" />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input type="radio" name="star2" checked="" />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input type="radio" name="star2" checked="" />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input type="radio" name="star2" checked="" />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input type="radio" name="star2" checked="" />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input type="radio" name="star2" checked="" />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input type="radio" name="star2" checked="" />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input type="radio" name="star2" id="" />
                  <span class="startRadio__img"></span>
                </label>
                <label class="startRadio__box">
                  <input type="radio" name="star2" id="" />
                  <span class="startRadio__img"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="bottom">
            정말 너무나도 완벽한 서비스였어요. 환상적입니다. 꼭 추천드려요.
            남자들의 핏이 이렇게 중요한 부분 이었어요. 사이즈가 모두 변경되고,
            여자친구가 정말 너무나도 완벽한 서비스였어요. 환상적입니다. 꼭
            추천드려요. 남자들의 핏이 이렇게 중요한 부분 이었어요. 사이즈가 모두
            변경되고, 여자친구가
          </div>
          <div class="photo">
            <div class="photo-wrap">
              <img src="../../public/images/image.png" alt="" />
            </div>
          </div>
        </li> -->
      </ul>

      <button type="button" class="btn btn-more white" @click="getMoreItem">
        더보기 {{ itemList.length }} / {{ itemCount }}
      </button>

      <div class="btn-wrap fixed">
        <button
          type="button"
          class="btn btn-full btn-primary"
          @click="popupState = true"
        >
          1:1 스타일링 신청하기
        </button>
      </div>
    </div>
    <div v-if="popupState" class="bottom-fixed type2">
      <div class="content-top center">
        <h2 class="tit">1:1 스타일링 신청</h2>
        <button type="button" class="btn close" @click="closePopup"></button>
      </div>
      <ul class="text-list sm">
        <li class="text-list--item">
          <span class="left">이름</span>
          <span class="right">{{ $store.state.user.Name }}</span>
        </li>
        <li class="text-list--item">
          <span class="left">휴대폰 번호</span>
          <span class="right">{{ $store.state.user.Contact }}</span>
        </li>
        <li class="text-list--item">
          <span class="left">이메일</span>
          <span class="right">{{ $store.state.user.Username }}</span>
        </li>
        <li class="text-list--item">
          <span class="left">문의</span>
          <span class="right">1:1 스타일링 신청</span>
        </li>
        <li class="text-list--item">
          <span class="left">제목</span>
          <span class="right">[1:1] 스타일링 신청</span>
        </li>
      </ul>

      <div class="line d-grey m-t--0"></div>

      <div class="input-wrap type2">
        <label class="input-label">내용</label>
        <div class="right">
          <div class="textarea-wrap">
            <textarea
              class="textarea"
              rows="5"
              placeholder="문의 내용을 작성해주세요"
              v-model="Content"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="input-wrap type2 m-b--10">
        <label class="input-label">첨부파일</label>
        <div class="right">
          <label class="btn-file">
            파일 첨부하기
            <input type="file" id="st_di_ap" @change="fileSizeCheck" multiple />
          </label>
        </div>
      </div>
      <!-- <div v-for="(ff, idx) in files" :key="'asdas' + idx">
        {{ ff.name }} <button @click="delFile(idx)">x</button>
      </div> -->

      <div class="input-wrap type2 m--0">
        <label class="input-label"></label>
        <div class="right">
          <p class="font-color--grey">
            JPG, JPEG, PNG, PDF파일을 5MB 이하로 등록
          </p>
        </div>
      </div>

      <div class="btn-wrap m--0">
        <button
          type="button"
          class="btn btn-full btn-primary"
          @click="sendApply"
        >
          1:1 스타일링 신청하기
        </button>
      </div>
    </div>
    <div v-if="popupState" class="dim" @click="popupState = false"></div>
  </div>
</template>

<script>
export default {
  name: "StylingDirect",
  components: {},
  data() {
    return {
      popupState: false,
      Content: "",
      files: [],
      itemCount: 0,
      page: 1,
      itemList: [],
    };
  },
  created() {
    this.getReview();
  },
  methods: {
    getReview() {
      this.$apiGET("/api/persnal/review?page=1").then(({ data }) => {
        this.itemList = data.contents;
        this.itemCount = data.itemCount.ItemCount;
      });
    },
    getMoreItem() {
      if (this.itemList.length < this.itemCount) {
        this.$apiGET("/api/persnal/review?page=" + (this.page + 1)).then(
          ({ data }) => {
            this.itemList.push(...data.contents);
            this.itemCount = data.itemCount.ItemCount;
            this.page++;
          }
        );
      }
    },
    sendApply() {
      this.$apiFORM(
        "/api/persnal/form",
        {
          Type: "1:1 스타일링",
          Title: "[1:1] 스타일링 신청",
          Content: this.Content,
        },
        this.files
      ).then((re) => {
        if (re != undefined) {
          this.$store.commit(
            "updateError",
            "문의 내역이 등록 되었습니다.\n유아더 서비스팀에서 고객님께 빠른 시일내로 연락 드리겠습니다!"
          );
        }
        this.closePopup();
      });
    },
    closePopup() {
      document.getElementById("st_di_ap").value = "";
      this.Content = "";
      this.popupState = false;
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
    delFile(idx) {
      const dataTransfer = new DataTransfer();
      let fileArray = Array.from(this.files);

      fileArray.splice(idx, 1);
      fileArray.forEach((file) => {
        dataTransfer.items.add(file);
      });

      document.getElementById("st_di_ap").files = dataTransfer.files;
      this.files = document.getElementById("st_di_ap").files;
    },
    fileSizeCheck() {
      if (document.getElementById("st_di_ap").value != "") {
        this.files = document.getElementById("st_di_ap").files;
        const maxSize = 5 * 1024 * 1024;

        if (this.files.length > 5) {
          alert("최대 5개");
          document.getElementById("st_di_ap").value = "";
          return;
        }

        for (let i = 0; i < this.files.length; i++) {
          if (this.files[i].size > maxSize) {
            alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다. ");
            document.getElementById("st_di_ap").value = "";
            return;
          }
        }
      }
    },
  },
};
</script>
