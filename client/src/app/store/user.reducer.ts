import { createReducer, on } from '@ngrx/store';
import { UserAction } from './user.action';

// State is immutable
export const initialState: any[] = [];

// Reducer determines new state based on Action type
export const userReducer = createReducer(
    // Initial State
    initialState,
    // On will handle dispatched actions to deduce new state from old state
    on(UserAction.getUsers, (state, { users }) => users),
    on(UserAction.addUser, (state, { user }) => {
        return [...state, user];
    }),
    on(UserAction.deleteUser, (state, { index }) => {
        return [...state].slice(0, index).concat([...state].slice(index + 1));
    })
);
