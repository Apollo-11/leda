import * as React from 'react';
import { CustomRender, Values } from '../../commonTypes';
import { AllActions } from '../DateTimeInput/types';
import { CALENDAR_CLICK_ACTION, VIEW_TYPES } from './constants';
import { defaultCalendarTheme } from './theme';
import { DivProps } from '../../components/Div';

export interface CalendarClickHandler {
  (type: Values<typeof CALENDAR_CLICK_ACTION>, ev: React.MouseEvent<HTMLElement>, payload?: { dateCell?: number, monthCell?: number, yearCell?: number }): void,
}

export interface CalendarBaseProps {
  boundingContainerRef?: React.RefObject<HTMLElement | { wrapper: HTMLElement }>,
  dispatch: React.Dispatch<AllActions>,
  format: string,
  hasTodayButton?: boolean,
  isOpen?: boolean,
  isDisabled?: boolean,
  max?: Date,
  min?: Date,
  onClick: CalendarClickHandler,
  onMouseDown: React.MouseEventHandler<HTMLDivElement>,
  theme: typeof defaultCalendarTheme,
  value: Date | null,
  viewDate: Date,
  viewType: Values<typeof VIEW_TYPES>,
  dateCellRender?: CustomRender<DateCellProps, {}, DateCellItemProps>,
  weeksRowRender?: CustomRender<DateViewProps, {}, WeekRowProps>,
  dateViewRender?: CustomRender<CalendarBaseProps, {}, DateViewProps>,
  monthViewRender?: CustomRender<CalendarBaseProps, {}, MonthViewProps>,
  yearViewRender?: CustomRender<CalendarBaseProps, {}, YearViewProps>,
  calendarHeaderRender?: CustomRender<CalendarBaseProps, {}, CalendarHeaderProps>,
  calendarWrapperRender?: CustomRender<CalendarBaseProps, {}, DivProps>,
}

export interface DateCellProps {
  date: number,
  dateCellRender?: CustomRender<DateCellProps, {}, DateCellItemProps>,
  dates: number[][],
  min?: Date,
  max?: Date,
  index: number,
  onClick: CalendarClickHandler,
  viewDate: Date,
  value: Date | null,
  viewType: Values<typeof VIEW_TYPES>,
  theme: typeof defaultCalendarTheme,
  weekIndex: number,
  children?: React.ReactNode,
}

export interface CalendarHeaderProps {
  theme: CalendarBaseProps['theme'],
  conditions: CalendarConditions,
  viewType: CalendarBaseProps['viewType'],
  viewDate: CalendarBaseProps['viewDate'],
  onClick: CalendarClickHandler,
  children?: React.ReactNode,
}

export interface DateViewProps {
  viewDate: Date,
  dateCellRender?: CustomRender<DateCellProps, {}, DateCellItemProps>,
  weeksRowRender?: CustomRender<DateViewProps, {}, WeekRowProps>,
  min?: Date,
  max?: Date,
  value: Date | null,
  viewType: Values<typeof VIEW_TYPES>,
  onClick: CalendarClickHandler,
  theme: typeof defaultCalendarTheme,
  children?: React.ReactNode,
}

export interface MonthViewProps {
  max?: Date,
  min?: Date,
  theme: typeof defaultCalendarTheme,
  onClick: CalendarClickHandler,
  children?: React.ReactNode,
  viewDate: Date,
  viewType: Values<typeof VIEW_TYPES>,
}

export interface YearViewProps {
  max?: Date,
  min?: Date,
  theme: typeof defaultCalendarTheme,
  onClick: CalendarClickHandler,
  children?: React.ReactNode,
  format: string,
  value?: Date,
  viewDate: Date,
  viewType: Values<typeof VIEW_TYPES>,
}

export interface DateCellItemProps extends DivProps {
  className?: string,
  key?: string,
  title?: string,
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
}

export interface WeekRowProps extends DivProps {
  className?: string,
}

export interface CalendarConditionProps {
  min?: Date,
  max?: Date,
  viewDate: Date,
  viewType: Values<typeof VIEW_TYPES>,
  value: Date | null,
}

export interface CalendarConditions {
  isDateOutOfMaxDecadeRange: boolean,
  isDateOutOfMaxMonthRange: boolean,
  isDateOutOfMaxYearRange: boolean,
  isDateOutOfMinDecadeRange: boolean,
  isDateOutOfMinMonthRange: boolean,
  isDateOutOfMinYearRange: boolean,
  isNextButtonDisabled: boolean,
  isOneMonthInRange: boolean,
  isOneYearInRange: boolean,
  isPrevButtonDisabled: boolean,
  isTitleDisabled: boolean,
  isValueInRange: boolean,
}

export interface TodayButtonProps {
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void,
  theme: typeof defaultCalendarTheme,
}

export interface DateCellConditions {
  firstDayOfMonth: number,
  isDateOfNextMonth: boolean,
  isDateOfPrevMonth: boolean,
  isDateOutOfMaxMonthRange: boolean,
  isDateOutOfMinMonthRange: boolean,
  lastDayOfMonth: number,
  renderedDate: Date,
  renderedNextMonth: string | null,
  renderedPrevMonth: string | null,
}

export interface CustomElements {
  DateView: React.FC<DateViewProps>,
  MonthView: React.FC<MonthViewProps>,
  YearView: React.FC<YearViewProps>,
  CalendarHeader: React.FC<CalendarHeaderProps>,
  CalendarWrapper: React.FC<DivProps>,
}
