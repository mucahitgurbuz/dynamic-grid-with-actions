import { Box, Flex } from 'bumbag'
import React, { PropsWithChildren } from 'react'
import 'regenerator-runtime/runtime'

export function Main(props: PropsWithChildren<any>) {
  return (
    <Flex height="100vh" width="full" flexDirection="column">
      <Box minHeight="68px" width="100%" backgroundColor="text" />
      <Flex height="calc(100% - 68px)">
        <Box width="55px" backgroundColor="text" />
        <Box flexGrow="1">{props.children}</Box>
      </Flex>
    </Flex>
  )
}
