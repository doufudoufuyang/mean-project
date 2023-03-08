import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "./profile.reducer";

export const selectProfileState = createFeatureSelector<ProfileState>('profiles');

export const selectProfiles = createSelector(
    selectProfileState,
    (state: ProfileState) => state.profiles
)

export const selectProfileById = (profileId: string) => createSelector(
    selectProfiles,
    profiles => profiles.find(profile => profile._id === profileId)
)
