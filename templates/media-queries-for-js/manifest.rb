description "Compass Recipes extension for JavaScript media queries"

javascript '../../javascripts/polyfills/addEventListener.js', :to => 'polyfills/addEventListener.js'
javascript 'media-queries.js', :to => 'media-queries.js'

help %Q{
This is a Compass Recipes extension for JavaScript media queries

$ gem install compass-recipes
# edit your config.rb file adding : require "compass-recipes"
$ compass install recipes/media-queries-for-js

}

welcome_message %Q{
You've installed Compass Recipes JavaScript media-queries extension. Let's go to add fancy responsive behavior !

}