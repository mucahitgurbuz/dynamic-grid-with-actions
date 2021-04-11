import { Flex } from 'bumbag'
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { create } from 'react-test-renderer'
import RadioButton from '../RadioButton'

let mockProps

describe('RadioButton', () => {
  beforeEach(() => {
    mockProps = {
      isSelected: false,
      label: 'Test-RadioButton',
      onClick: jest.fn(),
    }
  })

  it('styles as not selected when isSelected prop is false', () => {
    const component = create(<RadioButton {...mockProps} />)
    expect(component.root.findAllByType(Flex)[1].props.border).toBe('thickGrey')
    expect(component.root.findAllByType(Flex)[1].props.children).toEqual(false)
    expect(component.root.findByType('span').props.children).toEqual(mockProps.label)
  })

  it('styles as selected when isSelected prop is true', () => {
    mockProps = { ...mockProps, isSelected: true }
    const component = create(<RadioButton {...mockProps} />)
    expect(component.root.findAllByType(Flex)[1].props.border).toBe('thickGreen')
    expect(component.root.findAllByType(FaCheck)[0]).toBeTruthy()
  })

  it('calls on onClick callback when container click only when not selected', () => {
    const component = create(<RadioButton {...mockProps} />)
    component.root.findAllByType(Flex)[0].props.onClick()
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)
    mockProps = { ...mockProps, isSelected: true }
    const component2 = create(<RadioButton {...mockProps} />)
    component2.root.findAllByType(Flex)[0].props.onClick()
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)
  })
})
