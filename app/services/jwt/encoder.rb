module Jwt
  module Encoder
    module_function

    EXPIRES_AT = 7.days.from_now

    def call(student, response)
      @student = student
      @response = response

      create_refresh_token
      create_jwt
    end

    def create_jwt
      JsonWebToken.jwt_encode(student_id: @student.id)
    end

    def create_refresh_token
      @refresh_token = RefreshToken.create(student: @student, expires_at: EXPIRES_AT)
    end

    def set_jwt_cookie
      @response.set_cookie(
        :jwt,
        {
          value: @refresh_token.token,
          expires: EXPIRES_AT,
          # path: '/api/v1/auth',
          httponly: true
        }
      )
    end
  end
end
