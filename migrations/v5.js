import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Graphic - v5.0.0 to v5.1.0', async () => {
  let graphics;

  whereFromPlugin('Graphic - from v5.0.0', { name: 'adapt-contrib-graphic', version: '>=2.0.0 <5.1.0' });

  whereContent('Graphic - where graphic', async content => {
    graphics = getComponents('graphic');
    return graphics.length;
  });

  mutateContent('Graphic - add _url attribute', async content => {
    graphics.forEach(graphic => _.set(graphic, '_graphic._url', ''));
    return true;
  });

  mutateContent('Graphic - add _target attribute', async content => {
    graphics.forEach(graphic => _.set(graphic, '_graphic._target', ''));
    return true;
  });

  checkContent('Graphic - check _url attribute', async content => {
    const isValid = graphics.every(({ _graphic }) => _graphic._url !== undefined);
    if (!isValid) throw new Error('Graphic - _graphic._url attribute invalid');
    return true;
  });

  checkContent('Graphic - check _target attribute', async content => {
    const isValid = graphics.every(({ _graphic }) => _graphic._target !== undefined);
    if (!isValid) throw new Error('Graphic - _graphic._target attribute invalid');
    return true;
  });

  updatePlugin('Graphic - update to v5.1.0', { name: 'adapt-contrib-graphic', version: '5.1.0', framework: '>=5.14.0' });

  testSuccessWhere('graphic component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-graphic', version: '5.0.0' }],
    content: [
      { _id: 'c-100', _component: 'graphic', _graphic: {} },
      { _id: 'c-105', _component: 'graphic' },
      { _type: 'course' }
    ]
  });

  testStopWhere('no graphic components', {
    fromPlugins: [{ name: 'adapt-contrib-graphic', version: '5.0.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-graphic', version: '5.1.0' }]
  });
});
