import { Report } from "./report";

export interface House {
    _id: string,
    address: {
        apt: string,
        street: string,
        city: string,
        state: string,
        zip: string,
    },
    landlord: {
        name: string,
        phone: string,
        email: string,
    },
    facilityInfo: {
        bedNum: number,
        mattressNum: number,
        tableNum: number,
        chairNum: number,
    },
    residents: any[],
    reports: Report[],
}
