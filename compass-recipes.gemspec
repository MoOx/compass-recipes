# -*- encoding: utf-8 -*-

Gem::Specification.new do |gemspec|
  gemspec.version = File.read(File.dirname(__FILE__) + '/VERSION').strip
  gemspec.date = Date.today

  gemspec.name = "compass-recipes"
  gemspec.authors = ["Maxime Thirouin", "David Kaneda"]
  gemspec.summary = %q{Recipes for Compass}
  gemspec.description = %q{A Compass extension to have some sass/compass recipes ready to use ! }
  gemspec.email = "m@moox.fr"
  gemspec.homepage = "http://compass-recipes.moox.fr/"

  gemspec.rubyforge_project = "compass-recipes"

  gemspec.has_rdoc = false
  gemspec.require_paths = %w(lib)
  gemspec.rubygems_version = "1.3.5" # same as compass

  gemspec.files = %w(README.md LICENSE VERSION)
  gemspec.files += Dir.glob("fonts/**/*.*")
  gemspec.files += Dir.glob("lib/**/*.*")
  gemspec.files += Dir.glob("stylesheets/**/*.*")
  gemspec.files += Dir.glob("templates/**{,/*/**}/*.*")

  gemspec.add_dependency("sass", ">= 3.2.1")
  gemspec.add_dependency("compass", ">= 0.12.2")
  gemspec.add_dependency("compass-normalize", ">= 1.3")
end
