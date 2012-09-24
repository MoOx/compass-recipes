description "Compass Recipes extension for Gravatar"

javascript '../../javascripts/polyfills/addEventListener.js', :to => 'polyfills/addEventListener.js'
javascript '../../javascripts/polyfills/getElementsByClassName.js', :to => 'polyfills/getElementsByClassName.js'
javascript 'md5.js', :to => 'md5.js'
javascript 'gravatar.js', :to => 'gravatar.js'

help %Q{
This is a Compass Recipes extension for Gravatar

$ gem install compass-recipes
# edit your config.rb file adding : require "compass-recipes"
$ compass install recipes/gravatar

}

welcome_message %Q{
You've installed Compass Recipes Gravatar extension. Let's go to lazy load your Gravatar !

}