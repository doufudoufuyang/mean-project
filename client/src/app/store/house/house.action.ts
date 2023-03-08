import { createActionGroup, props } from '@ngrx/store';
import { House } from 'src/app/interfaces/house';

export const HouseAction = createActionGroup({
    source: '[HrHousingManagement Page] Houses',
    events: {
        'Get Houses': props<{ houses: any[] }>(),
        'Add House': props<{ house: House }>(),
        'Update House': props<{ house: House }>(),
        'Delete House': props<{ id: string}>(),
    },
});
