import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

let graphics;

describe('Graphic - v1.1.0. to v2.0.0', async () => {
  whereFromPlugin('Graphic - from v1.1.0', { name: 'adapt-contrib-narrative', version: '<2.0.0' });
  whereContent('Graphic - where graphic', async content => {
    graphics = content.filter(({ _component }) => _component === 'graphic');
    if (graphics) return true;
  });
  mutateContent('Graphic - remove medium image', async content => {
    graphics.forEach(graphic => {
      delete graphic._graphic.medium;
    });
    return true;
  });
  checkContent('Graphic - check medium image', async content => {
    let isValid = true;
    graphics.forEach(graphic => {
      if (graphic._graphic.medium) isValid = false;
    });
    if (!isValid) throw new Error('Graphic - found deprecated medium image');
    return true;
  });
  updatePlugin('Graphic - update to v2.0.0', { name: 'adapt-contrib-graphic', version: '2.0.0', framework: '^2.0.0' });
});
