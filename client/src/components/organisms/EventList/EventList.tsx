import { Flex, Input, Text } from 'bumbag'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useGlobalStore from '../../../state/globalStore/globalStore'
import GridTable from '../../molecules/GridTable/GridTable'
import { Sort } from '../../../state/globalStore/types'
import RadioButton from '../../atoms/RadioButton/RadioButton'

const EventList: React.FC = () => {
  const eventsRawData = useSelector(state => state.events)
  const [
    { events, selectedEvent, activeSort, filterRouteValue },
    { setEvents, setSelectedEvent, setActiveSort, setFilterRouteValue },
  ] = useGlobalStore()

  useEffect(() => {
    if (!eventsRawData.loading) {
      setEvents(
        eventsRawData.events
          .filter(event => event.details[2].value.toLowerCase().includes(filterRouteValue.toLowerCase()))
          .map((event, i) => ({
            isSelected: i === selectedEvent,
            hasAction: event.actions.filter(action => action.action_taken).length === 0,
            columns: event.details
              .filter((detail, i, arr) => i < arr.length - 3)
              .map((detail, i) => ({
                title: detail.title,
                content: detail.value,
              })),
            details: event.details
              .filter((detail, i, arr) => i > arr.length - 4)
              .map(detail => ({ title: detail.title, content: detail.value })),
            media: event.media[0],
            location: { latitude: event.location.latitude, longitude: event.location.longitude },
          }))
      )
    }
  }, [eventsRawData, filterRouteValue])

  const onSelectAction = (index: number) => {
    setSelectedEvent(index)
  }

  return (
    <Flex flexDirection="column" height="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <Text
          marginLeft="18px"
          marginBottom="14px"
          color="text"
          fontSize="23px"
          fontWeight="bolder"
          lineHeight="l"
        >
          EVENTS
        </Text>
        <Flex alignItems="center" gap="16px">
          <RadioButton
            isSelected={activeSort === Sort.NewToOld}
            label="New to old"
            onClick={() => setActiveSort(Sort.NewToOld)}
          />
          <RadioButton
            isSelected={activeSort === Sort.OldToNew}
            label="Old to new"
            onClick={() => setActiveSort(Sort.OldToNew)}
          />
          <Input
            placeholder="Filter Route Name"
            value={filterRouteValue}
            onChange={(e: any) => setFilterRouteValue(e.target.value)}
          />
        </Flex>
      </Flex>
      <GridTable data={events} onClick={onSelectAction} />
    </Flex>
  )
}

export default EventList
