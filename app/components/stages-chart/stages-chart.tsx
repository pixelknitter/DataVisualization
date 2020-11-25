import * as React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
// import { color, typography } from "../../theme"
import { PieChart, PieChartProps } from "react-native-svg-charts"
import { flatten, mergeAll } from "ramda"
import { color, spacing } from "../../theme"
import { Text } from "../text/text"

// styles
const CONTAINER: ViewStyle = {
  display: "flex",
  justifyContent: "center",
}
const HEADER = {
  padding: spacing[2],
}
export interface StagesChartProps extends PieChartProps<any> {
  title?: string
}

/**
 * Sleep statistics pie chart
 */
export const StagesChart = observer(function StagesChart(props: StagesChartProps) {
  const CONTAINER_STYLE = mergeAll(flatten([CONTAINER]))
  const { data, title } = props
  const hasTitle = title && title.length > 1

  __DEV__ && console.tron.debug(`has a title ${title}: ${hasTitle}`)

  const pieData = data
    .filter((item) => item.duration > 0)
    .map((item, index) => ({
      value: item.duration,
      svg: {
        fill: color.stages[item.stage],
        onPress: () => console.log("press", index),
      },
      key: `pie-${index}`,
    }))

  return (
    <View style={CONTAINER_STYLE}>
      {hasTitle && (
        <Text style={HEADER} preset="header">
          {title}
        </Text>
      )}
      <PieChart {...props} data={pieData} innerRadius="40%" />
    </View>
  )
})
