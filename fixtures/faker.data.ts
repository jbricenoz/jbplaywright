import { randUser } from '@ngneat/falso';

randUser()
let fakeUser = randUser({ length: 10 });

export const users = {
    INVALID_USER: "invalid_user",
    STANDARD: 'standard_user',
    LOCKED_USER: 'locked_out_user',
    PROBLEM_USER: 'problem_user',
    PERFORMANCE_USER: 'performance_glitch_user',
    PASSWORD: 'secret_sauce',
    INVALID_PASSWORD: 'invalid_password'
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