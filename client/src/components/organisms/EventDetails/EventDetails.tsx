import { Flex, Text, Textarea } from 'bumbag'
import React, { useState } from 'react'
import useGlobalStore from '../../../state/globalStore/globalStore'
import Button from '../../atoms/Button/Button'
import ListItem from '../../atoms/ListItem/ListItem'
import ImageWithLightBox from '../../molecules/ImageWithLightBox/ImageWithLightBox'
import MapWithMarker from '../../molecules/MapWithMarker/MapWithMarker'
import MultiStepModal, { MultiStepModalStatus } from '../../molecules/MultiStepModal/MultiStepModal'
import Tabs from '../../molecules/Tabs/Tabs'

enum Actions {
  None,
  MarkAsResolved,
  ChangeAsset,
}

const EventDetails: React.FC = () => {
  const [{ events, selectedEvent }, { setEvents }] = useGlobalStore()
  const [modalStatus, setModalStatus] = useState(MultiStepModalStatus.InProcess)
  const [selectedAction, setSelectedAction] = useState(Actions.None)
  const [modalCurrentStep, setModalCurrentStep] = useState(0)
  const [resolutionValue, setResolutionValue] = useState('')

  if (!events[selectedEvent]) {
    return null
  }

  const tabContents = [
    {
      title: 'DETAILS',
      content: (
        <Flex lineHeight="l" fontSize="14px">
          <Flex flexDirection="column">
            <Text fontWeight="bolder">{events[selectedEvent].details[1].title}</Text>
            <Text>{events[selectedEvent].details[1].content}</Text>
          </Flex>
          <Flex flexDirection="column" marginLeft="48px">
            <Text fontWeight="bolder">{events[selectedEvent].details[2].title}</Text>
            <Text>{events[selectedEvent].details[2].content}</Text>
          </Flex>
        </Flex>
      ),
    },
    {
      title: 'LOCATION',
      content: (
        <MapWithMarker
          position={{
            lat: events[selectedEvent].location.latitude,
            lng: events[selectedEvent].location.longitude,
          }}
        />
      ),
    },
    {
      title: 'MEDIA',
      content:
        events[selectedEvent].media.type === 'audio' ? (
          <audio controls>
            <source src={events[selectedEvent].media.url} type="audio/mpeg" />
          </audio>
        ) : (
          <ImageWithLightBox imageUrl={events[selectedEvent].media.url} height="400px" />
        ),
    },
  ]

  const selectActions = [
    {
      key: Actions.MarkAsResolved,
      title: 'Mark As Resolved',
      description: 'Mark this event as resolved and enter the details of the resolution.',
      isSelected: selectedAction === Actions.MarkAsResolved,
    },
    {
      key: Actions.ChangeAsset,
      title: 'Change Asset',
      description: 'Change the asset with another one.',
      isSelected: selectedAction === Actions.ChangeAsset,
    },
  ]

  const resetModalState = () => {
    if (modalStatus === MultiStepModalStatus.Successful) {
      const updatedEvents = [...events]
      updatedEvents[selectedEvent].columns[4].content = 'Çözüm Bildir'
      updatedEvents[selectedEvent].hasAction = false
      setEvents(updatedEvents)
    }
    setModalStatus(MultiStepModalStatus.InProcess)
    setModalCurrentStep(0)
    setSelectedAction(Actions.None)
    setResolutionValue('')
  }

  const onTakeAction = () => {
    setModalStatus(MultiStepModalStatus.Busy)
    setTimeout(() => {
      if (resolutionValue.length) {
        setModalStatus(MultiStepModalStatus.Successful)
      } else {
        setModalStatus(MultiStepModalStatus.Error)
      }
    }, 1000)
  }

  const selectActionContent = () => (
    <Flex flexDirection="column" gap="12px" marginTop="8px">
      {selectActions.map((action, i) => (
        <ListItem {...action} onClick={() => setSelectedAction(action.key)} />
      ))}
      <Flex justifyContent="center" marginTop="24px">
        <Button
          width="124px"
          onClick={() => setModalCurrentStep(modalCurrentStep + 1)}
          disabled={selectActions.filter(action => action.isSelected).length === 0}
        >
          NEXT
        </Button>
      </Flex>
    </Flex>
  )

  const takeActionContent = () => {
    const actionDetails = selectActions.filter(action => action.key === selectedAction)[0]
    if (!actionDetails) {
      return null
    }
    return (
      <Flex flexDirection="column" fontSize="16px" lineHeight="l">
        <Text fontWeight="bolder">{actionDetails.title}</Text>
        <Text>{actionDetails.description}</Text>
        <Text marginTop="24px" fontSize="14px" fontWeight="bolder">
          Resolution Detail*
        </Text>
        <Textarea
          style={{ height: 150 }}
          marginTop="4px"
          onChange={(e: any) => setResolutionValue(e.target.value)}
          value={resolutionValue}
          maxLength={300}
        />
        <Text fontSize="11px" marginTop="-28px" marginRight="10px" alignSelf="flex-end" style={{ zIndex: 1 }}>
          {`(${resolutionValue.length}/300)`}
        </Text>
        <Flex marginTop="24px" justifyContent="center" alignItems="center" gap="18px">
          <Button onClick={() => setModalCurrentStep(modalCurrentStep - 1)} isDark width="124px">
            BACK
          </Button>
          <Button onClick={onTakeAction} width="174px">
            TAKE ACTION
          </Button>
        </Flex>
      </Flex>
    )
  }

  const onNoActionNeeded = () => {
    const updatedEvents = [...events]
    updatedEvents[selectedEvent].columns[4].content = 'Aksiyon Gerekmiyor'
    updatedEvents[selectedEvent].hasAction = false
    setEvents(updatedEvents)
  }

  return (
    <Flex flexDirection="column">
      <Text
        marginLeft="18px"
        marginBottom="14px"
        color="text"
        fontSize="23px"
        fontWeight="bolder"
        lineHeight="l"
      >
        EVENT DETAILS
      </Text>
      <Flex flexDirection="column" backgroundColor="white" padding="16px">
        {events[selectedEvent].hasAction && (
          <Flex gap="6px" marginBottom="20px">
            <Button isDark onClick={onNoActionNeeded}>
              NO ACTION NEEDED
            </Button>
            <MultiStepModal
              button={<Button>TAKE ACTION</Button>}
              status={modalStatus}
              steps={[
                { title: 'SELECT ACTION', content: selectActionContent() },
                { title: 'TAKE ACTION', content: takeActionContent() },
              ]}
              currentStep={modalCurrentStep}
              onClose={resetModalState}
            />
          </Flex>
        )}

        <Tabs contents={tabContents} />
      </Flex>
    </Flex>
  )
}

export default EventDetails
