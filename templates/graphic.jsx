import React from 'react';
import { templates } from 'core/js/reactHelpers';

export default function Graphic(props) {
  const {
    _graphic
  } = props;
  return (
    <div className='component__inner graphic__inner'>

      <templates.header {...props} />

      <div className='component__widget graphic__widget'>

        <templates.image {..._graphic}
          classNamePrefixes={[
            'component',
            'graphic'
          ]}
        />

      </div>

    </div>
  );
}
