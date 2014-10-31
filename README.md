# Compass Recipes [![Build Status](https://secure.travis-ci.org/MoOx/compass-recipes.png)](http://travis-ci.org/MoOx/compass-recipes)

# UNMAINTAINED

> A series of Compass and Sass mixins and functions for creating delicious CSS effects.


## Availables Recipes

* **[Backgrounds](/tests/recipes/background/)** - Background patterns, gradients.
* **[Color](/tests/recipes/color/)** Variables Names, advanced color functions like `brightness()` & color scheme functions
* **[Effects](/tests/recipes/effect/)** - Visual effects like `glass`, `bevel`, `cutout` or `ribbon`
* **[Form skins](/tests/recipes/form/skin/)** - Only one at the moment. Please add yours :)
* **[Icon Fonts](/tests/recipes/icon-font/)** - Includes icon fonts helper and a few open source fonts as a compass extension ([more info](https://github.com/MoOx/compass-recipes/blob/master/templates/icon-fonts/README.md))
* **[Image](/tests/recipes/image/)** - More image mixins (& functions) than Compass deserve (dimensions, inline, simple spriting)
* **[Layout](/tests/recipes/layout/)** - Vertical centering and box layout shortcuts.
* **[Media queries](/tests/recipes/media-queries/)** - Shortcuts for media queries.
* **[Shadows](/tests/recipes/shadow/)** - A wide collection of shadows which use pseudo elements to create fold effects, etc.
* **[Shapes](/tests/recipes/shape/)** - Geometric and iconic shapes, created only with CSS
* **[UI](/tests/recipes/ui/)** Lots of element styling for loader, menu, overlay, separator, tooltip, etc.
* **[Utilities](/tests/recipes/utilities/)** Very usefull utilities, trick, hacks
* [View other potential icoming items](https://github.com/MoOx/compass-recipes/issues?labels=enhancement%2Cfeature)

## Installation

[Compass Recipes is available as a gem on RubyGems.org](https://rubygems.org/gems/compass-recipes), so installation is quite easy.

```shell
(sudo) gem install compass-recipes
```

*If you want all latests recipes, you can just checkout the recipes (or download as zip) and add '{your-path-here-or-./}compass-recipes/stylesheets' using `additional_import_paths` or `add_import_path` (see [Compass configuration reference](http://compass-style.org/help/tutorials/configuration-reference/)).

More informations on the [Wiki](https://github.com/MoOx/compass-recipes/wiki)*


## Usage

When compass-recipes installed, you just need to require the compass plugin in your project

```ruby
require 'compass-recipes'
```

Then you can include some recipes like this

```scss
@import "recipes/shape/polygon/triangle";
.my-triangle
{
    @include triangle;
}
```

Like Compass does, you can include all recipes in a folder like this

```scss
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

## Open to All

If you have a nifty CSS trick that makes sense to be abstracted (and isn't already in another Github repo), please fork and submit a pull request. Note: If you are not the author of the CSS trick, you must get their permission before adding.

## Fonts

All fonts are repackaged using [Fontsquirrel](http://www.fontsquirrel.com/fontface/generator).
Licences are distributed with the fonts.

## Build Documentation

*You do not need to build documentation for testing your recipes.*
*Just run `compass watch/compile` at the root of the repository.*

First you need bundle

```bundle install```

Then, to build the gh-pages from the `tests/`, you need to call

```bundle exec rake pages```

This process create the pages & commit them to your gh-pages branch.

## Authors/Maintainers

[See all contributors](https://github.com/MoOx/compass-recipes/graphs/contributors)

Credits & Thanks:

* [@chriscoyier](https://github.com/chriscoyier) (shapes & lots of tricks)
* [@leaverou](https://github.com/leaverou) (backgrounds patterns)
* [@necolas](https://github.com/necolas) (normalize & tricks)
* [@simurai](https://github.com/simurai) (awesomes design stuffs)
* All of the people who contribute to the recipes (all names should be in each recipes source)

### Additional Resources

Some other great CSS/SCSS/design projects for making delicious websites:

* [Subtle Patterns](http://subtlepatterns.com/) - Great collection of free background patterns, some of which are not possible with CSS alone.
* [Animate.sass](https://github.com/adamstac/animate.sass) - A bevy of pre-defined keyframe animations.
* [OMG Text](http://jaredhardy.com/omg-text/) - Some super-rad text effects using text-shadow


## License

Copyright (c) 2012 Maxime Thirouin

Released under [MIT Licence](http://moox.mit-license.org/)
