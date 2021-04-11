import { Box, Flex, Image, Modal, Text } from 'bumbag'
import { keyframes } from '@bumbag/emotion-css'
import React, { useEffect } from 'react'

export enum MultiStepModalStatus {
  InProcess,
  Successful,
  Busy,
  Error,
}

interface IStep {
  title: string
  content: JSX.Element
}

interface IMultiStepModal {
  button: JSX.Element
  steps: IStep[]
  currentStep: number
  status: MultiStepModalStatus
  onClose: () => void
}

const rotation = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(359deg);
}
`

const MultiStepModal: React.FC<IMultiStepModal> = ({ button, steps, currentStep, status, onClose }) => {
  const modal = Modal.useState()

  React.useEffect(() => {
    if (!modal.visible) {
      onClose()
    }
  }, [modal.visible])
  return (
    <>
      <Modal.Disclosure width="100%" {...modal}>
        {button}
      </Modal.Disclosure>
      <Modal
        paddingX={status === MultiStepModalStatus.InProcess ? '40px' : '11px'}
        paddingY={status === MultiStepModalStatus.InProcess ? '32px' : '11px'}
        backgroundColor="white"
        borderRadius="lg"
        altitude="100"
        width={{
          default: status === MultiStepModalStatus.InProcess ? '800px' : '512px',
          tablet: '512px',
          mobile: '450px',
        }}
        height={status === MultiStepModalStatus.InProcess ? 'auto' : '296px'}
        {...modal}
      >
        {status !== MultiStepModalStatus.Busy && (
          <Modal.Disclosure position="absolute" top="20px" right="25px" {...modal}>
            <Image src="/assets/img/times.svg" width="14px" height="14px" color="text" cursor="pointer" />
          </Modal.Disclosure>
        )}
        {status !== MultiStepModalStatus.InProcess ? (
          <Flex height="100%" justifyContent="center" alignItems="center" flexDirection="column">
            {status === MultiStepModalStatus.Busy ? (
              <Image
                animation={`${rotation} 0.5s infinite linear`}
                src="/assets/img/loading.svg"
                width="56px"
                height="56px"
              />
            ) : (
              <>
                <Image
                  src={`/assets/img/${status === MultiStepModalStatus.Successful ? 'success' : 'error'}.svg`}
                  width="56px"
                  height="56px"
                />
                <Text
                  marginTop="12px"
                  fontSize="29px"
                  color={status === MultiStepModalStatus.Successful ? 'green' : 'red'}
                  fontWeight="bolder"
                  lineHeight="sm"
                >
                  {status === MultiStepModalStatus.Successful
                    ? 'ACTION HAS BEEN TAKEN!'
                    : 'A PROBLEM OCCURED!'}
                </Text>
                <Text marginTop="12px" fontSize="16px" lineHeight="l">
                  {status === MultiStepModalStatus.Successful
                    ? 'You can see the action details from details tab.'
                    : 'We cannot continue due to a problem. Please try again later.'}
                </Text>
              </>
            )}
          </Flex>
        ) : (
          <Flex flexDirection="column" marginTop="16px">
            <Flex width="100%" borderBottom="2px solid #8997B2" justifyContent="center">
              {steps.map((step, i) => (
                <Flex
                  key={i.toString()}
                  padding="9px"
                  fontSize="19px"
                  lineHeight="xs"
                  fontWeight="bolder"
                  color="text"
                  borderBottom={i === currentStep ? '5px solid #3DA836' : undefined}
                  opacity={i === currentStep ? '1' : '0.2'}
                  marginLeft={i !== 0 ? '100px' : '0px'}
                  position="static"
                  marginBottom="-3px"
                  alignItems="center"
                >
                  <Flex
                    marginRight="4px"
                    width="19px"
                    height="19px"
                    borderRadius="full"
                    backgroundColor="text"
                    color="white"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="12px"
                    flexShrink="0"
                  >
                    {i + 1}
                  </Flex>
                  <Text>{step.title}</Text>
                </Flex>
              ))}
            </Flex>
            <Box marginTop="24px">{steps[currentStep].content}</Box>
          </Flex>
        )}
      </Modal>
    </>
  )
}

export default MultiStepModal
