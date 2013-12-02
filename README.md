adapt-contrib-graphic
=====================

A component for the Adapt Framework that dynamically displays image of different resolutions based upon device width.  

Three image widths from the _AdaptBuilder.screenSize_ object are handled:
* small
* medium
* large

In order to render images, these three corresponding data attributes in the JSON must be set to the source of the various images.
* _data-small_ 
* _data-medium_
* _data-large_

When the viewport size changes, these attributes will be swapped in for the _src_ tag.