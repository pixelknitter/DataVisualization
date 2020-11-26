import * as React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { LineChart, ChartProps } from "react-native-svg-charts"
import { scaleTime } from "d3-scale"
import { flatten, mergeAll } from "ramda"
import { color, spacing } from "../../theme"
import { Text } from "../text/text"
// import { Circle, G, Line, Rect, Text as SVGText } from "react-native-svg"
import { Timeseries } from "../../models/interval/interval"

// styles
const CONTAINER: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  margin: spacing[2],
}
const CHART = {
  height: 200,
  backgroundColor: color.palette.black,
}
const HEADER = {
  padding: spacing[2],
}

const INSET = { top: spacing[3], bottom: spacing[3] }

export interface StagesChartProps extends ChartProps<any> {
  title?: string
  decoratorData?: Timeseries
}

const stageDepth = {
  out: 1,
  awake: 0,
  light: -1,
  deep: -2,
}

/**
 * Sleep stages represented in colorful lines with decorators (TBD)
 */
export const StagesChart = observer(function StagesChart(props: StagesChartProps) {
  const CONTAINER_STYLE = mergeAll(flatten([CONTAINER]))
  const { data, title, decoratorData } = props
  const hasTitle = title && title.length > 1

  // transforms the data into chart relevant data with svgs
  const chartData = data.map((item, index, array) => {
    const transform = {
      data: [
        { x: item.slice.start, y: stageDepth[item.stage] },
        { x: item.slice.finish, y: stageDepth[item.stage] },
      ],
      svg: {
        stroke: color.stages[item.stage],
        strokeWidth: 3,
      },
    }

    if (index !== array.length - 1) {
      transform.data.push({
        x: array[index + 1].slice.start,
        y: stageDepth[array[index + 1].stage],
      })
    }

    return transform
  })

  const renderDecorators = () => {
    if (decoratorData) return null

    // TODO: substitute stroke w/ a KEY map from timeseries data
    // TODO: sub y value for current stage value
    // TODO: sub x with time series date
    // TODO: text with time series value
    // return decoratorData.map((value, index) => (
    //   <Circle
    //     key={index}
    //     cx={value}
    //     cy={0}
    //     r={4}
    //     stroke={"rgb(134, 65, 244)"}
    //     fill={"rgb(0,0,0,0)"}
    //   />
    // ))
  }

  return (
    <View style={CONTAINER_STYLE}>
      {hasTitle && (
        <Text style={HEADER} preset="header">
          {title}
        </Text>
      )}
      <View>
        <LineChart
          {...props}
          style={CHART}
          data={chartData}
          xScale={scaleTime}
          yMax={1}
          yMin={-2}
          xAccessor={({ item }) => item.x}
          yAccessor={({ item }) => item.y}
          contentInset={INSET}
        >
          {/* {renderDecorators()} */}
        </LineChart>
      </View>
    </View>
  )
})
