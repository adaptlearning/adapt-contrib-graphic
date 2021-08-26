import Adapt from 'core/js/adapt';
import GraphicView from './GraphicView';
import GraphicModel from './GraphicModel';

export default Adapt.register('graphic', {
  model: GraphicModel,
  view: GraphicView
});
