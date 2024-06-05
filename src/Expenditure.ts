// src/Expenditure.ts

// Interface for Expense
export interface Expenditure {
    id: number;
    name: string;
    amount: number;
    date: Date;
    isEditing?: boolean;
}

