import type { Meta, StoryObj } from '@storybook/react'
import { MuiSelect } from './MuiSelect'
import { SelectProps } from '@mui/material'


const meta = {
  title: 'MUI/Select',
  component: MuiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MuiSelect>

export default meta
type SelectStoryProps = StoryObj<typeof meta> & SelectProps

export const Primary: SelectStoryProps = {
  args: {
    ...MuiSelect
  },
}
