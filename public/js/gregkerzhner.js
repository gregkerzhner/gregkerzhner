$(document).ready(function(){
	window.coordinates = [[300,100], [295,120],[290,140],[287,160],[284,180],[283,200],[282,220],[283,240],[284,260],[290,280],[295,300],[305,315],[315,320],[325,322],
	[335,320],[340,315],[283,200],[283,200]];
	fabric.RotatingSquare = fabric.util.createClass(fabric.Rect, {
	    type: 'RotatingSquare',

	    initialize: function (element, options) {
	        this.callSuper('initialize', element, options);
	        this.set('name', 'RotatingSquare');	       
	    },

	    toObject: function () {
	        return fabric.util.object.extend(this.callSuper('toObject'), { name: this.name });
	    },

	    proximize: function(){
	    	this.top +=10;
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
		render: function(){;
			var canvas = new fabric.Canvas('introCanvas', { width: 800, height: 500 });
			for(var i = 0; i<window.coordinates.length; i++){
				var rect = new fabric.RotatingSquare({
			  	//left: Math.floor(Math.random()*600),
			  	//top: Math.floor(Math.random()*900),
			  	left: window.coordinates[i][0],
			  	top: window.coordinates[i][1],
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

