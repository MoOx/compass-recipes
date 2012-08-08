# Gravatar javascript extension

Gravatar extensions allow you to load gravatar on your webpage without using `<img>`.

You just need to include `gravatar.js` script, and add a `data-email` or `data-email-md5` attribute on elements having `gravatar-before` or `gravatar-after` class. This elements will have a `:before`/`:after` pseudo elements with the gravatar in it.

Gravatar are added after `window.load` fired (to make a sort of lazy load).

## Installation

To install the compass extensions (to get the javascripts files available), you need to call `compass install recipes/gravatar` at the root of your project.

*Remember you need to include all scritps added to your page (using your own solution: simple `<script>`s, or using you favorite assets manager - grunt.js, require.js...)*

Note: MD5.js is optional (not needed if you directly use data-email-md5 attribute - recommanded method). So you can safely delete it.

## Options

If you want to change default options, you can just create (before including the `gravatar.js` script) the javascript object `gravatarOptions`.
Here is default values:
```js
var gravatarOptions = {
    size: 48, // can be from 1 to 512
    rating: 'PG', // Gravatar rating values: G | PG | R | X - see Gravatar doc for more info
    default: ''; // Default Gravatar url if the user don't have one. Can be an url or a Gravatar value like 404 | mm | identicon | monsterid | wavatar
    propertyUsed: 'background-image', // Can be `background-image`, `background`, or `content`since the value is an `url(…)`
    addDimensions: true, //  true or false (add width & height). Usefull if you use background property. In this case, remember to add content: "";
}
```