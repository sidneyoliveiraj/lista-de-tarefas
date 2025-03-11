# Lista-de-tarefas
Trabalho Programação Web 

Objetivo:<br>
 Tem como objetivo facilitar o gerenciamento de atividades diárias dos usuários, permitindo que criem, editem, concluam e excluam tarefas de forma organizada e eficiente.


Funcionalidades principais:

Cadastro e Autenticação de Usuários<br>
CRUD de Tarefas (Criar, Ler, Atualizar e Excluir)<br>
Organização por Prioridade ou Categoria<br>
Marcação de Tarefas como Concluídas<br>
Filtro e Pesquisa de Tarefas<br>
<br>

Tecnologias Utilizadas:<br>

Frontend:<br>
HTML, CSS, JavaScript – Base para estrutura<br>
React.js – Framework para criar a interface<br>
TailwindCSS – Para estilização <br>


Backend:<br> 
Node.js com Express.js – Para criação da API REST<br>
PostgreSQL – Banco de dados relacional<br>
Sequelize – Para facilitar a interação com o banco de dados<br>
JWT - Para autenticação segura dos usuários<br>
<br>

Atividade I - N1
<br>

1. Ajustes Sugeridos

Nenhum ajuste foi solicitado na primeira apresentação.<br>
<br>
2. Requisitos Funcionais e Não Funcionais:


Requisitos Funcionais (RF):
<br>
· RF01: O usuário deve poder criar uma conta e fazer login/logout.

· RF02: O usuário deve poder adicionar, editar, excluir e visualizar tarefas.

· RF03: O usuário deve poder organizar tarefas por prioridade ou categoria.

· RF04: O usuário deve poder marcar tarefas como concluídas.

· RF05: O sistema deve permitir a pesquisa e filtragem de tarefas.

· RF06: O usuário deve receber uma confirmação antes de excluir uma tarefa.

· RF07: O sistema deve permitir que o usuário edite sua conta (nome, email, senha).

· RF08: O sistema deve permitir que o usuário recupere a senha através do e-mail.

· RF09: O sistema deve notificar visualmente o usuário sobre tarefas próximas do vencimento ou já vencidas.

<br>
Requisitos Não Funcionais (RNF):<br>

· RNF01: A API deve ser construída em Node.js com Express.js.

· RNF02: O banco de dados deve ser relacional, utilizando PostgreSQL com Sequelize.

· RNF03: O sistema deve suportar autenticação segura com JWT e criptografia de senhas com BCrypt.

· RNF04: O frontend deve ser desenvolvido com React.js e TailwindCSS para estilização.

· RNF05: O sistema deve ser responsivo para diferentes dispositivos.

· RNF06: O sistema deve utilizar versionamento de código com Git e GitHub para controle de alterações.

<br>

3. Estratégias de Desenvolvimento e Arquitetura<br>


Arquitetura: Monolítica.

Projeto individual com uma escala menor, facilitando desenvolvimento e manutenção.<br>
<br>
Justificativa das Tecnologias:

Node.js + Express.js: Facilidade de criação de APIs REST e ampla compatibilidade com JavaScript.

React.js: Interface moderna e reativa, e oportunidade de aprender.

Sequelize + PostgreSQL: ORM facilita o gerenciamento do banco relacional.

JWT + Bcrypt: Segurança na autenticação dos usuários.<br>
<br>


4. Plano de Trabalho

Parte 1:

· Configurar o repositório e estrutura do projeto.

· Criar a API base com Express.js.

· Configurar o banco de dados com Sequelize e PostgreSQL.

· Implementar a autenticação de usuário<br>
<br>

Parte 2:<br>

· Criar CRUD de tarefas no backend.

· Criar o frontend com React.js e configurar a estilização.

· Implementar comunicação entre frontend e backend.
<br>

Parte 3:<br>

· Implementar pesquisa e filtro de tarefas.

· Ajustes na UI e melhorias de usabilidade.
