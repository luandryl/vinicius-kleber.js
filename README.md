# ViniciusKleber.Js
* * *

## Informações Gerais
ViniciusKleber.Js é um cara pequeno, flexivel e escalavel.
es6 + oopjs + express + MVC Style Classes.

Estrutura do ViniciusKleber.Js

``` zsh
.
|-build/ # build da api
|-src /
  |-controllers/ # todas as resource controllers
  |
  |-database/ # database conection classes
  |
  |-models/ # model classes para interagir com os dados
    
    |-schemas/ # model schemas

  |-routes/ # arquivos de rota
  |
|-test/ # testes devem entrar aqui
|
|index.js # bootstrap da API
```
## Coisas Importantes Sobre o ViniciusKleber.Js e seu funcionamento

  ViniciusKleber.Js é um cara sistematico, portanto tente sempre manter as coisas do jeito que ele sujere. Vai que ele resolve parar de funcionar só de zoa HUE

## Tudo começa no index.js

  É arquivo ```index.js``` que carregamos as rotas, as configurações basicas e é dado start no servidor(por padrão na porta ```3000```)

### Database
  A conexão é estabelecia quando o  ```index.js``` é chamado e fica disponivel esperando ser utilizada

  Existem duas formas de conexão
  + Local
    * conecta-se com a instancia local do ```mongoDB``` ativa
    * mongodb://localhost:27017/viniciusKleber-js

  + Production
    * conecta-se com o ```process.env.MONGODB_URI```
* * *
### Schemas
  Mongoose Schemas, simples assim
* * *
### Models 
  As Models são uma interface para realizar operações no mongoDB

  Todas as Models devem ser nomeadas seguindo o padrão ```MyModel.Model.js``` e também deve extender classe ```BaseModel```.
  BaseModel por sua vez realiza as operações comuns de CRUD. Futuramente BaseModel dará suporte a operações mais complexas.

  Caso precise fazer alguma operação que a interface ```BaseModel``` não oferece suporte, 
  a mesma deverá ser implementada dentro da classe filha tipo  ```MyModel.Model.js``` 

  Todas as Models retornam uma ```promise``` que deve ser resolvida por quem instanciou um objeto do
  tipo ```MyModel.Model.js```

  A classe ```BaseModel``` tem a função de classe abstrata e não deve se tornar um objeto concreto.


  #### Exemplo de Uso


  ``` zsh
    'use strict';
    import User from './schema/User';
    import BaseModel from './Base.Model'

    
      # Model operations to Student
   
      # Because this class extends to BaseModel we inherit from then all the basics data Operations.
      # More specifcs data operetions should be implemented here

    export default class UserModel extends BaseModel {
      
        # pass data(req.params or req.body stuff) to our parent class (BaseModel)
      
      constructor(data) {
        
          # Calling the constructor from the parent class
          # and pass to him all the config that him needs to work

          # so ... magic, your crud its done :3
          # try with another mongooseSchema, will work 
        
        super(User, '_id', data)
      }
      
      # its simple to perform specifcs querys and data processing besides mongoDB
      # this exemple we return data from query object pass through method argument
      getById (query) {
        return this.model.find(query).exec()
      }
    }
  ```
  

  #### Model API 
  - Stable:
    + persist()
      * retorna uma promise que irá salvar os dados
    + getById()
      * retorna uma promise que irá retornar os dados com base no ID
    + updateById()
      * retorna uma promise que irá modificar os dados com base no ID
    + deleteById()
      * retorna uma promise que irá deletar os dados com base no ID
  
  - Alpha:
    + getByField(query)
      * retorna uma promise que ira retornar os dados com base na query
    + updateByField(query)
      * retorna uma promise que ira modificar os dados com base na query
    + deleteByField(query)
      * retorna uma promise que ira modificar os dados com base na query
* * *
### Controllers 
  Com funcionamento similar as classes ```Models``` , as Controllers são uma interface para gerenciar
  as ```RESOURCES```* que a api deve oferecer.

  Todas as Controllers devemnomeadas seguindo o padrão ```MyController.Controller.js``` e também devem extender classe ```BaseController```.

  ```BaseController``` por sua vez disponibiliza metodos de controle basicos para minha ```RESOURCE```* baseados no ID do mongoDB . Futuramente BaseController dará suporte a operações mais complexas.

  Caso precise fazer alguma operação que a interface ```BaseController``` não ofereça suporte, 
  a mesma deverá ser implementada dentro da classe filha tipo ```MyController.Controller.js```

  Como todas as ```Models``` retornam uma ```promise``` que deve ser resolvida por quem invocou um objeto do tipo ```MyModel.Model.js```, se quisermos transitar dados do mongoDB pelas requisições, objetos do tipo ```Model``` devem ser
  invocados portanto deve-se resolver as ```promises``` retornadas pelas classes  que as ```Models``` retornam neste trecho do codigo

  As Controllers são responsáveis por invocar e resolver as promises retornadas pelas ```Models```.

  Todos os metodos das ```Controllers``` devem receber dois parametros
  + req
    * requisição passada pelo express.Router()
  + res
    * requisição retornada para express.Router()

  A classe ```BaseController``` tem a função de classe abstrata e não deve se tornar um objeto concreto.
  
  #### Exemplo de Uso


  ``` zsh
    'use strict';
    import BaseController from './Base.Controller'
    import Exemple from '../models/Exemple.Model'

    # Model operations to Student

    # Because this class extends to Controller we inherit from then all the basics data Operations.
    # More specifcs RESOURCES CONTROL OPERATIONS should be implemented here
    export default class ExempleController extends BaseController {
      
       # pass the model this class will map 
       # to our parent class (Basecontroller)
      
      constructor() {
        
          # Calling the constructor from the parent class
          # and pass to him all the config that him needs to work

          # so ... magic, your crud its done :3
          # try with another mongooseSchema, will work,
          
          # if its dont make sense map a mongooseSchema to 
          # a resource controller just dont override the constructor method
          # this open the possibility to bring another resources controllers(BookController, # ChapterController)
          # and compose one operation with them together
        
        super(User)
      }

      # find model by name -> not covered by basic operations
      getByName (req, res) {

        let query = {
          name: req.params.name
        }

        let exemplePromise = new 
        Exemple(query ).getByField();
        
        Promise.all([
          exemplePromise
        ]).then((data) => {
          if(data) {
            res.send(data[0])
            res.status(200);
            res.end()
          }
        }).catch(err => {
          console.log(err)
        })
      }
  ```
  
  #### Controller API 
  - Stable:
    + save(req, res)
      * resolve a promise que irá salvar os dados e retorna o obj salvo pra requisição
    + getById()
      * resolve a promise que irá retornar os daods pelo ID e retorna o obj salvo pra requisição
    + updateById()
      * resolve a promise que irá modificar os dados pelo ID e retorna o numero de linhas afetadas
    + deleteById()
      * resolve a promise que irá modificar os dados pelo ID e retorna o obj salvo pra requisição
  
  #### Exemplo de Uso
  ``` zsh
    'use strict';
    import BaseController from './Base.Controller'
    import Exemple from '../models/Exemple.Model'

    # Model operations to Student

    # Because this class extends to Controller we inherit from then all the basics data Operations.
    # More specifcs RESOURCES CONTROL OPERATIONS should be implemented here
    export default class ExempleController extends BaseController {
      
       # pass the model this class will map 
       # to our parent class (Basecontroller)
      
      constructor() {
        
          # Calling the constructor from the parent class
          # and pass to him all the config that him needs to work

          # so ... magic, your crud its done :3
          # try with another mongooseSchema, will work,
          
          # if its dont make sense map a mongooseSchema to 
          # a resource controller just dont override the constructor method
          # this open the possibility to bring another resources controllers(BookController, # ChapterController)
          # and compose one operation with them together
        
        super(User)
      }

      # find model by name -> not covered by basic operations
      getByName (req, res) {

        let data = {
          name: req.params.name
        }

        let exemplePromise = new 
        Exemple(data).getByField();
        
        Promise.all([
          exemplePromise
        ]).then((data) => {
          if(data) {
            res.send(data[0])
            res.status(200);
            res.end()
          }
        }).catch(err => {
          console.log(err)
        })
      }
  ```
* * *
### Routes
  Dentro dos arquivos de rotas é onde instanciamos um objeto do tipo ```Controller```.
  Para cada endpoit possivel que o ```RESOURCE``` irá disponibilizar deve-se ter um
  metodo responsavel por trata-lo;

  Como estamos estânciando um objeto do tipo ```Controller``` a API padrão bem como metodos adicionais oferecidos pelo ```RESOURCE``` ficam expostas para uso;

  #### Exemplo de Uso
  ``` zsh
    # import resorce controller
    import Exemple from '../controllers/Exemple.Controller'

    # express.Router()
    let router = express.Router()

    # insance of resource controller
    let ex = new Exemple()

    # basic api exposed by default -> to add more look the exemple in session Controllers 
    router.post('/', (req, res) => {
      ex.save(req, res)
    })

    router.get('/:name', (req, res) => {
      ex.getByName(req, res)
    })
    
    router.get('/:id', (req, res) => {
      ex.getById(req, res)
    })
    
    router.put('/:id', (req, res) => {
      ex.updateById(req, res)
    })

    router.delete('/:id', (req, res) => {
      ex.removeById(req, res)
    })

    export default router

  ```
* * *
### Testes
  O ambiente de testes esta configurado com:
  + [Mocha](https://mochajs.org/):
    * framework js pra testes
  + [Chai](http://chaijs.com/):
    * assertion lib to js

  Todos os metodos da API Stable devem em um  ```mongoDB limpo ```.

  Todos os testes devem ser escritos dentro do diretório `./test` sepando os arquivos por contexto


``` git clone git@github.com:luandryl/vinicius-kleber.js.git```

### Processo de Desenvolvimento

* * *
### Processo de Construção(Build)

Em breve ...
* * *
### Processo de Testes(Build)

``` bash
# Clone o repositório git@github.com:luandryl/vinicius-kleber.js.git
git clone

# Para as dependencias
npm install

# Serve com hotreload em localhost:3000 para desenvolvimento
npm run dev

#Roda todos os testes escritos dentro de './test' 
npm run test

#Apenas abra um pull request quando todos os testes tiverem passando
```
