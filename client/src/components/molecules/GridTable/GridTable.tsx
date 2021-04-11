import { Box, Flex, Grid, Text } from 'bumbag'
import dayjs from 'dayjs'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

interface IRowsData {
  isSelected: boolean
  hasAction: boolean
  columns: { title: string; content: string }[]
}

interface IGridTable {
  data: IRowsData[]
  isBusy?: boolean
  onClick: (index: number) => void
}

const GridTable: React.FC<IGridTable> = ({ data, isBusy, onClick }) => {
  return (
    <Grid
      width="100%"
      overflow="auto"
      gridTemplateColumns={`repeat(${data.length ? data[0].columns.length : 5}, auto)`}
      gridRowGap="8px"
    >
      {data.reduce(
        (res, row, line, rowsArray) => [
          ...res,
          <React.Fragment key={line.toString()}>
            {...row.columns.map((cell, i, arr) => (
              <Box
                key={`${line.toString()}-${i.toString()}`}
                onClick={() => onClick(line)}
                height="70px"
                backgroundColor={row.isSelected ? 'yellowLight' : 'white'}
                borderLeft={row.hasAction && i === 0 ? 'solid 8px #E9CF30' : undefined}
                cursor="pointer"
              >
                <Flex
                  alignItems="center"
                  height="100%"
                  paddingLeft={row.hasAction && i === 0 ? '8px' : '16px'}
                  color="text"
                  lineHeight="l"
                >
                  <Flex maxWidth="200px" flexDirection="column">
                    <Text fontWeight="bolder">{cell.title}</Text>
                    <Text>{i === 0 ? dayjs(cell.content).format('DD.MM.YYYY HH:mm') : cell.content}</Text>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </React.Fragment>,
        ],
        []
      )}
      {isBusy &&
        Array(1).fill(
          data[0] &&
            data[0].columns.map((column, i) => (
              <Skeleton key={i.toString()} height="70px" style={{ marginBottom: 4 }} />
            ))
        )}
    </Grid>
  )
}

export default GridTable
