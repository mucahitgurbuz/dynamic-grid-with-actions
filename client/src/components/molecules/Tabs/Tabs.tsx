import { Box, Flex } from 'bumbag'
import React, { useState } from 'react'

interface IContent {
  title: string
  content: JSX.Element
}

interface ITabs {
  contents: IContent[]
}

const Tabs: React.FC<ITabs> = ({ contents }) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Flex flexDirection="column">
      <Flex width="100%" borderBottom="2px solid #8997B2">
        {contents.map((content, i) => (
          <Flex
            key={i.toString()}
            onClick={() => setActiveTab(i)}
            padding="8px"
            fontSize="16px"
            lineHeight="xs"
            fontWeight="bolder"
            color="text"
            borderBottom={i === activeTab ? '4px solid #3DA836' : undefined}
            opacity={i === activeTab ? '1' : '0.2'}
            marginLeft={i !== 0 ? '32px' : '0px'}
            position="static"
            marginBottom="-3px"
            cursor="pointer"
          >
            {content.title}
          </Flex>
        ))}
      </Flex>
      <Box marginTop="20px">{contents[activeTab].content}</Box>
    </Flex>
  )
}

export default Tabs
