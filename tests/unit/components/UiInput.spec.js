import { shallowMount } from "@vue/test-utils";
import UiInput from "@/components/ui-kit/UiInput.vue";

const mount = (options) => shallowMount(UiInput, options);

describe("UiInput", () => {
  let propsData;

  beforeEach(() => {
    propsData = {
      nativeProps: {
        id: "email",
        value: "a@a.com",
        type: "text",
      },
      isInvalid: true,
      bottomText: "inputButtonText",
      hasAutofocus: true,
      label: "awesome label",
    };
  });

  it("Has valid id for label if we pass native input id", () => {
    const wrapper = mount({ propsData });
    expect(wrapper.vm.labelFor).toBe("email");
  });

  it("Has id value for label if we don't pass native input id", () => {
    const newProps = { ...propsData, nativeProps: {} };
    const wrapper = mount({ propsData: newProps });
    expect(wrapper.vm.labelFor).toBeTruthy();
  });

  it("Has autofocus after mount", () => {
    const wrapper = mount({ propsData, attachTo: document.body });
    const input = wrapper.find("input").element;
    expect(document.activeElement).toBe(input);
    document.activeElement.blur();
  });

  it("Has no autofocus after mount", () => {
    const newProps = { ...propsData, hasAutofocus: false };
    const wrapper = mount({ newProps, attachTo: document.body });
    const input = wrapper.find("input").element;
    expect(document.activeElement).not.toBe(input);
  });
});
