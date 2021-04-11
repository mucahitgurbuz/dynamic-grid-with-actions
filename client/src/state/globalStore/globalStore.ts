import dayjs from 'dayjs'
import React from 'react'
import globalHook, { Store } from 'use-global-hook'
import { IEvent, IGlobalActions, IGlobalStore, Sort } from './types'

export const initialState: IGlobalStore = {
  events: [],
  selectedEvent: 0,
  activeSort: Sort.NewToOld,
  filterRouteValue: '',
}

const actions: object = {
  clearState: (store: Store<IGlobalStore, IGlobalActions>, data: Partial<IGlobalStore>) => {
    store.setState({ ...store.state, ...data })
  },
  setEvents: (store: Store<Partial<IGlobalStore>, IGlobalActions>, events: IEvent[]) => {
    store.setState({ ...store.state, events })
  },
  setSelectedEvent: (store: Store<Partial<IGlobalStore>, IGlobalActions>, selectedEvent: number) => {
    const updatedEvents = store.state.events.map((event, i) => {
      event.isSelected = i === selectedEvent
      return event
    })
    store.setState({ ...store.state, events: updatedEvents, selectedEvent })
  },
  setActiveSort: (store: Store<Partial<IGlobalStore>, IGlobalActions>, activeSort: Sort) => {
    const updatedEvents = store.state.events.sort((a, b) => {
      if (activeSort === Sort.OldToNew) {
        return dayjs(a.columns[0].content).unix() - dayjs(b.columns[0].content).unix()
      } else {
        return dayjs(b.columns[0].content).unix() - dayjs(a.columns[0].content).unix()
      }
    })
    let selectedEvent
    updatedEvents.forEach((event, i) => {
      if (event.isSelected) {
        selectedEvent = i
      }
    })
    store.setState({ ...store.state, events: updatedEvents, activeSort, selectedEvent })
  },
  setFilterRouteValue: (store: Store<Partial<IGlobalStore>, IGlobalActions>, filterRouteValue: string) => {
    store.setState({ ...store.state, filterRouteValue })
  },
}

const useGlobalStore = globalHook<IGlobalStore, IGlobalActions>(React, initialState, actions)

export default useGlobalStore
