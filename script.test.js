// const { updateNewPR } = require("./script.js");
describe("updateNewPR", () => {
  const updateNewPR = (hitCounter, missCounter) => {
    if (hitCounter > personalHitRecord) {
      personalHitRecord = hitCounter;
    }
    if (missCounter > personalMissRecord) {
      personalMissRecord = missCounter;
    }
  };

  test("should update personal hit and miss record if the hit and miss counts exceed the current record", () => {
    const hitCounter = 5;
    const missCounter = 3;
    personalHitRecord = 4;
    personalMissRecord = 2;

    updateNewPR(hitCounter, missCounter);

    expect(personalHitRecord).toEqual(hitCounter);
    expect(personalMissRecord).toEqual(missCounter);
  });
});
