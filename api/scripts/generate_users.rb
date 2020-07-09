puts "Creating Users..."
(1..1000).map {|position|
  puts "User #{position}"
  FactoryBot.create(:user)}

puts "Rady bye.. :3"