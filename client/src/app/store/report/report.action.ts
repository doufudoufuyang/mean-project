import { createActionGroup, props } from '@ngrx/store';
import { Report } from 'src/app/interfaces/report';

export const ReportAction = createActionGroup({
    source: '[EmployeeHousing Page] Reports',
    events: {
        'Get Reports': props<{ reports: any[] }>(),
        'Get Report': props<{ id: string }>(),
        'Add Report': props<{ report: Report }>(),
        'Update Report': props<{ report: Report }>(),
    },
});
