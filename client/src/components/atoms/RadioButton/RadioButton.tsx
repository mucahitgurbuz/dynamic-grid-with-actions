import { Flex, Text } from 'bumbag'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

interface IRadioButton {
  isSelected: boolean
  label: string
  onClick: () => void
}

const RadioButton: React.FC<IRadioButton> = ({ isSelected, label, onClick }) => {
  return (
    <Flex alignItems="center" onClick={() => !isSelected && onClick()} cursor="pointer">
      <Flex
        justifyContent="center"
        alignItems="center"
        width="22px"
        height="22px"
        borderRadius="full"
        border={isSelected ? 'thickGreen' : 'thickGrey'}
        flexShrink="0"
      >
        {isSelected && <FaCheck style={{ color: '#3BA935' }} fontSize="10px" />}
      </Flex>
      <Text marginLeft="12px">{label}</Text>
    </Flex>
  )
}

export default RadioButton
