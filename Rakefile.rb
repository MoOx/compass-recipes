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
  (FileList.new('fonts/**/*')+FileList.new('stylesheets/**/*')+FileList.new('templates/**/*')+FileList.new('tests/**/*')).each do |file|
    if File.file?(file)
      puts 'File ' + file
      if !File.directory?(File.dirname("tmp/#{file}"))
        FileUtils.mkdir_p(File.dirname("tmp/#{file}"))
      end
      FileUtils.cp(file, "tmp/#{file}")
    else #assume dir
      puts 'Dir  ' + file
      FileUtils.mkdir_p("tmp/#{file}")
    end
  end

  # switch branch
  repo.branch("gh-pages").checkout

  # Reset gh-pages
  FileUtils.rm_rf "fonts/*"
  FileUtils.rm_rf "stylesheets/*"
  FileUtils.rm_rf "templates/*"
  FileUtils.rm_rf "tests/*"

  # Prepare tests addons
  headMarker = '<!doctype html>'
  htmlHeader = headMarker + File.open("layout/header.html", "r").read
  htmlFooter = File.open("layout/footer.html", "r").read

  # HTML files need header and footer
  FileList.new('tmp/**/*.html').each do |file|
    contents = File.open(file, "rb").read
    htmlfile = File.open("#{file}", "w")
    contents = contents.sub(headMarker, htmlHeader)
    htmlFooter += contents
    htmlfile.write(contents)
    htmlfile.close
  end

  # CSS: just copy
  FileList.new('tmp/*').each do |file|
    FileUtils.mkdir_p(File.dirname("#{file[4..-1]}"))
    FileUtils.mv(file, "#{file[4..-1]}")
  end

  FileUtils.rm_rf("tmp")

  # Commit gh-pages changes
  # @todo make this optional ?
  Dir["recipes/**/*"].each {|f| repo.add(f) }
  repo.status.deleted.each {|f, s| repo.remove(f)}
  message = ENV["MESSAGE"] || "Updated at #{Time.now.utc}"
  repo.commit(message)

  # back to master (maybe it's not appropriate if we are not working on master ?!)
  repo.branch("master").checkout
end