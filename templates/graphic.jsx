import Adapt from 'core/js/adapt';
import { classes, templates, html } from 'core/js/reactHelpers';

export default function(model, view) {
  const data = model.toJSON();
  const { _graphic } = data;

  const screenSize = Adapt.device.screenSize;
  const imageWidth = (screenSize === 'medium') ? 'small' : screenSize;

  return (
    <div className='component__inner graphic__inner'>

      {templates.component(model, view)}

      <div className='component__widget graphic__widget'>

        <div className={classes([
          'graphic__image-container',
          _graphic.attribution && 'has-attribution'
        ])}>

          <img
            className='graphic__image js-graphic-set-image-src'
            src={_graphic[imageWidth] || _graphic.src}
            aria-hidden={_graphic.alt ? null : 'true'}
            aria-label={_graphic.alt ? Adapt.a11y.normalize(_graphic.alt) : null}
          />

          {_graphic.attribution &&
          <div className='component__attribution graphic__attribution'>
            <div className='component__attribution-inner graphic__attribution-inner'>
              {html(_graphic.attribution)}
            </div>
          </div>
          }

        </div>

      </div>

    </div>
  );
}
