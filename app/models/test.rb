class Test < ActiveRecord::Base
  has_one :answer_group, :dependent => :destroy
end
