$(document).ready(function(){
	(function($){

	window.Intro = Backbone.Model.extend({});
	window.IntroView = Backbone.View.extend({
		template: _.template($("#intro-template").html()),
		className:	"intro",
		tag: 'li',
		initialize: function(){
			_.bindAll(this, 'render');
			this.template = _.template($("#intro-template").html());

		},
		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));
            return this;
		}
	})
})(jQuery);
	var intro = new Intro()
	var introView = new IntroView({model: intro});
	$("#container").html(introView.render().el)

})
