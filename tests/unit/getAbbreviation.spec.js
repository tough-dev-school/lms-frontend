import getAbbreviation from "@/utils/getAbbreviation.js";

const buildErrorMessage = (type) => `wrong argument type: expecting string, found ${type}`;

describe("getAbbreviation", () => {
  it.each`
    a                     | expected
    ${"one tow three"}    | ${"ott"}
    ${"one tow    "}      | ${"ot"}
    ${"one      tow    "} | ${"ot"}
    ${"   one tow"}       | ${"ot"}
    ${"one"}              | ${"o"}
    ${""}                 | ${""}
  `("get first chars from string: $a", ({ a, expected }) => {
    const res = getAbbreviation(a);

    expect(res).toBe(expected);
  });

  it.each`
    a            | b              | expected
    ${123}       | ${"number"}    | ${buildErrorMessage("number")}
    ${{}}        | ${"object"}    | ${buildErrorMessage("object")}
    ${null}      | ${"object"}    | ${buildErrorMessage("object")}
    ${undefined} | ${"undefined"} | ${buildErrorMessage("undefined")}
  `("Argument is not a string: $a ($b)", ({ a, expected }) => {
    expect(() => getAbbreviation(a)).toThrow(expected);
  });
});
