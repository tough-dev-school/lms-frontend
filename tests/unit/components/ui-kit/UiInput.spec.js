import { shallowMount } from "@vue/test-utils";

import UiInput from "@/components/ui-kit/UiInput.vue";

describe("UiInput", () => {
  let wrapper;

  const findInput = () => wrapper.find("input");

  const createComponent = (options) => {
    wrapper = shallowMount(UiInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  const INPUT_ID = "email";
  it("Has valid connection between input and label if we pass native id", () => {
    const propsData = { nativeProps: { id: INPUT_ID } };
    createComponent({ propsData, attachTo: document.body });

    const label = wrapper.find(`[for='${INPUT_ID}']`);
    expect(label.exists()).toBe(true);

    const input = wrapper.find(`[id='${INPUT_ID}']`);
    expect(input.exists()).toBe(true);
  });

  const PART_OF_DEFAULT_ID = "input-";
  it("Has valid connection between input and label if we don't pass native input id", async () => {
    createComponent({ attachTo: document.body });

    const label = wrapper.find(`[for*='${PART_OF_DEFAULT_ID}']`);
    expect(label.exists()).toBe(true);

    const input = wrapper.find(`[id*='${PART_OF_DEFAULT_ID}']`);
    expect(input.exists()).toBe(true);
  });

  it("Has autofocus after mount", () => {
    const propsData = { hasAutofocus: true };
    createComponent({ propsData, attachTo: document.body });
    const input = findInput();

    expect(document.activeElement).toBe(input.element);
  });

  it("Has no autofocus after mount", () => {
    const propsData = { hasAutofocus: false };
    createComponent({ propsData, attachTo: document.body });
    const input = findInput();

    expect(document.activeElement).not.toBe(input.element);
  });
});
