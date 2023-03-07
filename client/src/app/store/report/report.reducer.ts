import { createReducer, on } from '@ngrx/store';
import { ReportAction } from './report.action';

export const initialState: any[] = [];

export const reportReducer = createReducer(
    initialState,
    on(ReportAction.getReports, (state, { reports }) => reports),
    on(ReportAction.getReport, (state, { id }) => {
        return [...state];
    }),
    on(ReportAction.addReport, (state, { report }) => {
        return [...state, report];
    }),
    on(ReportAction.updateReport, (state, { report }) => {
        return state.map(item => item._id === report._id ? report : item);
    }),
)
