import React from 'react'
import { Image, Flex, Modal } from 'bumbag'
import { RiFullscreenLine, RiFullscreenExitLine } from 'react-icons/ri'

interface IImageWithLightBox {
  imageUrl: string
  width?: string
  height?: string
}

const ImageWithLightBox: React.FC<IImageWithLightBox> = ({ imageUrl, width, height }) => {
  return (
    <Flex position="relative">
      <Image
        src={imageUrl}
        width={width ? width : '100%'}
        height={height ? height : '100%'}
        objectFit="cover"
      />

      <Modal.State>
        <Modal.Disclosure>
          <RiFullscreenLine
            style={{ position: 'absolute', bottom: 20, right: 20 }}
            color="white"
            fontSize="24px"
            cursor="pointer"
          />
        </Modal.Disclosure>
        <Modal padding="14px" backgroundColor="white">
          <Image src={imageUrl} width="100%" height="100%" />
          <Modal.Disclosure>
            <RiFullscreenExitLine
              style={{ position: 'absolute', bottom: 32, right: 32 }}
              color="white"
              fontSize="24px"
              cursor="pointer"
            />
          </Modal.Disclosure>
        </Modal>
      </Modal.State>
    </Flex>
  )
}

export default ImageWithLightBox
