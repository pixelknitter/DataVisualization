import { GeneralApiProblem } from "./api-problem"
import { UserSnapshot, IntervalSnapshot } from "../../models"

export type GetIntervalsResult = { kind: "ok"; intervals: IntervalSnapshot[] } | GeneralApiProblem

export type GetUsersResult = { kind: "ok"; users: UserSnapshot[] } | GeneralApiProblem
