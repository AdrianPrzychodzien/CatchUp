require "jwt"

module JsonWebToken
  extend ActiveSupport::Concern
  SECRET_KEY = Rails.application.secrets.secret_key_base

  def jwt_encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def jwt_decode(token)
    begin
      decoded = JWT.decode(token, SECRET_KEY)[0]
    rescue JWT::ExpiredSignature
      raise JWT::ExpiredSignature, "Signature has expired"
    rescue => error
      raise JWT::DecodeError, "Invalid token"
    end

    HashWithIndifferentAccess.new decoded
  end
end
