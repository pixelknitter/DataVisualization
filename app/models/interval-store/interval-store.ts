/* eslint-disable generator-star-spacing */
import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment, withRootStore } from ".."
import { GetIntervalsResult } from "../../services/api"
import { Interval, IntervalSnapshot, IntervalModel } from "../interval/interval"

/**
 * Model description here for TypeScript hints.
 */
export const IntervalStoreModel = types
  .model("IntervalStore")
  .props({
    currentUserId: types.optional(types.string, "-1"),
    currentIntervals: types.maybeNull(types.array(IntervalModel)),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * Populate the intervals of a user
     */
    saveCurrentIntervals: (userId: string, value: (Interval | IntervalSnapshot)[]) => {
      __DEV__ &&
        console.tron.debug(
          `setting intervals with a new user id: ${userId} length: ${userId.length}`,
        )
      if (!userId && userId.length !== 16) return

      self.currentUserId = userId

      if (!value) return
      self.currentIntervals = value as any
    },
  }))
  .actions((self) => ({
    /**
     * Get the available intervals list for a user
     */
    getIntervals: flow(function* (userId: string) {
      const result: GetIntervalsResult = yield self.environment.api.getIntervals(userId)

      if (result.kind === "ok") {
        const { intervals } = result
        self.saveCurrentIntervals(userId, intervals)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

type IntervalStoreType = Instance<typeof IntervalStoreModel>
export interface IntervalStore extends IntervalStoreType {}
type IntervalStoreSnapshotType = SnapshotOut<typeof IntervalStoreModel>
export interface IntervalStoreSnapshot extends IntervalStoreSnapshotType {}
