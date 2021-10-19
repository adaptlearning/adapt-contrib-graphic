# adapt-contrib-graphic  

**Graphic** is a *presentation component* bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).  

<img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/graphic01.png" alt="sample graphic component" align="center">

**Graphic** displays graphic content that has been optimized for various devices. The component swaps out images based upon the device's screen size. Graphic can also be used as a hyperlink. When selected, it could link to an external URL, course resource (e.g. PDF) or location within the Adapt course. 

[Visit the **Graphic** wiki](https://github.com/adaptlearning/adapt-contrib-graphic/wiki) for more information about its functionality and for explanations of key properties. 

## Installation

As one of Adapt's *[core components](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#components),* **Graphic** is included with the [installation of the Adapt framework](https://github.com/adaptlearning/adapt_framework/wiki/Manual-installation-of-the-Adapt-framework#installation) and the [installation of the Adapt authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-Adapt-Origin).

* If **Graphic** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:  
`adapt install adapt-contrib-graphic`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:  
    `"adapt-contrib-graphic": "*"`  
    Then running the command:  
    `adapt install`  
    (This second method will reinstall all plug-ins listed in *adapt.json*.)  

* If **Graphic** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

## Settings Overview

The attributes listed below are used in *components.json* to configure **Graphic**, and are properly formatted as JSON in [*example.json*](https://github.com/adaptlearning/adapt-contrib-graphic/blob/master/example.json). Visit the [**Graphic** wiki](https://github.com/adaptlearning/adapt-contrib-graphic/wiki) for more information about how they appear in the [authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki). 

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**\_component** (string): This value must be: `graphic`.

**\_classes** (string): CSS class name to be applied to **Graphic**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**\_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.  

**instruction** (string): This optional text appears above the component. It is frequently used to
guide the learner’s interaction with the component.  

**\_graphic** (object): The image that constitutes the component. It contains values for **alt**, **large**, and **small**.

>**alt** (string): The alternative text for this image or link. For image only, assign [alt text](https://github.com/adaptlearning/adapt_framework/wiki/Providing-good-alt-text) for images that convey course content only. For links, the alt text should convey the navigation or resource.

>**large** (string): File name (including path) of the image used with large device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).  

>**small** (string): File name (including path) of the image used with small device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).  

>**attribution** (string): Optional text to be displayed as an [attribution](https://wiki.creativecommons.org/Best_practices_for_attribution). By default it is displayed below the image. Adjust positioning by modifying CSS. Text can contain HTML tags, e.g., `Copyright © 2015 by <b>Lukasz 'Severiaan' Grela</b>`

>**\_url** (string): When the graphic is selected this is the url it will follow. Can be an Adapt reference, `#/id/co-10`, external, `https://www.adaptlearning.org/`, or file `course/en/images/vanilla-swatch.jpg`. If using an Adapt reference `_target` must be set to `_self`.

>**\_target** (string): The target attribute specifies where to open the link or linked document. Acceptable values are `_blank` (opens the linked document in a new window or tab), `_parent` (opens the linked document in the parent frame), `_top` (opens the linked document in the full body of the window) or `_self` (opens the linked document in the same frame as it was selected. If no value is set, the default is `_blank`.

### Notes
If you don't need this component to display a different image for large/small screen sizes, you can use **src** (instead of **large** and **small**) to specify an image that will be displayed for all screen sizes.  

## Accessibility  
If the 'alternative text' is left empty, the image will *not* be included in the tab order. If the component is configured to display [title or body text]((https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes)), these will remain keyboard accessible.  

The 'alternative text' for links should be descriptive of the linked resource or where the link navigates to. [See examples of alt text for functional images](https://webaim.org/techniques/alttext/#functional).

## Limitations

No known limitations.

----------------------------
**Version number:**  5.1.0   <a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a>  
**Framework versions:** 5.14.0+  
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-graphic/graphs/contributors)  
**Accessibility support:** WAI AA  
**RTL support:** Yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 12+13 for macOS/iOS/iPadOS, Opera  
