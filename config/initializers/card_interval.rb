if Rails.env.production?
    CARD_INTERVAL = 2
    CARD_TIME = "hours"
else
    CARD_INTERVAL = 20
    CARD_TIME = "seconds"
end
