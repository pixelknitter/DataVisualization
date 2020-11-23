/* eslint-disable generator-star-spacing */
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment, withRootStore } from "../extensions"
import { UserModel, UserSnapshot, User } from ".."
import { GetUsersResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    currentUser: types.optional(UserModel, () => UserModel.create({})),
    availableUsers: types.maybeNull(types.array(UserModel)),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * Populate the current user
     */
    saveCurrentUser: (userSnapshot: UserSnapshot | User) => {
      self.currentUser = UserModel.create(userSnapshot)
    },
    /**
     * Resets the store
     */
    reset: () => {
      self.currentUser = UserModel.create({})
      self.availableUsers = null
    },
  }))
  .actions((self) => ({
    getUsers: flow(function* () {
      const result: GetUsersResult = yield self.environment.api.getUsers()

      if (result.kind === "ok") {
        const { user } = result
        self.saveCurrentUser(user)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
