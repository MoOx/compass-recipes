##
# Compass Recipes
# Configuration files mainly used for tests
#

# for testing extension
require File.join(File.dirname(__FILE__), 'lib', 'compass-recipes')

http_path = '/'
css_dir = '.'
sass_dir = '.'
images_dir = 'img'

line_comments = false
relative_assets = true

additional_import_paths = [
    './stylesheets',
    './tests'
]

# for repeating-linear-gradient
# https://github.com/chriseppstein/compass/issues/401
Compass::BrowserSupport.add_support('repeating-linear-gradient', 'webkit', 'moz', 'o', 'ms')
