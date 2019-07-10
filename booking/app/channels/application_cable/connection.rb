module ApplicationCable
  class Connection < ActionCable::Connection::Base
      identified_by :current_user

      def connect
          self.current_user = find_verified_user
      end

      private
      def find_verified_user
          begin
			  token = request.params[:'access-token']
              if user = User.find_by(token: token)
                  user
              else
                  reject_unauthorized_connection
                  fail "failed auth"
              end

          end
      end

  end
end
