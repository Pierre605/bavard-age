__________________

#   Flask Tests:
__________________

## @app.route("/")
Route principale (homepage -> HomePage.jsx, )
`curl http://127.0.0.1:5000/`
> hello world!

________________________________________
 
## @app.route("/login", methods=['POST']) 
Route d'enregistrement (register -> Register.jsx)
en mode déconnecté :
`curl http://127.0.0.1:5000/logout -b cookies.txt`
> {"disconnected" : true}
`curl -d "username=Michel&password=Michel" -X POST http://127.0.0.1:5000/login -c cookies.txt`
> {logged_in : true}
`curl http://127.0.0.1:5000/logout -b cookies.txt`
> {"disconnected" : true} 
`curl -d "username=Juan&password=Toto" -X POST http://127.0.0.1:5000/login -c cookies.txt`
> {logged_in : true}
`curl http://127.0.0.1:5000/logout -b cookies.txt`
> {"disconnected" : true}
`curl -d "username=Juan&password=Juan" -X POST http://127.0.0.1:5000/login -c cookies.txt`
> {logged_in : true}
_______________________

## @app.route("/logout")
Route de déconnexion (logout -> Logout.jsx)
en mode connecté :
`curl -d "username=Michel&password=Michel" -X POST http://127.0.0.1:5000/login -c cookies.txt`
> {logged_in : true}%
`curl http://127.0.0.1:5000/logout -b cookies.txt`
> {"disconnected" : true}% 
_________________________________________________

## @app.route('/register', methods=['POST']) 
`curl -d "username=Michel&password=Michel&email=Michel@blablapp.com&gdpr=True" -X POST http://127.0.0.1:5000/register`
> {"registered":false}
`curl -d "username=Michel&password=Michel&email=TOto@blablapp.com&gdpr=True" -X POST http://127.0.0.1:5000/register`
> {"registered":false}
`curl -d "username=TOto&password=Michel&email=Michel@blablapp.com&gdpr=True" -X POST http://127.0.0.1:5000/register`
> {"registered":false}
`curl -d "username=TOto&password=TOto&email=TOto@blablapp.com&gdpr=False" -X POST http://127.0.0.1:5000/register`
> {"registered":true}
`curl -d "username=TOto&password=TOto&email=TOto@blablapp.com&gdpr=True" -X POST http://127.0.0.1:5000/register`
> {"registered":true}
`curl http://127.0.0.1:5000/logout -b cookies.txt`
> {"disconnected" : true}%    
`curl -d "username=TOto&password=TOto&email=Pierre@blablapp.com&gdpr=True" -X POST http://127.0.0.1:5000/register`
> {"registered":false}
`curl -d "username=Michel&password=Pierre&email=Pierre@blablapp.com&gdpr=True" -X POST http://127.0.0.1:5000/register`
> {"registered":false}
_______________________________________________
 
## @app.route("/conversation-list", methods=['GET'])
Route de liste des convesations (conversation-list -> UserHome.jsx)
en mode connecté :
`curl -d "username=Michel&password=Michel" -X POST http://127.0.0.1:5000/login -c cookies.txt`
> {logged_in : true}
`curl http://127.0.0.1:5000/conversation-list`
> [
    {
      "id": 2, 
      "name": "Conv-poto", 
      "participants": "Damien,Juan,Michel"
    }, 
    {
      "id": 1, 
      "name": "La famille", 
      "participants": "Damien,Michel"
    }
  ]
_____________________________________________________

@app.route('/create_conversation', methods=['POST'])
en mode connecté :
`curl -d "username=Michel&password=Michel" -X POST http://127.0.0.1:5000/login -c cookies.txt`
> {logged_in : true}%           
`curl -d "name=Conv-poto&email=Juan@blablapp.com" -X POST http://127.0.0.1:5000/create_conversation`
> {"conversation_id":4}
`curl http://127.0.0.1:5000/conversation-list`
> [
  {
    "id": 4, 
    "name": "Conv-poto", 
    "participants": "Juan,TOto"
  }
]
`curl -d "name=NouvelleConversation&email=Juan@blablapp.com" -X POST http://127.0.0.1:5000/create_conversation`
> {"conversation_id":5}
`curl http://127.0.0.1:5000/conversation-list`
> [
 {
   "id": 4, 
   "name": "Conv-poto", 
   "participants": "Juan,TOto"
 }
, 
  {
    "id": 5, 
    "name": "NouvelleConversation", 
    "participants": "Juan,TOto"
  }
]
`curl -d "name=NewChat&email=Juan@blablapp.com&email=Damien@blablapp.com" -X POST http://127.0.0.1:5000/create_conversation`
> {"conversation_id":6}
`curl http://127.0.0.1:5000/conversation-list`
> [
  {
    "id": 4, 
    "name": "Conv-poto", 
    "participants": "Juan,TOto"
  }, 
  {
    "id": 6, 
    "name": "NewChat", 
    "participants": "Damien,Juan,TOto"
  }, 
  {
    "id": 5, 
    "name": "NouvelleConversation", 
    "participants": "Juan,TOto"
  }
]
`curl -d "name=NouveauChat&email=Juan@blablapp.com&email=Damien@blablapp.com&email=TOto@blablapp.com" -X POST http://127.0.0.1:5000/create_conversation`
> {"conversation_id":7}
`curl http://127.0.0.1:5000/conversation-list`
> [
  {
    "id": 4, 
    "name": "Conv-poto", 
    "participants": "Juan,TOto"
  }, 
  {
    "id": 6, 
    "name": "NewChat", 
    "participants": "Damien,Juan,TOto"
  }, 
  {
    "id": 7, 
    "name": "NouveauChat", 
    "participants": "Damien,Juan,TOto"
  }, 
  {
    "id": 5, 
    "name": "NouvelleConversation", 
    "participants": "Juan,TOto"
  }
]
_____________________________________________________________________________

## @app.route('/conversation/<int:conversation_id>', methods=['GET', 'POST'])
en mode connecté :
`curl -d "username=Michel&password=Michel" -X POST http://127.0.0.1:5000/login`
> {logged_in : true}
`curl http://127.0.0.1:5000/conversation/1`
> [
  [
    [
      "Michel", 
      "Salut", 
      "2021-10-23 14:38:22"
    ], 
    [
      "Damien", 
      "\u00c7a va?", 
      "2021-10-23 14:38:22"
    ]
  ], 
  "Michel"
]
`curl http://127.0.0.1:5000/conversation/3`
> "user not in this conversation"
