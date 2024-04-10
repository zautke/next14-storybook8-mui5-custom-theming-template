import type { Meta, StoryObj } from '@storybook/react'
import { MuiButton } from './MuiButton'
import { ButtonProps } from '@mui/material'


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'MUI/Button',
  component: MuiButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof MuiButton>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story & ButtonProps = {
  args: {
    label: 'primary',
    variant: 'contained',
  },
}

export const Secondary: Story & ButtonProps = {
  args: {
    label: 'secondary',
    variant: 'outlined',
  },
}

export const Text: Story & ButtonProps = {
  args: {
    label: 'secondary',
    variant: 'text',
  },
}

