module ApplicationHelper
  def admin_routes
    blacklist = ["registrations", "sessions"]

    Dir[Rails.root.join("app/controllers/#{@namespace}/*_controller.rb")]
      .map { |path|
      path =~ /(\w+)_controller.rb/
      $1
    }
      .compact
      .delete_if { |x| blacklist.include?(x) }
  end

  def get_resource_title_for_admin(resource)
    if resource.instance_of?(Teacher) || resource.instance_of?(Student) || resource.instance_of?(Manager)
      resource.email
    else
      resource.instance_of?(Group) || resource.instance_of?(Deck) ? resource.name : ""
    end
  end

  def is_editable(resource)
    resource.instance_of?(::Deck) || resource.instance_of?(::Student) || resource.instance_of?(::Group)
  end

  def manager_namespace?
    request.parameters["controller"].include?("manager/")
  end

  def teacher_namespace?
    request.parameters["controller"].include?("teacher/")
  end
end
