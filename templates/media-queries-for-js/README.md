# Media Queries for Javascript

[Compass](http://compass-style.org/) extension from [Compass-Recipes](http://moox.github.com/compass-recipes).

## Installation

To properly install this javascript extension, you just need to do

```shell
compass install recipes/media-queries-for-js
```

Two javascripts files should be included into your {javascripts_dir}.

### HTML

You need to include the javascripts files installed by the extension.

```html
<script src="{javascript_dir}/polyfills/addEventListener.js"></script> <!-- polyfill, for IE  -->
<script src="{javascript_dir}/media-queries.js"></script> <!-- polyfill, for IE  -->
```

You can also use your own favorite assets manager like grunt.js, require.js...

### (S)CSS

You have to define your breakpoints.

```scss
@include media-queries-for-js(small, "max-width: 30em");
@include media-queries-for-js(medium, "min-width: 30em");
@include media-queries-for-js(large, "min-width: 60em");
```

## Javascript

Then you should be able to do in your scripts

```js
if ('small' == Recipes.MediaQueries.getCurrent())
{
	// your code for small screen
}
```
