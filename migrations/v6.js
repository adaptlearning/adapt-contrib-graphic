import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('Graphic - v5.1.0 to v6.2.0', async () => {
  let graphics, course, courseGraphicGlobals;
  whereFromPlugin('Graphic - from v5.1.0', { name: 'adapt-contrib-graphic', version: '<6.2.0' });
  whereContent('Graphic - where graphic', async content => {
    graphics = content.filter(({ _component }) => _component === 'graphic');
    return graphics.length;
  });
  mutateContent('Graphic - add globals if missing', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (course?._globals?._components?._graphic) {
      courseGraphicGlobals = course._globals._components._graphic;
      return true;
    }
    courseGraphicGlobals = course._globals._components._graphic = {};
    return true;
  });
  mutateContent('Graphic - add scrollAriaLabel attribute', async content => {
    courseGraphicGlobals.scrollAriaLabel = 'Use the scrollbar to pan the image left and right. {{#if _graphic.alt}}{{_graphic.alt}}{{/if}}';
    return true;
  });
  mutateContent('Graphic - add longdescription attribute', async content => {
    graphics.forEach(graphic => { graphic._graphic.longdescription = ''; });
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
    if (courseGraphicGlobals === undefined) throw new Error('Graphic - globals _graphic invalid');
    return true;
  });
  checkContent('Graphic - check globals scrollAriaLabel attribute', async content => {
    if (courseGraphicGlobals?.scrollAriaLabel === undefined) { throw new Error('Graphic - globals scrollAriaLabel invalid'); }
    return true;
  });
  checkContent('Graphic - check longdescription attribute', async content => {
    const isValid = graphics.every(({ _graphic }) => _graphic.longdescription !== undefined);
    if (!isValid) throw new Error('Graphic - _graphic.longdescription attribute invalid');
    return true;
  });
  checkContent('Graphic - check _isScrollable attribute', async content => {
    const isValid = graphics.every(({ _isScrollable }) => _isScrollable !== undefined);
    if (!isValid) throw new Error('Graphic - _isScrollable attribute invalid');
    return true;
  });
  checkContent('Graphic - check _defaultScrollPercent attribute', async content => {
    const isValid = graphics.every(({ _defaultScrollPercent }) => _defaultScrollPercent !== undefined);
    if (!isValid) throw new Error('Graphic - _defaultScrollPercent attribute invalid');
    return true;
  });
  updatePlugin('Graphic - update to v6.2.0', { name: 'adapt-contrib-graphic', version: '6.2.0', framework: '>=5.19.1' });
});
