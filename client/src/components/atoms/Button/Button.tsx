import { Flex, FlexProps } from 'bumbag'
import React from 'react'

interface IButton {
  disabled?: boolean
  isDark?: boolean
  width?: string
  onClick?: () => void
}

const Button: React.FC<IButton> = ({ children, disabled, isDark, width, onClick }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      backgroundColor={isDark ? 'greyDark' : 'green'}
      color="white"
      borderRadius="sm"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      fontWeight="bolder"
      disabled={disabled}
      fontSize="16px"
      altitude="300"
      onClick={onClick && onClick}
      userSelect="none"
      width={width ? width : '100%'}
      height="36px"
    >
      {children}
    </Flex>
  )
}

export default Button
