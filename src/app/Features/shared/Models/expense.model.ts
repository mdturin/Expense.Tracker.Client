// unit.enum.ts
export enum Unit {
  Piece = 'Piece',
  Kg = 'Kg',
  Liter = 'Liter',
  Meter = 'Meter',
  // Add more units as needed
}

export interface Expense {
  id?: number;
  description?: string;
  amount?: number;
  unit?: Unit;
  quantity?: number;
  date?: Date;
}
