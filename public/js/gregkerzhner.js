$(document).ready(function(){
	//window.coordinates = [{100,100}, {200,200}]
	fabric.RotatingSquare = fabric.util.createClass(fabric.Rect, {
	    type: 'RotatingSquare',

	    initialize: function (element, options) {
	        this.callSuper('initialize', element, options);
	        this.set('name', 'RotatingSquare');	       
	    },

	    toObject: function () {
	        return fabric.util.object.extend(this.callSuper('toObject'), { name: this.name });
	    },

	    rotated: function(){
	
	    	this.angle +=10;
	    	if(this.angle>360){
	    		this.angle = 0;
	    	}
	    }

	});

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
				var rect = new fabric.RotatingSquare({
			  	left: Math.floor(Math.random()*600),
			  	top: Math.floor(Math.random()*900),
			  	fill: 'red',
			  	width: 20,
			  	height: 20,
			  	angle: 45	
				});
				canvas.add(rect);
      	
			}
			setTimeout(function animate() {

			 canvas.forEachObject(
			 	function(obj){ 
			 		obj.rotate(obj.angle+10);
			 		//obj.angle = 180;
			 		console.log(obj.angle)
			 	}
			  );
			  canvas.renderAll();
			  setTimeout(animate, 10);
			}, 10);
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

