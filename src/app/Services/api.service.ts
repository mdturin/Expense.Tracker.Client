import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { getFormattedDate } from '../Utilities/date.utility';
import { Expense } from '../Features/shared/Models/expense.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllExpenses(): Observable<Expense[]> {
    const url = this.apiUrl + 'expenses';
    return this.http.get<Expense[]>(url);
  }

  getAllExpenseItems(): Observable<string[]> {
    const url = this.apiUrl + 'expense-items';
    return this.http.get<string[]>(url);
  }

  getExpenseByDate(date: Date): Observable<Expense[]> {
    const formattedDate = getFormattedDate(date);
    const url = this.apiUrl + 'expenses?date=' + formattedDate;
    return this.http.get<Expense[]>(url);
  }

  addExpense(expense: Expense): Observable<any> {
    const url = this.apiUrl + 'expenses';
    return this.http.post(url, expense).pipe(
      catchError((error) => {
        console.error('Error adding expense:', error);
        return throwError(() => new Error('Failed to add expense'));
      })
    );
  }

  addExpenseItem(item: string) {
    const url = this.apiUrl + 'expense-items';
    return this.http.post(url, { item }).pipe(
      catchError((error) => {
        console.error('Error adding expense item:', error);
        return throwError(() => new Error('Failed to add expense item'));
      })
    );
  }

  deleteExpenseItem(itemId: string) {
    const url = `${this.apiUrl}expense-items/${itemId}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error deleting expense item:', error);
        return throwError(() => new Error('Failed to delete expense item'));
      })
    );
  }
}
