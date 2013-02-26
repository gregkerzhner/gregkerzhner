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
jenses.fetch();

$(document).ready(function(){
    window.JensView = Backbone.View.extend({
        el: "#main",
        collection: window.jens,
        initialize: function(){
            _.bindAll(this, 'render');
            this.template = _.template($("#jens-template").html());
            this.render();
        },
        render: function(){
            var x, y, width, height, data;
            $(this.el).empty();
            $(this.el).append(this.template());

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

            data.forEach(function(d) {
                d.date = parseDate(d.count_date);
            });

            x.domain(d3.extent(data, function(d) { return d.date; }));          
            y.domain(d3.extent(data, function(d) { return d.count; }));

            var line = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.count); });

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height-20) + ")")
                .call(xAxis);

             svg.append("g")         // Add the Y Axis
                .attr("class", "y axis")
                .attr("transform","translate(40,0)")
                .call(yAxis);

            svg.append("path")
                .datum(data)
                .attr("class", "line")
               .attr("d", line);
            return this;
        }
    });
});