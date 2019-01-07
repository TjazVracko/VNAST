define({ "api": [
  {
    "type": "get",
    "url": "/me",
    "title": "Request user info based on Auth token",
    "name": "GetSelf",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "privilege",
            "description": "<p>Privilege level of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"privilege\": [\"admin\"],\n     \"_id\": \"5bd989d81746683b2d8511f6\",\n     \"username\": \"admin\",\n     \"email\": \"admin.admin@admin.sem\",\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login existing user",
    "name": "LoginUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "auth",
            "description": "<p>Success of authentication.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web token used for authentication/authorisation.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"auth\": true,\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZDk4OWQ4MTc0NjY4M2IyZDg1MTFmNiIsImlhdCI6MTU0Njg2MDM5NCwiZXhwIjoxNTQ2OTQ2Nzk0fQ.IYaMtOVonFUHJOZ4ZvyhdE3diiMMlFMmXBG42MXQhwc\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "Log out the user",
    "name": "LogoutUser",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"auth\": false,\n     \"token\": null\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register new user",
    "name": "RegisterUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "'worker'",
              "'manager'",
              "'admin'"
            ],
            "optional": false,
            "field": "privilege",
            "description": "<p>Users privilege level.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Users Email.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "auth",
            "description": "<p>Success of authentication.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web token used for authentication/authorisation.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"auth\": true,\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZDk4OWQ4MTc0NjY4M2IyZDg1MTFmNiIsImlhdCI6MTU0Njg2MDM5NCwiZXhwIjoxNTQ2OTQ2Nzk0fQ.IYaMtOVonFUHJOZ4ZvyhdE3diiMMlFMmXBG42MXQhwc\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create new user",
    "name": "CreateUser",
    "group": "Users",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "'worker'",
              "'manager'",
              "'admin'"
            ],
            "optional": false,
            "field": "privilege",
            "description": "<p>Users privilege level.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Users Email.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "privilege",
            "description": "<p>Privilege level of new user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the new user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the new user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the new user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"privilege\": [\"manager\"],\n     \"_id\": \"5c3362d4b5302253e3ea2798\",\n     \"username\": \"manager23\",\n     \"email\": \"manager23@gmail.com\",\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/:userId",
    "title": "Delete user by ID",
    "name": "DeleteUser",
    "group": "Users",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path Param": [
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":userId",
            "description": "<p>The User ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"message\": \"User successfully deleted\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Request user list",
    "name": "GetUser",
    "group": "Users",
    "permission": [
      {
        "name": "worker"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User[]",
            "optional": false,
            "field": "users",
            "description": "<p>Array of user objects (see /users/:userId for details).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:userId",
    "title": "Request user by ID",
    "name": "GetUsers",
    "group": "Users",
    "permission": [
      {
        "name": "worker"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path Param": [
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":userId",
            "description": "<p>The User ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "privilege",
            "description": "<p>Privilege level of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"privilege\": [\"manager\"],\n     \"_id\": \"345678987654322345678\",\n     \"username\": \"klobasaman\",\n     \"email\": \"klobasaman@email.com\",\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/user/:userId",
    "title": "Update existing user",
    "name": "UpdateUser",
    "group": "Users",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Path Param": [
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":userId",
            "description": "<p>The User ID.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Users password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "'worker'",
              "'manager'",
              "'admin'"
            ],
            "optional": true,
            "field": "privilege",
            "description": "<p>Users privilege level.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Users Email.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "privilege",
            "description": "<p>Privilege level of the updated user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the updated user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the updated user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the updated user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Users"
  }
] });
