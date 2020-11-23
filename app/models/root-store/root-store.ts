import { UserStoreModel } from "../user-store/user-store"
import { IntervalStoreModel } from "../interval-store/interval-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  userStore: types.optional(UserStoreModel, () => UserStoreModel.create({})),
  intervalStore: types.optional(IntervalStoreModel, () => IntervalStoreModel.create({})),

})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
