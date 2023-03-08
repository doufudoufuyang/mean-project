export interface Employee {
    SSN : string,
    address? : {
        apt : string,
        street : string,
        city : string,
        state : string,
        zip : string
    },
    car? : {
        color : string
        make : string,
        model : string
    }
    cellPhoneNumber : string,
    dateOfBirth : string,
    emergencyContacts : Contact[],
    firstName : string,
    lastName : string,
    middleName? : string,
    picture? : string
    preferredName? : string,
    reference : Contact[],
    step : number,
    workPhoneNumber : string
    
    
}

interface Contact {
    firstName : string,
    lastName : string,
    middleName? : string,
    phone : string,
    email : string,
    relationship : string
}