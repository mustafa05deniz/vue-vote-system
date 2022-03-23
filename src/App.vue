<template>
  <div
    class="container d-flex flex-row h-100 w-100 justify-content-between overflow-hidden"
  >
    <div class="p-3 d-flex flex-column h-100 w-100 justify-content-between">
      <div
        class="header border border-1 border-dark border-start-0 border-end-0 border-top-0"
      >
        <Header :title="title" :subTitle="subTitle" :header="header" />
      </div>
      <div class="pt-3 d-flex flex-row gap-3 overflow-auto h-100 w-100">
        <div class="d-flex flex-column flex-wrap h-100 w-100">
          <router-view></router-view>
        </div>
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./layout/Header.vue";
import Footer from "./layout/Footer.vue";

export default {
  name: "mdApp",
  components: {
    Header,
    Footer,
  },
  data: () => {
    return {
      a: 1,
      title: "hepsiburada",
      subTitle: "com",
      header: "VOTE Challange",
    };
  },
  created() {},
};
</script>

<style lang="scss">
@import "./style.scss";

.header {
  font-size: x-large;
}
</style>
