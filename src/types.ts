// src/types.ts

// Interface for User
export interface User {
    id: number;
    email?: string;
    password?: string;
    journeys: Journey[];
    uuid : string;
    isEditing?: boolean;
}

// Interface for newUser
export interface newUser {
    email: string;
    password: string;
}

// Interface for Journey
export interface Journey {
    id: number;
    name: string;
    homeCurr: string;
    vacationCurr: string;
    budget: number;
    startDate: Date;
    endDate: Date;
    travelDuration: string;
    isEditing?: boolean;
}

// Interface for Expense
export interface Expenditure {
    id: number;
    name: string;
    amount: number;
    date: Date;
    journey: Journey;
    isEditing?: boolean;
}

