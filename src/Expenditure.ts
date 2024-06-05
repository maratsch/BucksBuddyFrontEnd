// src/Expenditure.ts

// Interface for User
export interface User {
    id: number;
    email?: string;
    password?: string;
}

// Interface for Expense
export interface Expenditure {
    id: number;
    name: string;
    amount: number;
    date: Date;
    user: User;
    isEditing?: boolean;
}

