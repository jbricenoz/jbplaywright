import { randUser } from '@ngneat/falso';

randUser()
let fakeUser = randUser({ length: 10 });

export const user_types = {
    BASIC: 'basic',
    BUSINESS: 'business',
    PRO: 'pro',
    PREMIUM: 'premium',
}

export const fake_user_data = (userType?: string) => userType ?
    {
        "first_name": fakeUser[0].firstName,
        "last_name": fakeUser[0].lastName,
        "email": `mt_${userType}_${new Date().getTime()}@mailinator.com`,
        "job_title": {
            "other": "Other"
        },
        "phone": fakeUser[0].phone,
        "image": fakeUser[0].img,
        "username": fakeUser[0].username,
        "valid_password": "Pa$$w0rd!",
        "invalid_password": "Pa$$w0rd!",
        "usr_long_name": `${fakeUser[0].firstName} ${fakeUser[0].lastName}`
    } :
    {
        "first_name": fakeUser[0].firstName,
        "last_name": fakeUser[0].lastName,
        "email": `mt_basic_${new Date().getTime()}@mailinator.com`,
        "job_title": {
            "other": "Other"
        },
        "phone": fakeUser[0].phone,
        "image": fakeUser[0].img,
        "username": fakeUser[0].username,
        "valid_password": "Pa$$w0rd!",
        "invalid_password": "Pa$$w0rd!",
        "usr_long_name": `${fakeUser[0].firstName} ${fakeUser[0].lastName}`
    };