import React from "react"
import { View, Animated } from "react-native"
import { AsyncImage, Text } from ".."
import { userRowStyles as styles } from "./user-row.styles"
import { User } from "../../models"
import { color } from "../../theme"
import { useSpringEntryLeft } from "../../utils/hooks"
import { mergeAll, flatten } from "ramda"

export interface UserRowProps {
  user: User
}

/**
 * User Row
 *
 * Renders the details of a User to be selected
 */
export const UserRow: React.FunctionComponent<UserRowProps> = (props) => {
  const { user } = props
  const { xDelta, opacity } = useSpringEntryLeft()

  // translation for the main view
  const translateX = xDelta.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 1],
  })

  // merge the styling to account for the different rows based upon user row
  const NAME_STYLE = mergeAll(flatten([styles.USER_TEXT, { color: color.palette.angry }]))
  const CONTAINER_STYLE = mergeAll(
    flatten([
      styles.CONTAINER,
      {
        backgroundColor: color.palette.offWhite,
        transform: [{ translateX }],
        opacity: opacity,
      },
    ]),
  )

  return (
    <Animated.View style={CONTAINER_STYLE}>
      <View style={styles.CONTAINER}>
        <AsyncImage
          style={styles.IMAGE_LAYOUT}
          source={{ uri: user.avatar }}
          placeholderColor={color.palette.orange}
        />
        <Text style={NAME_STYLE} text={user.name} />
      </View>
    </Animated.View>
  )
}
