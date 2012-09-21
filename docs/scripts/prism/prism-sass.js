(function(){

if(!window.Prism) {
	return;
}

RegExp.create = function(str, replacements, flags) {
	for(var id in replacements) {
		var replacement = replacements[id],
			idRegExp = RegExp('{{' + id + '}}', 'gi');

		if(replacement.source) {
			replacement = replacement.source.replace(/^\^|\$$/g, '');
		}

		// Don't add extra parentheses if they already exist
		str = str.replace(RegExp('\\(' + idRegExp.source + '\\)', 'gi'), '(' + replacement + ')');

		str = str.replace(idRegExp, '(?:' + replacement + ')');
	}

	return RegExp(str, flags);
};
var number = /-?\d*\.?\d+/;
Prism.languages.sass = {
	'comment': {
		pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
		lookbehind: true
	},

	'control': /@(if|else if|else|for|each|while)/i,
	'directive': /@(import|extend|debug|warn)/i,
	'keyword': /&amp;|@(mixin|include|function|return)/i,

	'atrule': /@[\w-]+?(?=(\s+.+)?(\s*{|\s*;))/gi,
	//'url': /url\((["']?).*?\1\)/gi,
	'string': /("|')(\\?.)*?\1/g,
	'url': /([-a-z]+-)*url(?=\()/gi, // compassified

	'placeholder': /%[-_\w]+/i,
	'variable': /\$[-_\w]+/i,

	'property': /(\b|\B)[a-z-]+(?=\s*:)/ig,

	'important': /\B!important\b/gi,
	'statement': /\B!(default|optional)\b/gi,

	'boolean': /\b(true|false)\b/g,
	'null': /\b(null)\b/g,
	'number': /\b-?(0x)?(\d*\.?\d+|([\da-f]{3}){1,2})(?=(ddpx|px|pt|cm|mm|in|em|ex|pc)|\b)/g,

	// sass short mixin declaration
	'mixin': /(^|\\n)\\s*=.*/g,
	'mixin': /(^|\\n)\\s*\\+.*/g,

	// specific css values (taken from dabblet source)
	'gradient': /\b(repeating-)?(linear|radial)-gradient\(((rgb|hsl)a?\(.+?\)|[^\)])+\)/gi,
	'abslength': RegExp.create('(\\b|\\B){{number}}{{unit}}\\b', {
			number: number,
			unit: /(cm|mm|in|pt|pc|px)/
		}, 'gi'),
	'easing': RegExp.create('\\b{{bezier}}\\B|\\b{{keyword}}(?=\\s|;|\\}|$)', {
			bezier: RegExp.create('cubic-bezier\\(({{number}},\\s*){3}{{number}}\\)', {
				number: number
			}),
			keyword: /linear|ease(-in)?(-out)?/
		}, 'gi'),
	'time': RegExp.create('(\\b|\\B){{number}}m?s\\b', {
			number: number
		}, 'gi'),
	'angle': RegExp.create('(\\b|\\B){{number}}(deg|g?rad|turn)\\b', {
			number: number
		}, 'gi'),
	'fontfamily': /(("|')[\w\s]+\2,\s*|\w+,\s*)*(sans-serif|serif|monospace|cursive|fantasy)\b/gi,

	'entity': /\\[\da-f]{1,8}/gi,

	//'selector-id': /#(\\w|-|_)+/g,
	//'selector-class': /\\.(\\w|-|_)+/g,
	'selector': /[^;\{\}\(\)\s][^;\{\}\(\)]*(?=\s*\{)/g,

	'operator': /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g,

	'unit': /\b(ddpx|px|pt|cm|mm|in|em|ex|pc)\b|%/i,

	'ignore': /&(lt|gt|amp);/gi,
	'punctuation': /[\{\}\(\);:,\.#]/g
};

})();