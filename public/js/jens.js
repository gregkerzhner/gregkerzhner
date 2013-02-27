window.JensCounter = Backbone.Model.extend({
    d3DataPoint:function(){
        var date = this.get("count_date");
        return {count_date: date.substring(0,date.indexOf("T")), count: this.get("count")}
    }
});
window.Jenses = Backbone.Collection.extend({
    model: JensCounter,
    url: "/jenscounter",
    byType: function(count_type) {
        filtered = this.filter(function(jensCount) {
            return jensCount.get("count_type") === count_type;
        });
        var d3DataPoints = [];
        for(var i = 0; i<filtered.length;i++){
            d3DataPoints.push(filtered[i].d3DataPoint());
        }
        return d3DataPoints;
    }
});
window.jenses = new Jenses();
jenses.fetch({
    success: function(m,r){
          console.log("success");
          console.log(r); // => 2 (collection have been populated)
    }
});

$(document).ready(function(){
    window.JensView = Backbone.View.extend({
        el: "#main",
        collection: window.jenses,
        initialize: function(){
            _.bindAll(this, 'render');
            this.template = _.template($("#jens-template").html());
            this.collection.bind("reset", _.bind(this.drawGraph, this));
            this.render();
        },
        render: function(){
            $(this.el).empty();
            $(this.el).append(this.template());
            return this;
        },
        drawGraph:function(){
            var x, y, width, height, data;
            var data = window.jenses.byType("Ondra");
            console.log(data);

            var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = 700 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            var svg = d3.select(".ondra-counter").append("svg")
                                    .attr("width", width)
                                    .attr("height", height)
                                    .attr("color","black");
            var x = d3.time.scale().range([30, width]);
            var y = d3.scale.linear().range([height-20, 0]);

            var xAxis = d3.svg.axis().scale(x).orient("bottom");
            var yAxis = d3.svg.axis().scale(y).orient("left");

            var parseDate = d3.time.format("%Y-%m-%d").parse;
            data = window.jenses.models.map( function (d) {
                return { 
                    count: d.attributes.count,
                    date: parseDate(d.attributes.count_date.substring(0,d.attributes.count_date.indexOf("T"))),
                    count_type: d.attributes.count_type
                }; 
            });

            var jensCounts = d3.nest().key(function(d) { return d.count_type; }).entries(data);

            x.domain(d3.extent(data, function(d) { return d.date; }));          
            y.domain([
                d3.min(jensCounts, function(c) { return d3.min(c.values, function(v) { return v.count; }); }),
                d3.max(jensCounts, function(c) { return d3.max(c.values, function(v) { return v.count; }); })
            ]);
            var color = d3.scale.category10()
                .domain(d3.keys(data[0]).filter(function(key) { return key === "count_type"; }));
            var line = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.count); });
            var jensCount = svg.selectAll(".jens-count")
                .data(jensCounts)
                .enter().append("g")
                .attr("class", "jens-count");

            jensCount.append("path")
                .attr("class", "line")
                .attr("d", function(d) { return line(d.values); })
                .style("stroke", function(d) { return color(d.key); });

            jensCount.append("text")
                .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.patients) + ")"; })
                .attr("x", 3)
                .attr("dy", ".35em")
                .text(function(d) { return d.value.count_type; });
         

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height-20) + ")")
                .call(xAxis);

             svg.append("g")   
                .attr("class", "y axis")
                .attr("transform","translate(40,0)")
                .call(yAxis);

        }
    });
});