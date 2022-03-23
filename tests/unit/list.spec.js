import List from "../../src/views/vote/list.vue";
import {  shallowMount  } from "@vue/test-utils";
import generalStore from "../../src/store";

const testData = {
  id: 1,
  point: 0,
  title: 'test',
  url: 'test',
  createAt: new Date(),
};

describe("List.vue", () => {
  let store;
  beforeEach(() => {
    store = generalStore;
    const list = JSON.parse(localStorage?.getItem("voteList")) || [];
    list.push(testData)
    localStorage?.setItem("voteList",list)
  })

  it("Test Vote Up", () => {
    // yeni bir data ekledigimizde lengt'i 1 artmış olması gerekiyor
    const wrapper = shallowMount(List,{
      global:{
        plugins:[store]
      }
    });
    const list = JSON.parse(localStorage?.getItem("voteList")) || [];
    console.log(list);
    const selectedItem = list?.find(res=>res.id === testData.id);
    wrapper.vm.vote("up",testData?.id);
    const lastList = JSON.parse(localStorage?.getItem("voteList")) || [];
    const afterVoteItem = lastList.find(res=>res.id === testData.id);
    expect(selectedItem?.point).toBe(afterVoteItem?.point +1 )
  });


});
