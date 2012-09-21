/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

(function(){

// Private helper vars
var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;

var _ = self.Prism = {
	languages: {
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];
			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			return root[inside] = ret;
		},

		DFS: function(o, callback) {
			for (var i in o) {
				callback.call(o, i, o[i]);

				if (Object.prototype.toString.call(o) === '[object Object]') {
					_.languages.DFS(o[i], callback);
				}
			}
		}
	},

	highlightAll: function(async, callback) {
		var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1];
			grammar = _.languages[language];
		}

		if (!grammar) {
			return;
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		// Set language on the parent, for styling
		parent = element.parentNode;

		if (/pre/i.test(parent.nodeName)) {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
		}

		var code = element.textContent.trim();

		if(!code) {
			return;
		}

		code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;')
		           .replace(/>/g, '&gt;').replace(/\u00a0/g, ' ');
		//console.time(code.slice(0,50));

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		_.hooks.run('before-highlight', env);

		if (async && self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = Token.stringify(JSON.parse(evt.data));
				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				//console.timeEnd(code.slice(0,50));
				_.hooks.run('after-highlight', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar)
			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			//console.timeEnd(code.slice(0,50));
		}
	},

	highlight: function (text, grammar) {
		return Token.stringify(_.tokenize(text, grammar));
	},

	tokenize: function(text, grammar) {
		var Token = _.Token;

		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		tokenloop: for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var pattern = grammar[token],
				inside = pattern.inside,
				lookbehind = !!pattern.lookbehind || 0;

			pattern = pattern.pattern || pattern;

			for (var i=0; i<strarr.length; i++) { // Don’t cache length as it changes during the loop

				var str = strarr[i];

				if (strarr.length > text.length) {
					// Something went terribly wrong, ABORT, ABORT!
					break tokenloop;
				}

				if (str instanceof Token) {
					continue;
				}

				pattern.lastIndex = 0;

				var match = pattern.exec(str);

				if (match) {
					if(lookbehind) {
						lookbehind = match[1].length;
					}

					var from = match.index - 1 + lookbehind,
					    match = match[0].slice(lookbehind),
					    len = match.length,
					    to = from + len,
						before = str.slice(0, from + 1),
						after = str.slice(to + 1);

					var args = [i, 1];

					if (before) {
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);
				}
			}
		}

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content) {
	this.type = type;
	this.content = content;
};

Token.stringify = function(o) {
	if (typeof o == 'string') {
		return o;
	}

	if (Object.prototype.toString.call(o) == '[object Array]') {
		for (var i=0; i<o.length; i++) {
			o[i] = Token.stringify(o[i]);
		}

		return o.join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {}
	};

	if (env.type == 'comment') {
		env.attributes['spellcheck'] = 'true';
	}

	_.hooks.run('wrap', env);

	var attributes = '';

	for (var name in env.attributes) {
		attributes += name + '="' + (env.attributes[name] || '') + '"';
	}

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';

};

if (!self.document) {
	// In worker
	self.addEventListener('message', function(evt) {
		var message = JSON.parse(evt.data),
		    lang = message.language,
		    code = message.code;

		self.postMessage(JSON.stringify(_.tokenize(code, _.languages[lang])));
		self.close();
	}, false);

	return;
}

// Get current script and highlight
var script = document.getElementsByTagName('script');

script = script[script.length - 1];

if (script) {
	_.filename = script.src;

	if (document.addEventListener && !script.hasAttribute('data-manual')) {
		document.addEventListener('DOMContentLoaded', _.highlightAll, false);
	}
}

})();
Prism.languages.markup = {
	'comment': /&lt;!--[\w\W]*?--(&gt;|&gt;)/g,
	'prolog': /&lt;\?.+?\?&gt;/,
	'doctype': /&lt;!DOCTYPE.+?&gt;/,
	'cdata': /&lt;!\[CDATA\[[\w\W]+?]]&gt;/i,
	'tag': {
		pattern: /&lt;\/?[\w:-]+\s*[\w\W]*?&gt;/gi,
		inside: {
			'tag': {
				pattern: /^&lt;\/?[\w:-]+/i,
				inside: {
					'punctuation': /^&lt;\/?/,
					'namespace': /^[\w-]+?:/
				}
			},
			'attr-value': {
				pattern: /=(('|")[\w\W]*?(\2)|[^\s>]+)/gi,
				inside: {
					'punctuation': /=/g
				}
			},
			'punctuation': /\/?&gt;/g,
			'attr-name': {
				pattern: /[\w:-]+/g,
				inside: {
					'namespace': /^[\w-]+?:/
				}
			}

		}
	},
	'entity': /&amp;#?[\da-z]{1,8};/gi
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});
Prism.languages.css = {
	'comment': /\/\*[\w\W]*?\*\//g,
	'atrule': /@[\w-]+?(\s+.+)?(?=\s*{|\s*;)/gi,
	'url': /url\((["']?).*?\1\)/gi,
	'selector': /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
	'property': /(\b|\B)[a-z-]+(?=\s*:)/ig,
	'string': /("|')(\\?.)*?\1/g,
	'important': /\B!important\b/gi,
	'ignore': /&(lt|gt|amp);/gi,
	'punctuation': /[\{\};:]/g
};

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,
			inside: {
				'tag': {
					pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.css
			}
		}
	});
}
Prism.languages.javascript = {
	'comment': {
		pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
		lookbehind: true
	},
	'string': /("|')(\\?.)*?\1/g,
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
		lookbehind: true
	},
	'keyword': /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,
	'boolean': /\b(true|false)\b/g,
	'number': /\b-?(0x)?\d*\.?\d+\b/g,
	'operator': /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g,
	'ignore': /&(lt|gt|amp);/gi,
	'punctuation': /[{}[\];(),.:]/g
};

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,
			inside: {
				'tag': {
					pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.javascript
			}
		}
	});
}
(function(){

if(!window.Prism) {
	return;
}

function $$(expr, con) {
	return Array.prototype.slice.call((con || document).querySelectorAll(expr));
}

var CRLF = crlf = /\r?\n|\r/g;

function highlightLines(pre, lines, classes) {
	var ranges = lines.replace(/\s+/g, '').split(','),
	    offset = +pre.getAttribute('data-line-offset') || 0;

	var lineHeight = parseFloat(getComputedStyle(pre).lineHeight);

	for (var i=0, range; range = ranges[i++];) {
		range = range.split('-');

		var start = +range[0],
		    end = +range[1] || start;

		var line = document.createElement('div');

		line.textContent = Array(end - start + 2).join(' \r\n');
		line.className = (classes || '') + ' line-highlight';
		line.setAttribute('data-start', start);

		if(end > start) {
			line.setAttribute('data-end', end);
		}

		line.style.top = (start - offset - 1) * lineHeight + 'px';

		(pre.querySelector('code') || pre).appendChild(line);
	}
}

function applyHash() {
	var hash = location.hash.slice(1);

	// Remove pre-existing temporary lines
	$$('.temporary.line-highlight').forEach(function (line) {
		line.parentNode.removeChild(line);
	});

	var range = (hash.match(/\.([\d,-]+)$/) || [,''])[1];

	if (!range || document.getElementById(hash)) {
		return;
	}

	var id = hash.slice(0, hash.lastIndexOf('.')),
	    pre = document.getElementById(id);

	if (!pre) {
		return;
	}

	if (!pre.hasAttribute('data-line')) {
		pre.setAttribute('data-line', '');
	}

	highlightLines(pre, range, 'temporary ');

	document.querySelector('.temporary.line-highlight').scrollIntoView();
}

var fakeTimer = 0; // Hack to limit the number of times applyHash() runs

Prism.hooks.add('after-highlight', function(env) {
	var pre = env.element.parentNode;
	var lines = pre && pre.getAttribute('data-line');

	if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
		return;
	}

	clearTimeout(fakeTimer);

	$$('.line-highlight', pre).forEach(function (line) {
		line.parentNode.removeChild(line);
	});

	highlightLines(pre, lines);

	fakeTimer = setTimeout(applyHash, 1);
});

addEventListener('hashchange', applyHash, false);

})();
(function(){

if(!window.Prism) {
	return;
}

for (var language in Prism.languages) {
	var tokens = Prism.languages[language];

	tokens.tab = /\t/g;
	tokens.lf = /\n/g;
	tokens.cr = /\r/g;
}

})();
(function(){

if (!window.Prism) {
	return;
}

var url = /\b([a-z]{3,7}:\/\/|tel:)[\w-+%~/.]+/,
    email = /\b\S+@[\w.]+[a-z]{2}/,
    linkMd = /\[([^\]]+)]\(([^)]+)\)/,

	// Tokens that may contain URLs and emails
    candidates = ['comment', 'url', 'attr-value', 'string'];

for (var language in Prism.languages) {
	var tokens = Prism.languages[language];

	Prism.languages.DFS(tokens, function (type, def) {
		if (candidates.indexOf(type) > -1) {
			if (!def.pattern) {
				def = this[type] = {
					pattern: def
				};
			}

			def.inside = def.inside || {};

			if (type == 'comment') {
				def.inside['md-link'] = linkMd;
			}

			def.inside['url-link'] = url;
			def.inside['email-link'] = email;
		}
	});

	tokens['url-link'] = url;
	tokens['email-link'] = email;
}

Prism.hooks.add('wrap', function(env) {
	if (/-link$/.test(env.type)) {
		env.tag = 'a';

		var href = env.content;

		if (env.type == 'email-link') {
			href = 'mailto:' + href;
		}
		else if (env.type == 'md-link') {
			// Markdown
			var match = env.content.match(linkMd);

			href = match[2];
			env.content = match[1];
		}

		env.attributes.href = href;
	}
});

})();
