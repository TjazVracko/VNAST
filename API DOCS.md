# API DOCS
Tukaj objavljam kratek povzetek delovanja APIja.
Zapisani bodo vsi routi, ločeni po smiselnih kategorijah.
Vsak route ima zapisane podatke, ki jih zahteva in ki jih dobimo iz serverja

V request BODYju se pošilja JSON objekt zahtev.

od routa dobimo JSON objekt kot odgovor

Nekateri routi pa zahtevajo JWT (JSON Web Token) za potrebe avtorizacije - le tega pošiljamo v HEAD, na način {x-access-token: tokenString}, token pošiljamo brez narekovajev

JWT ima vlogo avtentikacije (iz njega se da dobit userID) in avtorizacije (prepreči workeju dostop do manager zadev, recimo)

JWT je veljaven 24 ur od pridobitve, nato ti bo api vse requeste zavrnil - promptaj ponovni login.

Če route zahteva JWT bo to ozačeno v oklepajih poleg routa

Če route zahteva posebne privilegije (nrp. manager+, bo to zapisano v tem istem oklepaju)

Nekateri routi vsebujejo spremenljivke, le te so označene z vodilnim ':'
Na primer : /users/:userId - userId je poljuben ID userja.

## Autentikacija
(Poglej si spodaj pri Users kako izgleda User objekt)
### /register
POST:
* *required*: username, password, 
* *optional*: privilege, email

* *Response*: Error ali {auth: true, token: JWT} (shrani si token v cookije al nekaj, saj ga rabiš pol za večino ostalih API klicev)

### /me
GET (JWT):
* *Response*: user object pripadajoč JWTju - {_id, username, email, privilege}

### /login
POST:
* *required*: username, password

* *Response*: {auth: true/false, token: JWT/null}

### /logout
GET:
* *Response*: {auth: false, token: null }

logout route ne invalidira JWT (saj to sploh ne gre). Za pravilni logout je potrebno JWT zbrisat na uporabniški strani

## Users
User objekt izgleda takole:  
var UserSchema = new Schema({  
    username: {  
        type: String,  
        required: 'Must have username'  
    },   
    password: {  
        type: String,  
        required: 'A password must exits for the user'  
    },  
    email: {  
        type: String,  
    },  
    privilege: {  
        type: [{  
            type: String,  
            enum: ['worker', 'manager', 'admin']  
            }],   
            default: ['worker']  
    },  
});  
  
Opomba: passwordi so hashani - ko pa ti kličeš api in dobiš User objekt nazaj, sploh ne dobiš password fielda (safety pa to)

### /users
GET  (JWT worker+):
* *Response*: array user objektov

POST  (JWT admin+):
* *required*: username, password, 
* *optional*: privilege, email
* *Response*: User object kreiranega userja

### /users/:userId
GET (JWT worker+):
* *Response*: pripadajoč User object

PUT (JWT admin+):
* *optional*: username, password, privilege, email
* *Response*: User object posodobljenega userja

DELETE (JWT admin+)
* *Response*: Error ali { message: 'User successfully deleted' }

## Tasks
Task objekt:  
var TaskSchema = new Schema({  
    created_by: Schema.Types.ObjectId,  // manager, ki je naredo task  
    name: {  
        type: String,  
        required: 'Enter the name of the task'   
    },  
    description: {  
        type: String,  
        required: 'Enter the description of the task'  
        },  
    documents: [DocumentSchema],    
    priority: {  
        type: String,  
        enum: ['1', '2', '3', '4', '5'],  
        default: ['3']  
    },  
    created_date: {  
        type: Date,  
        default: Date.now  
    },  
    time_limit: {  
        type: Date  // format je ISO Date (YYYY-MM-DDTHH:MM:SSZ, npr 2018-10-04T10:18:22.3Z)  
    },  
    status: {  
        type: [{  
        type: String,  
        enum: ['pending', 'ongoing', 'canceled', 'completed']  // če ni en od teh vriant vrne api error (in pove vse variante)  
        }],  
        default: ['pending']  
    },  
    assigned_to_worker: Schema.Types.ObjectId,  
    assigned_to_group:  Schema.Types.ObjectId  
});  
### /tasks
GET  (JWT worker+):
* *Response*: array Task objektov (vseh v bazi)

POST  (JWT manager+):
* *required*: name, description
* *optional*: priority, created_date, time_limit, status, assigned_to_worker, assigned_to_group
* *Response*: Task object kreirane naloge

### /tasks/:taskId
GET (JWT worker+):
* *Response*: pripadajoč Task object

PUT (JWT worker+):
* *optional*: created_by, name, description, priority,created_date, time_limit, status, assigned_to_worker, assigned_to_group
* *Response*: Task object posodobljene naloge

DELETE (JWT manager+)
* *Response*: Error ali { message: 'Task successfully deleted' }

### /tasks/get/mytasks
GET (JWT worker+):
* *Response*: array Task obejktov, ki so bili dodeljeni temu workerju (njegov id je v assigned_to_worker)

### /tasks/get/managedtasks
GET (JWT manager+):
* *Response*: array Task obejktov, ki jih je kreiral ta manager (njegov id je v created_by)

## Nalaganje datotek
Vsak task ima array dokumentov (naloženih datotek, v stilu priponk)

### /tasks/:taskId/files
POST (JWT manager+):
* *NOTE*: za uploadanje sem jaz v postmanu dal "form-data" (namesto raw ali x-www-form-encoded), ker le tak lahko file selectaš. pol pa key je lahko karkoli, zraven pa file
* *required*: en ali več parov key: file (key je lahko karkoli)
* *Response*: Error ali nov task objekt z dodanimi documenti v arrayu
### /tasks/:taskId/files/:fileId
GET (JWT worker+):
* *Response*: {message: 'File does not exist'} ali pa File download as attachment

DELETE (JWT manager+)
* *Response*: Error, {message: 'File does not exist'}, ali pa {message: FILENAME + ' was deleted'}


## Comments
Objekt komentarja:  
var CommentSchema = new Schema({  
    created_by: {  
        type: Schema.Types.ObjectId,  
        required: 'Someone had to create this'  //Če ne pošljemo, kdo je ustvaril comment API vrne error  
    },  
    created_date: {  
        type: Date,  
        default: Date.now  
    },  
    content: {  
        type: String,  
        required: 'Enter the content of the comment'  
    },  
    assigned_to_task: Schema.Types.ObjectId  
});  

### /tasks/:taskId/comments
GET  (JWT worker+):
* *Response*: array Comment objektov, ki pripadaju temu Tasku

POST  (JWT worker+):
* *required*: content
* *optional*: created_date
* *Response*: Comment object kreiranega komentarja

### /tasks/:taskId/comments/:commentId
PUT (JWT worker+):
* *optional*: content
* *Response*: Comment object posodobljenege komentarja

DELETE (JWT worker+)
* *Response*: Error ali { message: 'Comment successfully deleted' }

## Groups
Group model:
var GroupSchema = new Schema({  
    name: {  
        type: String,  
        required: 'Name the group'  
    },  
    created_by: {  
        type: Schema.Types.ObjectId,  // to je manager, ki je naredil grupo  
        required: 'Someone had to create this'  //Če ne pošljemo, kdo je ustvaril comment API vrne error  
    },  
    created_date: {  
        type: Date,    
        default: Date.now    
    },  
    workers: [Schema.Types.ObjectId]  // workeji, ki so v tej skupini  
});  

### /groups
GET  (JWT manger+):
* *Response*: array vseh Group objektov

POST  (JWT manger+):
* *required*: name
* *optional*: created_date
* *Response*: Group objekt kreirane skupine

### /groups/get/managerof
GET  (JWT manger+):
* *Response*: array vseh Group objektov, katere je kreiral prijavljen manager

### /groups/get/memberin
GET  (JWT worker+):
* *Response*: array vseh Group objektov, katerih član je trenutno prijavljen worker

### /groups/:groupId
GET (JWT worker+):
* *Response*: pripadajoč Group object

PUT (JWT manger+):
* *optional*: name, created_by, created_date, workers
* *Response*: Group object posodobljene skupine

DELETE (JWT manager+)
* *Response*: Error ali { message: 'Group successfully deleted' }

### /groups/:groupId/workers
GET (JWT worker+):
* *Response*: array User objektov, ki so workerji v tej skupini

POST  (JWT manger+):
* *required*: userId (id workerja, ki ga želimo dodati v skupino)
* *Response*: Group objekt posodobljene skupine (workers array ima dodanega workerja)

DELETE (JWT manager+)
* *required*: userId (id workerja, ki ga želimo odstraniti iz skupine)
* *Response*: Group objekt posodobljene skupine (workers array ima odstranjenega workerja)

### /groups/:groupId/tasks
GET  (JWT worker+):
* *Response*: array vseh Task objektov, ki so bili dodeljeni tej skupini (torej groupId je v Task.assigned_to_group)

## Chats
Chat model:
var ChatContainerSchema = new Schema({
    created_date: {
        type: Date,
        default: Date.now
    },
    participants: [Schema.Types.ObjectId],
    messages: [Schema.Types.ObjectId] 
});

## /chats
GET (JWT manager+):
* *Response*: array vseh chatov

POST (JWT worker+):
* *required*: userId s katerim ustvarimo chat
* *Response*: chat objekt

# /chats/get/memberin
GET (JWT worker+):
* *Response*: array vseh chatov v katerih je uporabnik

# /chats/:chatId
GET (JWT worker+):
* *Response*: array vseh sporočil v chatu

POST (JWT worker+):
* *required*: content: vsebina sporočila, ki ga želimo poslati
* *Response*: posodobljen chat objekt

DELETE (JWT worker+):
* *Response*: error ali { message: 'Chat successfully deleted' }

# V bazi na serveju že imate par zadev noter, in sicer:
Imate 3 userje:
username: admin, password: admin, privilege: admin  

username: manager, password: manager, privilege: manager  

username: worker, password: worker, privilege: worker  

manager je vodja dveh skupin in je naredil nekaj nalog, ki jih je assignal worker-ju
worker pa je v eni grupi in ima svoje taske

Za svoje teste priporočam da preko /register route naredite par uporabnikov (enega managerja in enega userja najmanj)
pol pa si shranite oba JWT, ki jih dobite kot odgovor.

Pol ko kličeš route kot manager uporabiš manager JWT  
ko kičeš route kot worker pa uporabi worker JWT

# Uporaba
Torej api zna parsat tako JSON string kot tudi x-www-form-urlencoded string  

pomemno je vglavnem to,da v header daš  
(key: "x-access-token", value: "thetoken")  
 - to ma .NET menda kot dictonary nareto  

v bodyju ( pa laho maš JSON, torej  
{ "username" : "admin", "password": "admin"}  
naprimer  
ali pa x-www-form-urlencoded, ki je  
"username=admin&password=admin"  
(enako kot url query string)  
