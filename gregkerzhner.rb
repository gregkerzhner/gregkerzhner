
require 'sinatra'
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