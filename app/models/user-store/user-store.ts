/* eslint-disable generator-star-spacing */
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment, withRootStore } from "../extensions"
import { UserModel, User } from "../user/user"
import { GetUsersResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    currentUser: types.optional(types.safeReference(UserModel), undefined),
    availableUsers: types.optional(types.array(UserModel), []),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * Populate the current user
     */
    saveCurrentUser: (value: User) => {
      __DEV__ && console.tron.debug(`setting a new user to: ${value}`)
      self.currentUser = value
    },
    /**
     * Populate the available users
     */
    saveAvailableUsers: (value?: User[]) => {
      if (self.availableUsers) {
        if (value) {
          self.availableUsers.replace(value)
        } else {
          self.availableUsers.clear()
        }
      } else {
        self.availableUsers = value as any
      }
    },
  }))
  .actions((self) => ({
    /**
     * Resets the store
     */
    reset: () => {
      self.currentUser = undefined
      self.availableUsers.clear()
    },
    /**
     * Get the available users list
     */
    getUsers: flow(function* () {
      const result: GetUsersResult = yield self.environment.api.getUsers()

      if (result.kind === "ok") {
        const { users } = result
        self.saveAvailableUsers(users)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
