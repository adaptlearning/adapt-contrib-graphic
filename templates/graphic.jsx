import { classes, templates, html } from 'core/js/reactHelpers';

export default function(model, view) {
  const data = model.toJSON();
  const { _graphic } = data;

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
            src={_graphic.src}
            data-large={_graphic.large}
            data-small={_graphic.small}
            aria-hidden={_graphic.alt ? null : 'true'}
            aria-label={_graphic.alt ? _graphic.alt : null}
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
  )
}
