import * as React from "react"
import { View, ViewStyle } from "react-native"
import { StackedAreaChart, StackedAreaChartProps } from "react-native-svg-charts"
// import { TimeseriesSnapshot } from "../../models/interval/interval"
import * as shape from "d3-shape"
import { Text } from "../text/text"
import { spacing } from "../../theme/spacing"

const CONTAINER: ViewStyle = {
  display: "flex",
  justifyContent: "center",
}
const CHART = {
  height: 200,
  paddingVertical: spacing[2],
}
const HEADER = {
  padding: spacing[2],
}

export interface TimeseriesChartProps extends StackedAreaChartProps<any> {
  title?: string
}

/**
 * The changes over time in the conditions of a persons sleep.
 */
export function TimeseriesChart(props: TimeseriesChartProps) {
  const { title } = props
  const formattedTitle = title || "Time Series"
  return (
    <View style={CONTAINER}>
      <Text style={HEADER} preset="header">
        {formattedTitle}
      </Text>
      <StackedAreaChart style={CHART} {...props} showGrid={false} curve={shape.curveNatural} />
    </View>
  )
}
