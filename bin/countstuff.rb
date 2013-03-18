#!/usr/bin/env ruby
require "net/http"
require "uri"


uri = URI.parse("http://snackoverflow.net/#jensmonitor")

# Shortcut
response = Net::HTTP.get_response(uri)

# Will print response.body
Net::HTTP.get_print(uri)

# Full
http = Net::HTTP.new(uri.host, uri.port)
response = http.request(Net::HTTP::Get.new(uri.request_uri))