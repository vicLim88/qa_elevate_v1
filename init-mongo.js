// Connect to the admin database
db = db.getSiblingDB("admin");

// Check if root user exists before creating
if (!db.getUser("root")) {
    db.createUser({
        user: "root",
        pwd: "rootpassword",
        roles: [{ role: "root", db: "admin" }]
    });
    print("✅ Root user successfully created!");
} else {
    print("⚠️ Root user already exists. Skipping creation.");
}

// Switch to the ai_vision database
db = db.getSiblingDB("ai_vision");

// Check if ai_vision user exists before creating
if (!db.getUser("admin")) {
    db.createUser({
        user: "admin",
        pwd: "password",
        roles: [
            { role: "readWrite", db: "ai_vision" },
            { role: "dbAdmin", db: "ai_vision" }
        ]
    });
    print("✅ ai_vision user successfully created!");
} else {
    print("⚠️ ai_vision user already exists. Skipping creation.");
}
