import React from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ViewStyle } from "react-native"
import { Screen, Text, UserRow } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { useUsers } from "../../utils/hooks"
import { User } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const renderItem = ({ item }: { item: User }) => <UserRow user={item} />

export const UsersScreen = observer(function UsersScreen() {
  const { users, loadAsync, loading } = useUsers()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Select User" />
      <FlatList
        keyExtractor={(item) => item.id}
        data={users}
        refreshing={loading}
        onRefresh={loadAsync}
        renderItem={renderItem}
      />
    </Screen>
  )
})
