import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";

import UiPopup from "@/components/ui-kit/UiPopup.vue";

describe("UiPopup", () => {
  let wrapper;

  const findOverlay = () => wrapper.findAll("div").wrappers.at(0);
  const findButtonClose = () => wrapper.find("[aria-label='закрыть']");
  const openPopup = () => wrapper.vm.open();

  const createComponent = () => {
    wrapper = shallowMount(UiPopup, { attachTo: document.body });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is not exists when initiallized", () => {
    createComponent();
    const overlay = findOverlay();

    expect(overlay).toBe(undefined);
  });

  it("is exists when after open invoke", async () => {
    createComponent();

    openPopup();
    await nextTick();

    expect(findOverlay().exists()).toBe(true);
  });

  const ESC_KEY_CODE = 27;
  it("closed by ESC press", async () => {
    createComponent();
    openPopup();
    await nextTick();

    const event = new KeyboardEvent("keydown", {
      keyCode: ESC_KEY_CODE,
    });

    document.dispatchEvent(event);
    await nextTick();

    expect(findOverlay()).toBe(undefined);
  });

  it("closed by button close click", async () => {
    createComponent();
    openPopup();
    await nextTick();

    await findButtonClose().trigger("click");

    expect(findOverlay()).toBe(undefined);
  });

  it("closed by overlay click", async () => {
    createComponent();
    openPopup();
    await nextTick();

    const overlay = findOverlay();
    overlay.trigger("click");
    await nextTick();

    expect(findOverlay()).toBe(undefined);
  });

  it("removes attached event listener when destroyed", async () => {
    jest.spyOn(document, "addEventListener");
    jest.spyOn(document, "removeEventListener");
    createComponent();

    openPopup();
    await nextTick();
    const [, keyDownListener] = document.addEventListener.mock.calls.find(([key]) => key === "keydown");

    expect(document.removeEventListener).not.toHaveBeenCalledWith("keydown", keyDownListener);

    await findButtonClose().trigger("click");

    expect(document.removeEventListener).toHaveBeenCalledWith("keydown", keyDownListener);
  });
});
