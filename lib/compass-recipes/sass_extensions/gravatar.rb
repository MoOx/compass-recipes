# adatpted from https://github.com/woods/gravatar-plugin/blob/master/lib/gravatar.rb

require 'digest/md5'
require 'cgi'

module Sass::Script::Functions

    def gravatar_url(kwargs = {})
        opts = {}
        Sass::Util.map_hash({

            'email' => [:String, nil],

            # The URL of a default image to display if the given email address does
            # not have a gravatar.
            'default' => [:String, nil],

            # The default size in pixels for the gravatar image (they're square).
            'size' => [:Number, 48],

            # The maximum allowed MPAA rating for gravatars. This allows you to
            # exclude gravatars that may be out of character for your site.
            'rating' => [:String, 'PG'],

            # Whether or not to display the gravatars using HTTPS instead of HTTP
            'ssl' => [:Bool, Sass::Script::Bool.new(false)],

        }) do |name, (type, default)|

            val = kwargs.delete(name)
            if val
                assert_type val, type, name
            else
                val = default
            end
            opts[name] = val
        end

        email_hash = Digest::MD5::hexdigest(opts['email'].to_s)

        if opts['ssl'].value
            url = "https://secure.gravatar.com/avatar/#{email_hash}.png"
        else
            url = "http://www.gravatar.com/avatar/#{email_hash}.png"
        end

        gravatar_opts = []
        ['rating', 'size', 'default'].each do |opt|
            unless opts[opt].nil?
                value = CGI::escape(opts[opt].to_s)
                gravatar_opts << [opt, value].join('=')
            end
        end

        url << "?#{gravatar_opts.join('&')}" unless gravatar_opts.empty?
        Sass::Script::String.new("url(" + url + ")");
    end

    declare :gravatar_url, [], :var_kwargs => true
end