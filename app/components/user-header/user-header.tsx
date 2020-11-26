import React from "react"
import { View, Animated, TextStyle, ViewStyle } from "react-native"
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
  sleepScore?: number
  sessionCount?: number
}

const SCORE_TEXT: TextStyle = {
  color: color.palette.vibrantOrange,
  fontSize: 20,
}

const ICON = {
  backgroundColor: color.palette.black,
}

/**
 * User Header
 *
 * Renders a header with details about the CurrentUser.
 */
export const UserHeader = observer(function UsersScreen(props: UserHeaderProps) {
  // grab the props
  const {
    userStore: { currentUser },
  } = useStores()
  const { opacity, xDelta } = useFadeInLeft()
  const navigation = useNavigation()
  const user = currentUser || props.user
  const { sleepScore, sessionCount } = props

  // formatting text
  const formattedSleepScore = (sleepScore && `Avg Score: ${sleepScore.toFixed(0)}`) || "N/A"
  const formattedSessionCount = (sessionCount && `Recorded Sessions: ${sessionCount}`) || "N/A"

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
      <Button style={ICON} onPress={() => navigation.goBack()}>
        <Icon icon={"back"} />
      </Button>
      <AsyncImage
        style={styles.IMAGE_LAYOUT}
        source={{ uri: user.avatar }}
        placeholderColor={color.palette.vibrantOrange}
      />
      <Animated.View style={RIGHT_CONTAINER}>
        <Text preset="header" text={user.name} />
        <Text style={SCORE_TEXT} text={formattedSleepScore} />
        <Text style={SCORE_TEXT} text={formattedSessionCount} />
      </Animated.View>
    </View>
  )
})
