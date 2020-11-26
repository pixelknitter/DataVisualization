import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Loader, StagesChart, Screen, UserHeader } from "../../components"
import { useIntervals } from "../../utils/hooks"
import { color } from "../../theme"
import { spacing } from "../../theme/spacing"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.charcoal,
  flex: 1,
}

const CHART_CONTAINER: ViewStyle = {
  display: "flex",
  alignContent: "space-between",
}

const CHART = {
  height: 200,
  margin: spacing[2],
}

export const IntervalScreen = observer(() => {
  const { intervalStore, loading } = useIntervals()

  if (loading) return <Loader message="Collecting your sleep intervals..." />
  const sessionCount = intervalStore.getIntervalCount()
  const stageSessions = intervalStore.getStageSessions()
  const { currentIntervals } = intervalStore

  return (
    <Screen style={ROOT} preset="scroll">
      <UserHeader sleepScore={intervalStore.getAverageSleepScore()} sessionCount={sessionCount} />
      <View style={CHART_CONTAINER}>
        {stageSessions.map((session, index) => (
          <StagesChart
            key={index}
            style={CHART}
            data={session}
            decoratorData={currentIntervals[index].timeseries}
            title={`Stages for ${intervalStore.currentIntervals[index].ts}`}
          />
        ))}
      </View>
    </Screen>
  )
})
