import React from "react"
import { View, Animated } from "react-native"
import { Text, AsyncImage, Icon } from "../"
import { userHeaderStyles as styles } from "./user-header.styles"
import { User, useStores } from "../../models"
import { color } from "../../theme"
import { flatten, mergeAll } from "ramda"
import { useFadeInLeft } from "../../utils/hooks"
import { Button } from "../button/button"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"

export interface UserHeaderProps {
  user?: User
}

/**
 * User Header
 *
 * Renders a header with details about the CurrentUser. Accepts a User object.
 */
export const UserHeader = observer(function UsersScreen(props: UserHeaderProps) {
  // grab the props
  const {
    userStore: { currentUser },
  } = useStores()
  const { opacity, xDelta } = useFadeInLeft()
  const navigation = useNavigation()
  const user = currentUser || props.user

  __DEV__ && console.tron.debug(`header user: ${user.name}`)

  // merge styles for animation, fade in from the left 10
  const RIGHT_CONTAINER = mergeAll(
    flatten([
      styles.RIGHT_CONTAINER,
      {
        opacity: opacity,
        transform: [
          {
            translateX: xDelta.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -20],
            }),
          },
        ],
      },
    ]),
  )

  return (
    <View style={styles.CONTAINER}>
      <Button onPress={() => navigation.goBack()}>
        <Icon icon={"back"} />
      </Button>
      <AsyncImage
        style={styles.IMAGE_LAYOUT}
        source={{ uri: user.avatar }}
        placeholderColor={color.palette.vibrantOrange}
      />
      <Animated.View style={RIGHT_CONTAINER}>
        <Text preset="header" text={user.name} />
      </Animated.View>
    </View>
  )
})
