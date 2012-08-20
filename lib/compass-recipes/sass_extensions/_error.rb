##
# Helper to throw error message
##

module Sass::Script::Functions
    def error(message)
        raise Sass::SyntaxError, message.value
    end
end