import { ViewStyle, TextStyle, ImageStyle } from "react-native"
import { spacing, color } from "../../theme"

const IMAGE_SIZE = 80
const CONTAINER_HEIGHT = 100
const FONT_SIZE = 24

export const userHeaderStyles = {
  CONTAINER: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: CONTAINER_HEIGHT,
    padding: spacing[2] + spacing[1],
    backgroundColor: color.palette.charcoal,
  } as ViewStyle,
  RIGHT_CONTAINER: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginRight: -10,
  } as ViewStyle,
  IMAGE_LAYOUT: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginRight: spacing[2],
  } as ImageStyle,
  USER_TEXT: {
    fontSize: FONT_SIZE,
    fontWeight: "500",
    color: color.palette.orange,
  } as TextStyle,
}
