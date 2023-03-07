import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Report } from '../../interfaces/report';
import { ReportState } from "./report.reducer";

export const selectReportState = createFeatureSelector<ReportState>('reports');

export const selectReports = createSelector(
    selectReportState,
    (state: ReportState) => state.reports
)

export const selectReportById = (reportId: string) => createSelector(
    selectReports,
    reports => reports.find(report => report._id === reportId)
)
