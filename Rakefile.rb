task :default do
	sh "compass compile"
end

task :pages do
	require 'git'
	require 'fileutils'
	repo = Git.open('.')

	#  copy tests into a temp dir before switching branch
	FileUtils.rm_rf "tmp"
	FileUtils.mkdir("tmp")
	(
		FileList.new('docs/**/*')+
		FileList.new('fonts/**/*')+
		FileList.new('javascripts/**/*')+
		FileList.new('lib/**/*')+
		FileList.new('stylesheets/**/*')+
		FileList.new('templates/**/*')+
		FileList.new('tests/**/*')+
		["index.html"]
	).each do |file|
		if File.file?(file)
			if !File.directory?(File.dirname("tmp/#{file}"))
				puts 'Mkdir' + File.dirname("tmp/#{file}")
				FileUtils.mkdir_p(File.dirname("tmp/#{file}"))
			end
			FileUtils.cp(file, "tmp/#{file}")
			puts 'File ' + file
		else #assume dir
			FileUtils.mkdir_p("tmp/#{file}")
			puts 'Dir  ' + file
		end
	end

	# Prepare tests addons
	headMarker = '<!doctype html>'
	# take latest header & footer layout for tests
	htmlHeader = headMarker + File.open("docs/layout/header.html", "r").read
	htmlFooter = File.open("docs/layout/footer.html", "r").read

	# switch branch
	repo.branch("gh-pages").checkout

	# Reset gh-pages
	FileUtils.rm_rf "docs"
	FileUtils.rm_rf "fonts"
	FileUtils.rm_rf "javascripts"
	FileUtils.rm_rf "lib"
	FileUtils.rm_rf "stylesheets"
	FileUtils.rm_rf "templates"
	FileUtils.rm_rf "tests"

	# HTML files need header and footer
	FileList.new('tmp/tests/**/*.html').each do |file|
		contents = File.open(file, "rb").read
		htmlfile = File.open("#{file}", "w")
		contents = contents.sub(headMarker, htmlHeader)
		htmlFooter += contents
		htmlfile.write(contents)
		htmlfile.close
	end

	# just copy all files
	FileList.new('tmp/*').each do |file|
		#FileUtils.mkdir_p(File.dirname("#{file[4..-1]}"))
		puts 'File copy: ' + file + ' to ' + "#{file[4..-1]}"
		FileUtils.mv(file, Dir.pwd + "/#{file[4..-1]}")
	end

	FileUtils.rm_rf("tmp")

	# Commit gh-pages changes
	# @todo make this optional ?
	Dir[
		"docs/**/*",
		"fonts/**/*",
		"javascripts/**/*",
		"lib/**/*",
		"stylesheets/**/*",
		"templates/**/*",
		"tests/**/*"
	].each {|f| repo.add(f) }
	repo.add("index.html")
	repo.status.deleted.each {|f, s| repo.remove(f)}
	message = ENV["MESSAGE"] || "Updated at #{Time.now.utc}"
	repo.commit(message)

	# back to master (maybe it's not appropriate if we are not working on master ?!)
	repo.branch("master").checkout
end