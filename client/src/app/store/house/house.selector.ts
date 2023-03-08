import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HouseState } from "./house.reducer";

export const selectHouseState = createFeatureSelector<HouseState>('houses');

export const selectHouses = createSelector(
    selectHouseState,
    (state: HouseState) => state.houses
)

export const selectHouseById = (houseId: string) => createSelector(
    selectHouses,
    houses => houses.find(house => house._id === houseId)
)
