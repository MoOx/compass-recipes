task :default do
	sh "compass compile"
end

task :doc do
	require 'git'
	require 'fileutils'
	repo = Git.open('.')

	#  copy source into a build dir
	buildDir = "build"
	FileUtils.rm_rf buildDir
	FileUtils.mkdir(buildDir)
	(
		FileList.new('docs/**/*')+
		FileList.new('javascripts/**/*')+
		FileList.new('lib/**/*')+
		FileList.new('stylesheets/**/*')+
		FileList.new('templates/**/*')+
		FileList.new('tests/**/*')+
		["index.html"]
	).each do |file|
		if File.file?(file)
			if !File.directory?(File.dirname("#{buildDir}/#{file}"))
				puts 'Mkdir' + File.dirname("#{buildDir}/#{file}")
				FileUtils.mkdir_p(File.dirname("#{buildDir}/#{file}"))
			end
			FileUtils.cp(file, "#{buildDir}/#{file}")
			puts 'File ' + file
		else #assume dir
			FileUtils.mkdir_p("#{buildDir}/#{file}")
			puts 'Dir  ' + file
		end
	end

	# Prepare tests addons
	headMarker = '<!doctype html>'
	# take latest header & footer layout for tests
	htmlHeader = headMarker + File.open("docs/layout/header.html", "r").read
	htmlFooter = File.open("docs/layout/footer.html", "r").read

	# HTML files need header and footer
	FileList.new('#buildDir/tests/**/*.html').each do |file|
		contents = File.open(file, "rb").read
		htmlfile = File.open("#{file}", "w")
		contents = contents.sub(headMarker, htmlHeader)
		htmlFooter += contents
		htmlfile.write(contents)
		htmlfile.close
	end
end