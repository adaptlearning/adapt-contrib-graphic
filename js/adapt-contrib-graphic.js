import components from 'core/js/components';
import GraphicView from './GraphicView';
import GraphicModel from './GraphicModel';

export default components.register('graphic', {
  model: GraphicModel,
  view: GraphicView
});
