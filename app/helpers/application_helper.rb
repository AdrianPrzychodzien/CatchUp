module ApplicationHelper
    def admin_routes
        # "application", "admin", 
        blacklist = ["registrations", "sessions"]
    
        namespace = "teacher"
        routes = Dir[Rails.root.join("app/controllers/#{namespace}/*_controller.rb")]
          .map { |path|
                   path =~ /(\w+)_controller.rb/
                   $1
                 }
          .compact
          .delete_if { |x| blacklist.include?(x) }
    end
end
