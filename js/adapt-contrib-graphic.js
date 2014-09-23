/*
 * adapt-contrib-graphic
 * License - https://github.com/adaptlearning/adapt_framework/blob/master/LICENSE
 * Maintainers - Brian Quinn <brian@learningpool.com>, Himanshu Rajotia <himanshu.rajotia@credipoint.com>
 */
define(function(require) {

    var ComponentView = require("coreViews/componentView");
    var Adapt = require("coreJS/adapt");

    var Graphic = ComponentView.extend({

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeImage);
        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
            this.$('.component-widget').on('inview', _.bind(this.inview, this));
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
            if (width === 'large') {
                this.$('.graphic-widget img').attr('src', this.model.get('_graphic').large);
            } else {
                this.$('.graphic-widget img').attr('src', this.model.get('_graphic').small);
            }

            this.$('.graphic-widget').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        }
    });

    Adapt.register("graphic", Graphic);

    return Graphic;

});