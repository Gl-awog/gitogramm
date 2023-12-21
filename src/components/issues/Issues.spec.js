import { mount } from "@vue/test-utils";
import Issues from "./Issues";

describe("Issues component", () => {
  const issue = {
    title: "test-title",
    user: {
      login: "test-login",
    },
  };

  it("По клику Выполняется  запрос к серверу", async () => {
    const wrapper = mount(Issues);
    await wrapper.find(".button").trigger("click");
    expect(wrapper.emitted().onToggleIssues.length).toBe(1);
  });

  it("Отрисует список элементов", async () => {
    const wrapper = mount(Issues, {
      propsData: {
        comments: Array.from({ length: 6 }).map((x) => issue),
      },
    });

    expect(wrapper.find(".issues").exists()).toBe(false);
    await wrapper.find(".button").trigger("click");
    expect(wrapper.findAll(".comment").length).toBe(6);
  });

  it("Не вызывает событие contentLoaded, если внутри есть список issues", async () => {
    const wrapper = mount(Issues, {
      propsData: {
        comments: Array.from({ length: 6 }).map((x) => issue),
      },
    });

    await wrapper.find(".button").trigger("click");
    expect(wrapper.emitted().onToggleIssues).toBeUndefined();
  });
});
