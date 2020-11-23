import { useCallback, useEffect, useState } from "react"
import { User, UserSnapshot, useStores } from "../../models"

export const useUsers = () => {
  const { userStore } = useStores()
  // set initial state
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const saveCurrentUser = useCallback(
    async (user: User | UserSnapshot) => {
      userStore.saveCurrentUser(user)
      setCurrentUser(user)
    },
    [userStore],
  )

  const loadAsync = useCallback(async () => {
    // reset loading to true at start of the async call
    setLoading(true)
    await userStore
      .getUsers()
      .then(() => setUsers(userStore.availableUsers))
      .catch((e) => console.tron.error(e.message, e.stack))
      // ensure we stop loading when call is finished regardless of success/fail
      .finally(() => setLoading(false))
  }, [userStore])

  useEffect(() => {
    if (!loading) return

    loadAsync()
  }, [loadAsync, loading])

  return {
    users,
    currentUser,
    loading,
    loadAsync,
    saveCurrentUser,
  }
}
