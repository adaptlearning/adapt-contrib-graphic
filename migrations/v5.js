import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

let graphics;

describe('Graphic - v2.0.3 to v5.1.0', async () => {
  whereFromPlugin('Graphic - from v2.0.3', { name: 'adapt-contrib-graphic', version: '<5.1.0' });
  whereContent('Graphic - where graphic', async content => {
    graphics = content.filter(({ _component }) => _component === 'graphic');
    return graphics.length;
  });
  mutateContent('Graphic - add _url attribute', async content => {
    graphics.forEach(graphic => { _.set(graphic, '_graphic._url', ''); });
    return true;
  });
  mutateContent('Graphic - add _target attribute', async content => {
    graphics.forEach(graphic => { _.set(graphic, '_graphic._target', ''); });
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
});
