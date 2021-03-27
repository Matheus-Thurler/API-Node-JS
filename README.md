DOCUMENTAÇÃO API-NODE-JS

Com está API é possível criar usuários com segurança, criptografia, token com data de expiração e que pode lhe ajudar a encontrar possíveis erros caso o usuário não consiga logar.

Antes de Proceguir com as as explicações não esqueça de configurar o arquivo.env, pois com ele a aplicação funcionára de maneira correta e segura.

Logo após configurar o .env, rode os comandos:

Comando para instalar as dependencias do projeto
```bash
    npx, npm ou yarn caso use um desses funciona.

    npm install
```
Comando para criar o banco de dados descrito no .env, se o banco existir nao tem problema
```bash
    yarn sequelize db:create
```

Comando para criar as tabelas e colunas, de acordo com a configuração das migrations.
```bash
    yarn sequelize db:migrate
```
A aplicação consta com um Middleware, para proteger uma rota, sendo assim essa rota só poderá ser usada se existir um usuario logado com token válido

Exemplo:
```javascript
    router.post('/users', authMiddleware, userControler.store)
```

1. CONTROLLER
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. CONTROLLER DE BUSCA DE USUÁRIO
- A controller busca os usuários por meio do ID, nome e e-mail, caso haja algum erro é retornado a seguinte mensagem: <span style="color:green">204 – Nenhum usuário foi encontrado</span>;
- A controller de criação de usuários é feita pela criação do nome, e-mail e senha do mesmo. A senha é criptografada ao banco, para que não vase dados do usuário. Dessa forma, ao criar o usuário, um token de autenticação é gerado com tempo de expiração e aseguir recebe-se uma mensagem de confirmação da criação: <span style="color:green">200 – Usuário criado com sucesso!</span>;
- A controller de login busca o e-mail e senha do usuário e faz uma busca única por ele. Caso ocorra de não o encontrar, é retornado uma mensagem de erro com escrita: <span style="color:red">404 – Usuário não encontrado</span>;

Se houver de estar correta, é feita uma comparação entre a senha e a hash daquele usuário para confirmar se está correta ou não, caso esteja, é devolvida o token ao usuário com o seu determinado tempo de expiração e retornar os dados necessários que o usuário usará. Ao ocorrer de a senha não existir, é retornado a seguinte mensagem de erro: <span style="color:red">401 – Senha incorreta</span>;

2. ROTAS:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1. ROTA BUSCANDO USUÁRIOS:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- /users

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.2. ROTA CRIANDO USUÁRIO:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- /user

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3. ROTA LOGANDO USUÁRIO:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- /login