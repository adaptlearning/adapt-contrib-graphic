import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Graphic - v6.1.1 to v6.2.0', async () => {
  let graphics, course, courseGraphicGlobals;

  whereFromPlugin('Graphic - from v6.1.1', { name: 'adapt-contrib-graphic', version: '<6.2.0' });

  whereContent('Graphic - where graphic', async content => {
    graphics = getComponents('graphic');
    return graphics.length;
  });

  mutateContent('Graphic - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._components._graphic')) _.set(course, '_globals._components._graphic', {});
    courseGraphicGlobals = course._globals._components._graphic;
    return true;
  });

  mutateContent('Graphic - add globals scrollAriaLabel attribute', async content => {
    courseGraphicGlobals.scrollAriaLabel = 'Use the scrollbar to pan the image left and right. {{#if _graphic.alt}}{{_graphic.alt}}{{/if}}';
    return true;
  });

  mutateContent('Graphic - add longdescription attribute', async content => {
    graphics.forEach(graphic => { _.set(graphic, '_graphic.longdescription', ''); });
    return true;
  });

  mutateContent('Graphic - add _isScrollable attribute', async content => {
    graphics.forEach(graphic => { graphic._isScrollable = false; });
    return true;
  });

  mutateContent('Graphic - add _defaultScrollPercent attribute', async content => {
    graphics.forEach(graphic => { graphic._defaultScrollPercent = 0; });
    return true;
  });

  checkContent('Graphic - check globals _graphic attribute', async content => {
    const isValid = courseGraphicGlobals._graphic !== undefined;
    if (isValid) throw new Error('Graphic - globals _graphic invalid');
    return true;
  });

  checkContent('Graphic - check globals scrollAriaLabel attribute', async content => {
    const isValid = _.has(courseGraphicGlobals, 'scrollAriaLabel');
    if (!isValid) throw new Error('Graphic - globals scrollAriaLabel invalid');
    return true;
  });

  checkContent('Graphic - check longdescription attribute', async content => {
    const isValid = graphics.every(({ _graphic }) => _graphic.longdescription !== undefined);
    if (!isValid) throw new Error('Graphic - _graphic.longdescription attribute invalid');
    return true;
  });

  checkContent('Graphic - check _isScrollable attribute', async content => {
    const isValid = graphics.every(({ _isScrollable }) => typeof _isScrollable === 'boolean');
    if (!isValid) throw new Error('Graphic - _isScrollable attribute invalid');
    return true;
  });

  checkContent('Graphic - check _defaultScrollPercent attribute', async content => {
    const isValid = graphics.every(({ _defaultScrollPercent }) => typeof _defaultScrollPercent === 'number');
    if (!isValid) throw new Error('Graphic - _defaultScrollPercent attribute invalid');
    return true;
  });

  updatePlugin('Graphic - update to v6.2.0', { name: 'adapt-contrib-graphic', version: '6.2.0', framework: '>=5.19.1' });

  testSuccessWhere('graphic component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-graphic', version: '6.1.0' }],
    content: [
      { _id: 'c-100', _component: 'graphic', _graphic: {} },
      { _id: 'c-105', _component: 'graphic' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('graphic component with empty course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-graphic', version: '6.1.0' }],
    content: [
      { _id: 'c-100', _component: 'graphic', _graphic: {} },
      { _id: 'c-105', _component: 'graphic' },
      { _type: 'course', _globals: { _components: { _graphic: {} } } }
    ]
  });

  testStopWhere('no graphic components', {
    fromPlugins: [{ name: 'adapt-contrib-graphic', version: '6.1.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-graphic', version: '6.2.0' }]
  });
});

describe('Graphic - v6.2.4 to v6.2.5', async () => {
  let graphics;
  const newTarget = '_blank';

  whereFromPlugin('Graphic - from v6.2.4', { name: 'adapt-contrib-graphic', version: '<6.2.5' });

  whereContent('Graphic - where graphic', async content => {
    graphics = getComponents('graphic');
    return graphics.length;
  });

  mutateContent('Graphic - update _target default', async content => {
    graphics.forEach(({ _graphic }) => {
      if (!_.has(_graphic, '_target')) _graphic._target = newTarget;
      if (_graphic._target === '') _graphic._target = newTarget;
    });
    return true;
  });

  checkContent('Graphic - check _target default', async content => {
    const isValid = graphics.every(({ _graphic }) => _graphic._target !== '');
    if (!isValid) throw new Error('Graphic - _target default invalid');
    return true;
  });

  updatePlugin('Graphic - update to v6.2.5', { name: 'adapt-contrib-graphic', version: '6.2.5', framework: '>=5.19.1' });

  testSuccessWhere('graphic component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-graphic', version: '6.2.4' }],
    content: [
      { _id: 'c-100', _component: 'graphic', _graphic: { _target: '' } },
      { _id: 'c-105', _component: 'graphic', _graphic: { _target: '_self' } },
      { _id: 'c-110', _component: 'graphic', _graphic: {} },
      { _type: 'course' }
    ]
  });

  testStopWhere('no graphic components', {
    fromPlugins: [{ name: 'adapt-contrib-graphic', version: '6.2.4' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-graphic', version: '6.2.5' }]
  });
});
