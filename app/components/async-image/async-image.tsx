import React from "react"
import { View, Animated } from "react-native"
import { asyncImageStyles as styles } from "./async-image.styles"
import { mergeAll, flatten } from "ramda"
import { useImplosionExplosion } from "../../utils/hooks"

export interface AsyncImageProps {
  placeholderColor
  style?
  source
}

/**
 * Async Image
 *
 * An asynchronous image loader with animation and placeholder color
 */
export const AsyncImage: React.FunctionComponent<AsyncImageProps> = (props) => {
  const { placeholderColor, style, source } = props
  const { loaded, imageOpacity, placeholderOpacity, placeholderScale } = useImplosionExplosion()

  // manage the sources of styles
  const CONTAINER_STYLE = mergeAll(flatten([style, styles.WRAPPER]))
  const IMAGE_STYLE = mergeAll(
    flatten([
      style,
      styles.IMAGE,
      {
        opacity: imageOpacity,
      },
    ]),
  )
  const PLACEHOLDER_STYLE = mergeAll(
    flatten([
      style,
      styles.PLACEHOLDER,
      {
        backgroundColor: placeholderColor,
        opacity: placeholderOpacity,
        transform: [{ scale: placeholderScale }],
      },
    ]),
  )

  return (
    <View style={CONTAINER_STYLE}>
      <Animated.Image source={source} resizeMode={"contain"} style={IMAGE_STYLE} />
      {!loaded && <Animated.View style={PLACEHOLDER_STYLE} />}
    </View>
  )
}
