profile_photos = [
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rd.com%2Flist%2Fonline-dating-profile-photos%2F&psig=AOvVaw2gh9lSTMK3GLads8lcvqd_&ust=1594329121877000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCO5JTJvuoCFQAAAAAdAAAAABAP",
  "https://lh3.googleusercontent.com/proxy/XOqB03PE_ijg1XQX8haQSK7sMaI2xnlN6aEhc8UrdCBeDxuQZtA7J0D_6BMUfygY7TQVvTN6jicwB9orb4e5Q1H1GY66s9h4ARyh5Rn85iHVYPTUncfypEoRh99XK5woKUMb"
]

current_state = [
  'applied',
  'preselected',
  'test',
  'interview',
  'deleted',
]

FactoryBot.define do
  factory :user do
    name                 { Faker::Name.name_with_middle }
    residence_city       { Faker::Nation.capital_city }
    affinity             { Faker::Number.within(range: 1..100) }
    profile_completed_at { Faker::Number.within(range: 1..100) }
    photo_path           { profile_photos[rand(0...3)] }
    calification         { Faker::Number.within(range: 1...5) }
    current_state        { current_state[rand(0..4)] }
  end
end