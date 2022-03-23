<template>
  <div class="home mt-1 ms-3 me-3">
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-4 col-sm-6">
        <div class="row">
          <div class="submit-button" @click="this.$router.push('/vote/create')">
            <div
              class="row p-1 border border-1 border-end bg-light"
              style="min-height: 75px"
            >
              <div
                class="col-3 border border-1 border-secondary bg-custom-gray d-flex justify-content-center rounded-2"
              >
                <i
                  class="bi bi-plus-lg d-flex align-items-center"
                  style="font-size: 30px"
                ></i>
              </div>
              <div
                style="font-size: 23px"
                class="col-9 d-flex justify-content-center align-items-center text-uppercase fw-bold"
              >
                Submit A Link
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-2 mb-2">
          <div class="border border-1 bg-custom-gray"></div>
        </div>
        <div class="row p-0 mt-0 mt-lg-2 mt-xl-2">
          <div class="col-5 p-0">
            <FormKit
              ref="form1"
              type="form"
              :form-class="'p-1 p-lg-2 p-xl-2 m-0'"
              :value="this.formValue"
              validation="required"
              :actions="false"
            >
              <FormKit
                v-model="this.formValue.orderBy"
                type="select"
                name="country"
                :changeMenuState="changeDetect()"
                :options="filterList"
              />
            </FormKit>
          </div>
        </div>
        <div class="row p-1 gap-3">
          <div
            class="col-12 item p-3 border border-gray border-1 p-3"
            v-for="item in this.getItemList"
            :key="item"
          >
            <div class="row gap-0" style="min-height: 80px">
              <div class="col-4 col-sm-3 col-md-3 col-xl-3 ps-1 pt-0 pe-0">
                <div
                  class="col-3 w-100 h-100 border border-1 border-secondary bg-custom-gray gap-0 d-flex flex-column justify-content-center rounded-2 d-flex align-items-center text-center"
                >
                  <div class="fs-3 lh-1 fw-bold">{{ item?.point }}</div>
                  <div class="fw-lighter lh-1">POINTS</div>
                </div>
              </div>
              <div class="col-8 col-sm-9 col-md-9 col-xl-9">
                <div class="row d-flex flex-row justify-content-between h-100">
                  <div class="col-12 d-flex flex-column gap-0">
                    <div class="fs-5 lh-1 fw-bold text-truncate">
                      {{ item?.title }}
                    </div>
                    <small-text class="text-truncate"
                      >({{ item?.url }})
                    </small-text>
                  </div>
                  <div
                    class="col-6 align-items-end d-flex justify-content-start text-center vote-button"
                    @click="vote('up', item.id)"
                  >
                    <i class="bi bi-arrow-up-short lh-1"></i>
                    <small-text>up vote</small-text>
                  </div>
                  <div
                    class="col-6 align-items-end d-flex justify-content-start text-center vote-button"
                    @click="vote('down', item.id)"
                  >
                    <i class="bi bi-arrow-down-short lh-1"></i>
                    <small-text>down vote</small-text>
                  </div>
                </div>
              </div>
              <div
                href="#"
                class="del"
                data-bs-toggle="modal"
                data-bs-target="#deletePopup"
                @click="this.selectedItem = item"
              >
                <img src="../../../public/img/icons/minus.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="row d-flex align-items-center justify-content-center mt-3">
          <div class="col-9 fs-5 fw-bold">
            <div class="row p-0">
              <div class="col-auto p-0 text-end plus-button" @click="minus()">
                <i class="bi bi-chevron-left"></i>
              </div>
              <div class="col-8 p-0 text-center">
                <div class="d-flex flex-row gap-2 justify-content-center">
                  <div
                    class="p-0 pagination-item"
                    v-for="item in getPaginatorCalculatedList()"
                    :key="item"
                    @click="selectCurrentPagingItem(item)"
                    v-bind:class="{
                      'active-paginator': this.paginator.current === item,
                    }"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <div
                class="col-auto p-0 text-start bi bi-chevron-right minus-button"
                @click="plus()"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Delete Model -->
  <div
    class="modal fade"
    id="deletePopup"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="bg-dark d-flex text-white p-2 justify-content-between">
            <div class="">Remove Link</div>
            <div
              class=""
              style="cursor: pointer"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              X
            </div>
          </div>
          <div class="d-flex flex-column text-center bg-custom-gray p-4">
            <strong class="text-secondary"
              >Do You want to delete remove:</strong
            >
            <h2 class="text-uppercase">{{ this.selectedItem?.title }}</h2>
            <div class="d-flex gap-2 d-block justify-content-center">
              <button
                class="btn btn-dark rounded-pill border border-1 border-dark col-3"
                type="button"
                @click="deleteSelectedItem()"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                OK
              </button>
              <button
                class="btn btn-dark rounded-pill border border-1 border-dark col-3"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const paginatorSettings = {
  current: 1,
  list: [],
  total: 0,
};
export default {
  name: "List",
  components: {},
  created() {
    this.$store.dispatch("getVoteItems", this.formValue?.orderBy);
    this.paginator.total = this.$store.state.voteItems?.length;
    this.paginator.pageCount = Math.floor(
      this.$store.state.voteItems?.length / 5
    );
  },
  data() {
    return {
      filterList: [
        { label: "Order by ", value: 0 },
        { label: "Most Voted ( Z -> A )", value: 2 },
        { label: "Less Voted ( A -> Z )", value: 1 },
      ],
      formValue: {
        orderBy: null,
      },
      values: [],
      formData: {
        items: [],
      },
      testData: [],
      selectedItem: null,
      paginator: {
        current: paginatorSettings.current,
        list: paginatorSettings.list,
        total: null,
        pageCount: null,
        startIndex: 0,
        endIndex: 5,
      },
    };
  },
  methods: {
    vote(type, id) {
      if (type === "up") {
        this.$store.dispatch("voteUp", id);
      } else if (type == "down") {
        this.$store.dispatch("voteDown", id);
      }
    },
    deleteSelectedItem() {
      console.log(this.selectedItem);
      this.$store.dispatch("deleteItem", this.selectedItem?.id);
      this.$toast.success(this.selectedItem?.title + " Deleted", {
        position: "top",
      });
    },
    changeDetect() {
      this.$store.dispatch("getVoteItems", this.formValue.orderBy);
    },
    minus() {
      if (
        this.paginator.current > 1 &&
        this.getPaginatorCalculatedList().includes(this.paginator.current - 1)
      ) {
        this.paginator.current -= 1;
        this.selectCurrentPagingItem(this.paginator.current);
      }
    },
    plus() {
      if (
        this.paginator.current < this.paginator.total &&
        this.getPaginatorCalculatedList().includes(this.paginator.current + 1)
      ) {
        this.paginator.current += 1;
        this.selectCurrentPagingItem(this.paginator.current);
      }
    },
    selectCurrentPagingItem(item) {
      this.paginator.current = item;
      this.paginator.startIndex = (item - 1) * 5;
      this.paginator.endIndex = item * 5;
    },
    getPaginatorCalculatedList() {
      let returnedList = [];
      for (let i = 0; i <= this.paginator.pageCount; i++) {
        returnedList.push(i + 1);
      }
      return returnedList;
    },
  },
  computed: {
    getItemList() {
      return this.$store.state.voteItems?.slice(
        this.paginator.startIndex,
        this.paginator.endIndex
      );
    },
  },
};
</script>

<style lang="scss">
.submit-button {
  cursor: pointer;

  &:hover {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  }
}

.vote-button {
  cursor: pointer;

  i {
    color: #919191;
  }

  &:hover {
    margin-bottom: 2px;
  }
}

.plus-button {
  cursor: pointer;

  &:hover {
    zoom: 1.1;
  }
}

.minus-button {
  cursor: pointer;

  &:hover {
    zoom: 1.1;
  }
}

.pagination-item {
  cursor: pointer;
  color: gray;

  &:hover {
    transition: 1.1s;
    transform: scale(1.1);
    color: black;
  }
}

.active-paginator {
  border: 1px solid gray;
  width: 30px;
  height: 30px;
  text-align: center;
  color: black;
}

.item {
  position: relative;

  &:hover {
    background-color: #efefef;
    border-radius: 5px;
    cursor: pointer;

    .del {
      display: flex;
    }
  }

  .del {
    display: none;
    float: right;
    margin: 5px 5px 0 0;
    position: absolute;
    bottom: 100px;
    left: 20px;
    justify-content: end;

    div {
      border: 1px solid;
      border-radius: 50%;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
