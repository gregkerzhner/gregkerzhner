$(document).ready(function(){
	window.coordinates = [[310,95],[320,93],[300,100], [295,120],[290,140],[287,160],[284,180],[283,200],[282,220],[283,240],[284,260],[290,280],[295,300],[305,315],[315,320],[325,322],
	[335,320],[340,315],[350,310],[360,300],[360,290],[355,280],[350,277],[340,277],
	//k
	[420,95],[420,115],[420,135],[420,155],[420,175],[420,195],[420,215],[420,235],[420,255],[420,275],[420,295],[420,315]
	,[430,210],[440,200],[450,190],[460,180],[470,170],[480,160],[490,150],[500,140],[510,130],[520,120],[530,110]
	,[430,210],[440,220],[450,230],[460,240],[470,250],[480,260],[490,270],[500,280],[510,290],[520,300],[530,310]


	];
	window.navMenuSeed = [{id: 1, title: "home"},{id: 2,title: "blog"}];
	fabric.RotatingSquare = fabric.util.createClass(fabric.Rect, {
	    type: 'RotatingSquare',

	    initialize: function (element, options) {
	        this.callSuper('initialize', element, options);
	        this.set('name', 'RotatingSquare');	  
	        this.set('finalTop',element.finalTop); 
	        this.set('finalLeft',element.finalLeft);     
	    },

	    toObject: function () {
	        return fabric.util.object.extend(this.callSuper('toObject'), { name: this.name });
	    },

	    proximize: function(){
	    	var leftDelta, topDelta;
			 	leftDelta = (this.left - this.finalLeft)/10;
			 	this.left = this.left - leftDelta;
			 	topDelta = (this.top - this.finalTop)/10;
			 	this.top = this.top - topDelta;
	    },

	    lightTheFuse: function(delta){
	    	this.left = this.left + Math.floor(Math.random()*delta) - Math.floor(Math.random()*delta);
	    	this.top = this.top + Math.floor(Math.random()*delta) - Math.floor(Math.random()*delta);
	    },
	    goAway: function(delta){
	    	if(this.left>350){
	    		this.left += Math.floor(Math.random()*delta);
	    	}
	    	else{
	    		this.left-= Math.floor(Math.random()*delta);
	    	}

	    	if(this.top<160){
	    		this.top -= Math.floor(Math.random()*delta);
	    	}
	    	else{
	    		this.top += Math.floor(Math.random()*delta);
	    	}
	    	
	    }

	});
	window.navMenuView;
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
			var that = this;
			var canvas = new fabric.Canvas('introCanvas', { width: 800, height: 500 });
			for(var i = 0; i<window.coordinates.length; i++){
				var rect = new fabric.RotatingSquare({
			  	left: Math.floor(Math.random()*900),
			  	top: Math.floor(Math.random()*600),
			  	finalLeft: window.coordinates[i][0],
			  	finalTop: window.coordinates[i][1],
			  	fill: '#59B249',
			  	width: 20,
			  	height: 20,
			  	angle: 45	
				});
				canvas.add(rect);
      	
			}
			var animationCounter = 0;
			setTimeout(function animate() {
			 animationCounter++;
			 canvas.forEachObject(
			 	function(obj){ 			 	
			 		if(animationCounter>100 && animationCounter<120){
			 			obj.lightTheFuse(5);			
			 		}	
			 		else if(animationCounter>120 && animationCounter<300){
			 	 		obj.proximize();
			 	 	} else if(animationCounter>300){
			 	 		obj.goAway(25);
			 	 	}
			 	}
			  );
			  canvas.renderAll();
			  if(animationCounter<0){
			
			  	setTimeout(animate, 10);
				}
			  else{
			  	that.finish();
			  }
			}, 10);
			return this;
		},

		finish: function(){
			$("#container").empty();
			window.navMenuView = new NavMenuView();
			
		}
	});
	window.NavMenuItem = Backbone.Model.extend({
		setCurrent: function(){
			this.set({current: true})
		}
	});
	window.NavMenuItems = Backbone.Collection.extend({
		model: NavMenuItem
	});
	window.NavMenuView = Backbone.View.extend({
		el: "#container",
		className: "nav-menu",
		events: {
      'click .nav-menu-link': 'navigate',
                
    },
		initialize: function(){
			_.bindAll(this, 'render');	
			this.template = _.template($("#menu-template").html());
			this.collection = new NavMenuItems();
			for (var i = 0; i<window.navMenuSeed.length; i++){
				var navMenuItem = new NavMenuItem(window.navMenuSeed[i]);
				this.collection.add(navMenuItem);
			}
			this.render();
		},
		render: function(){
			$(this.el).append(this.template({data: this.collection.models}));
			return this;
		},
		navigate: function(e){
			var id = $(e.currentTarget).data("id");
			var item = this.collection.get(id);
			item.setCurrent();
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
	 	$("canvas").html(this.introView.render().el);
    	$(".canvas-container").css("margin", "0 auto");	 	
	 }}
	 );	
	window.App = new Gregkerzhner();
    Backbone.history.start();
});

