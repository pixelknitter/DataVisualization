import { Instance, SnapshotOut, types } from "mobx-state-tree"

export enum Stage {
  out,
  awake,
  light,
  deep,
}

const StageDuration = types.model("StageDuration", {
  stage: types.enumeration(Object.keys(Stage)), // converts the keys to string array
  duration: types.number,
})

const SeriesValue = types.model("SeriesValue", {
  time: types.Date,
  value: types.number,
})

const Timeseries = types.model("Timeseries", {
  tnt: types.optional(types.array(SeriesValue), []),
  tempRoomC: types.optional(types.array(SeriesValue), []),
  tempBedC: types.optional(types.array(SeriesValue), []),
  respiratoryRate: types.optional(types.array(SeriesValue), []),
  heartRate: types.optional(types.array(SeriesValue), []),
  heating: types.optional(types.array(SeriesValue), []),
})

/**
 * Model description here for TypeScript hints.
 */
export const IntervalModel = types
  .model("Interval")
  .props({
    id: types.optional(types.identifier, "-1"),
    ts: types.maybeNull(types.Date),
    stages: types.maybeNull(types.array(StageDuration)),
    score: types.optional(types.number, 0),
    timeseries: types.maybeNull(types.reference(Timeseries)),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type IntervalType = Instance<typeof IntervalModel>
export interface Interval extends IntervalType {}
type IntervalSnapshotType = SnapshotOut<typeof IntervalModel>
export interface IntervalSnapshot extends IntervalSnapshotType {}
