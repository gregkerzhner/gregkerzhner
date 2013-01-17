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
			$(this.el).html(this.template(this.model.toJSON()));
			for(var i = 0; i<16;i++){
				var square = function(ctx) {
			    	ctx.fillStyle = "red";
			    	ctx.fillRect(Math.floor((Math.random()*300)+1), Math.floor((Math.random()*300)+1), 80, 80);
				}
				$g('introCanvas').size(400, 600).add(square);
			}

			$g('introCanvas').size(400, 600).add({
			    theta: 0, 
			    draw: function(ctx) {
			        ctx.save();
			        ctx.translate(50, 50);
			        ctx.rotate(this.theta);
			        ctx.fillStyle = "#ada";
			        ctx.fillRect(-32, -32, 64, 64);
			        ctx.restore();
			        this.theta += Math.PI / 120;
			    }
			}).play(16);

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

