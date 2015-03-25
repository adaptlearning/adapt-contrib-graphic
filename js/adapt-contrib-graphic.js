/*
 * adapt-contrib-graphic
 * License - http://github.com/adaptlearning/adapt_framework/blob/master/LICENSE
 * Maintainers - Brian Quinn <brian@learningpool.com>, Himanshu Rajotia <himanshu.rajotia@credipoint.com>
 */
define(function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var Graphic = ComponentView.extend({

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeImage);

            // Checks to see if the graphic should be reset on revisit
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
            this.$('.component-widget').on('inview', _.bind(this.inview, this));
        },

        // Used to check if the graphic should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-widget').off('inview');
                    this.setCompletionStatus();
                }

            }
        },

        resizeImage: function(width) {
            var imageWidth = width === 'medium' ? 'small' : width;
            this.$('.graphic-widget img').attr('src', this.model.get('_graphic')[imageWidth]);

            this.$('.graphic-widget').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        }
    });

    Adapt.register('graphic', Graphic);

    return Graphic;

});
