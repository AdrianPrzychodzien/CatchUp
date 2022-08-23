CARD_INTERVAL = if Rails.env.production?
  60
else
  20
end
