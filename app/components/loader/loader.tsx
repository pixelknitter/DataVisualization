import * as React from "react"
import { ActivityIndicator, TextStyle, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Screen, Text } from "../"
import { flatten, mergeAll } from "ramda"

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: color.palette.charcoal,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface LoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  message?: string
}

/**
 * Describe your component here
 */
export function Loader(props: LoaderProps) {
  const { style, message } = props

  const CONTAINER_STYLES = mergeAll(flatten([CONTAINER, style]))

  return (
    <Screen style={CONTAINER_STYLES} preset="fixed">
      <ActivityIndicator size="large" color="purple" />
      {message && <Text style={TEXT}>{message}</Text>}
    </Screen>
  )
}
