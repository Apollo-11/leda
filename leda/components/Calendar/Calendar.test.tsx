import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './index';

const weekdaysShortNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

describe('Calendar initial render', () => {
  describe('in controlled mode', () => {
    test('should have all date cells in 6-weeks view', () => {
      const container = render(
        <Calendar
          onChange={() => {}}
          value={new Date('08.14.2020')}
        />,
      );
      const dateCells = container.queryAllByText(/^\d{1,2}$/);

      expect(dateCells).toHaveLength(42); // 6-weeks view
    });
    test('should have all date cells in 5-weeks view', () => {
      const container = render(
        <Calendar
          onChange={() => {}}
          value={new Date('09.14.2020')}
        />,
      );
      const dateCells = container.queryAllByText(/^\d{1,2}$/);

      expect(dateCells).toHaveLength(35); // 5-weeks view
    });
    test('should have month name and year in the header', () => {
      const container = render(
        <Calendar
          onChange={() => {}}
          value={new Date('09.14.2020')}
        />,
      );
      const header = container.getByText('Сентябрь 2020');

      expect(header).toBeDefined();
    });
    test('should have weekdays names', () => {
      const container = render(
        <Calendar
          onChange={() => {}}
          value={new Date('09.14.2020')}
        />,
      );

      const weekdays = weekdaysShortNames.map((weekday) => container.queryByText(weekday));

      weekdays.forEach((weekday) => expect(weekday).not.toBeNull());
    });
  });
});

describe('Calendar props', () => {
  describe('hasTodayButton', () => {
    test('should show today button', () => {
      const container = render((
        <Calendar
          hasTodayButton
          value={new Date('09.14.2020')}
          onChange={() => {}}
        />
      ));

      const todayButton = container.queryByText(/^\d\d\s[а-я]+\s\d{4}$/);

      expect(todayButton).not.toBeNull();
    });
    test('should not show today button without hasTodayButton prop', () => {
      const container = render((
        <Calendar
          value={new Date('09.14.2020')}
          onChange={() => {}}
        />
      ));

      const todayButton = container.queryByText(/^\d\d\s[а-я]+\s\d{4}$/);

      expect(todayButton).toBeNull();
    });
  });
});

describe('Calendar interactions:', () => {
  describe('date view', () => {
    describe('left arrow click', () => {
      test('should switch to the previous month', () => {
        const container = render((
          <Calendar
            value={new Date('09.14.2020')}
            onChange={() => {}}
          />
        ));

        const prevMonthButton = container.getByTitle('Предыдущий месяц');
        let currentMonthName = container.queryByText('Сентябрь 2020');

        expect(currentMonthName).not.toBeNull();

        userEvent.click(prevMonthButton);

        currentMonthName = container.queryByText('Сентябрь 2020');
        expect(currentMonthName).toBeNull();

        currentMonthName = container.queryByText('Август 2020');
        expect(currentMonthName).not.toBeNull();

        const dateCells = container.queryAllByText(/^\d{1,2}$/);
        expect(dateCells).toHaveLength(42);
        expect(dateCells[0]).toHaveTextContent('27');
        expect(dateCells[41]).toHaveTextContent('6');
      });
    });
    describe('right arrow ckick', () => {
      test('should switch to the next month', () => {
        const container = render((
          <Calendar
            value={new Date('09.14.2020')}
            onChange={() => {}}
          />
        ));

        const nextMonthButton = container.getByTitle('Следующий месяц');
        let currentMonthName = container.queryByText('Сентябрь 2020');

        expect(currentMonthName).not.toBeNull();

        userEvent.click(nextMonthButton);

        currentMonthName = container.queryByText('Сентябрь 2020');
        expect(currentMonthName).toBeNull();

        currentMonthName = container.queryByText('Октябрь 2020');
        expect(currentMonthName).not.toBeNull();

        const dateCells = container.queryAllByText(/^\d{1,2}$/);
        expect(dateCells).toHaveLength(35);
        expect(dateCells[0]).toHaveTextContent('28');
        expect(dateCells[34]).toHaveTextContent('1');
      });
    });
  });
});

describe('Calendar handlers', () => {
  describe('onChange', () => {
    test('should fire with correct event when a date is ckicked', () => {
      const changeHandler = jest.fn();

      const container = render((
        <Calendar
          value={new Date('09.14.2020')}
          onChange={changeHandler}
        />
      ));

      userEvent.click(container.getByText('15'));

      expect(changeHandler).toBeCalledTimes(1);

      const date = changeHandler.mock.calls[0][0].component.value;
      expect(date.getDate()).toEqual(15);
      expect(date.getMonth()).toEqual(8);
      expect(date.getFullYear()).toEqual(2020);
    });
  });
});
