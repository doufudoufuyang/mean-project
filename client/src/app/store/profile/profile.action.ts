import { createActionGroup, props } from '@ngrx/store';
import { Profile } from 'src/app/interfaces/profile';

export const ProfileAction = createActionGroup({
    source: '[HrHiringManagement Page] Profiles',
    events: {
        'Get Profiles': props<{ profiles: any[] }>(),
        'Update Profile': props<{ profile: Profile }>(),
    },
});
