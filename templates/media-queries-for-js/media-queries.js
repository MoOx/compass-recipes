(function(){
	var Recipes = window.Recipes || {};

	Recipes.MediaQueries = {

		current: null,

		getCurrent: function ()
		{
			return window.getComputedStyle(document.body,':after').getPropertyValue('content');
		},

		set: function ()
		{
			Recipes.MediaQueries.current = Recipes.MediaQueries.getCurrent();
		}
	}

	window.Recipes = Recipes;
	window.addEventListener('resize', Recipes.MediaQueries.set, false);
})();