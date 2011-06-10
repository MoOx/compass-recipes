# Compass Recipes ![project status](http://stillmaintained.com/MoOx/compass-recipes.png) #

This project is a collection of Sass mixins using Compass that you can use or learn from.

## Installation

[Compass-Recipes is now available as a gem on RubyGems.org](https://rubygems.org/gems/compass-recipes). So installation is quite easy.

    gem install compass-recipes

# Usage

When compass-recipes installed, you just need to require the compass plugin in your project

    require 'compass-recipes'

Then you can include some recipes like this

    @import "recipes/shape/triangle";
    .my-triangle
    {
        @include triangle;
    }

Like Compass does, you can include all recipes in a folder like this

    @import "recipes/shape";

    .my-triangle
    {
        @include triangle;
    }

    .my-square
    {
        @include square;
    }

## Demos

http://moox.github.com/compass-recipes/

## TODO
* Create tests for all existing mixins
* Add all pattern mixins from http://leaverou.me/css3patterns
* Add all shadow/drop mixins from http://nicolasgallagher.com/css-drop-shadows-without-images/demo/ and http://www.creativejuiz.fr/trytotry/css3-box-shadow-after-before/
* Add all shapes from http://css-tricks.com/examples/ShapesOfCSS/
* Add normalize.css from @necolas

## Author
 
Compass-Recipes is maintained by Maxime Thirouin, a front-end web developer working for Shopbot-inc.com

## Open to All
Fork, modify, push, submit pull request ! That's easy !

*I'm not a Ruby coder, so anyone which want to help me for anything will be appreciated !*