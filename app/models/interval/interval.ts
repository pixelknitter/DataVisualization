import { Instance, SnapshotOut, types } from "mobx-state-tree"

export enum Stage {
  out,
  awake,
  light,
  deep,
}
/**
 * The amount of time the user stayed in a stage
 */
export const StageDurationModel = types.model("StageDuration", {
  stage: types.enumeration(Object.keys(Stage).splice(4, 4)), // converts the keys to string array
  duration: types.number,
})

type StageDurationType = Instance<typeof StageDurationModel>
export interface StageDuration extends StageDurationType {}
type StageDurationSnapshotType = SnapshotOut<typeof StageDurationModel>
export interface StageDurationSnapshot extends StageDurationSnapshotType {}

/**
 * The series time and value
 */
export const SeriesValueModel = types.model("SeriesValue", {
  time: types.Date,
  value: types.number,
})

type SeriesValueType = Instance<typeof SeriesValueModel>
export interface SeriesValue extends SeriesValueType {}
type SeriesValueSnapshotType = SnapshotOut<typeof SeriesValueModel>
export interface SeriesValueSnapshot extends SeriesValueSnapshotType {}

/**
 * A timeseries of sensor data for the interval
 */
export const TimeseriesModel = types.model("Timeseries", {
  tnt: types.optional(types.array(SeriesValueModel), []),
  tempRoomC: types.optional(types.array(SeriesValueModel), []),
  tempBedC: types.optional(types.array(SeriesValueModel), []),
  respiratoryRate: types.optional(types.array(SeriesValueModel), []),
  heartRate: types.optional(types.array(SeriesValueModel), []),
  // heating: types.optional(types.array(SeriesValueModel), []),
})

type TimeseriesType = Instance<typeof TimeseriesModel>
export interface Timeseries extends TimeseriesType {}
type TimeseriesSnapshotType = SnapshotOut<typeof TimeseriesModel>
export interface TimeseriesSnapshot extends TimeseriesSnapshotType {}

/**
 * The interval of sleep conducted by the user with a collection of related data
 */
export const IntervalModel = types
  .model("Interval")
  .props({
    id: types.optional(types.identifier, "-1"),
    ts: types.maybeNull(types.Date),
    stages: types.maybeNull(types.array(StageDurationModel)),
    score: types.optional(types.number, 0),
    duration: types.optional(types.number, 0),
    timeseries: types.maybeNull(TimeseriesModel),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setDuration: (value: number) => {
      if (!value) return
      self.duration = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type IntervalType = Instance<typeof IntervalModel>
export interface Interval extends IntervalType {}
type IntervalSnapshotType = SnapshotOut<typeof IntervalModel>
export interface IntervalSnapshot extends IntervalSnapshotType {}
