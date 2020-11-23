import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Loader, Screen, UserHeader } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useIntervals } from "../../utils/hooks"
// import { Interval } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.charcoal,
  flex: 1,
}

// const renderItem = ({ item }: { item: Interval }) => <TransactionRow transaction={item} />

export const IntervalScreen = observer(() => {
  const { data, loading } = useIntervals()

  if (loading) return <Loader message="Loading Intervals..." />
  __DEV__ && console.tron.log(data)

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <UserHeader />
      {/* <SectionList
        keyExtractor={(item) => item.id}
        sections={data}
        refreshing={loading}
        onRefresh={loadAsync}
        renderItem={renderItem}
        // renderSectionHeader={({ section: { title } }) => <Text style={SECTION}>{title}</Text>}
        stickySectionHeadersEnabled
      /> */}
    </Screen>
  )
})
