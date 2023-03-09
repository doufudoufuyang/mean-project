import { createReducer, on } from '@ngrx/store';
import { Profile } from 'src/app/interfaces/profile';
import { ProfileAction } from './profile.action';

export interface ProfileState {
    profiles: Profile[],
}

export const initialState: ProfileState = {
    profiles: [],
}

export const profileReducer = createReducer(
    initialState,
    on(ProfileAction.getProfiles, (state, { profiles }) => ({
        ...state,
        profiles: profiles,
    })),
    on(ProfileAction.updateProfile, (state, { profile }) => ({
        ...state,
        profiles: state.profiles.map(item => item._id === profile._id ? profile : item),
    }))
)
