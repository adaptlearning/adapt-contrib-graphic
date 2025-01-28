import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

let graphics;

describe('Graphic - v2.0.3 to v5.1.0', async () => {
  whereFromPlugin('Graphic - from v2.0.3', { name: 'adapt-contrib-graphic', version: '<5.1.0' });
  whereContent('Graphic - where graphic', async content => {
    graphics = content.filter(({ _component }) => _component === 'graphic');
    if (graphics) return true;
  });
  mutateContent('Graphic - add _url attribute', async content => {
    graphics.forEach(graphic => {
      graphic._url = '';
    });
    return true;
  });
  mutateContent('Graphic - add _target attribute', async content => {
    graphics.forEach(graphic => {
      graphic._target = '';
    });
    return true;
  });
  checkContent('Graphic - check _url attribute', async content => {
    let isValid = true;
    graphics.forEach(graphic => {
      if (graphic._url === undefined) isValid = false;
    });
    if (!isValid) throw new Error('Graphic - _url attribute invalid');
    return true;
  });
  checkContent('Graphic - check _target attribute', async content => {
    let isValid = true;
    graphics.forEach(graphic => {
      if (graphic._target === undefined) isValid = false;
    });
    if (!isValid) throw new Error('Graphic - _target attribute invalid');
    return true;
  });
  updatePlugin('Graphic - update to v5.1.0', { name: 'adapt-contrib-graphic', version: '5.1.0', framework: '>=5.5' });
});
