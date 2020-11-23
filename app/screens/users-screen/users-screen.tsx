import React from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TextStyle, ViewStyle } from "react-native"
import { Screen, Text, UserRow } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { color, spacing } from "../../theme"
import { useUsers } from "../../utils/hooks"
import { User } from "../../models"

const ROOT: ViewStyle = {
  display: "flex",
  flex: 1,
  backgroundColor: color.palette.charcoal,
  alignItems: "center",
}
const HEADER: TextStyle = {
  margin: spacing[2],
}

const renderItem = ({ item }: { item: User }) => <UserRow user={item} />
const extractor = (item) => item.id

export const UsersScreen = observer(function UsersScreen() {
  const { users, loadAsync, loading } = useUsers()

  if (loading) return null
  __DEV__ && console.tron.debug(`current users: ${users}`)
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <Text style={HEADER} preset="header" text="Select A User" />
      <FlatList
        keyExtractor={extractor}
        data={users}
        refreshing={loading}
        onRefresh={loadAsync}
        renderItem={renderItem}
      />
    </Screen>
  )
})
