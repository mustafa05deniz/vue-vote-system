import CreateVote from "../../src/views/vote/CreateVote.vue";
import {  shallowMount  } from "@vue/test-utils";

import generalStore from "@/store";

const testData = {
  id: 1,
  point: 0,
  title: 'test',
  url: 'test',
  createAt: new Date(),
};

describe("CreateVote.vue", () => {
  let store;
  beforeEach(() => {
     store = generalStore;
  })

  it("Create Data Test", () => {
    // yeni bir data ekledigimizde lengt'i 1 artmış olması gerekiyor
    const wrapper = shallowMount(CreateVote,{
      global:{
        plugins:[store]
      }
    });
    const list = JSON.parse(localStorage?.getItem("voteList")) || [];
    wrapper.vm.create(testData);
    const lastList = JSON.parse(localStorage?.getItem("voteList")) || [];
    expect(lastList.length).toBe(list.length+1)
  });

  it("Create Same title name Test", () => {
    // eğer aynı title ile gönderildiğinde eklememesi lazım length aynı kalması gerekiyor
    const wrapper = shallowMount(CreateVote,{
      global:{
        plugins:[store]
      }
    });
    const list = JSON.parse(localStorage?.getItem("voteList")) || [];
    wrapper.vm.create(testData);
    const lastList = JSON.parse(localStorage?.getItem("voteList")) || [];
    expect(lastList.length).toBe(list.length)
  });

});
