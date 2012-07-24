##
# Sass extensions for Compass Recipes
##

%w(_error background_noise gravatar).each do |lib|
  require File.join(File.dirname(__FILE__), 'sass_extensions', lib)
end

module Sass::Script::Functions
    def value(number)
        Sass::Script::Number.new(number.value, ['']);
    end
end