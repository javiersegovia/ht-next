puts "Creating Users..."
(1..9000).map {|position|
  puts "User #{position}"
  FactoryBot.create(:user)}

puts "Ready bye..."