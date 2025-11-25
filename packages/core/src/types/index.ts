/**
 * Core type definitions for OpenMRS Enterprise
 */

export interface Patient {
    uuid: string;
    display: string;
    identifiers: PatientIdentifier[];
    person: Person;
    voided: boolean;
}

export interface PatientIdentifier {
    uuid: string;
    identifier: string;
    identifierType: IdentifierType;
    preferred: boolean;
}

export interface IdentifierType {
    uuid: string;
    name: string;
    description: string;
}

export interface Person {
    uuid: string;
    display: string;
    gender: 'M' | 'F' | 'O' | 'U';
    age: number;
    birthdate: string;
    birthdateEstimated: boolean;
    dead: boolean;
    deathDate?: string;
    names: PersonName[];
    addresses: PersonAddress[];
    attributes: PersonAttribute[];
}

export interface PersonName {
    uuid: string;
    givenName: string;
    middleName?: string;
    familyName: string;
    preferred: boolean;
}

export interface PersonAddress {
    uuid: string;
    preferred: boolean;
    address1?: string;
    address2?: string;
    cityVillage?: string;
    stateProvince?: string;
    country?: string;
    postalCode?: string;
}

export interface PersonAttribute {
    uuid: string;
    value: string;
    attributeType: AttributeType;
}

export interface AttributeType {
    uuid: string;
    name: string;
    description: string;
    format: string;
}

export interface Encounter {
    uuid: string;
    display: string;
    encounterDatetime: string;
    patient: Patient;
    location: Location;
    encounterType: EncounterType;
    obs: Observation[];
    orders: Order[];
    encounterProviders: EncounterProvider[];
}

export interface EncounterType {
    uuid: string;
    name: string;
    description: string;
}

export interface Location {
    uuid: string;
    display: string;
    name: string;
    description?: string;
}

export interface Observation {
    uuid: string;
    display: string;
    concept: Concept;
    value: any;
    obsDatetime: string;
    status: 'PRELIMINARY' | 'FINAL' | 'AMENDED';
}

export interface Concept {
    uuid: string;
    display: string;
    name: ConceptName;
    datatype: ConceptDatatype;
    conceptClass: ConceptClass;
}

export interface ConceptName {
    uuid: string;
    name: string;
    locale: string;
    conceptNameType: string;
}

export interface ConceptDatatype {
    uuid: string;
    name: string;
    description: string;
}

export interface ConceptClass {
    uuid: string;
    name: string;
    description: string;
}

export interface Order {
    uuid: string;
    display: string;
    orderType: OrderType;
    concept: Concept;
    orderer: Provider;
    dateActivated: string;
    scheduledDate?: string;
    urgency: 'ROUTINE' | 'STAT' | 'ON_SCHEDULED_DATE';
}

export interface OrderType {
    uuid: string;
    name: string;
    description: string;
}

export interface Provider {
    uuid: string;
    display: string;
    person: Person;
    identifier: string;
}

export interface EncounterProvider {
    uuid: string;
    provider: Provider;
    encounterRole: EncounterRole;
}

export interface EncounterRole {
    uuid: string;
    name: string;
    description: string;
}

export interface Visit {
    uuid: string;
    display: string;
    patient: Patient;
    visitType: VisitType;
    location: Location;
    startDatetime: string;
    stopDatetime?: string;
    encounters: Encounter[];
}

export interface VisitType {
    uuid: string;
    name: string;
    description: string;
}

// API Response types
export interface ApiResponse<T> {
    results: T[];
    links?: Link[];
}

export interface Link {
    rel: string;
    uri: string;
}

export interface PagedResponse<T> extends ApiResponse<T> {
    totalCount: number;
    limit: number;
    startIndex: number;
}

export interface User {
    id: string;
    username: string;
    personId: string;
    roles: string[];
}

export interface Appointment {
    uuid: string;
    display?: string;
    startDateTime: string;
    endDateTime: string;
    appointmentType: {
        uuid: string;
        display: string;
        name: string;
    };
    status: 'SCHEDULED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'MISSED';
    patient: {
        uuid: string;
        display: string;
        person: {
            display: string;
        };
        identifiers: Array<{
            identifier: string;
        }>;
    };
    provider?: {
        uuid: string;
        display: string;
        person: {
            display: string;
        };
    };
    location?: {
        uuid: string;
        display: string;
        name: string;
    };
}
