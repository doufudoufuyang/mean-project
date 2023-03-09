import { createFeatureSelector, createSelector } from "@ngrx/store";
export const selectEmployee = createFeatureSelector('employee')
export const selectProfile = createSelector(
    selectEmployee,
    (state:any) => state.profile
)