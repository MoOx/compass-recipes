/**
 * document.getElementsByClassName polyfill for IE8/7/6
 */

if (!document.getElementsByClassName)
{
    document.getElementsByClassName = function(classname)
    {
        classname = new RegExp('\\b' + classname + '\\b');

        var elements = [];
        for (var i = 0, elem = this.getElementsByTagName('*'), length = elem.length; i < length; i++)
        {
            var classes = elem[i].className;
            if (classname.test(classes))
            {
                elements.push(elem[i]);
            }
        }

        return elements;
    };
}