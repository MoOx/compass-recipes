##
# Compass Recipes
# Configuration files mainly used for tests
#

# for testing extension
require File.join(File.dirname(__FILE__), 'lib', 'compass-recipes')

http_path = 'compass-recipes/'
css_dir = '.'
sass_dir = '.'
fonts_dir = 'fonts'
images_dir = 'tests/images'

line_comments = false
relative_assets = true

require "compass-normalize";

additional_import_paths = [
    './stylesheets',
    './tests'
]

# for repeating-linear-gradient
# https://github.com/chriseppstein/compass/issues/401
Compass::BrowserSupport.add_support('repeating-linear-gradient', 'webkit', 'moz', 'o', 'ms')
Compass::BrowserSupport.add_support('repeating-radial-gradient', 'webkit', 'moz', 'o', 'ms')
