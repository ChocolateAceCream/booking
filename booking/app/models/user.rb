class User
  include Mongoid::Document
  field :name, type: String
  field :token, type: String
  field :email, type: String
  field :password_digest, type: String
end
