import { shallowMount } from "@vue/test-utils";
import store from "@/store/";
import AppAnswerDeleteButton from "@/components/homework/AppAnswerDeleteButton.vue";
import MockDate from "mockdate";

const mount = (answer) => shallowMount(AppAnswerDeleteButton, { store, propsData: { answer } });

describe("AppAnswerDeleteButton", () => {
  let answer;

  beforeEach(() => {
    MockDate.set("2032-12-01 15:30:45");
  });
  beforeEach(() => {
    answer = {
      created: "2032-12-01T15:25:25",
      slug: "62ed83a2-fb7c-4eea-be02-dfe1ba286f66",
      question: "77ea8889-130c-4a7d-892f-dfe1ba286f66",
      author: { uuid: "77ea8889-130c-4a7d-892f-dfe1ba286f66", first_name: "Львович", last_name: "Сидоров" },
      desdendants: [],
    };
  });
  beforeEach(() => {
    store.commit("auth/SET_USER", { uuid: "77ea8889-130c-4a7d-892f-dfe1ba286f66" });
  });

  it("Is deletable when author matches and date is not further then 30 min", () => {
    const wrapper = mount(answer);

    expect(wrapper.vm.isDeletable).toBeTruthy();
  });

  it("Is not deletable when author does not match", () => {
    store.commit("auth/SET_USER", { uuid: "Ev1l" });

    const wrapper = mount(answer);

    expect(wrapper.vm.isDeletable).toBeFalsy();
  });

  it("Is not deletable when created before 30 min till now", () => {
    MockDate.set("2032-12-01 18:30:00");

    const wrapper = mount(answer);

    expect(wrapper.vm.isDeletable).toBeFalsy();
  });
});
