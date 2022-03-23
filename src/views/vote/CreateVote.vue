<template>
  <div class="home mt-2">

    <div class="row justify-content-md-center">
      <div class="col-xl-4 col-lg-4 col-sm-6">
        <div class="row">
          <div class="col-auto d-flex align-items-center gap-2">
            <i
              class="bi bi-arrow-left-short fs-3 return-button"
              @click="this.$router.push('/vote/')"
            ></i>
            <div class="fw-bold">Return To List</div>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-12">
            <div class="p-2 fw-bold fs-2">Add New Link</div>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-12">
            <FormKit
              type="form"
              :form-class="'p-2'"
              :value="this.formValue"
              validation="required"
              :actions="false"
            >
              <FormKit
                type="text"
                name="name"
                v-model="this.formValue.name"
                label="Link Name:"
                placeholder="e.g. Alphabet"
                validation="required"
              />
              <FormKit
                type="text"
                name="url"
                outer-class="pt-3"
                v-model="this.formValue.url"
                label="Link Url:"
                placeholder="e.g. http://abc.xyz"
                validation="required"
              />
            </FormKit>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12 d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-dark rounded-pill border border-1 border-dark"
              @click="submit()"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateVote",
  components: {},
  data() {
    return {
      formValue: {
        name: "",
        url: "",
      },
    };
  },
  methods: {
    submit(){
      const list = JSON.parse(localStorage?.getItem("voteList")) || [];
      const data = {
        id: list?.length + 1,
        point: 0,
        title: this.formValue?.name || null,
        url: this.formValue?.url,
        createAt: new Date(),
      };
      this.create(data);
    },
    create(data) {
      if(!data){
        return
      }
      const list = JSON.parse(localStorage?.getItem("voteList")) || [];
      const founded = list.find(res => res?.title === data.title);
      if (!founded) {
        this.$store.dispatch("addNewItem", data);

        this.$toast?.success(data.title + " Added", {
          position: "top",
        });

      } else {

        this.$toast?.error(
          ' " ' + data.title + '"' + " already added",
          {
            position: "top",
          }
        );

      }
    },
  },
};
</script>

<style scoped lang="scss">
.return-button {
  cursor: pointer;
}
</style>
