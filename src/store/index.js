import { createStore } from "vuex";

export default createStore({
  state: {
    voteItems: [],
    orderType: null,
  },
  mutations: {
    setVoteList: (state, values) => {
      state.voteItems = values;
    },
    setOrderType: (state, values) => {
      state.orderType = values;
    },
  },
  getters:{
    voteItems: (state) =>{
      return state.voteItems
    }
  },
  actions: {
    addNewItem({ dispatch, state }, data) {
      const list =
        state.voteItems?.length > 0
          ? state.voteItems
          : JSON.parse(localStorage.getItem("voteList"))
          ? JSON.parse(localStorage.getItem("voteList"))
          : [];
      list.push(data);
      localStorage.setItem("voteList", JSON.stringify(list));
      dispatch("getVoteItems");
    },
    getVoteItems({ commit }, orderType) {
      if (orderType) {
        commit("setOrderType", orderType);
      }
      const list =JSON.parse(localStorage.getItem("voteList"))|| []

      if (orderType === "1") {
        list?.sort((a, b) => {
          return a.point - b.point;
        });
        commit("setVoteList", list);
      } else if (orderType === "2") {
        list?.sort((a, b) => {
          return b.point - a.point;
        });
        commit("setVoteList", list);
      } else {
        list?.sort((a, b) => {
          if (a?.point === b?.point) {
            return (
              new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime()
            );
          }
          return (
            new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          );
        });
        commit("setVoteList", list);
      }
    },
    voteUp({ dispatch, state }, id) {
      const list = JSON.parse(localStorage.getItem("voteList"));
      list[list?.findIndex((res) => res.id === id)].point += 1;
      list[list?.findIndex((res) => res.id === id)].updateAt = new Date();
      localStorage.setItem("voteList", JSON.stringify(list));
      dispatch("getVoteItems", state.orderType);
    },
    voteDown({ dispatch, state }, id) {
      const list = JSON.parse(localStorage.getItem("voteList"));
      if (list[list.findIndex((res) => res.id === id)].point > 0) {
        list[list.findIndex((res) => res.id === id)].point -= 1;
        list[list.findIndex((res) => res.id === id)].updateAt = new Date();
        localStorage.setItem("voteList", JSON.stringify(list));
      }
      dispatch("getVoteItems", state.orderType);
    },
    deleteItem({ dispatch }, id) {
      const list = JSON.parse(localStorage.getItem("voteList"));
      list.splice(
        list.findIndex((res) => res.id == id),
        1
      );
      localStorage.setItem("voteList", JSON.stringify(list));
      dispatch("getVoteItems");
    },
  },
  modules: {},
});
