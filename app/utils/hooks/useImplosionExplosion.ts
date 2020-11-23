import { useCallback, useEffect, useRef, useState } from "react"
import { Animated } from "react-native"

export const useImplosionExplosion = () => {
  const imageOpacity = useRef(new Animated.Value(0.0)).current
  const placeholderOpacity = useRef(new Animated.Value(1.0)).current
  const placeholderScale = useRef(new Animated.Value(1.0)).current
  const [loaded, setLoaded] = useState(false)

  const animateImage = useCallback(() => {
    Animated.sequence([
      // Implode
      Animated.parallel([
        Animated.timing(placeholderScale, {
          toValue: 0.7,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(placeholderOpacity, {
          toValue: 0.66,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),

      // Explode
      Animated.parallel([
        Animated.parallel([
          Animated.timing(placeholderOpacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(placeholderScale, {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(imageOpacity, {
          toValue: 1.0,
          delay: 225,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setLoaded(true)
    })
  }, [imageOpacity, placeholderOpacity, placeholderScale])

  useEffect(() => {
    animateImage()
  }, [animateImage, loaded])

  return {
    loaded,
    setLoaded,
    imageOpacity,
    placeholderOpacity,
    placeholderScale,
    animateImage,
  }
}
