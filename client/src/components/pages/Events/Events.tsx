import { Box, Flex } from 'bumbag'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../../state/redux/actions/eventsActions'
import EventDetails from '../../organisms/EventDetails/EventDetails'
import EventList from '../../organisms/EventList/EventList'

const Events: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getEvents())
  }, [])
  return (
    <Flex paddingTop="28px" paddingRight="12px" gap="14px" flexWrap="wrap" height="100%">
      <Box flex={{ default: '2', tablet: '1', mobile: '1' }} width="100%" height="100%">
        <EventList />
      </Box>
      <Box flex={{ default: '1', tablet: '1', mobile: '1' }} minWidth="475px">
        <EventDetails />
      </Box>
    </Flex>
  )
}

export default Events
