import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * User with a name and avatar
 */
export const UserModel = types.model("User").props({
  id: types.optional(types.identifier, "-1"),
  name: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
})

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
