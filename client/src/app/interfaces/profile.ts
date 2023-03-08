import { House } from "./house"

interface Contact {
    firstName : string,
    lastName : string,
    middleName? : string,
    phone : string,
    email : string,
    relationship : string
}

export interface Profile {
    _id: string,
    firstName : string,
    lastName : string,
    middleName? : string,
    preferredName? : string,
    pic? : string,
    address : {
        apt : string,
        street : string,
        city : string,
        state : string,
        zip : string,
    },
    cellPhoneNumber : string,
    workPhoneNumber? : string,
    car? : {
        make : string,
        model : string,
        color : string,
    }
    email: string,
    SSN: string,
    dateOfBirth : Date,
    gender?: string,
    driverLicense?: {
        number: string,
        expireDate: string,
        document: string,
    }
    reference: Contact,
    emergencyContacts: Contact[],
    house: House,
    step : number,
    nextStep: number,
    feedback: string,
    optReceipt: string,
    optEAD: string,
    i983: string,
    i20: string,
    title: string,
    startDate: string,
    endDate: string,
}
