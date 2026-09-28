<template>
  <div id="app">
    <HeaderMenu></HeaderMenu>
    <router-view />
    <FooterMenu></FooterMenu>
  </div>
</template>

<style></style>

<script>
import HeaderMenu from "@/components/HeaderMenu.vue";
import FooterMenu from "@/components/FooterMenu.vue";

export default {
  name: "Login",
  components: {
    HeaderMenu,
    FooterMenu,
  },
  data() {
    return {
      page: 1,
      list: [],
      settings: {
        arrows: false,
        dots: true,
        // edgeFriction: 0.35,
        // infinite: false,
        // speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1,
      },
    };
  },
  methods: {},
};
</script>
