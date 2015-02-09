class AddPasswordDigestToUser < ActiveRecord::Migration
  def change
    add_column :users, :reset_password_digest, :string
  end
end
