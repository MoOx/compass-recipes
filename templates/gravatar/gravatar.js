(function()
{
	// maybe we can just create a new stylesheet instead adding rules to the last
	if (!document.styleSheets)
	{
		throw Exception('gravatar.js require at less stylesheets support (document.styleSheets)');
	}
	// make a new stylesheet
	var style = document.createElement('style');
	document.getElementsByTagName('head')[0].appendChild(style);

	// Safari does not see the new stylesheet unless you append something.
	// However!  IE will blow chunks, so ... filter it thusly:
	/*
	if (!window.createPopup)
	{
	   ns.appendChild(document.createTextNode(''));
	}
	*/
	var styleSheet = document.styleSheets[document.styleSheets.length-1];
	if (!styleSheet.insertRule && !styleSheet.addRule)
	{
		throw Exception('Impossible to add CSS rules. gravatar.js cannot work');
	}

	var addCssRule = function(selector, rule)
	{
		var l = styleSheet.cssRules ? styleSheet.cssRules.length : styleSheet.rules ? styleSheet.rules.length : 0;

		if (styleSheet.insertRule)
		{
			styleSheet.insertRule(selector + ' {' + rule + '}', l);
		}
		else//if (styleSheet.addRule)
		{
			styleSheet.addRule(selector, rule, l);
		}
	};

	var gravatarUrlPrefix = 'https:'==location.protocol ? 'https://secure' : 'http://www';
	gravatarOptions = (typeof gravatarOptions == 'object') ? gravatarOptions : {};
	gravatarOptions.size = gravatarOptions.size || 48; // 1 - 512
	gravatarOptions.rating = gravatarOptions.rating || 'PG'; // g | pg | r | x
	gravatarOptions.defaultImage = gravatarOptions.defaultImage || ''; // 404 | mm | identicon | monsterid | wavatar
	gravatarOptions.propertyUsed = gravatarOptions.propertyUsed || 'background-image'; // content | background-image (note: if you use background-image, don't forget to add content: "" !)
	gravatarOptions.addDimensions = gravatarOptions.addDimensions != undefined ? gravatarOptions.addDimensions : true;

	// since we can't manipulate pseudo element (so their content), we insert css rules foreach gravatar.
	var time = new Date().getTime();
	function addElementRule(element, rule, pseudo)
	{
		pseudo = pseudo ? ':' + pseudo : '';
		var id = element.getAttribute('id');
		if (!id)
		{
			id = 'gravatar' + ++time;
			element.setAttribute('id', id);
		}
		addCssRule('#' + id + pseudo, rule);
	}

	function initGravatars()
	{
		var elements = [null, 'before', 'after'];
		for(var p = 0; p < elements.length; p++)
		{
			var element = elements[p]!= null ? '-' + elements[p] : '';
			var gravatarElements = document.getElementsByClassName('gravatar' + element);
			var length = gravatarElements.length;
			if (length)
			{
				// testing on the first element if we need md5 lib,
				// if data-email-md5 is present no need to compute mdf5 using js
				// if we are using md5 support.
				if (!gravatarElements[0].getAttribute('data-email-md5'))
				{
					if (typeof MD5 == 'undefined')
					{
						throw Exception('gravatar.js require MD5 library');
					}
					else
					{
						// regex to transform obfusced email to real email
						var emailRegexs= {
							'@' : /(\[|\()\s?(at)\s?(\)|\])/,
							'.': /(\[|\()\s?(dot)\s?(\)|\])/
						};
						for(var i=0; i<length; i++)
						{
							gravatarElements[i].setAttribute('data-email-md5', MD5(gravatarElements[i].getAttribute('data-email').replace(emailRegexs['@'], '@').replace(emailRegexs['.'], '.')));
						}
					}
				}

				for(var i=0; i<length; i++)
				{
					var emailMd5 = gravatarElements[i].getAttribute('data-email-md5');
					var gravatarUrl = gravatarUrlPrefix + '.gravatar.com/avatar/' + emailMd5 + '.png';
					var size = gravatarElements[i].getAttribute('data-gravatar-size') || gravatarOptions.size;
					gravatarUrl += '?s=' + size;
					gravatarUrl += '&r=' + (gravatarElements[i].getAttribute('data-gravatar-rating') || gravatarOptions.rating);
					gravatarUrl += '&d=' + (gravatarElements[i].getAttribute('data-gravatar-defaultImage') || gravatarOptions.defaultImage);
					addElementRule(gravatarElements[i],
						gravatarOptions.propertyUsed + ': url(' + gravatarUrl + ');'
						+ (gravatarOptions.addDimensions ? 'width: ' + size + 'px;' + 'height: ' + size + 'px' : '')
					, elements[p]);
				}
			}
		}
	}

	window.addEventListener('load', initGravatars, false);

})();