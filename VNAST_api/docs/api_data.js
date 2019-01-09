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
            "type": "ID",
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
    "url": "/groups/:groupId/chats/:chatId",
    "title": "Add message to chat",
    "name": "AddMessageToChat",
    "group": "Chats",
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
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
          },
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":chatId",
            "description": "<p>The Chat ID.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Message content.</p>"
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
            "field": "participants",
            "description": "<p>Array of User objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "Message[]",
            "optional": false,
            "field": "messages",
            "description": "<p>Array of Message objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the chat.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this task was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_group",
            "description": "<p>ID of group chat is assigned to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n    \"participants\": [\n        \"5bdb76f8cfe3c92dac94ff6a\",\n        \"5bdb6eb4112b2538b0921dd0\",\n        \"5bdb6eb4112b2538b0921dd0\"\n    ],\n    \"messages\": [\n        \"5c361bed2a2e1327847431f2\"\n    ],\n    \"_id\": \"5c361ac3082a1e0bd091fdc0\",\n    \"created_date\": \"2019-01-09T16:01:07.822Z\",\n    \"assigned_to_group\": \"5bfdaeef4d24193bd4fbef16\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "post",
    "url": "/chats/:chatId",
    "title": "Add message to chat",
    "name": "AddMessageToChat",
    "group": "Chats",
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
            "field": ":chatId",
            "description": "<p>The Chat ID.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Message content.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n    \"participants\": [\n        \"5bdb6eb4112b2538b0921dd0\",\n        \"5bdb7af880d78818b83bb534\"\n    ],\n    \"messages\": [\n        \"5c3618c35046b838886d8e16\"\n    ],\n    \"_id\": \"5c36156486166c2b4cb556e3\",\n    \"created_date\": \"2019-01-09T15:38:12.234Z\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "post",
    "url": "/chats",
    "title": "Create new chat",
    "name": "CreateChat",
    "group": "Chats",
    "permission": [
      {
        "name": "worker"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of user creating a chat with</p>"
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
            "field": "participants",
            "description": "<p>Array of User objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "Message[]",
            "optional": false,
            "field": "messages",
            "description": "<p>Array of Message objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the new chat.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this task was created.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n    \"participants\": [\n        \"5bdb6eb4112b2538b0921dd0\",\n        \"5bdb7af880d78818b83bb534\"\n    ],\n    \"messages\": [],\n    \"_id\": \"5c36156486166c2b4cb556e3\",\n    \"created_date\": \"2019-01-09T15:38:12.234Z\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "post",
    "url": "/groups/:groupId/chats",
    "title": "Create new group chat",
    "name": "CreateGroupChat",
    "group": "Chats",
    "permission": [
      {
        "name": "manager"
      }
    ],
    "parameter": {
      "fields": {
        "Path Param": [
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
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
            "field": "participants",
            "description": "<p>Array of User objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "Message[]",
            "optional": false,
            "field": "messages",
            "description": "<p>Array of Message objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the new chat.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this task was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_group",
            "description": "<p>ID of group chat is assigned to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "    {\n        \"participants\": [\n            \"5bdb76f8cfe3c92dac94ff6a\",\n            \"5bdb6eb4112b2538b0921dd0\"\n        ],\n        \"messages\": [],\n        \"_id\": \"5c361ac3082a1e0bd091fdc0\",\n        \"created_date\": \"2019-01-09T16:01:07.822Z\",\n        \"assigned_to_group\": \"5bfdaeef4d24193bd4fbef16\",\n        \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "delete",
    "url": "/chats/:chatId",
    "title": "Delete chat by ID",
    "name": "DeleteChat",
    "group": "Chats",
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
            "type": "ID",
            "optional": false,
            "field": ":chatId",
            "description": "<p>The Chat ID.</p>"
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
          "content": "{\n    \"message\": \"Chat successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "delete",
    "url": "/groups/:groupId/chats/:chatId",
    "title": "Delete group chat by ID",
    "name": "DeleteGroupChat",
    "group": "Chats",
    "permission": [
      {
        "name": "manager"
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
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
          },
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":chatId",
            "description": "<p>The Chat ID.</p>"
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
          "content": "{\n    \"message\": \"Chat successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "get",
    "url": "/chats",
    "title": "Request chat list",
    "name": "GetChats",
    "group": "Chats",
    "permission": [
      {
        "name": "manager"
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
            "type": "Chat[]",
            "optional": false,
            "field": "chats",
            "description": "<p>Array of chat objects (see CreateChat for details).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "get",
    "url": "/groups/:groupId/chats/:chatId",
    "title": "Request messages assigned to group chat",
    "name": "GetGroupChatMessages",
    "group": "Chats",
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
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
          },
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":chatId",
            "description": "<p>The Chat ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Message[]",
            "optional": false,
            "field": "messages",
            "description": "<p>Array of message objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"_id\": \"5c361bed2a2e1327847431f2\",\n        \"created_date\": \"2019-01-09T16:06:05.220Z\",\n        \"content\": \"How is your work progressing?\",\n        \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n        \"__v\": 0\n    },\n    {\n        \"_id\": \"5c361cdb6e39c031c046baac\",\n        \"created_date\": \"2019-01-09T16:10:03.529Z\",\n        \"content\": \"We're behind schedule.\",\n        \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "get",
    "url": "/groups/:groupId/chats",
    "title": "Request chats assigned to group",
    "name": "GetGroupChats",
    "group": "Chats",
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
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Chat[]",
            "optional": false,
            "field": "messages",
            "description": "<p>Array of chat objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"participants\": [\n            \"5bdb76f8cfe3c92dac94ff6a\",\n            \"5bdb6eb4112b2538b0921dd0\"\n        ],\n        \"messages\": [],\n        \"_id\": \"5c361a2f5fb78f39f87fe954\",\n        \"created_date\": \"2019-01-09T15:58:39.761Z\",\n        \"assigned_to_group\": \"5bfdaeef4d24193bd4fbef16\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "get",
    "url": "/chats/:chatId",
    "title": "Request messages assigned to chat",
    "name": "GetMessages",
    "group": "Chats",
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
            "field": ":chatId",
            "description": "<p>The Chat ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Message[]",
            "optional": false,
            "field": "messages",
            "description": "<p>Array of message objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"_id\": \"5c3618c35046b838886d8e16\",\n        \"created_date\": \"2019-01-09T15:52:35.259Z\",\n        \"content\": \"hello this is my first msg\",\n        \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "get",
    "url": "/chats/get/memberin",
    "title": "Get chats participating in",
    "name": "GetMyChats",
    "group": "Chats",
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
            "type": "Chat[]",
            "optional": false,
            "field": "chats",
            "description": "<p>Chats that are assigned to the user corresponding to the JWT sent in the header</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"participants\": [\n            \"5bdb6eb4112b2538b0921dd0\",\n            null\n        ],\n        \"messages\": [],\n        \"_id\": \"5bff13fe0efecf1ec47c1fda\",\n        \"created_date\": \"2018-11-28T22:17:34.256Z\",\n        \"__v\": 0\n    },\n    {\n        \"participants\": [\n            \"5bdb6eb4112b2538b0921dd0\",\n            \"5bdb7af880d78818b83bb534\"\n        ],\n        \"messages\": [],\n        \"_id\": \"5c36156486166c2b4cb556e3\",\n        \"created_date\": \"2019-01-09T15:38:12.234Z\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Chats"
  },
  {
    "type": "post",
    "url": "/tasks/:taskId/comments",
    "title": "Create comment",
    "name": "CreateComment",
    "group": "Comments",
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
            "field": ":taskId",
            "description": "<p>The Task ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the comment.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content of the comment.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this group was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of group creator.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_task",
            "description": "<p>ID of group chat is assigned to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example: ",
          "content": "{\n    \"_id\": \"5c361e5aa784c82e4cfc5b38\",\n    \"content\": \"What do we even have to do?\",\n    \"created_date\": \"2019-01-09T16:16:26.860Z\",\n    \"assigned_to_task\": \"5bdc985fc72fcf3c6c1446ff\",\n    \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Comments"
  },
  {
    "type": "delete",
    "url": "/tasks/:taskId/comments/:commentId",
    "title": "Delete comment by ID",
    "name": "DeleteComment",
    "group": "Comments",
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
            "field": ":taskId",
            "description": "<p>The Task ID.</p>"
          },
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":commentId",
            "description": "<p>The Comment ID.</p>"
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
          "content": "{\n    \"message\": \"Comment successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Comments"
  },
  {
    "type": "get",
    "url": "/tasks/:taskId/comments",
    "title": "Request comment list",
    "name": "GetComments",
    "group": "Comments",
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
            "type": "Comment[]",
            "optional": false,
            "field": "comments",
            "description": "<p>Array of Comment objects (see CreateComment for details).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"_id\": \"5bdc9f063efba42be0125ed9\",\n        \"content\": \"Hello, this is my comment!\",\n        \"created_date\": \"2018-11-02T19:01:26.268Z\",\n        \"assigned_to_task\": \"5bdc985fc72fcf3c6c1446ff\",\n        \"__v\": 0\n    },\n    {\n        \"_id\": \"5be3596414489e158c6be032\",\n        \"content\": \"Hello PURO, this is my fifth comment!\",\n        \"created_date\": \"2018-11-07T21:30:12.236Z\",\n        \"assigned_to_task\": \"5bdc985fc72fcf3c6c1446ff\",\n        \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n        \"__v\": 0\n    },\n    {\n        \"_id\": \"5c361e5aa784c82e4cfc5b38\",\n        \"content\": \"What do we even have to do?\",\n        \"created_date\": \"2019-01-09T16:16:26.860Z\",\n        \"assigned_to_task\": \"5bdc985fc72fcf3c6c1446ff\",\n        \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Comments"
  },
  {
    "type": "put",
    "url": "/tasks/:taskId/comments/:commentId",
    "title": "Update existing comment",
    "name": "UpdateComment",
    "group": "Comments",
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
            "field": ":taskId",
            "description": "<p>The Task ID.</p>"
          },
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":commentId",
            "description": "<p>The Comment ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the comment.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content of the comment.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this group was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of group creator.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_task",
            "description": "<p>ID of group chat is assigned to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example: ",
          "content": "{\n    \"_id\": \"5be3596414489e158c6be032\",\n    \"content\": \"Testing functionality of update comment\",\n    \"created_date\": \"2018-11-07T21:30:12.236Z\",\n    \"assigned_to_task\": \"5bdc985fc72fcf3c6c1446ff\",\n    \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Comments"
  },
  {
    "type": "post",
    "url": "/tasks/:taskId/files",
    "title": "Add Files to task",
    "name": "AddFiles",
    "group": "Files",
    "permission": [
      {
        "name": "manager"
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
            "type": "ID",
            "optional": false,
            "field": ":taskId",
            "description": "<p>The Task ID.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file1",
            "description": "<p>First file to upload</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file2",
            "description": "<p>Second file to upload</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file3...",
            "description": "<p>As many as you wish to upload (the key name is arbitrary, but they must be unique) (za uploadanje sem jaz v postmanu dal &quot;form-data&quot; (namesto raw ali x-www-form-encoded), ker le tak lahko file selectaš. pol pa key je lahko karkoli, zraven pa file)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Files",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>Priority level of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Task name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "time_limit",
            "description": "<p>DateTime limit for completing the task (ISO format).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this task was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of task creator.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_worker",
            "description": "<p>UserID of the worker this task is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_group",
            "description": "<p>GroupID of the group this task is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "File[]",
            "optional": false,
            "field": "documents",
            "description": "<p>Array of Files coresponding to this task.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"priority\": \"3\",\n     \"status\": [\n         \"pending\"\n     ],\n     \"_id\": \"5c338c89c8f17f1180c6c550\",\n     \"name\": \"Test task2\",\n     \"description\": \"novi test task2\",\n     \"time_limit\": \"2019-02-11T14:55:11.500Z\",\n     \"assigned_to_worker\": \"5bdecc3ec43948178a11f72e\",\n     \"created_date\": \"2019-01-07T17:29:45.081Z\",\n     \"created_by\": \"5bd989d81746683b2d8511f6\",\n     \"documents\": [\n         {\n             \"_id\": \"5c33932c7acbb2257154978c\",\n             \"mimetype\": \"image/png\",\n             \"originalname\": \"screenshot.png\",\n             \"filename\": \"9dfe737e6321345ffba310a1758250e7\",\n             \"path\": \"uploads/9dfe737e6321345ffba310a1758250e7\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/tasks/:taskId/files/:fileId",
    "title": "Delete a File",
    "name": "DeleteFile",
    "group": "Files",
    "permission": [
      {
        "name": "manager"
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
            "type": "ID",
            "optional": false,
            "field": ":taskId",
            "description": "<p>The Task ID.</p>"
          },
          {
            "group": "Path Param",
            "type": "ID",
            "optional": false,
            "field": ":fileId",
            "description": "<p>The File ID.</p>"
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
            "description": "<p>File Deletion success message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n    \"message\": \"FILENAME was deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Files"
  },
  {
    "type": "get",
    "url": "/tasks/:taskId/files/:fileId",
    "title": "Download a File",
    "name": "GetFile",
    "group": "Files",
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
            "type": "ID",
            "optional": false,
            "field": ":taskId",
            "description": "<p>The Task ID.</p>"
          },
          {
            "group": "Path Param",
            "type": "ID",
            "optional": false,
            "field": ":fileId",
            "description": "<p>The File ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "File-Binary",
            "optional": false,
            "field": "file",
            "description": "<p>File download starts - &quot;File download as attachment&quot; (dobiš binary al nekaj)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Files"
  },
  {
    "type": "post",
    "url": "/groups/:groupId/workers",
    "title": "Assign worker to group",
    "name": "AssignWorkerToGroup",
    "group": "Groups",
    "permission": [
      {
        "name": "manager"
      }
    ],
    "parameter": {
      "fields": {
        "Path Param": [
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of user being assigned to group.</p>"
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
            "field": "workers",
            "description": "<p>Array of user objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this group was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of group creator.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"workers\": [\n         \"5bfdaeef4d24193bd4fbef16\",\n         \"5bdb76f8cfe3c92dac94ff6a\",\n         \"5bdb6eb4112b2538b0921dd0\"\n     ],\n     \"_id\": \"5bfdaeef4d24193bd4fbef16\",\n     \"name\": \"group 1\",\n     \"created_date\": \"2018-11-27T20:54:07.355Z\",\n     \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n     \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "post",
    "url": "/groups",
    "title": "Create new group",
    "name": "CreateGroup",
    "group": "Groups",
    "permission": [
      {
        "name": "manager"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Group name.</p>"
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
            "field": "workers",
            "description": "<p>Array of user objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this group was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of group creator.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"workers\": [],\n     \"_id\": \"5c360423312a132b04536e9d\",\n     \"name\": \"Rups best group\",\n     \"created_date\": \"2019-01-09T14:24:35.793Z\",\n     \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n     \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "delete",
    "url": "/groups/:groupId",
    "title": "Delete group by ID",
    "name": "DeleteGroup",
    "group": "Groups",
    "permission": [
      {
        "name": "manager"
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
            "type": "ID",
            "optional": false,
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
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
          "content": "{\n     \"message\": \"Group successfully deleted\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "/groups",
    "title": "Request group list",
    "name": "GetGroups",
    "group": "Groups",
    "permission": [
      {
        "name": "manager"
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
            "type": "Group[]",
            "optional": false,
            "field": "groups",
            "description": "<p>Array of Group objects (see GetGroup for details).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "/groups/:groupId",
    "title": "Request group by ID",
    "name": "GetGroups",
    "group": "Groups",
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
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
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
            "field": "workers",
            "description": "<p>Array of user objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this group was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of group creator.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"workers\": [],\n     \"_id\": \"5c360423312a132b04536e9d\",\n     \"name\": \"Rups best group\",\n     \"created_date\": \"2019-01-09T14:24:35.793Z\",\n     \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n     \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "/groups/get/managerof",
    "title": "Get groups created by logged in manager",
    "name": "GetManagedGroups",
    "group": "Groups",
    "permission": [
      {
        "name": "manager"
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
            "type": "Group[]",
            "optional": false,
            "field": "groups",
            "description": "<p>Groups that were created by the manager corresponding to the JWT sent in the header</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"workers\": [\n            \"5bdecc3ec43948178a11f72e\"\n        ],\n        \"_id\": \"5bded1712f5a630c0079b6af\",\n        \"name\": \"Group 1\",\n        \"created_date\": \"2018-11-04T11:01:05.711Z\",\n        \"created_by\": \"5bdecc29c43948178a11f72d\",\n        \"__v\": 0\n    },\n    {\n        \"workers\": [\n            \"5bdecc3ec43948178a11f72e\",\n            \"5bd98ed313a4e140743dbce6\"\n        ],\n        \"_id\": \"5bded17d2f5a630c0079b6b0\",\n        \"name\": \"Najbolji Group\",\n        \"created_date\": \"2018-11-04T11:01:17.805Z\",\n        \"created_by\": \"5bdecc29c43948178a11f72d\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "/groups/get/memberin",
    "title": "Get groups logged in worker is member in",
    "name": "GetMyGroups",
    "group": "Groups",
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
            "type": "Group[]",
            "optional": false,
            "field": "groups",
            "description": "<p>Groups that are assigned to the worker corresponding to the JWT sent in the header</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"workers\": [\n            \"5bdecc3ec43948178a11f72e\"\n        ],\n        \"_id\": \"5bded1712f5a630c0079b6af\",\n        \"name\": \"Group 1\",\n        \"created_date\": \"2018-11-04T11:01:05.711Z\",\n        \"created_by\": \"5bdecc29c43948178a11f72d\",\n        \"__v\": 0\n    },\n    {\n        \"workers\": [\n            \"5bdecc3ec43948178a11f72e\",\n            \"5bd98ed313a4e140743dbce6\"\n        ],\n        \"_id\": \"5bded17d2f5a630c0079b6b0\",\n        \"name\": \"Najbolji Group\",\n        \"created_date\": \"2018-11-04T11:01:17.805Z\",\n        \"created_by\": \"5bdecc29c43948178a11f72d\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "/groups/:groupId/tasks",
    "title": "Request tasks assigned to group",
    "name": "GetTasks",
    "group": "Groups",
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
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Task[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>Array of task objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"priority\": \"2\",\n        \"status\": [\n            \"pending\"\n        ],\n        \"_id\": \"5bdc985fc72fcf3c6c1446ff\",\n        \"name\": \"First task\",\n        \"description\": \"First task description\",\n        \"documents\": [],\n        \"created_date\": \"2018-11-02T18:33:03.656Z\",\n        \"__v\": 0,\n        \"assigned_to_worker\": \"5bdb7af880d78818b83bb534\",\n        \"assigned_to_group\": \"5bfdaeef4d24193bd4fbef16\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "/groups/:groupId/workers",
    "title": "Request workers assigned to group",
    "name": "GetWorkers",
    "group": "Groups",
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
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
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
            "field": "workers",
            "description": "<p>Array of user objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"privilege\": [\n            \"admin\"\n        ],\n        \"_id\": \"5bdb6eb4112b2538b0921dd0\",\n        \"username\": \"admin\",\n        \"email\": \"bla@gmail.com\",\n        \"__v\": 0\n    },\n    {\n        \"privilege\": null,\n        \"_id\": \"5bdb76f8cfe3c92dac94ff6a\",\n        \"username\": \"worker4\",\n        \"__v\": 0,\n        \"email\": null\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "delete",
    "url": "/groups/:groupId/workers",
    "title": "Remove worker from group",
    "name": "RemoveWorkerFromGroup",
    "group": "Groups",
    "permission": [
      {
        "name": "manager"
      }
    ],
    "parameter": {
      "fields": {
        "Path Param": [
          {
            "group": "Path Param",
            "type": "String",
            "optional": false,
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of user being removed from group.</p>"
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
            "field": "workers",
            "description": "<p>Array of user objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this group was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of group creator.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"workers\": [\n         \"5bdb76f8cfe3c92dac94ff6a\",\n         \"5bdb6eb4112b2538b0921dd0\"\n     ],\n     \"_id\": \"5bfdaeef4d24193bd4fbef16\",\n     \"name\": \"group 1\",\n     \"created_date\": \"2018-11-27T20:54:07.355Z\",\n     \"created_by\": \"5bdb6eb4112b2538b0921dd0\",\n     \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "put",
    "url": "/groups/:groupId",
    "title": "Update existing group",
    "name": "UpdateGroup",
    "group": "Groups",
    "permission": [
      {
        "name": "manager"
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
            "type": "ID",
            "optional": false,
            "field": ":groupId",
            "description": "<p>The Group ID.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Group name.</p>"
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
            "field": "workers",
            "description": "<p>Array of user objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this group was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of group creator.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Groups"
  },
  {
    "type": "post",
    "url": "/tasks",
    "title": "Create new task",
    "name": "CreateTask",
    "group": "Tasks",
    "permission": [
      {
        "name": "manager"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Task name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1-5",
            "optional": false,
            "field": "priority",
            "description": "<p>Priority level of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "time_limit",
            "description": "<p>DateTime limit for completing the task (ISO format).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "'pending'",
              "'ongoing'",
              "'canceled'",
              "'completed'"
            ],
            "optional": false,
            "field": "status",
            "description": "<p>Status of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": true,
            "field": "assigned_to_worker",
            "description": "<p>UserID of the worker this task is assigned to.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": true,
            "field": "assigned_to_group",
            "description": "<p>GroupID of the group this task is assigned to.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"priority\": \"3\",\n     \"status\": [\n         \"pending\"\n     ],\n     \"_id\": \"5c338c89c8f17f1180c6c550\",\n     \"name\": \"Test task2\",\n     \"description\": \"novi test task2\",\n     \"time_limit\": \"2019-02-11T14:55:11.500Z\",\n     \"assigned_to_worker\": \"5bdecc3ec43948178a11f72e\",\n     \"created_date\": \"2019-01-07T17:29:45.081Z\",\n     \"created_by\": \"5bd989d81746683b2d8511f6\",\n     \"documents\": []\n }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>Priority level of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Task name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "time_limit",
            "description": "<p>DateTime limit for completing the task (ISO format).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this task was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of task creator.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_worker",
            "description": "<p>UserID of the worker this task is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_group",
            "description": "<p>GroupID of the group this task is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "File[]",
            "optional": false,
            "field": "documents",
            "description": "<p>Array of Files coresponding to this task.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "delete",
    "url": "/tasks/:taskId",
    "title": "Delete a task",
    "name": "DeleteTask",
    "group": "Tasks",
    "permission": [
      {
        "name": "manager"
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
            "type": "ID",
            "optional": false,
            "field": ":taskId",
            "description": "<p>The Task ID.</p>"
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
          "content": "{\n    \"message\": \"Task successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "get",
    "url": "/tasks/get/managedtasks",
    "title": "Get tasks created by logged in manager",
    "name": "GetManagedTasks",
    "group": "Tasks",
    "permission": [
      {
        "name": "manager"
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
            "type": "Task[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>Tasks that were created by the manager corresponding to the JWT sent in the header</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"priority\": \"4\",\n        \"status\": [\n            \"pending\"\n        ],\n        \"_id\": \"5c3389e2c8f17f1180c6c54e\",\n        \"name\": \"Test task\",\n        \"description\": \"novi test task\",\n        \"time_limit\": \"2019-02-11T14:55:11.500Z\",\n        \"documents\": [],\n        \"created_date\": \"2019-01-07T17:18:26.597Z\",\n        \"created_by\": \"5bd989d81746683b2d8511f6\",\n        \"__v\": 0\n    },\n    {\n        \"priority\": \"3\",\n        \"status\": [\n            \"pending\"\n        ],\n        \"_id\": \"5c338c89c8f17f1180c6c550\",\n        \"name\": \"Test task2\",\n        \"description\": \"novi test task2\",\n        \"time_limit\": \"2019-02-11T14:55:11.500Z\",\n        \"assigned_to_worker\": \"5bdecc3ec43948178a11f72e\",\n        \"documents\": [],\n        \"created_date\": \"2019-01-07T17:29:45.081Z\",\n        \"created_by\": \"5bd989d81746683b2d8511f6\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "get",
    "url": "/tasks/get/mytasks",
    "title": "Get tasks of logged in worker",
    "name": "GetMyTasks",
    "group": "Tasks",
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
            "type": "Task[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>Tasks that are assigned to the worker corresponding to the JWT sent in the header</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "[\n    {\n        \"priority\": \"3\",\n        \"status\": [\n            \"pending\"\n        ],\n        \"documents\": [],\n        \"created_date\": \"2019-01-07T18:20:38.698Z\",\n        \"_id\": \"5bd15ea4b62fee036e86fbf8\",\n        \"name\": \"Delam, delam, delam\",\n        \"description\": \"delam kot zamorc\",\n        \"Created_date\": \"2018-10-25T06:11:48.220Z\",\n        \"__v\": 0,\n        \"assigned_to_worker\": \"5bdecc3ec43948178a11f72e\",\n        \"created_by\": \"5bdecc29c43948178a11f72d\"\n    },\n    {\n        \"priority\": \"3\",\n        \"status\": [\n            \"pending\"\n        ],\n        \"_id\": \"5bdecd6da982d4395f43e650\",\n        \"name\": \"Faking delajte kreteni\",\n        \"description\": \"kot sem rekel, počasni ste hjoj\",\n        \"documents\": [],\n        \"created_date\": \"2018-11-04T10:43:57.999Z\",\n        \"__v\": 0,\n        \"assigned_to_worker\": \"5bdecc3ec43948178a11f72e\",\n        \"created_by\": \"5bdecc29c43948178a11f72d\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "get",
    "url": "/tasks/:taskID",
    "title": "Request task by ID",
    "name": "GetTask",
    "group": "Tasks",
    "permission": [
      {
        "name": "worker"
      }
    ],
    "parameter": {
      "fields": {
        "Path Param": [
          {
            "group": "Path Param",
            "type": "ID",
            "optional": false,
            "field": ":taskId",
            "description": "<p>The Task ID.</p>"
          }
        ]
      }
    },
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
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Tasks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>Priority level of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Task name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "time_limit",
            "description": "<p>DateTime limit for completing the task (ISO format).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this task was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of task creator.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_worker",
            "description": "<p>UserID of the worker this task is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_group",
            "description": "<p>GroupID of the group this task is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "File[]",
            "optional": false,
            "field": "documents",
            "description": "<p>Array of Files coresponding to this task.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"priority\": \"3\",\n     \"status\": [\n         \"pending\"\n     ],\n     \"_id\": \"5c338c89c8f17f1180c6c550\",\n     \"name\": \"Test task2\",\n     \"description\": \"novi test task2\",\n     \"time_limit\": \"2019-02-11T14:55:11.500Z\",\n     \"assigned_to_worker\": \"5bdecc3ec43948178a11f72e\",\n     \"created_date\": \"2019-01-07T17:29:45.081Z\",\n     \"created_by\": \"5bd989d81746683b2d8511f6\",\n     \"documents\": [\n         {\n             \"_id\": \"5c33932c7acbb2257154978c\",\n             \"mimetype\": \"image/png\",\n             \"originalname\": \"screenshot.png\",\n             \"filename\": \"9dfe737e6321345ffba310a1758250e7\",\n             \"path\": \"uploads/9dfe737e6321345ffba310a1758250e7\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/tasks",
    "title": "Request task list",
    "name": "GetTasks",
    "group": "Tasks",
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
            "type": "Task[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>Array of Task objects (see GetTask for details).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "put",
    "url": "/tasks/:taskId",
    "title": "Update a task",
    "name": "UpdateTask",
    "group": "Tasks",
    "permission": [
      {
        "name": "worker"
      }
    ],
    "parameter": {
      "fields": {
        "Path Param": [
          {
            "group": "Path Param",
            "type": "ID",
            "optional": false,
            "field": ":taskId",
            "description": "<p>The Task ID.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Task name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Task description.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1-5",
            "optional": true,
            "field": "priority",
            "description": "<p>Priority level of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "time_limit",
            "description": "<p>DateTime limit for completing the task (ISO format).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "'pending'",
              "'ongoing'",
              "'canceled'",
              "'completed'"
            ],
            "optional": true,
            "field": "status",
            "description": "<p>Status of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": true,
            "field": "assigned_to_worker",
            "description": "<p>UserID of the worker this task is assigned to.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": true,
            "field": "assigned_to_group",
            "description": "<p>GroupID of the group this task is assigned to.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/vnastRoutes.js",
    "groupTitle": "Tasks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>Priority level of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Task name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "time_limit",
            "description": "<p>DateTime limit for completing the task (ISO format).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_date",
            "description": "<p>DateTime this task was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "created_by",
            "description": "<p>UserID of task creator.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_worker",
            "description": "<p>UserID of the worker this task is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "assigned_to_group",
            "description": "<p>GroupID of the group this task is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "File[]",
            "optional": false,
            "field": "documents",
            "description": "<p>Array of Files coresponding to this task.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response Example:",
          "content": "{\n     \"priority\": \"3\",\n     \"status\": [\n         \"pending\"\n     ],\n     \"_id\": \"5c338c89c8f17f1180c6c550\",\n     \"name\": \"Test task2\",\n     \"description\": \"novi test task2\",\n     \"time_limit\": \"2019-02-11T14:55:11.500Z\",\n     \"assigned_to_worker\": \"5bdecc3ec43948178a11f72e\",\n     \"created_date\": \"2019-01-07T17:29:45.081Z\",\n     \"created_by\": \"5bd989d81746683b2d8511f6\",\n     \"documents\": [\n         {\n             \"_id\": \"5c33932c7acbb2257154978c\",\n             \"mimetype\": \"image/png\",\n             \"originalname\": \"screenshot.png\",\n             \"filename\": \"9dfe737e6321345ffba310a1758250e7\",\n             \"path\": \"uploads/9dfe737e6321345ffba310a1758250e7\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
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
            "type": "ID",
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
            "type": "ID",
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
            "description": "<p>Array of user objects (see GetUser for details).</p>"
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
            "type": "ID",
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
    "url": "/users/:userId",
    "title": "Update existing user",
    "name": "UpdateUser",
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
            "type": "ID",
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
            "type": "ID",
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
