  # encoding: utf-8
  require 'sinatra'
  require 'rubygems'
  require 'data_mapper' 
  require 'net/http'
  require 'nokogiri'
  require 'open-uri'

  DataMapper.setup(:default, ENV['DATABASE_URL'] || 'postgres://grisha @localhost/gregkerzhner')

  class JensCounter
    include DataMapper::Resource
    property :id,                 Serial
    property :count_type, String  
    property :count,      Integer  
    property :count_date, DateTime
  end

  class JensRank
    include DataMapper::Resource
    property :id,                 Serial
    property :name, String  
    property :rank,      Integer  
    property :date, Date
    property :points, Integer
    property :type, String
  end

DataMapper.auto_upgrade!
get '/' do
  send_file "public/index.html"
end
get '/jensmonitor' do
  send_file "public/index.html"
end

get '/blog' do
  send_file "public/index.html"
end

get '/clients' do
  send_file "public/index.html"
end

get '/blogs' do
  content_type "application/json"
  send_file "public/blogs.json"
  
end

get '/countries' do
  content_type "application/json"
  send_file "public/world.json"
  
end

get '/instagram' do
  content_type "application/json"
  send_file "public/instagram.json"  
end

get '/projects' do
  content_type "application/json"
  send_file "public/works.json"
end

get '/intro' do
  content_type "application/json"
  send_file "public/intro.json"
end

get '/jenscounter' do
  content_type "application/json"

  if JensCounter.all(:count_date.gt => DateTime.new(DateTime.now.year, DateTime.now.month, DateTime.now.day, 0, 0, 0, 0)).length == 0

    url = URI.parse('http://www.8a.nu/news/AllNews.aspx')
    req = Net::HTTP::Get.new(url.path)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    ondra_count = res.body.scan(/Ondra/).length 
    jens_counter = JensCounter.new
    jens_counter.attributes = {count_type: "Ondra", count: ondra_count, count_date: Time.now}
    jens_counter.save
  end
  JensCounter.all.to_json
end

get '/jensrank' do
  get_rank_from_8a('http://www.8a.nu/Scorecard/Ranking.aspx?CountryCode=USA',"us_route", "GridViewRankingRoute")
  JensRank.all(type:"us_route").to_json
end

get "/usboulder" do
  get_rank_from_8a('http://www.8a.nu/Scorecard/Ranking.aspx?CountryCode=USA',"us_boulder", "GridViewBoulder")
  JensRank.all(type:"us_boulder").to_json
end

def get_rank_from_8a(url,type, chart_id)
  if JensRank.all(:date => Date.today, type: type).length == 0
    doc = Nokogiri::HTML(open(url))
    xpath = '//*[@id="'+chart_id+'"]/tr'
    rows = doc.xpath(xpath)
    rows.each do |row|
      if (row.at_xpath("td[1]") and row.at_xpath("td[5]") and row.at_xpath("td[1]").text.to_i < 21)
        puts row.at_xpath("td[1]").text + " : "+ row.at_xpath("td[5]").text + " : "+ row.at_xpath("td[3]").text
        rank = row.at_xpath("td[1]").text.to_i
        JensRank.create(type: type, name: row.at_xpath("td[5]").text, rank: rank, date: Date.today, points: row.at_xpath("td[3]").text.gsub(/\p{^Alnum}/, '').to_i)
      end
    end
  end
end