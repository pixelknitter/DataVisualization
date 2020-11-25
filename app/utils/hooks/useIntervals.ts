import { useCallback, useEffect, useState } from "react"
import { useStores } from "../../models"

export const useIntervals = () => {
  const { userStore, intervalStore } = useStores()
  // set initial state
  const [loading, setLoading] = useState(true)

  const loadAsync = useCallback(async () => {
    // reset loading to true at start of the async call
    setLoading(true)
    await intervalStore
      .getIntervals(userStore.currentUser.id)
      .catch((e) => console.tron.error(e.message, e.stack))
      // ensure we stop loading when call is finished regardless of success/fail
      .finally(() => setLoading(false))
  }, [userStore, intervalStore])

  useEffect(() => {
    if (!loading) return

    loadAsync()
  }, [loadAsync, loading])

  return {
    intervalStore,
    loading,
    loadAsync,
  }
}
