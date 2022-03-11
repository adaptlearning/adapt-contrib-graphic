import React from 'react';
import { templates } from 'core/js/reactHelpers';

const LinkWrapper = ({ href, children, target, className, role }) =>
  href
    ? <a href={href} target={target} className={className} role={role}>{children}</a>
    : children;

export default function Graphic(props) {
  const {
    _id,
    _isScrollable,
    _scrollPercent,
    _graphic
  } = props;

  const scrollableProperties = _isScrollable
    ? {
      role: 'slider',
      className: 'component__widget graphic__widget js-graphic-scrollbar',
      'aria-controls': `graphic__scroll__container__${_id}`,
      'aria-orientation': 'horizontal',
      'aria-valuemax': '100',
      'aria-valuemin': '0',
      'aria-valuenow': _scrollPercent,
      'aria-label': `Use the scrollbar to pan the image left and right. ${_graphic.alt || ''}`,
      'aria-describedby': _graphic.longdescription ? `graphic__longdescription__${_id}` : undefined,
      tabIndex: '0'
    }
    : {};
  return (
    <div className='component__inner graphic__inner'>

      <templates.header {...props} />

      <div className='component__widget graphic__widget' {...scrollableProperties}>

        <LinkWrapper
          href = {_graphic._url}
          target = {_graphic._target}
          className = 'graphic__link js-graphic-link'
          role = 'link'
        >

          <templates.image {..._graphic}
            aria-hidden={_isScrollable}
            id={`graphic__scroll__container__${_id}`}
            longDescriptionId={`graphic__longdescription__${_id}`}
            classes="js-graphic-scroll-container"
            classNamePrefixes={[
              'component',
              'graphic'
            ]}
          />

          {_graphic.longdescription &&
          <div
            id={`graphic__longdescription__${_id}`}
            className="graphic__longdescription"
          >
            <div className="graphic__longdescription-inner">
              {_graphic.longdescription}
            </div>
          </div>
          }

        </LinkWrapper>

      </div>

    </div>
  );
}
