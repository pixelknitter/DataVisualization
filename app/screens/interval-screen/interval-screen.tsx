import React from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View } from "react-native"
import { Loader, StagesChart, Screen, UserHeader } from "../../components"
import { useIntervals } from "../../utils/hooks"
import { color } from "../../theme"
import { spacing } from "../../theme/spacing"

export const IntervalScreen = observer(() => {
  const { intervalStore, loading } = useIntervals()

  if (loading) return <Loader message="Collecting your sleep intervals..." />
  const sessionCount = intervalStore.getIntervalCount()
  const stageSessions = intervalStore.getStageSessions()
  const { currentIntervals } = intervalStore

  return (
    <Screen style={styles.root} preset="scroll">
      <UserHeader sleepScore={intervalStore.getAverageSleepScore()} sessionCount={sessionCount} />
      <View style={styles.chartContainer}>
        {stageSessions.map((session, index) => (
          <StagesChart
            key={index}
            style={styles.chart}
            data={session}
            decoratorData={currentIntervals[index].timeseries}
            title={`Stages for ${intervalStore.currentIntervals[index].ts}`}
          />
        ))}
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  chart: {
    height: 200,
    margin: spacing[2],
  },
  chartContainer: {
    display: "flex",
    alignContent: "space-between",
  },
  root: {
    backgroundColor: color.palette.charcoal,
    flex: 1,
  },
})
