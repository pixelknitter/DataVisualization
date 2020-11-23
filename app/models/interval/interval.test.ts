import { IntervalModel, Interval } from "./interval"

test("can be created", () => {
  const instance: Interval = IntervalModel.create({})

  expect(instance).toBeTruthy()
})
