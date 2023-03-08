import { createReducer, on } from '@ngrx/store';
import { HouseAction } from './house.action';
import { House } from 'src/app/interfaces/house';

export interface HouseState {
    houses: House[],
}

export const initialState: HouseState = {
    houses: [],
}

export const houseReducer = createReducer(
    initialState,
    on(HouseAction.getHouses, (state, { houses }) => ({
        ...state,
        houses: houses
    })),
    on(HouseAction.addHouse, (state, { house }) => ({
        ...state,
        houses: [...state.houses, house]
    })),
    on(HouseAction.updateHouse, (state, { house }) => ({
        ...state,
        houses: state.houses.map(item => item._id === house._id ? house : item)
    })),
    on(HouseAction.deleteHouse, (state, { id }) => ({
        ...state,
        houses: state.houses.filter(house => house._id !== id)
    }))
)
