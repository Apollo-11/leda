import * as React from 'react';
import * as L from '../../../leda';

export const BasicUsage = (props: any) => {
  const [value, setValue] = React.useState<Date>(new Date());
  const [hasTodayButton, setHasTodayButton] = React.useState<boolean>(false);

  return (
    <L.Div _box _inner _demoBg>
      <L.Calendar
        value={value}
        onChange={(ev) => {
          setValue(ev.component.value);
          console.log('ev.component', ev.component);
        }}
        hasTodayButton
      />

      <br />
      <br />

      <L.Button
        onClick={() => {
          setValue(new Date('09.14.2020'))
        }}
      >
        Set 09.14.2020
      </L.Button>
      {' '}
      <L.Button
        onClick={() => {
          setHasTodayButton(!hasTodayButton)
        }}
      >
        Toggle hasTodayButton
      </L.Button>
    </L.Div>
  );
};
