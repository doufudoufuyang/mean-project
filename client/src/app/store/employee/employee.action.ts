import { createActionGroup, props } from "@ngrx/store";
// import { Employee } from "src/app/interfaces/employee";

export const EmployeeAction = createActionGroup({
    source: '[EmployeeInfo Page] Info',
    events: {
        'Set Employee Info': props<{employeeInfo : any}>()
    }
})
