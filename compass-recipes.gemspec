# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.version = "0.1.0"
  s.date = "2011-06-06"

  s.name = "compass-recipes"
  s.authors = ["Maxime Thirouin"]
  s.summary = %q{A Compass extension to have some sass/compass recipes ready to use}
  s.description = %q{A Compass extension to have some sass/compass recipes ready to use ! }
  s.email = "maxime.thirouin@gmail.com"
  s.homepage = "http://moox.github.com/Compass-Recipes"

  s.files = %w(README.md LICENSE VERSION)
  s.files += Dir.glob("stylesheets/**/*.*")

  s.has_rdoc = false
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.8.5}
  s.add_dependency("compass", [">= 0.11.1"])
end
