import type { Meta, StoryObj } from '@storybook/react'
import { MuiSwitch } from './MuiSwitch'
import { SwitchProps } from '@mui/material'


const meta = {
  title: 'MUI/Switch',
  component: MuiSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MuiSwitch>

export default meta
type SwitchStoryProps = StoryObj<typeof meta> & SwitchProps

export const Primary: SwitchStoryProps = {
  args: {
    label: 'primary',
    variant: 'contained',
  },
}
