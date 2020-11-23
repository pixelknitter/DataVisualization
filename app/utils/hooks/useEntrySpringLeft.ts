import { useCallback, useEffect, useRef } from "react"
import { Animated } from "react-native"

export const useSpringEntryLeft = () => {
  const xDelta = useRef(new Animated.Value(0.0)).current
  const opacity = useRef(new Animated.Value(0.0)).current

  const spring = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1.0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(xDelta, {
        toValue: 1,
        tension: 16,
        useNativeDriver: true,
      }),
    ]).start()
  }, [xDelta, opacity])

  useEffect(() => {
    spring()
  }, [spring, opacity, xDelta])

  return { xDelta, opacity }
}
