puts ENV['USERNAME']

if ENV['USERNAME'] && ENV['PASSWORD']
  use Rack::Auth::Basic, "Restricted Area" do |username, password|
    [username, password] == [ENV['USERNAME'], ENV['PASSWORD']]
  end
end

require 'rack/jekyll'
require 'yaml'

run Rack::Jekyll.new
