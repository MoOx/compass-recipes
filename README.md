# Compass Recipes ![project status](http://stillmaintained.com/MoOx/compass-recipes.png) #

This project is a collection of Sass mixins using Compass that you can use or learn from.

## Demos

http://moox.github.com/compass-recipes/

## Installation

[Compass-Recipes is now available as a gem on RubyGems.org](https://rubygems.org/gems/compass-recipes). So installation is quite easy.

```shell
gem install compass-recipes
```
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

## Author
 
Compass-Recipes is maintained by Maxime Thirouin, a front-end web developer working for Shopbot-inc.com

## Open to All
Fork, modify, push, submit pull request ! That's easy !

*I'm not a Ruby coder, so anyone which want to help me for anything will be appreciated !*

## Thanks (indirect contributors)

This project will never exists without these people : @necolas, @simurai, @chriscoyier
They give me inspiration (and snippets of code!).
