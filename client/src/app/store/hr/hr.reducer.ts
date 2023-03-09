import { createReducer, on } from "@ngrx/store";
import { HrAction } from "./hr.action";
import { Employee } from "src/app/interfaces/employee";

export const initialState: any = {}

export const hrReducer = createReducer(
    initialState,
    on(HrAction.setHrInfo, (state, {HrInfo}) => HrInfo)
)