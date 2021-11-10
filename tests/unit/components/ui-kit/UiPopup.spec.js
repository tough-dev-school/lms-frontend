import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";

import UiPopup from "@/components/ui-kit/UiPopup.vue";

describe("UiPopup", () => {
  let wrapper;

  const findOverlay = () => wrapper.findAll("div").wrappers.at(0);
  const findButtonClose = () => wrapper.find("[aria-label='закрыть']");
  const findButtonByText = (text) => wrapper.findAll("button").wrappers.find((w) => w.text() === text);

  const openPopup = () => wrapper.vm.open();

  const createComponent = () => {
    wrapper = shallowMount(UiPopup, {
      scopedSlots: {
        default(props) {
          return (
            <div>
              <button onClick={props.close}>закрыть</button>
              <button onClick={props.confirm}>ок</button>
            </div>
          );
        },
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is not exists when initiallized", () => {
    createComponent();
    const overlay = findOverlay();

    expect(overlay).toBeUndefined();
  });

  it("is exists when after open invoke", async () => {
    createComponent();

    openPopup();
    await nextTick();

    expect(findOverlay().exists()).toBe(true);
  });

  it("closed by ESC press", async () => {
    const ESC_KEY_CODE = 27;
    createComponent();
    openPopup();
    await nextTick();

    const event = new KeyboardEvent("keydown", {
      keyCode: ESC_KEY_CODE,
    });

    document.dispatchEvent(event);
    await nextTick();

    expect(findOverlay()).toBeUndefined();
  });

  it("closed by button close click", async () => {
    createComponent();
    openPopup();
    await nextTick();

    await findButtonClose().trigger("click");

    expect(findOverlay()).toBeUndefined();
  });

  it("closed by overlay click", async () => {
    createComponent();
    openPopup();
    await nextTick();

    await findOverlay().trigger("click");

    expect(findOverlay()).toBeUndefined();
  });

  it("closed from scoped slot close callback", async () => {
    createComponent();
    openPopup();
    await nextTick();

    await findButtonByText("закрыть").trigger("click");

    expect(findOverlay()).toBeUndefined();
  });

  it("closed from scoped slot confirm callback", async () => {
    createComponent();
    openPopup();
    await nextTick();

    await findButtonByText("ок").trigger("click");

    expect(findOverlay()).toBeUndefined();
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

  it("promise result after confirm modal", async () => {
    createComponent();
    const promise = openPopup();
    await nextTick();

    findButtonByText("закрыть").trigger("click");
    const result = await promise;

    expect(result).toBe(false);
  });

  it("promise result after close modal", async () => {
    createComponent();
    const promise = openPopup();
    await nextTick();

    findButtonByText("ок").trigger("click");
    const result = await promise;

    expect(result).toBe(true);
  });
});
