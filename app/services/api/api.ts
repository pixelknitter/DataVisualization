import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import {
  IntervalSnapshot,
  UserSnapshot,
  StageDurationSnapshot,
  TimeseriesSnapshot,
  SeriesValueSnapshot,
} from "../../models"
import mockUserData from "./mock-user-data.json"
import { parseJSON } from "date-fns"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of sleep intervals by user id.
   */
  async getIntervals(userId: string): Promise<Types.GetIntervalsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/${userId}.json`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // convert the raw values into objects
    const convertSeriesValue = (raw): SeriesValueSnapshot => {
      return {
        time: parseJSON(raw[0]).getTime(),
        value: raw[1],
      }
    }

    const convertTimeseries = (raw): TimeseriesSnapshot => {
      return {
        tnt: raw.tnt.map(convertSeriesValue),
        tempRoomC: raw.tempRoomC.map(convertSeriesValue),
        tempBedC: raw.tempBedC.map(convertSeriesValue),
        respiratoryRate: raw.respiratoryRate.map(convertSeriesValue),
        heartRate: raw.heartRate.map(convertSeriesValue),
        // heating: raw.heating.map(convertSeriesValue),
      }
    }

    const convertStageDuration = (raw): StageDurationSnapshot => {
      return {
        stage: raw.stage,
        duration: raw.duration,
      }
    }

    const convertInterval = (raw): IntervalSnapshot => {
      return {
        id: raw.id,
        ts: parseJSON(raw.ts).getTime(),
        stages: raw.stages.map(convertStageDuration),
        score: raw.score,
        timeseries: convertTimeseries(raw.timeseries),
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawIntervals = response.data.intervals
      const resultIntervals: IntervalSnapshot[] = rawIntervals.map(convertInterval)
      return { kind: "ok", intervals: resultIntervals }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getUsers(): Promise<Types.GetUsersResult> {
    // make the *mock* api call
    const response = mockUserData.users

    const convertUser = (raw: any): UserSnapshot => {
      return {
        id: raw.id,
        name: raw.name,
        avatar: raw.avatar,
      }
    }

    // transform the data into the format we are expecting
    try {
      const resultUsers: UserSnapshot[] = response.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
