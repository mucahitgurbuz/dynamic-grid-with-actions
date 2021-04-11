export interface IGlobalStore {
  events: IEvent[]
  selectedEvent: number
  activeSort: Sort
  filterRouteValue: string
}

export interface IGlobalActions {
  clearState: (data: Partial<IGlobalStore>) => void
  setEvents: (events: IEvent[]) => void
  setSelectedEvent: (selectedEvent: number) => void
  setActiveSort: (activeSort: Sort) => void
  setFilterRouteValue: (filterRouteValue: string) => void
}

export interface IEvent {
  isSelected: boolean
  hasAction: boolean
  columns: { title: string; content: string }[]
  details: { title: string; content: string }[]
  media: { url: string; type: string }
  location: { latitude: number; longitude: number }
}

export enum Sort {
  NewToOld,
  OldToNew,
}
