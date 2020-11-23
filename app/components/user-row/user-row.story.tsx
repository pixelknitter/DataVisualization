import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { UserRow } from "./user-row"
import { User } from "../../models"
import { v1 as uuid } from "uuid"

declare let module

const mockUser: User = {
  id: uuid(),
  name: "User",
  avatar: "https://www.fillmurray.com/100/100",
}

storiesOf("TransactionRow", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase
        text="Primary"
        usage="Display the data of a User with minimal usage of space. Visually represents the user with an avatar."
      >
        <UserRow user={mockUser} />
      </UseCase>
    </Story>
  ))
