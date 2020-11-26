import * as React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { LineChart, ChartProps } from "react-native-svg-charts"
import { scaleTime } from "d3-scale"
import { flatten, mergeAll } from "ramda"
import { color, spacing } from "../../theme"
import { Text } from "../text/text"
// import { Circle, G, Line, Rect, Text as SVGText } from "react-native-svg"

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
}

const stageDepth = {
  out: 1,
  awake: 0,
  light: -1,
  deep: -2,
}

/**
 * Sleep statistics pie chart
 */
export const StagesChart = observer(function StagesChart(props: StagesChartProps) {
  const CONTAINER_STYLE = mergeAll(flatten([CONTAINER]))
  const { data, title } = props
  const hasTitle = title && title.length > 1

  __DEV__ && console.tron.debug(`has a title ${title}: ${hasTitle}`)

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

  // const Tooltip = ({ x, y }) => (
  //   <G x={x(5) - 75 / 2} key={"tooltip"} onPress={() => console.log("tooltip clicked")}>
  //     <G y={50}>
  //       <Rect height={40} width={75} stroke={"grey"} fill={"white"} ry={10} rx={10} />
  //       <SVGText
  //         x={75 / 2}
  //         dy={20}
  //         alignmentBaseline={"middle"}
  //         textAnchor={"middle"}
  //         stroke={"rgb(134, 65, 244)"}
  //       >
  //         {`${data[5]}ºC`}
  //       </SVGText>
  //     </G>
  //     <G x={75 / 2}>
  //       <Line y1={50 + 40} y2={y(data[5])} stroke={"grey"} strokeWidth={2} />
  //       <Circle cy={y(data[5])} r={6} stroke={"rgb(134, 65, 244)"} strokeWidth={2} fill={"white"} />
  //     </G>
  //   </G>
  // )

  // const chartData = data.map((item) => item.slice.finish)

  __DEV__ && console.tron.debug(`chart Data: ${JSON.stringify(chartData)} ${chartData.length}`)

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
          xAccessor={({ item }) => item.x}
          yAccessor={({ item }) => item.y}
          contentInset={INSET}
        >
          {/* <Tooltip y={0} x={new Date(1489047960000)} /> */}
        </LineChart>
      </View>
    </View>
  )
})
