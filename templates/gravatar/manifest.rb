description "Compass Recipes extension for Gravatar"

javascript 'getElementsByClassName.js', :to => 'getElementsByClassName.js'
javascript 'md5.js', :to => 'md5.js'
javascript 'gravatar.js', :to => 'gravatar.js'

help %Q{
This is a Compass Recipes extension for Gravatar

$ gem install compass-recipes
# edit your config.rb file adding : require "compass-recipes"
$ compass install -r recipes/gravatar

}

welcome_message %Q{
You've installed Compass Recipes Gravatar extension. Let's go to lazy load your Gravatar !

}