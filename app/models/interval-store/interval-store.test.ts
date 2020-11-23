import { IntervalStoreModel, IntervalStore } from "./interval-store"

test("can be created", () => {
  const instance: IntervalStore = IntervalStoreModel.create({})

  expect(instance).toBeTruthy()
})
