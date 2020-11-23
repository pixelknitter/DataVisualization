import React, { useCallback, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TextStyle, ViewStyle } from "react-native"
import { Screen, Text, UserRow } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color, spacing } from "../../theme"
import { useUsers } from "../../utils/hooks"
import { User } from "../../models"
import { Loader } from "../../components/loader/loader"

const ROOT: ViewStyle = {
  display: "flex",
  flex: 1,
  backgroundColor: color.palette.charcoal,
  alignItems: "center",
}
const CONTENT: ViewStyle = {
  padding: spacing[2],
  backgroundColor: color.storybookDarkBg,
}
const HEADER: TextStyle = {
  margin: spacing[2],
}

// Flatlist helper functions
const extractor = (item) => item.id

export const UsersScreen = observer(function UsersScreen() {
  const { users, loadAsync, saveCurrentUser, loading } = useUsers()
  const [selectedId, setSelectedId] = useState<string>(null)
  // Pull in navigation via hook
  const navigation = useNavigation()

  const navigateOnTouch = useCallback(
    (item) => {
      setSelectedId(item.id)
      __DEV__ && console.tron.debug(`selected user: ${item.id}`)
      saveCurrentUser(item)
      navigation.navigate("intervals")
    },
    [navigation, saveCurrentUser],
  )
  const renderItem = useCallback(
    ({ item }: { item: User }) => {
      // adjust the background color when selected
      const backgroundColor =
        item.id === selectedId ? color.palette.lightGrey : color.palette.charcoal
      return (
        <UserRow style={{ backgroundColor }} onPress={() => navigateOnTouch(item)} user={item} />
      )
    },
    [navigateOnTouch, selectedId],
  )

  if (loading) return <Loader message="Finding avatars..." />

  __DEV__ && console.tron.debug(`available users: ${users}`)

  return (
    <Screen style={ROOT} preset="fixed">
      <Text style={HEADER} preset="header" text="Select A User" />
      <FlatList
        keyExtractor={extractor}
        data={users}
        refreshing={loading}
        onRefresh={loadAsync}
        renderItem={renderItem}
        extraData={selectedId}
        contentContainerStyle={CONTENT}
      />
    </Screen>
  )
})
