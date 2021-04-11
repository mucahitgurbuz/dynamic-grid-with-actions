import { Flex, Text } from 'bumbag'
import React from 'react'

interface IListItem {
  title: string
  description: string
  isSelected: boolean
  onClick: () => void
}

const ListItem: React.FC<IListItem> = ({ title, description, isSelected, onClick }) => {
  return (
    <Flex
      onClick={onClick}
      flexDirection="column"
      altitude="300"
      backgroundColor={isSelected ? 'greyDarker' : 'greyLight'}
      color={isSelected ? 'white' : 'text'}
      paddingY="14px"
      paddingX="18px"
      lineHeight="l"
      cursor="pointer"
    >
      <Text fontSize="16px" fontWeight="bolder">
        {title}
      </Text>
      <Text fontSize="14px">{description}</Text>
    </Flex>
  )
}

export default ListItem
