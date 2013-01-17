$(document).ready(function(){
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
			//$(this.el).html(this.template(this.model.toJSON()));
			var canvas = new fabric.Canvas('introCanvas', { width: 900, height: 600 });
			for(var i = 0; i<200; i++){
				var rect = new fabric.Rect({
			  	left: Math.floor(Math.random()*600),
			  	top: Math.floor(Math.random()*900),
			  	fill: 'red',
			  	width: 20,
			  	height: 20
				});
				canvas.add(rect);
      	
			}
			return this;
		}
	});
	
	window.Gregkerzhner = Backbone.Router.extend({
	routes: {
	    '': 'home',	   
	},

	initialize: function() {
		intro = new Intro();
	  this.introView = new IntroView({model: intro});		
	 },
	 home: function(){
	 	$("canvas").html(this.introView.render().el)

	 }}
	 );	
	window.App = new Gregkerzhner();
    Backbone.history.start();
});

