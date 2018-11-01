# API DOCS
Tukaj objavljam kratek povzetek delovanja APIja.
Zapisani bodo vsi routi, ločeni po smiselnih kategorijah.
Vsak route ima zapisane podatke, ki jih zahteva in ki jih dobimo iz serverja

V request BODYju se pošilja JSON objekt zahtev.

od routa dobimo JSON objekt kot odgovor

Nekateri routi pa zahtevajo JWT (JSON Web Token) za potrebe avtorizacije - le tega pošiljamo v HEAD, na način {x-access-token: TokenString}
JWT ima vlogo avtentikacije (iz njega se da dobit userID) in avtorizacije (porepreči workeju dostop do manager zadev, recimo)
JWT je veljaven 24 ur od pridobitve, nato ti bo api vse requeste zavrnil - promptaj ponovni login.
Če route zahteva JWT bo to ozačeno v oklepajih poleg routa
Če route zahteva posebne privilegije (nrp. manager+, bo to zapisano v tem istem oklepaju)
## Autentikacija

### /register
POST:
* required: username: string, email: string, password: string, 
* optional: privilege: string enum[worker, manager, admin]

Response: Error ali {auth: true, token: JWT}
(shrani si token v cookije al nekaj, saj ga rabiš pol za večino ostalih API klicev)
### /me (JWT)
GET: {}
Response: user object pripadajoč JWTju v headu:

### /login
POST:
* required username: string, password: string
Response: {auth: true/false, token: JWT/null}

### /logout
GET: {}
Response: {auth: false, token: null }
logout route ne invalidira JWT (saj to sploh ne gre). Za pravilni logout je potrebno JWT zbrisat na uporabniški strani

## ...