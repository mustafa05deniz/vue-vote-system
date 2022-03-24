import List from "../../src/views/vote/list.vue";
import {  shallowMount  } from "@vue/test-utils";
import generalStore from "../../src/store";
import CreateVote from "@/views/vote/CreateVote";

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
    const wrapper = shallowMount(CreateVote,{
      global:{
        plugins:[store]
      }
    });
    wrapper.vm.create(testData);
  })

  it("Test Vote Up", () => {
    //  item'ın puanını artırdığını test ediyor
    const wrapper = shallowMount(List,{
      global:{
        plugins:[store]
      }
    });
    const list = JSON.parse(localStorage?.getItem("voteList")) || [];
    const selectedItem = list?.find(res=>res.id === testData.id);
    wrapper.vm.vote("up",testData?.id);
    const lastList = JSON.parse(localStorage?.getItem("voteList")) || [];
    const afterVoteItem = lastList.find(res=>res.id === testData.id);
    expect(selectedItem?.point +1 ).toBe(afterVoteItem?.point )
  });

  it("Test Vote Down", () => {
    //  item'ın puanını azaltıldığını test ediyor
    const wrapper = shallowMount(List,{
      global:{
        plugins:[store]
      }
    });
    const list = JSON.parse(localStorage?.getItem("voteList")) || [];
    const selectedItem = list?.find(res=>res.id === testData.id);
    wrapper.vm.vote("down",testData?.id);
    const lastList = JSON.parse(localStorage?.getItem("voteList")) || [];
    const afterVoteItem = lastList.find(res=>res.id === testData.id);
    expect(selectedItem?.point -1 ).toBe(afterVoteItem?.point )
  });

  it("Test Vote Down For Zero Item", () => {
    // puanı sıfır olan bir item'ın puan düşürmeyi test ediyor
    const wrapper = shallowMount(List,{
      global:{
        plugins:[store]
      }
    });
    const list = JSON.parse(localStorage?.getItem("voteList")) || [];
    const selectedItem = list?.find(res=>res.id === testData.id);
    console.log(selectedItem);
    wrapper.vm.vote("down",testData?.id);
    const lastList = JSON.parse(localStorage?.getItem("voteList")) || [];
    const afterVoteItem = lastList.find(res=>res.id === testData.id);
    expect(selectedItem?.point ).not.toEqual(afterVoteItem?.point -1)
  });


});
