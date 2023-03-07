exports.report1 = {
    title: 'report1',
    date: new Date(2023, 3, 4),
    status: 'Open',
    description: 'report1 description',
    // createdBy: employee1,
    comments: [],
}

exports.house1 = {
    address: {
        apt: 'Bldg 400 Suite 200',
        street: '50 Millstone Rd',
        city: 'East Windsor',
        state: 'NJ',
        zip: '08520'
    },
    landlord: {
        name: 'Beaconfire',
        phone: '000-000-0000',
        email: 'b@gmail.com',
    },
    residents: [],
    facilityInfo: {
        bedNum: 2,
        mattressNum: 2,
        tableNum: 1,
        chairNum: 4,
    },
    reports: [],
}

exports.profile1 = {
    firstName: 'Ming',
    lastName: 'Xiao',
    address: {
        apt: 'Apt 101',
        street: '1234 5th Ave',
        city: 'East Windsor',
        state: 'NJ',
        zip: '08520'
    },
    cellPhoneNumber: '000-000-0000',
    SSN: '000000000',
    dateOfBirth: new Date(2000, 0, 1),
    emergencyContacts: [{
        firstName: 'M',
        lastName: 'M',
        phone: '123-456-7890',
        email: 'mother@gmail.com',
        relationship: 'mother',
    }],
    // house: house1,
}

exports.employee1 = {
    username: 'employee1',
    email: 'employee1@gmail.com',
    password: 'employee1',
    role: 'employee',
    status: 'Approved',
    // profile: profile1,
}

exports.hr1 = {
    username: 'hr1',
    email: 'hr1@gmail.com',
    password: 'hr1',
    role: 'HR',
}
