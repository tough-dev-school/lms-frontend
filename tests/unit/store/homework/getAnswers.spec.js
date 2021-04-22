import store from "@/store/";

describe("question/getAnswers getter", () => {
  beforeEach(() => {
    store.commit("question/SET_ANSWERS", require("./.fixtures/answers"));
  });

  it("Returns only root answers by default", () => {
    expect(store.getters["question/getAnswers"]()).toHaveLength(3);
  });

  it("Returns root answers if parent is null", () => {
    expect(store.getters["question/getAnswers"]({ parent: null })).toHaveLength(3);
  });

  it("Does not die when answers are empty", () => {
    store.commit("question/SET_ANSWERS", null);
    expect(store.getters["question/getAnswers"]()).toEqual([]);
  });

  it("Returns answer objects", () => {
    const answer = store.getters["question/getAnswers"]()[1];

    expect(answer).toMatchObject({
      slug: "0275ad47-6f33-4541-b5c6-4641dc6ea006",
      author: {
        first_name: "Петрович",
        last_name: "",
      },
    });
  });

  it("Returns answers with given parent", () => {
    expect(store.getters["question/getAnswers"]({ parent: "21ad3f0a-1c6f-4d8c-ab9e-e8ae49f78cdc" })).toHaveLength(2);
  });

  it("Returns no answers for not matching queries", () => {
    expect(store.getters["question/getAnswers"]({ parent: "88b04599-b184-4620-a588-7447a525d2db" })).toHaveLength(0);
  });
});
