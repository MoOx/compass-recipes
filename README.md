# Compass Recipes

A series of Compass and Sass mixins and functions for creating delicious CSS effects.

## [Demos](http://moox.github.com/compass-recipes/)

Note: These are demos of the repository at its current state, *not* the last stable gem. To get the most up-to-date recipes, please see Installation for instructions on installing the repo at his current state*

## Types of Recipes

* **[Backgrounds](http://moox.github.com/compass-recipes/recipes/background/)** - Background patterns, gradients.
* **Color** Variables Names & Advanced color functions like `brightness()`
* **[Effects](http://moox.github.com/compass-recipes/recipes/effect/)** - Visual effects like `bevel` and `cutout`
* **[Form skins](http://moox.github.com/compass-recipes/recipes/form/skin/)** - Only one at the moment.
* **[Icons](http://moox.github.com/compass-recipes/recipes/icon)** - Includes webfont icon support and a few open source fonts.
* **[Layout](http://moox.github.com/compass-recipes/recipes/layout)** - Vertical centering and box layout shortcuts.
* **[Media queries](http://moox.github.com/compass-recipes/recipes/media-queries)** - Predefined queries for common device widths. *Experimental: Uses `sass --pre`*
* **[Shadows](http://moox.github.com/compass-recipes/recipes/shadow/)** - A wide collection of shadows which use pseudo elements to create fold effects, etc.
* **[Shapes](http://moox.github.com/compass-recipes/recipes/shape/)** - Geometric and iconic shapes, created only with CSS
* **[Shared](http://moox.github.com/compass-recipes/recipes/shared/)** - Common CSS tricks and hacks.
* **[UI](http://moox.github.com/compass-recipes/recipes/ui/)** Lots of element styling for menu, buttons, loader, etc.
* [View other potential icoming items](https://github.com/MoOx/compass-recipes/issues?labels=enhancement%2Cfeature)

## Installation

[Compass Recipes is available as a gem on RubyGems.org](https://rubygems.org/gems/compass-recipes), so installation is quite easy.

```shell
(sudo) gem install compass-recipes
```

*If you want all latests recipes, you can just checkout the recipes (or download as zip) and add '{your-path-here-or-./}compass-recipes/stylesheets' using `additional_import_paths` or `add_import_path` (see [Compass configuration reference](http://compass-style.org/help/tutorials/configuration-reference/)).

More informations on the [Wiki](https://github.com/MoOx/compass-recipes/wiki)*


# Usage

When compass-recipes installed, you just need to require the compass plugin in your project

```css
require 'compass-recipes'
```

Then you can include some recipes like this

```css
@import "recipes/shape/triangle";
.my-triangle
{
    @include triangle;
}
```

Like Compass does, you can include all recipes in a folder like this

```css
@import "recipes/shape";

.my-triangle
{
    @include triangle;
}

.my-square
{
    @include square;
}
```

## Authors/Maintainers

Compass Recipes is maintained by [Maxime Thirouin](http://moox.fr), a french front-end web developer, and [David Kaneda](http://www.davidkaneda.com), creative director at [Sencha](http://www.sencha.com).

### Recurrent Contributors

* [@canarymason](https://github.com/canarymason)

### Sous Chefs

While Maxime and David are the primary project maintainers, most of the core ideas and techniques in the recipes are not from them.

Credits & Thanks:

* [@chriscoyier](https://github.com/chriscoyier) (shapes & lots of tricks)
* [@leaverou](https://github.com/leaverou) (backgrounds patterns)
* [@necolas](https://github.com/necolas) (normalize & tricks)
* [@simurai](https://github.com/simurai) (awesomes design stuffs)
* All of the people who contribute to the recipes (all names are in each recipes)


## Open to All

If you have a nifty CSS trick that makes sense to be abstracted (and isn't already in another Github repo), please fork and submit a pull request. Note: If you are not the author of the CSS trick, you must get their permission before adding.

## Build Documentation

*You do not need to build documentation for testing your recipes.*
*Just run `compass watch/compile` at the root of the repositorie.*

First you need bundle

```bundle install```

Then, to build the gh-pages from the `tests/`, you need to call

```bundle exec rake pages```

This process create the pages & push them to your gh-pages branch.

## Fonts

All fonts are repackaged using [Fontsquirrel](http://www.fontsquirrel.com/fontface/generator).
Licences are distributed with the fonts.

## Additional Resources

Some other great CSS/SCSS/design projects for making delicious websites:

* [Normalize](http://necolas.github.com/normalize.css/) - The standard of CSS normalizations. (included as a recipe)
* [Subtle Patterns](http://subtlepatterns.com/) - Great collection of free background patterns, some of which are not possible with CSS alone.
* [Animate.sass](https://github.com/adamstac/animate.sass) - A bevy of pre-defined keyframe animations.
* [OMG Text](http://jaredhardy.com/omg-text/) - Some super-rad text effects using text-shadow

## License

Copyright (c) 2012 Maxime Thirouin

Released under [MIT Licence](http://moox.mit-license.org/)