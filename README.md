# Bem-vindo ao Projeto Trybe Futebol Clube!

Este é um projeto da [Trybe](https://www.betrybe.com/) que foi desenvolvido no módulo de Back-end.
O TFC é um site informativo sobre partidas e classificações de futebol. Nele foi desenvolvida uma API utilizando o método ***TDD*** (Test Driven Development) e feita a sua integração com um front-end (já estruturado) e com um banco de dados ***MySQL***.
Neste projeto buscou-se seguir todas as diretrizes dos princípios ***SOLID*** e do paradigma de programação ***POO*** (Programação orientada a objetos).

![login-page-tfc](https://user-images.githubusercontent.com/99992183/198701078-08f1a3b1-a340-4db4-831f-8698415d0034.png)

## Tecnologias utilizadas

Em seu desenvolvimento foi utilizada linguagem ***TypeScript*** para escrever os códigos e ***Node.js*** juntamente com o framework ***Express*** para fornecer toda a estrutura que possibilitou a construção dos endpoints da aplicação. 

Fora isso, foi utilizado o ORM ***Sequelize***, que é o responsável por toda a abstração de consultas e manipulações do banco de dados MySQL.

Para a geração e verificação de tokens foi utilizado o ***JWT*** (JSON Web Token), com ele é possível verificar se o usuário está devidamente autenticado e se ele tem permissões de administrador para realizar determinadas ações, como cadastrar, atualizar ou finalizar partidas, deixando assim a aplicação mais segura.

E por fim, para os testes de integração foi utilizado ***Mocha*** e ***Chai*** para estruturar os testes e fazer as asserções e o ***Sinon*** para mockar as funções, não permitindo que os testes tivessem acesso ao banco de dados.

## O que foi desenvolvido

  - Banco de dados MySQL utilizando o Sequelize. Este banco possui tabelas que armazenam informações dos usuários, informações dos times e informaçẽs das partidas; 
  - Endpoints que lêem e escrevem em um banco de dados MySQL;
  - Middlewares que realizam verificações dos dados enviados nas requisições e se o usuário está autenticado e possui permissão para realizar determinadas ações;
  - Divisão da aplicação em camadas (arquitetura MSC), o que permite uma maior organização do código e maior facilidade de manutenção;
  - Testes de integração que dão uma maior segurança na hora de refatorar o código, sem correr o risco de quebrar a aplicação.

## Como rodar o projeto na sua máquina utilizando o Docker:

<details>
<summary><strong> ⚠️ Configurações mínimas para rodar o projeto</strong></summary>
<br/>
Na sua máquina você deve ter:

- Sistema Operacional Distribuição Unix;
- Node versão igual ou superior à 16.14.0 LTS;
- Docker;
- Docker-compose versão igual ou superior à 1.29.2.
</details>

1. Navegue até o local onde deseja clonar o repositório e utilize o **git clone**:
```
git clone git@github.com:Tayna-Silva-Macedo/project-trybe-futebol-clube.git
```

2. Acesse o diretório do projeto **project-trybe-futebol-clube** e instale as dependências necessárias:
```
cd project-trybe-futebol-clube
npm install
```

3. Por fim, suba o container Docker para rodar os serviços utilizando o comando:
```
npm run compose:up
```

> ℹ️ Ao subir a aplicação, o serviço de Front-end estará rodando na port 3000 da sua máquina, o Back-end estará rodando na porta 3001 e o banco de dados MySQL estará rodando na porta 3002.

4. Para rodar os testes de integração e verificar a sua cobertura são utilizados os seguintes comandos:

```
cd app/backend
npm run test:coverage
```

## Endpoints da API:

#### Login

|Método |Funcionalidade                                                                     |URL                                          |
|:-----:|:---------------------------------------------------------------------------------:|:-------------------------------------------:|
|`POST` |Realiza login do usuário e retorna um token para autenticação                      |http://localhost:3001/login                  |
|`GET`  |Verifica se o usuário está logado e retorna a sua função (administrador ou usuário)|http://localhost:3001/login/validate         |

Na requisição `POST`, é necessário informar um JSON no seguinte formato:

```
{
  "email": "admin@admin.com",
  "password": "secret_admin"
}
```

#### Times

|Método |Funcionalidade                                                                    |URL                                           |
|:-----:|:--------------------------------------------------------------------------------:|:--------------------------------------------:|
|`GET`  |Retorna todos os times cadastrados no banco de dados                              |http://localhost:3001/teams                   |
|`GET`  |Retorna um time específico com base em seu ID                                     |http://localhost:3001/teams/:id               |

#### Partidas

|Método |Funcionalidade                                                                    |URL                                           |
|:-----:|:--------------------------------------------------------------------------------:|:--------------------------------------------:|
|`GET`  |Retorna todas as partidas do campeonato                                           |http://localhost:3001/matches                 |
|`GET`  |Retorna as partidas que estão em andamento                                        |http://localhost:3001/matches?inProgress=true |
|`GET`  |Retorna as partidas já finalizadas                                                |http://localhost:3001/matches?inProgress=false|
|`POST` |Cadastra uma nova partida e retorna esta partida cadastrada                       |http://localhost:3001/matches                 |
|`PATCH`|Finaliza uma partida em andamento baseado em seu ID                               |http://localhost:3001/matches/:id/finish      |
|`PATCH`|Atualiza o resultado de uma partida em andamento com base em seu ID               |http://localhost:3001/matches/:id             |


Na requisição `POST` é necessário informar um JSON no seguinte formato:

```
{
  "homeTeam": 16,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}
```


Na requisição `PATCH` que atualiza o resultado é necessário informar um JSON no seguinte formato:

```
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

#### Classificação

|Método |Funcionalidade                                                                    |URL                                           |
|:-----:|:--------------------------------------------------------------------------------:|:--------------------------------------------:|
|`GET`  |Retorna a classificação dos times da casa com base nas partidas já finalizadas    |http://localhost:3001/leaderboard/home        |
|`GET`  |Retorna a classificação dos times visitantes com base nas partidas já finalizadas |http://localhost:3001/leaderboard/away        |
|`GET`  |Retorna a classificação geral com base nas partidas já finalizadas                |http://localhost:3001/leaderboard             |
