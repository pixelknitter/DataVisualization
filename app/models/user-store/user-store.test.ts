import { RootStore, RootStoreModel, UserModel, UserSnapshot } from "../"
import { UserStoreModel, UserStore } from "./user-store"
import { v1 as uuid } from "uuid"

describe("UserStore", () => {
  describe("smoke tests", () => {
    let model: UserStore
    let rootStore: RootStore

    beforeEach(() => {
      rootStore = RootStoreModel.create({})
      model = rootStore.userStore
    })

    test("can be created", () => {
      expect(model).toBeTruthy()
    })

    test("has correct defaults", () => {
      expect(model.currentUser).toBeUndefined()
      expect(model.availableUsers).toHaveLength(0)
    })

    test("resets properly", async (done) => {
      const user = UserModel.create({
        id: uuid(),
        name: "Eddie Freeman",
        avatar: "http://www.fillmurray.com/100/100",
      })
      const users = [user]

      model.saveAvailableUsers(users)

      await model.reset()

      expect(model).toEqual(UserStoreModel.create())
      done()
    })
  })
  describe("action tests", () => {
    let model: UserStore
    let rootStore: RootStore

    beforeEach(() => {
      rootStore = RootStoreModel.create({})
      model = rootStore.userStore
    })

    test("can save current user", () => {
      const instance: UserStore = UserStoreModel.create({} as any)
      const userSnapshot = {
        id: uuid(),
        name: "Eddie Freeman",
        avatar: "http://www.fillmurray.com/100/100",
      } as UserSnapshot

      instance.saveAvailableUsers([userSnapshot])
      instance.saveCurrentUser(userSnapshot)

      expect(instance.currentUser.id).toBeDefined()
      expect(instance.currentUser.name).toEqual("Eddie Freeman")
      expect(instance.currentUser.avatar).toBeDefined()
    })
  })
})
