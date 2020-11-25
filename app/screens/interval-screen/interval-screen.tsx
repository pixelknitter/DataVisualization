import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Loader, StagesChart, Screen, UserHeader, TimeseriesChart } from "../../components"
// import { useNavigation } from "@react-navigation/native"
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
  padding: spacing[2],
}

export const IntervalScreen = observer(() => {
  const { intervalStore, loading } = useIntervals()

  const stagesData = [
    {
      stage: "awake",
      duration: 1080,
    },
    {
      stage: "light",
      duration: 3600,
    },
    {
      stage: "deep",
      duration: 1980,
    },
    {
      stage: "light",
      duration: 3420,
    },
    {
      stage: "deep",
      duration: 540,
    },
    {
      stage: "out",
      duration: 420,
    },
    {
      stage: "awake",
      duration: 600,
    },
    {
      stage: "light",
      duration: 1680,
    },
    {
      stage: "awake",
      duration: 1200,
    },
    {
      stage: "light",
      duration: 6480,
    },
    {
      stage: "awake",
      duration: 1380,
    },
  ]

  const timeseriesData = [
    {
      month: new Date(2015, 0, 1),
      tnt: 3840,
      tempRoomC: 1920,
      tempBedC: 960,
      respiratoryRate: 400,
      heartRate: 60,
    },
    {
      month: new Date(2015, 1, 1),
      tnt: 1600,
      tempRoomC: 1440,
      tempBedC: 960,
      respiratoryRate: 400,
      heartRate: 80,
    },
    {
      month: new Date(2015, 2, 1),
      tnt: 640,
      tempRoomC: 960,
      tempBedC: 3640,
      respiratoryRate: 400,
      heartRate: 70,
    },
    {
      month: new Date(2015, 3, 1),
      tnt: 3320,
      tempRoomC: 480,
      tempBedC: 640,
      respiratoryRate: 400,
      heartRate: 60,
    },
  ]

  const colors = ["#8800cc", "#aa00ff", "#cc66ff", "#ee99ff", "#eeccff"]
  const keys = ["tnt", "tempRoomC", "tempBedC", "respiratoryRate", "heartRate"]

  if (loading) return <Loader message="Collecting your sleep intervals..." />
  __DEV__ && console.tron.log(`intervals loaded: ${intervalStore.currentIntervals}`)
  intervalStore.getIntervalCount()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <UserHeader sleepScore={intervalStore.getAverageSleepScore()} />
      <View style={CHART_CONTAINER}>
        <StagesChart
          style={CHART}
          data={stagesData}
          title={`Stages (${intervalStore.getIntervalCount()})`}
        />
        <TimeseriesChart style={CHART} data={timeseriesData} keys={keys} colors={colors} title="" />
      </View>
    </Screen>
  )
})
