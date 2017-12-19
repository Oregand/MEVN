admin = db.getSiblingDB("admin")

admin.grantRolesToUser( "david", [ "root" , { role: "root", db: "admin" } ] )
