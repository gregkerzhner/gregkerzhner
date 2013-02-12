$(document).ready(function(){

    window.animations[2] =  Backbone.View.extend({
        template: _.template($("#instagram-map-template").html()),
        className:  "intro",
        tag: 'li',
        el: ".blog-main",
        initialize: function(){
            _.bindAll(this, 'render');
            this.template = _.template($("#instagram-map-template").html());

        },
        render: function(){
            var that = this;
            //var countriesData =  var path = d3.geo.path().projection(countriesData);
            $(this.el).empty();
            $(this.el).append(this.template());
            d3.json(
            "/countries",
            function (json) {

    

            var width = 960,height = 1160;

            var svg = d3.select(".blog-main").append("svg")
            .attr("width", width)
            .attr("height", height);

            //create geo.path object, set the projection to merator bring it to the svg-viewport
            var path = d3.geo.path()
                .projection(d3.geo.mercator()
                .scale(900).translate([500, 500])
                );

            //draw svg lines of the boundries
            svg.append("g")
                .attr("class", "black")
                .selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path);
            })


        }


    });


});