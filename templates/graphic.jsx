import React from 'react';
import { templates } from 'core/js/reactHelpers';

const LinkWrapper = ({ href, children, target, className, role }) =>
  href
    ? <a href={href} target={target} className={className} role={role}>{children}</a>
    : children;

export default function Graphic(props) {
  const {
    _graphic
  } = props;
  return (
    <div className='component__inner graphic__inner'>

      <templates.header {...props} />

      <div className='component__widget graphic__widget'>

        <LinkWrapper
          href = {_graphic._url}
          target = {_graphic._target}
          className = 'graphic__link js-graphic-link'
          role = 'link'
        >

          <templates.image {..._graphic}
            classNamePrefixes={[
              'component',
              'graphic'
            ]}
          />

        </LinkWrapper>

      </div>

    </div>
  );
}
