/* eslint-disable generator-star-spacing */
import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment, withRootStore } from ".."
import { GetIntervalsResult } from "../../services/api"
import { Interval, IntervalSnapshot, IntervalModel } from "../interval/interval"

type StageTimeseries = { slice: { start: Date; finish: Date }; stage: string }
/**
 * Sleep sessions for the current user
 */
export const IntervalStoreModel = types
  .model("IntervalStore")
  .props({
    currentUserId: types.optional(types.string, "-1"),
    currentIntervals: types.maybeNull(types.array(IntervalModel)),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views((self) => ({
    /**
     * Returns stage sessions in a time series with start and ending
     */
    getStageSessions: (): StageTimeseries[][] => {
      if (!self.currentIntervals) return null
      const sessions = self.currentIntervals

      const stageSessions = sessions.map((session) => {
        const stages = session.stages

        // for each stage slice, capture the start and end times
        let sessionDuration = session.ts.getTime()

        const slicedStages = stages.map((item) => {
          const startTime = sessionDuration
          sessionDuration += item.duration * 1000
          return {
            slice: {
              start: new Date(startTime),
              finish: new Date(sessionDuration),
            },
            stage: item.stage,
          }
        })

        // lazily calculates the duration of a session when this is first called
        session.setDuration(sessionDuration)
        return slicedStages
      })
      __DEV__ && console.tron.debug(`stage sessions: ${JSON.stringify(stageSessions)}`)
      return stageSessions
    },
    /**
     * Returns the average sleep score across current intervals
     */
    getAverageSleepScore: (): number => {
      if (!self.currentIntervals) return 0

      const avgScore: number =
        self.currentIntervals.reduce(
          (accumulator, currentItem) => accumulator + currentItem.score,
          0,
        ) / self.currentIntervals.length
      __DEV__ && console.tron.debug(`sleep score avg: ${avgScore}`)
      return avgScore
    },
    /**
     * Returns the average sleep score across current intervals
     */
    getAverageSessionLength: (): number => {
      if (!self.currentIntervals) return 0

      const avgSessionLength: number =
        self.currentIntervals.reduce(
          (accumulator, currentItem) => accumulator + currentItem.duration,
          0,
        ) / self.currentIntervals.length
      __DEV__ && console.tron.debug(`avg session length: ${avgSessionLength}`)
      return avgSessionLength
    },
    /**
     * Returns the number of sessions collected
     */
    getIntervalCount: (): number => {
      if (!self.currentIntervals) return 0
      const currentCount = self.currentIntervals.length
      __DEV__ && console.tron.debug(`current interval count: ${currentCount}`)
      return currentCount
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
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
