
class Message
  def self.not_found(record = 'record')
    "Sorry, #{record} not found :("
  end

  def self.invalid_credentials
    'Invalid credentials'
  end

  def self.invalid_token
    'Invalid token'
  end

  def self.missing_token
    'Missing token'
  end

  def self.unauthorized
    'Unauthorized'
  end

  def self.account_created
    'Account create successfully!'
  end

  def self.account_not_created
    'Account not created'
  end

  def self.expired_token
    'Your token has been expired. Please log in.'
  end


end
