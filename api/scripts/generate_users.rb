puts "Creating Users..."

Benchmark.bm(7) do |x|
  x.report("times:") { Parallel.each( (1..10000) ) do |position|  puts "User #{position}";  FactoryBot.create(:user); end }
  #x.report("times:") { (1..50000).each { |pos| puts "User #{pos}"; FactoryBot.create(:user); } }
end

puts "Ready bye..."