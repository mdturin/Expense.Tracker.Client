import { Component } from '@angular/core';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from 'date-fns';

interface CalendarDate {
  date: Date;
  otherMonth: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  currentMonth: Date = new Date();
  dayNames: string[] = [];
  calendarDates: CalendarDate[] = [];

  ngOnInit(): void {
    this.generateDayNames();
    this.generateCalendar(this.currentMonth);
  }

  generateDayNames(): void {
    const weekStart = startOfWeek(this.currentMonth, { weekStartsOn: 0 }); // Sunday
    this.dayNames = eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) })
      .map(day => day.toLocaleDateString('en-US', { weekday: 'short' }));
  }

  generateCalendar(month: Date): void {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 }); // Sunday
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 0 }); // Sunday

    const dates = eachDayOfInterval({ start, end }).map(date => ({
      date,
      otherMonth: !isSameMonth(date, month),
      isToday: isToday(date)
    }));

    this.calendarDates = dates;
  }

  prevMonth(): void {
    this.currentMonth = subMonths(this.currentMonth, 1);
    this.generateDayNames();
    this.generateCalendar(this.currentMonth);
  }

  nextMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, 1);
    this.generateDayNames();
    this.generateCalendar(this.currentMonth);
  }

  selectDate(date: CalendarDate): void {
    // Handle date selection
    console.log('Selected Date:', date.date);
  }
}
