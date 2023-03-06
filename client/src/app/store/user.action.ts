import { createActionGroup, props } from '@ngrx/store';
import { User } from '../user';

export const UserAction = createActionGroup({
    // Defines which page/component is using which slice of state
    source: '[List Page] Users',
    // Group of Actions (type: payload)
    events: {
        'Get Users': props<{ users: any[] }>(),
        'Add User': props<{ user: User }>(),
        'Delete User': props<{ index: number }>(),
    },
});
