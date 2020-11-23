import React from "react"
import { Animated, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { AsyncImage, Text } from ".."
import { userRowStyles as styles } from "./user-row.styles"
import { User } from "../../models"
import { color } from "../../theme"
import { useSpringEntryLeft } from "../../utils/hooks"
import { mergeAll, flatten } from "ramda"

export interface UserRowProps extends TouchableOpacityProps {
  user: User
  style?: ViewStyle
}

/**
 * User Row
 *
 * Renders the details of a User to be selected
 */
export const UserRow: React.FunctionComponent<UserRowProps> = (props) => {
  const { user, style } = props
  const { xDelta, opacity } = useSpringEntryLeft()

  // translation for the main view
  const translateX = xDelta.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 1],
  })

  // merge the styling to account for the different rows based upon user row
  const CONTAINER_STYLE = mergeAll(
    flatten([
      styles.CONTAINER,
      style,
      {
        transform: [{ translateX }],
        opacity: opacity,
      },
    ]),
  )

  return (
    <TouchableOpacity {...props}>
      <Animated.View style={CONTAINER_STYLE}>
        <AsyncImage
          style={styles.IMAGE_LAYOUT}
          source={{ uri: user.avatar }}
          placeholderColor={color.palette.richBlack}
        />
        <Text style={styles.USER_TEXT} text={user.name} />
      </Animated.View>
    </TouchableOpacity>
  )
}
