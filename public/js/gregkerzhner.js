 window.Blog = Backbone.Model.extend({
	setCurrent: function(){
		this.set({current: true});	
	}

});
window.Blogs = Backbone.Collection.extend({
	model: Blog,
	url: "/blogs",
	current: 1
});
window.blogs = new Blogs();
blogs.fetch({
	success: function(m,r){
          console.log("success");
          console.log(r); // => 2 (collection have been populated)
    },
	error: function(m,r){
	console.log("error");
    console.log(r.responseText);
}});

 window.Project = Backbone.Model.extend({


});

window.Projects = Backbone.Collection.extend({
	model: Project,
	url: "/projects"
	
});
window.projects = new Projects();
projects.fetch({
	success: function(m,r){
          console.log("success");
          console.log(r); // => 2 (collection have been populated)
    },
	error: function(m,r){
	console.log("error");
    console.log(r.responseText);
}});
$(document).ready(function(){
	window.coordinates=[[189,365],
		[43,404],
		[548,413],
		[441,341],
		[202,364],
		[81,384],
		[270,403],
		[392,330],
		[535,329],
		[40,358],
		[510,360],
		[450,325],
		[400,407],
		[368,346],
		[226,327],
		[151,395],
		[148,327],
		[36,385],
		[191,407],
		[360,334],
		[290,377],
		[532,367],
		[144,374],
		[406,320],
		[304,394],
		[116,323],
		[775,340],
		[125,325],
		[393,398],
		[477,324],
		[690,397],
		[668,385],
		[794,414],
		[600,331],
		[598,370],
		[69,386],
		[703,338],
		[53,332],
		[197,328],
		[359,372],
		[112,397],
		[360,367],
		[73,415],
		[684,337],
		[639,325],
		[456,408],
		[811,371],
		[508,405],
		[817,415],
		[635,382],
		[462,326],
		[84,406],
		[137,325],
		[261,387],
		[287,412],
		[637,337],
		[673,399],
		[751,339],
		[583,405],
		[178,356],
		[521,369],
		[218,362],
		[809,355],
		[692,349],
		[209,327],
		[147,383],
		[440,373],
		[118,351],
		[441,323],
		[649,369],
		[50,412],
		[541,354],
		[610,338],
		[719,358],
		[378,337],
		[857,421],
		[787,374],
		[274,326],
		[204,410],
		[771,375],
		[674,407],
		[153,343],
		[45,346],
		[512,335],
		[115,338],
		[117,363],
		[303,379],
		[689,369],
		[183,322],
		[359,386],
		[462,361],
		[38,372],
		[267,337],
		[385,380],
		[646,373],
		[690,378],
		[713,335],
		[835,382],
		[526,377],
		[851,363],
		[361,315],
		[445,408],
		[601,406],
		[357,352],
		[296,405],
		[372,372],
		[180,339],
		[588,333],
		[534,382],
		[225,410],
		[846,348],
		[440,358],
		[581,406],
		[510,391],
		[540,342],
		[512,323],
		[725,374],
		[151,408],
		[116,385],
		[133,355],
		[786,338],
		[179,387],
		[448,360],
		[355,395],
		[544,399],
		[756,409],
		[264,352],
		[260,371],
		[178,401],
		[388,390],
		[510,350],
		[232,363],
		[277,410],
		[685,356],
		[539,389],
		[179,367],
		[753,377],
		[114,372],
		[611,350],
		[814,402],
		[219,410],
		[85,390],
		[690,387],
		[578,330],
		[764,336],
		[112,405],
		[587,383],
		[478,407],
		[766,412],
		[727,400],
		[661,372],
		[133,366],
		[476,360],
		[60,418],
		[592,379],
		[572,406],
		[634,364],
		[846,374],
		[36,399],
		[755,367],
		[126,364],
		[831,339],
		[511,375],
		[759,376],
		[729,387],
		[813,387],
		[146,351],
		[66,323],
		[359,410],
		[404,411],
		[782,413],
		[284,321],
		[576,394],
		[639,355],
		[442,391],
		[633,395],
		[853,407],
		[749,349],
		[465,408],
		[180,377],
		[850,399],
		[839,387],
		[524,324],
		[634,404],
		[716,344],
		[756,393],
		[818,336],
		[605,359],
		[821,385]];
	
	window.navMenuSeed = [{id: 1, title: "home"},{id: 2,title: "blog"},{id: 3,title: "projects"},{id: 4,title: "jensmonitor"}];
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

		    if(this.top<350){
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
			  	left: Math.floor(Math.random()*800),
			  	top: Math.floor(Math.random()*500),
			  	finalLeft: window.coordinates[i][0],
			  	finalTop: window.coordinates[i][1],
			  	fill: '#'+Math.floor(Math.random()*16777215).toString(16),
			  	width: 10,
			  	height: 10,
			  	angle: 45	
				});
				canvas.add(rect);
      	
			}
			var animationCounter = 0;
			setTimeout(function animate() {
			 animationCounter++;
			 canvas.forEachObject(
			 	function(obj){ 			 	
			 		if(animationCounter>10 && animationCounter<30){
			 			obj.lightTheFuse(5);			
			 		}	
			 		else if(animationCounter>30 && animationCounter<130){
			 	 		obj.proximize();
			 	 	} else if(animationCounter>130){
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
			$("#introCanvas").remove();
			$(".canvas-container").remove();
			$("#container").css("height","100%");
			window.navMenuView = new NavMenuView();
			$(this.el).removeData().unbind();
			
		}
	});
	window.BlogView = Backbone.View.extend({
		el: "#main",
		collection: window.blogs,
		model: window.blogs.where({current: true}),
		events: {
      		'click .blog-nav-link': 'navigate'
    	},
		initialize: function(){
			_.bindAll(this, 'render');
			this.collection.bind('change', this.changeBlogs);
			this.template = _.template($("#blog-template").html());
			this.render();
		},
		render: function(){
			$(this.el).empty();
		    var currentModel = this.collection.where({current: true})[0];
		    $(this.el).append(this.template({blogs: this.collection.models, currentModel: currentModel}));
		    if(currentModel.attributes.animation_id>0){
		    	var animation = new window.animations[currentModel.attributes.animation_id]();
		    	animation.render();
		    }
		   
				
			return this;
		},
		navigate: function(e){
			var id = $(e.currentTarget).data("id");
			var item = this.collection.get(id);
			if(this.collection.where({current: true})[0] != item){
				$(".blog-nav-link").removeClass("rich");
				this.collection.each(function(model){model.set({current: false})})
				$(e.currentTarget).addClass("rich");
				item.set({current: true});
				this.render();
			}
		}
	})
	window.PortfolioView = Backbone.View.extend({
		el: "#main",
		events: {
      		'click .project-block': 'showProject'
    	},
		collection: window.projects,
		initialize: function(){
			_.bindAll(this, 'render');
			this.template = _.template($("#portfolio-template").html());
			this.render();
		},
		render: function(){
		  	$(this.el).empty();
			$(this.el).append(this.template({projects: this.collection.models}));
			return this;
		},
		showProject: function(e){
			var photoHeight;
			$(".project-list .project-block").removeClass("regular-sideline-block");
			$(".project-block img").addClass("hide");
			$(".project-display").empty();
			$(".project-display").removeClass("hide");
			$(".project-display").css("height","80%");
			$(".project-display").append($(e.currentTarget).clone());
			$(".project-display .project-block").removeClass("highlight");
			if(parseInt($("body").css("width"))<1000){
				$(".project-block").removeClass("responsive-sideline-block");
				$(".project-display .project-block").addClass("block-on-display-responsive");
				$(".project-display .project-block .project-description").removeClass("hide");
				$(".project-list .project-block").addClass("responsive-sideline-block");
			}
			else{
				$(".project-list .project-block").addClass("regular-sideline-block");
				$(".project-display .project-block").addClass("block-on-display");
				$(".project-display .project-block .project-description").removeClass("hide");
				$($(".project-display .project-block").find("img")).removeClass("hide");
				$($(".project-display .project-block").find("img")).css("height","80%");
				photoHeight = parseInt($($(".project-display .project-block").find("img")).css("height"))
				$($(".project-display .project-block").find("img")).css("width",(photoHeight*1.5)+"px");
			}
		
		}
	});
	window.HomeView = Backbone.View.extend({
		el: "#main",
		initialize: function(){
			_.bindAll(this, 'render');
			this.template = _.template($("#home-template").html());
			this.render();
		},
		render: function(){
		  $(this.el).empty();
			$(this.el).append(this.template());
			return this;
		}
	});
	window.NavMenuItem = Backbone.Model.extend({
		setCurrent: function(){
			this.set({current: true})
			if(this.get("title")==="blog"){
			  new BlogView();
			}
			else if(this.get("title") === "projects"){				
				new PortfolioView();
			}
			
			else  if(this.get("title") === "home"){
				new HomeView();
			}
			else if(this.get("title") === "jensmonitor"){
				new JensView();
			}
		}
	});
	window.NavMenuItems = Backbone.Collection.extend({
		model: NavMenuItem
	});
	window.NavMenuView = Backbone.View.extend({
		el: "#top-nav",
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
			if(this.collection.where({title: Backbone.history.fragment}).length>0){
				this.collection.where({title: Backbone.history.fragment})[0].setCurrent();
				this.render();
				$($("#nav-menu-link"+this.collection.where({title: Backbone.history.fragment})[0].id)).addClass("rich");
			}
			else{
				this.collection.models[0].setCurrent();		
				this.render();	
				$($(".nav-menu-link")[0]).addClass("rich");				
			}
			
			
		},
		render: function(){
			$(this.el).append(this.template({data: this.collection.models}));
		},
		navigate: function(e){
			$(".nav-menu-link").removeClass("rich");
			$(e.currentTarget).addClass("rich");
			var id = $(e.currentTarget).data("id");
			var item = this.collection.get(id);
			item.setCurrent();
		}
	});
	window.Gregkerzhner = Backbone.Router.extend({
	routes: {
	    '': 'home',	
	    'blog':  'home',
	    'projects': 'home' , 
	    'jensmonitor': 'home'  
	},

	initialize: function() {
	  intro = new Intro();
	  this.introView = new IntroView({model: intro});
	 },
	 home: function(){
	 	$("canvas").html(this.introView.render().el);
    	$(".canvas-container").css("margin", "0 auto");	 	
		}
	 }
	 );	
	window.App = new Gregkerzhner();
    Backbone.history.start();
});

