import { shallowMount } from "@vue/test-utils";

import AppHeaderUser from "@/components/AppHeaderUser.vue";
import AppUserAvatar from "@/components/AppUserAvatar.vue";
import AppUserName from "@/components/AppUserName.vue";
import UiLink from "@/components/ui-kit/UiLink.vue";

import { stubComponent } from "../../helpers/stubComponent";

const DEFAULT_USER = {
  first_name: "Sasha",
  last_name: "Not Sasha",
};

const DEFAULT_PROPS = {
  user: DEFAULT_USER,
};

const AppUserAvatarStub = stubComponent(AppUserAvatar);
const AppUserNameStub = stubComponent(AppUserName);
const UiLinkStub = stubComponent(UiLink);

describe("AppUserHeader", () => {
  let wrapper;

  const findEmail = () => wrapper.find('[data-test-id="user-email"]');

  const createComponent = (props = DEFAULT_PROPS) => {
    wrapper = shallowMount(AppHeaderUser, {
      propsData: props,
      stubs: {
        AppUserAvatar: AppUserAvatarStub,
        AppUserName: AppUserNameStub,
        UiLink: UiLinkStub,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Shows email if user has", () => {
    const newPoprs = {
      user: {
        ...DEFAULT_USER,
        email: "a@a.ru",
      },
    };
    createComponent(newPoprs);
    const email = findEmail();

    expect(email.exists()).toBe(true);
  });

  it("Don't show email if user don't have", () => {
    createComponent();
    const email = findEmail();

    expect(email?.element).toBeUndefined();
  });

  it("passes right props to AppUserAvatar", () => {
    createComponent();

    expect(wrapper.findComponent(AppUserAvatar).props().user).toBe(DEFAULT_USER);
  });

  it("passes right props to AppUserName", () => {
    createComponent();

    expect(wrapper.findComponent(AppUserName).props().user).toBe(DEFAULT_USER);
  });

  it("Emit logout event when link is clicked", () => {
    createComponent();
    const link = wrapper.findComponent(UiLink);

    link.vm.$emit("click", new MouseEvent("click"));

    expect(wrapper.emitted().logout).toBeTruthy();
  });
});
