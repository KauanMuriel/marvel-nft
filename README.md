## Ideia geral
Aplicação web o qual os usários podem minerar, trocar, vender e colecionar tokens do mundo da marvel, a aplicação utiliza a api da marvel para gerar tokens personalizados e unicos para os usários.


## BANCO DE DADO
PostgresSQL + TypeORM

## REST API
Fastify

## Funcionalidades Usário
- Carteira
  - O usuário pode depositar dinheiro em sua conta pessoal.
  - O usuário pode retirar dinheiro de sua conta pessoal.
- Minerar tokens
  - O usuário faz uma requisição para a rota de mineração e recebe como retorno um token como recompensa do esforço X.
  - O token gerado é armazenado no banco de dados e atrelado ao usuário que o minerou.
- Vender tokens
  - O usuário é capaz de anunciar os seus tokens em um marketplace onde outros usuários podem compra-lo.
  - O anuncio pode ter um valor fixo ou variavel por meio de um leilão.
  - O usuário é capaz de vender o seu token a outro usário.
- Trocar tokens
  - O usuário é capaz de trocar os seus tokens com outros usuários.
- Comprar tokens
  - O usuário é capaz de adquirir novos tokens por meio de seu dinheiro na plataforma.
  - O usuário pode fazer lances em leilões para adquirir novos tokens.
- Obter detalhes do conteúdo do token
  - O usuário pode visualizar os detalhes de um tokens.
  - Os dados podem ser do seu token ou de tokens de outros usuários.

## Funcionalidades Sistema
- Gerar tokens com base na api
- Marketplace de tokens
- Armazenar os tokens no banco de dados
- Gerenciar usuários.
- Gerenciar carteiras de usuários.
