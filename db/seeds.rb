puts "Creating example organization..."

unless Organization.find_by(name: "Sephora")
  Organization.create(
    name: "Sephora"
  )
end

puts "Creating example manager..."

unless Manager.find_by(email: "manager@example.com")
  Manager.create(
    email: "manager@example.com",
    password: "123123",
    password_confirmation: "123123",
    organization: Organization.find_by(name: "Sephora")
  )
end
