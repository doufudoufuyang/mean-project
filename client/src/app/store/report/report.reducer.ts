import { createReducer, on } from '@ngrx/store';
import { ReportAction } from './report.action';
import { Report } from '../../interfaces/report';

export interface ReportState {
    reports: Report[],
}

export const initialState: ReportState = {
    reports: [],
}

export const reportReducer = createReducer(
    initialState,
    on(ReportAction.getReports, (state, { reports }) => ({
        ...state,
        reports: reports
    })),
    on(ReportAction.addReport, (state, { report }) => ({
        ...state,
        reports: [...state.reports, report]
    })),
    on(ReportAction.updateReport, (state, { report }) => ({
        ...state,
        reports: state.reports.map(item => item._id === report._id ? report : item)
    })),
)
