import ComponentModel from 'core/js/models/componentModel';

export default class GraphicModel extends ComponentModel {

  init() {
    this.set('_scrollPercent', this.get('_defaultScrollPercent'));
  }

}
