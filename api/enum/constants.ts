export enum EventType {
    retrievePatient = "GET_ALL_PATIENT_RECORDS",
    registerPatient = "CREATE_NEW_PATIENT",
}

export enum EventOutcome {
    success = 0,
    failed = 1,
}

export enum Level {
    level0 = 0,
    level1 = 1,
    level2 = 2,
}