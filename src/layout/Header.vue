<template>
  <div class="row">
    <div class="col-auto col-lg-6 col-xl-6 logo d-flex flex-row">
      <div class="text-black-50 text-capitalize">{{ title }}</div>
      .
      <div>{{ subTitle }}</div>
    </div>
    <div
      class="col-auto col-lg-6 col-xl-6 name d-flex flex-row justify-content-end"
    >
      <div class="fw-bold">Link</div>
      <div class="text-black-50 text-capitalize">{{ header }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "subTitle", "header"],
  name: "Header",
  methods: {
    toogleMenu() {
      this.$store.dispatch("changeMenuState");
    },
  },
};
</script>
<style lang="scss" scoped>
.logo {
  font-weight: 900;
  letter-spacing: -1px;
}
</style>
