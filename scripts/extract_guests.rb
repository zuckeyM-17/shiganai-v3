require 'csv'

regex = /sp[\d]{1,2}[\D]?-([\d\D]+)\n/

list = []
episode_list = []
CSV.foreach('./scripts/specials.csv', headers: true) do |data|
  episode_list << data.to_s
  if data.to_s.match(regex)
    list << data.to_s.match(regex)[1]
  else
    list << data.to_s
  end
end

uniq_list = list.uniq

uniq_list.each do |guest|
  File.open("./_guests/#{guest}.md", 'w') do |file|
    content = <<~TEXT
      ---
      name: #{guest}
      url: https://twitter.com/#{guest}?lang=ja
      img: #{guest}.png
      episodes:
    TEXT
    file.puts content
    episode_list.each do |ep|
      if ep.include?(guest)
        file.puts "  - #{ep}"
      end
    end

    file.puts '---'
  end
end 