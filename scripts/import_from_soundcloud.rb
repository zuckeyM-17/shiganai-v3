require 'rss'
require 'nokogiri'

rss_url = 'http://feeds.soundcloud.com/users/soundcloud:users:294673416/sounds.rss'

url_regex = /http:\/\/feeds.soundcloud.com\/stream\/[\d]{9}-user-[\d]{9}-([a-zA-Z0-9\w\-]+).(mp3|m4a)/

rss = RSS::Parser.parse(rss_url)
rss.channel.items.each do |item|
  date = item.pubDate.strftime('%Y-%m-%d')
  episode_id = item.enclosure.url.match(url_regex)[1]
  file_path = "./_posts/#{date}-#{episode_id}.md"
  doc = Nokogiri::HTML.parse(item.description, nil, 'utf-8')

  File.open(file_path, 'w') do |file|
    content = <<~TEXT
      ---
      audio_file_path: #{item.enclosure.url}
      date: #{item.pubDate}
      description: #{doc.xpath('//p/span').children[0].to_s}
      title: '#{item.title}'
      layout: episode
      link: #{episode_id}
      ---

      #{item.description}
    TEXT

    file.puts content
  end
end