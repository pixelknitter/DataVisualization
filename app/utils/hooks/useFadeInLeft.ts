import { useEffect, useRef } from "react"
import { Animated } from "react-native"

export const useFadeInLeft = () => {
  const opacity = useRef(new Animated.Value(0.0)).current
  const xDelta = useRef(new Animated.Value(0.0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1.0,
        delay: 200,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(xDelta, {
        toValue: 1.0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, xDelta])

  return {
    opacity,
    xDelta,
  }
}
