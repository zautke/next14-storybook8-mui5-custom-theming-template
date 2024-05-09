import type { Meta, StoryObj } from '@storybook/react'
import { MuiTypography } from './MuiTypography'
import { TypographyProps } from '@mui/material'


const meta = {
  title: 'MUI/Typography',
  component: MuiTypography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MuiTypography>

export default meta
type TypographyStoryProps = StoryObj<typeof meta> & TypographyProps

export const Primary: TypographyStoryProps = {

}
