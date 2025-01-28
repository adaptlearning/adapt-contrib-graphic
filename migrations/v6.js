import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

let graphics;

describe('Graphic - v5.1.0 to v6.2.0', async () => {
  whereFromPlugin('Graphic - from v5.1.0', { name: 'adapt-contrib-graphic', version: '<6.2.0' });
  whereContent('Graphic - where graphic', async content => {
    graphics = content.filter(({ _component }) => _component === 'graphic');
    if (graphics) return true;
  });
  mutateContent('Graphic - add longdescription attribute', async content => {
    graphics.forEach(graphic => {
      graphic._graphic.longdescription = '';
    });
    return true;
  });
  mutateContent('Graphic - add _isScrollable attribute', async content => {
    graphics.forEach(graphic => {
      graphic._isScrollable = false;
    });
    return true;
  });
  mutateContent('Graphic - add _defaultScrollPercent attribute', async content => {
    graphics.forEach(graphic => {
      graphic._defaultScrollPercent = 0;
    });
    return true;
  });
  checkContent('Graphic - check longdescription attribute', async content => {
    let isValid = true;
    graphics.forEach(graphic => {
      if (graphic._graphic?.longdescription === undefined) isValid = false;
    });
    if (!isValid) throw new Error('Graphic - longdescription attribute invalid');
    return true;
  });
  checkContent('Graphic - check _isScrollable attribute', async content => {
    let isValid = true;
    graphics.forEach(graphic => {
      if (graphic._isScrollable === undefined) isValid = false;
    });
    if (!isValid) throw new Error('Graphic - _isScrollable attribute invalid');
    return true;
  });
  checkContent('Graphic - check _defaultScrollPercent attribute', async content => {
    let isValid = true;
    graphics.forEach(graphic => {
      if (graphic._defaultScrollPercent === undefined) isValid = false;
    });
    if (!isValid) throw new Error('Graphic - _defaultScrollPercent attribute invalid');
    return true;
  });
  updatePlugin('Graphic - update to v6.2.0', { name: 'adapt-contrib-graphic', version: '6.2.0', framework: '>=5.5' });
});
