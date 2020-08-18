import Adapt from 'core/js/adapt';
import GraphicView from './graphicView';
import GraphicModel from './graphicModel';

export default Adapt.register('graphic', {
  model: GraphicModel,
  view: GraphicView
});