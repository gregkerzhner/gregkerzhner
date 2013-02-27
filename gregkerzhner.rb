require 'sinatra'
require 'rubygems'
require 'datamapper' 
require 'net/http'

DataMapper.setup(:default, 'postgres://grisha @localhost/gregkerzhner')

class JensCounter
  include DataMapper::Resource
  property :id,                 Serial
  property :count_type, String  
  property :count,      Integer  
  property :count_date, DateTime
end

DataMapper.auto_upgrade!
get '/' do
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

get '/jenscounter' do
  content_type "application/json"
  url = URI.parse('http://www.8a.nu/news/AllNews.aspx')
  req = Net::HTTP::Get.new(url.path)
  res = Net::HTTP.start(url.host, url.port) {|http|
    http.request(req)
  }
  ondra_count = res.body.scan(/Ondra/).length 
  jens_counter = JensCounter.new
  jens_counter.attributes = {count_type: "Ondra", count: ondra_count, count_date: Time.now}
  jens_counter.save

  record_count = res.body.scan(/record/).length 
  jens_counter = JensCounter.new
  jens_counter.attributes = {count_type: "Record", count:record_count, count_date: Time.now}
  jens_counter.save

end

