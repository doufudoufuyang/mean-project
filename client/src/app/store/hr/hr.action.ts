import { createActionGroup, props } from "@ngrx/store";

export const HrAction = createActionGroup({
    source: '[Hr Page] Info',
    events: {
        'Set Hr Info': props<{HrInfo : any}>()
    }
})
