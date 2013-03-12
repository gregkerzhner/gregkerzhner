window.JensCounter = Backbone.Model.extend({
    d3DataPoint:function(){
        var date = this.get("count_date");
        return {count_date: date.substring(0,date.indexOf("T")), count: this.get("count")}
    }
});
window.Jenses = Backbone.Collection.extend({
    model: JensCounter,
    url: "/jenscounter"

});
window.Rank = Backbone.Model.extend({

})
window.Ranks = Backbone.Collection.extend({
    model: Rank,
    url: "/jensrank"
})
window.USBoulderRanks = Backbone.Collection.extend({
    model: Rank,
    url: "/usboulder"
});
window.jenses = new Jenses();
window.ranks = new Ranks();
window.usBoulders = new USBoulderRanks();
window.LineGraph = function(config){
    this.config = config;    
}
window.LineGraph.prototype.draw = function(){
    var config = this.config;
    $(".loader").hide();
    var x, y, width, height, data;
    var margin = {top: 60, right: 250, bottom: 60, left: 60},
        width = 900 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    var svg = d3.select(".ondra-counter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");
    if(config.yTickValues){
        yAxis.tickValues(config.yTickValues);
    }
    xAxis.ticks(d3.time.days, 3);
    var parseDate = d3.time.format("%Y-%m-%d").parse;
    data = config.data;
    console.log(data);
    var jensCounts = d3.nest().key(function(d) { return d[config.name]; }).entries(data);
    x.domain(d3.extent(data, function(d) { return d[config.xDataPoint]; }));          
    y.domain([
        d3.min(jensCounts, function(c) { return d3.min(c.values, function(v) { return v[config.yDataPoint]; }); }),
        d3.max(jensCounts, function(c) { return d3.max(c.values, function(v) { return v[config.yDataPoint]; }); })
    ]);

    var color = d3.scale.category10()
        .domain(d3.keys(data[0]).filter(function(key) { return key === config.name; }));
    var line = d3.svg.line()
        .x(function(d) { return x(d[config.xDataPoint]); })
        .y(function(d) { return y(d[config.yDataPoint]); });
        
    var jensCount = svg.selectAll(".jens-count")
        .data(jensCounts)
        .enter().append("g")
        .attr("class", "jens-count");
    var totalLength = width+700;
    var namesShown;
    var showNames = function(){
        if(!namesShown){
        jensCount.append("text")
        .datum(function(d) { return {name: d.key, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { 
            return "translate(" + x(d.value[config.xDataPoint]) + "," + y(d.value[config.yDataPoint]) + ")"; })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function(d) { return d.value[config.name]; });
        namesShown = true;
        }
    }
    jensCount.append("path")
        .attr("class", "line")
        .attr("d", function(d) {
         return line(d.values); })
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .each("end",showNames)
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0)
        .style("stroke", function(d) { return color(d.key); });
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate("+0+"," + height + ")")
           .call(xAxis);
     svg.append("g")   
        .attr("class", "y axis")
        .call(yAxis);
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", -20)
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")  
        .text(config.title);
}
$(document).ready(function(){
    window.JensView = Backbone.View.extend({
        el: "#main",
        collection: window.jenses,
        rankings: window.ranks,
        usBoulders: window.usBoulders,
        initialize: function(){
            _.bindAll(this, 'render');
            this.template = _.template($("#jens-template").html());
            this.collection.bind("reset", _.bind(this.drawJensCounter, this));
            this.rankings.bind("reset",  _.bind(this.drawRanking, this));
            this.usBoulders.bind("reset",  _.bind(this.drawUSBoulders, this));
            this.render();
        },
        render: function(){
            $(this.el).empty();
            $(this.el).append(this.template());
            jenses.fetch();
            ranks.fetch();
            usBoulders.fetch();
            return this;
        },
        drawUSBoulders: function(){
            $(".loader").hide();
            var parseDate = d3.time.format("%Y-%m-%d").parse;
            var config = {
                graphClass: ".ondra",
                yTickValues: [],
                data: window.usBoulders.models.map( function (d) {
                    return { 
                        rank: 20-d.attributes.rank,
                        date: parseDate(d.attributes.date),                    
                        name: d.attributes.name,
                        points: d.attributes.points
                    }; 
                }),
                xDataPoint:"date",
                yDataPoint:"rank",
                name: "name",
                title: "United States Boulder Rankings"
            }
            rankGraph = new window.LineGraph(config);
            rankGraph.draw();
        },
        drawRanking: function(){
            $(".loader").hide();
            var parseDate = d3.time.format("%Y-%m-%d").parse;
            var config = {
                graphClass: ".ondra",
                yTickValues: [],
                data: window.ranks.models.map( function (d) {
                    return { 
                        rank: 20-d.attributes.rank,
                        date: parseDate(d.attributes.date),                    
                        name: d.attributes.name,
                        points: d.attributes.points
                    }; 
                }),
                xDataPoint:"date",
                yDataPoint:"rank",
                name: "name",
                title: "United States Route Rankings"
            }
            rankGraph = new window.LineGraph(config);
            rankGraph.draw();
        },

        drawJensCounter:function(){
            $(".loader").hide();
            var parseDate = d3.time.format("%Y-%m-%d").parse;
            var config = {
                graphClass: ".ondra",
                   data:  window.jenses.models.map( function (d) {
                    return { 
                        count: d.attributes.count,
                        date: parseDate(d.attributes.count_date.substring(0,d.attributes.count_date.indexOf("T"))),
                        count_type: d.attributes.count_type
                    }; 
                    }),
                xDataPoint:"date",
                yDataPoint:"count",
                name: "count_type",
                title: "Number of front page news articles about Adam Ondra"
            }
            rankGraph = new window.LineGraph(config);
            rankGraph.draw();
        }
       
    });
});