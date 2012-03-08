module Sass::Script::Functions
    def pow(number, power)
        Sass::Script::Number.new(number.value ** power.value)
    end
    def sqrt(number)
        Sass::Script::Number.new(Math.sqrt(number.value))
    end
end