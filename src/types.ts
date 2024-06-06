// src/types.ts

// Interface for User
export interface User {
    id: number;
    email?: string;
    password?: string;
    journeys: Journey[];
    isEditing?: boolean;
}

// Interface for Journey
export interface Journey {
    id: number;
    name: string;
    user: User;
    expenditures: Expenditure[];
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

