/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    let collection = new Collection({
        type: "auth",
        name: "staff",
        listRule: "@request.auth.collectionName = 'staff' || @request.auth.role = 'admin'",
        viewRule: "@request.auth.id = id || @request.auth.role = 'admin'",
        createRule: null,
        updateRule: "@request.auth.role = 'admin'",
        deleteRule: "@request.auth.role = 'admin'",
        authRule: "",
        fields: [
        {
                "hidden": false,
                "id": "text4918849451",
                "name": "name",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": false,
                "type": "text",
                "autogeneratePattern": "",
                "max": 0,
                "min": 0,
                "pattern": ""
        },
        {
                "hidden": false,
                "id": "bool1502379834",
                "name": "view_bookings",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "bool"
        },
        {
                "hidden": false,
                "id": "bool4753878631",
                "name": "confirm_bookings",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "bool"
        },
        {
                "hidden": false,
                "id": "bool1120955321",
                "name": "manage_hotels",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "bool"
        },
        {
                "hidden": false,
                "id": "bool6469660897",
                "name": "manage_safaris",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "bool"
        },
        {
                "hidden": false,
                "id": "bool2048179630",
                "name": "manage_buses",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "bool"
        },
        {
                "hidden": false,
                "id": "bool7603628719",
                "name": "manage_limousines",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "bool"
        },
        {
                "hidden": false,
                "id": "bool6524829766",
                "name": "manage_staff",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "bool"
        },
        {
                "hidden": false,
                "id": "bool0007751080",
                "name": "view_reports",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "bool"
        }
],
        authAlert: { enabled: false },
    })

    try {
        app.save(collection)
    } catch (e) {
        if (e.message.includes("Collection name must be unique")) {
            console.log("Collection already exists, skipping")
            return
        }
        throw e
    }
}, (app) => {
    try {
        let collection = app.findCollectionByNameOrId("staff")
        app.delete(collection)
    } catch (e) {
        if (e.message.includes("no rows in result set")) {
            console.log("Collection not found, skipping revert");
            return;
        }
        throw e;
    }
})
