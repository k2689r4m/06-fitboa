import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";

import Admin from "../views/Admin.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import FindId from "../views/FindId.vue";
import FindIdResult from "../views/FindIdResult.vue";
import FindPass from "../views/FindPass.vue";
import FindPassResult from "../views/FindPassResult.vue";
import ChangePass from "../views/ChangePass.vue";
import Join from "../views/Join.vue";
import JoinSub from "../views/JoinSub.vue";
import JoinCom from "../views/JoinCom.vue";
import Story from "../views/Story.vue";
import Styling from "../views/Styling.vue";
import StylingDetail from "../views/StylingDetail.vue";
import StylingDirect from "../views/StylingDirect.vue";
import StylingDirectDetail from "../views/StylingDirectDetail.vue";
import Detail from "../views/Detail.vue";
import BodyType from "../views/BodyType.vue";
import MyPage from "../views/MyPage.vue";
import MySub from "../views/MySub.vue";
import MySub2 from "../views/MySub2.vue";
import MySubCancel from "../views/MySubCancel.vue";
import MyPayList from "../views/MyPayList.vue";
import MyPayDetail from "../views/MyPayDetail.vue";
import MyPayCancel from "../views/MyPayCancel.vue";
import MyBodyType from "../views/MyBodyType.vue";
import MyBodySize from "../views/MyBodySize.vue";
import MyBodySelect from "../views/MyBodySelect.vue";
import MyInfo from "../views/MyInfo.vue";
import MyCheck from "../views/MyCheck.vue";
import MySecession from "../views/MySecession.vue";
import MySecessionComplete from "../views/MySecessionComplete.vue";
import MyCard from "../views/MyCard.vue";
import MyPromotion from "../views/MyPromotion.vue";
import MyStylingReview from "../views/MyStylingReview.vue";
import MyStylingReviewWrite from "../views/MyStylingReviewWrite.vue";
import Bookmark from "../views/Bookmark.vue";
import MyInquiry from "../views/MyInquiry.vue";
import MyInquiryWrite from "../views/MyInquiryWrite.vue";
import MyFAQ from "../views/MyFAQ.vue";
import MyCS from "../views/MyCS.vue";
import MyNotice from "../views/MyNotice.vue";
import MyNoticeDetail from "../views/MyNoticeDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { unauthorized: 0 },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { unauthorized: 0 },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { unauthorized: -1 },
  },
  {
    path: "/findId",
    name: "FindId",
    component: FindId,
    meta: { unauthorized: -1 },
  },
  {
    path: "/findId/result",
    name: "FindIdResult",
    component: FindIdResult,
    meta: { unauthorized: -1 },
  },
  {
    path: "/findPass",
    name: "FindPass",
    component: FindPass,
    meta: { unauthorized: -1 },
  },
  {
    path: "/findPass/result",
    name: "FindPassResult",
    component: FindPassResult,
    meta: { unauthorized: -1 },
  },
  {
    path: "/changePass",
    name: "ChangePass",
    component: ChangePass,
    meta: { unauthorized: 1 },
  },
  {
    path: "/join",
    name: "Join",
    component: Join,
    meta: { unauthorized: -1 },
  },
  {
    path: "/join/sub",
    name: "JoinSub",
    component: JoinSub,
    meta: { unauthorized: 1 },
  },
  {
    path: "/join/com",
    name: "JoinCom",
    component: JoinCom,
    meta: { unauthorized: 1 },
  },
  {
    path: "/story",
    name: "Story",
    component: Story,
    meta: { unauthorized: 0 },
  },
  {
    path: "/styling",
    name: "Styling",
    component: Styling,
    meta: { unauthorized: 0 },
  },
  {
    path: "/styling/detail",
    name: "StylingDetail",
    component: StylingDetail,
    meta: { unauthorized: 0 },
  },
  {
    path: "/styling/direct",
    name: "StylingDirect",
    component: StylingDirect,
    meta: { unauthorized: 0 },
  },
  {
    path: "/styling/direct/detail",
    name: "StylingDirectDetail",
    component: StylingDirectDetail,
    meta: { unauthorized: 0 },
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
    meta: { unauthorized: 0 },
  },
  {
    path: "/bodytype",
    name: "BodyType",
    component: BodyType,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/sub",
    name: "MySub",
    component: MySub,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/sub2",
    name: "MySub2",
    component: MySub2,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/sub/cancel",
    name: "MySubCancel",
    component: MySubCancel,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/pay",
    name: "MyPayList",
    component: MyPayList,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/pay/detail",
    name: "MyPayDetail",
    component: MyPayDetail,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/pay/cancel",
    name: "MyPayCancel",
    component: MyPayCancel,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/bodytype",
    name: "MyBodyType",
    component: MyBodyType,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/bodytype/size",
    name: "MyBodySize",
    component: MyBodySize,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/bodytype/select",
    name: "MyBodySelect",
    component: MyBodySelect,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/info",
    name: "MyInfo",
    component: MyInfo,
    meta: { unauthorized: 1 },
  },
  {
    //password check
    path: "/mypage/check",
    name: "MyCheck",
    component: MyCheck,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/secession",
    name: "MySecession",
    component: MySecession,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/secession/complete",
    name: "MySecessionComplete",
    component: MySecessionComplete,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/card",
    name: "MyCard",
    component: MyCard,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/promotion",
    name: "MyPromotion",
    component: MyPromotion,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/stylingreview",
    name: "MyStylingReview",
    component: MyStylingReview,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/stylingreview/write",
    name: "MyStylingReviewWrite",
    component: MyStylingReviewWrite,
    meta: { unauthorized: 1 },
  },
  {
    path: "/bookmark",
    name: "Bookmark",
    component: Bookmark,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/inquiry",
    name: "MyInquiry",
    component: MyInquiry,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/inquiry/write",
    name: "MyInquiryWrite",
    component: MyInquiryWrite,
    meta: { unauthorized: 1 },
  },
  {
    path: "/mypage/faq",
    name: "MyFAQ",
    component: MyFAQ,
    meta: { unauthorized: 0 },
  },
  {
    path: "/mypage/cs",
    name: "MyCS",
    component: MyCS,
    meta: { unauthorized: 0 },
  },
  {
    path: "/mypage/notice",
    name: "MyNotice",
    component: MyNotice,
    meta: { unauthorized: 0 },
  },
  {
    path: "/mypage/notice/detail",
    name: "MyNoticeDetail",
    component: MyNoticeDetail,
    meta: { unauthorized: 0 },
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (
    to.matched.some(
      (record) => record.meta.unauthorized == -1 && VueCookies.get("FL")
    )
  ) {
    return next("/");
  } else if (
    to.matched.some(
      (record) => record.meta.unauthorized == 1 && VueCookies.get("FL") == null
    )
  ) {
    return next("/");
  } else {
    return next();
  }
});

export default router;
