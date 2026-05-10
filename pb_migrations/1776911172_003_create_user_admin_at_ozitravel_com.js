/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("staff");
  const record = new Record(collection);
  record.set("email", "admin@ozitravel.com");
  record.setPassword("OZIAdmin2026");
  record.set("name", "Admin");
  record.set("view_bookings", true);
  record.set("confirm_bookings", true);
  record.set("manage_hotels", true);
  record.set("manage_safaris", true);
  record.set("manage_buses", true);
  record.set("manage_limousines", true);
  record.set("manage_staff", true);
  record.set("view_reports", true);
  try {
    return app.save(record);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
      return;
    }
    throw e;
  }
}, (app) => {
  try {
    const record = app.findFirstRecordByData("staff", "email", "admin@ozitravel.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
