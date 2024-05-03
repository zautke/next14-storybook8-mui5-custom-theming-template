import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { MuiAppBar } from './MuiAppBar'

const meta = {
  title: 'MUI/AppBar',
  component: MuiAppBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof MuiAppBar>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  args: {

  },
};

