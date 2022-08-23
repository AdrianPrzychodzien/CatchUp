if Rails.env.production?
    CARD_INTERVAL = 7200
else
    CARD_INTERVAL = 20
end
