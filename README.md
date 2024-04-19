## Ideia geral
Aplicação web o qual os usários podem minerar, trocar, vender e colecionar tokens do mundo da marvel, a aplicação utiliza a api da marvel para gerar tokens personalizados e unicos para os usários.

Semelhante a um ecosistema de NFT's, a plataforma permite a mineração de tokens únicos que podem ser vendidos dentro do marketplace. Os tokens são únicos e são gerados a partir da API da marvel.

## BANCO DE DADO
#### PostgresSQL + TypeORM

O banco de dados será executado em um conteiner docker para facilitar o desenvolvimento e entrega do projeto.

Será criado um banco de dados de produção e de homologação.

## REST API
#### Fastify
O framework escolhido para o desenvolvimento da aplicação foi o Fastify devido a sua robusta documentação e comunidade ativa.

## Funcionalidades Usuário
Abaixo as funcionalidades dos usuários que foram mapeadas até o momento.
- Carteira
  - O usuário pode depositar dinheiro em sua conta pessoal.
  - O usuário pode retirar dinheiro de sua conta pessoal.
- Minerar tokens
  - O usuário faz uma requisição para a rota de mineração e recebe como retorno um token como recompensa do esforço X.
  - O token gerado é armazenado no banco de dados e atrelado ao usuário que o minerou.
- Vender tokens
  - O usuário é capaz de anunciar os seus tokens em um marketplace onde outros usuários podem compra-lo.
  - O anuncio pode ser um comum, fixo com valor definido.
  - O anuncio pode ser do tipo leilão, onde os usuários podem fazer lances de preços a determinado produto.
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

## Escopo do projeto - Solicitação do professor.

#### Abaixo a solicitação original da avaliação com a inclusão de comentários a respeito de nosso projeto.
#### Os estarão marcados da seguinte maneira: ``[COMENTARIO] Texto do comentario.``

## Avaliação - Sagas do Universo Marvel

O Universo Marvel, repleto de super-heróis, vilões e histórias épicas, tem sido uma fonte inesgotável de entretenimento e inspiração. Com a Marvel API, você tem acesso a uma riqueza de informações sobre este universo, desde personagens até as sagas que definem eras.

Objetivo da Atividade

Nesta atividade, você irá desenvolver uma API própria que servirá como um intermediário entre a Marvel API e o usuário final. Sua API irá focar em uma saga específica do Universo Marvel, permitindo aos usuários explorar os personagens envolvidos, os quadrinhos que compõem a saga, e mais. Você irá modelar esta informação através de entidades em seu sistema, sobre as quais você implementará operações CRUD (Create, Read, Update, Delete).

As primeiras rotas de sua API serão para buscar os dados da API da Marvel e salvar em seu banco de dados. Suas outras rotas serão para consulta e manipulação em seu próprio banco de dados.
Descrição da Atividade

1. Registro na Marvel API: Obtenha sua chave de API registrando-se no Marvel Developer Portal. Esta chave permitirá que sua API faça requisições para buscar dados necessários.

``[COMENTARIO] Será utilizado mais de uma chave API no projeto para driblar a limitação máxima de requests permitidos.``

2. Escolha de uma Saga: Selecione uma saga do Universo Marvel para ser o foco da sua API. Esta escolha determinará os dados que você irá buscar e disponibilizar através da sua API.

``[COMENTARIO] O nosso projeto não se limita a uma só saga. Se permitido, a aplicação final suportará todas as sagas em conjunto.``

3. Modelagem das Entidades:
Personagens: Crie uma entidade Personagem para mapear os dados dos personagens que aparecem na saga escolhida. Inclua atributos como nome, descrição, e URL da imagem.

Quadrinhos (Comics): Desenvolva uma entidade Comic que armazena informações sobre os quadrinhos que fazem parte da saga, como título, descrição, data de publicação, e capa.

Criadores: Crie uma entidade Criador que represente os criadores dos quadrinhos (roteiristas, desenhistas, etc.), incluindo nome, função, e quais quadrinhos contribuíram.

``[COMENTARIO] A idéia do projeto não é modelar as entidades acima, a unica entidade relacionada a api será a entidade Token que representa um objeto exclusivo e único. Este token possui informações e caracteristicas originadas dos elementos citados acima, entretanto estes elementos não serão modelados.``

``[COMENTARIO] Isto não significa que nosso sistema irá possuir apenas a entidade Token, no momento ela é a única entidade mapeada que possui uma relação direta com a API da Marvel, existirão outras entidades em nosso sistema como Usuário, Carteira, Anúncio, etc...``

4. Implementação do CRUD: Para cada uma das entidades (Personagem, Comic, Criador), implemente operações CRUD que permitam criar, ler, atualizar e deletar registros no seu sistema.

``[COMENTARIO] A idéia de gerar um CRUD para as entidades citadas limita muito a nossa ideia inicial do projeto, existirão sim operações CRUD no sistema, mas não serão simplistas como "Cadastro de super-heroi"``

5. Rotas Auxiliares: Deverão ser criadas pelo menos 5 rotas auxiliares para complementar a funcionalidade de sua aplicação. O que cada rota irá fazer fica a seu critério.
Exemplos: Rota para listar somente os roteiristas, uma rota para buscar todas as personagens do sexo feminino de determinada sagas, uma rota para contar o total de revistas de derminada saga, e assim por diante.

``[COMENTARIO] Considerando as solicitações até o momento, todo nosso projeto se sustenta em "Rotas Auxiliares", no final é previsto a existencia de mais do que 5 rotas.``

6. Desenvolvimento de Testes:
Testes Automatizados: Escreva testes unitários e de integração para garantir o correto funcionamento das operações CRUD e da lógica de negócios da sua API.
Testes End-to-End (E2E): Implemente testes E2E para simular o fluxo completo de uso da sua API, desde a requisição inicial até a resposta final.
Teste de Carga: Realize um teste de carga para avaliar a performance e a estabilidade da sua API sob condições de uso elevado.

``[COMENTARIO] É previsto a utilização de um sistema auxiliar CI/CD o qual irá realizar testes no projeto de forma contínua. O esperado é que para cada novo elemento desenvolvido os testes cubram cerca de 85%.``

Entregáveis
Código Fonte da API: Inclua todo o código desenvolvido para a API, organizado e documentado.
Documentação das Rotas: Forneça uma documentação clara das rotas disponíveis na sua API, incluindo os métodos HTTP suportados e os formatos de requisição/resposta.
Relatórios de Testes: Apresente os resultados dos testes automatizados, E2E, e de carga, incluindo qualquer ferramenta ou abordagem utilizada para realizá-los.
A ferramenta Jest gera um relatório de cobertura de testes, sendo assim, a meta é alcançar 90% de cobertura de testes na aplicação.

``[COMENTARIO] Outro entregavel esperado de nossa aplicação é uma imagem no dockerhub com a aplicação pronta para execução.``

Critérios de Avaliação
Completeness das operações CRUD para cada entidade.
Qualidade e cobertura dos testes implementados.
Performance e robustez da API, especialmente sob carga.
Clareza da documentação e facilidade de uso da API.

``[COMENTARIO] Os critérios de completeness das operações CRUD para cada entidade não pode ser aplicado a risca em nosso projeto.``

Notas Finais
Esta atividade não apenas aprofunda seu entendimento do Universo Marvel, mas também desenvolve habilidades cruciais em design de API, modelagem de dados, e testes de software. Boa sorte, e que a força dos super-heróis esteja com você!

Aqui estão algumas das sagas mais icônicas e populares da Marvel que você pode utilizar:

1. Guerra Civil (Civil War) - Uma disputa ideológica entre o Capitão América e o Homem de Ferro sobre o registro de super-heróis, levando a uma batalha épica entre heróis da Marvel.

2. Guerras Secretas (Secret Wars) - Heróis e vilões são transportados para um planeta distante chamado Battleworld pelo ser todo-poderoso conhecido como Beyonder para lutar em uma guerra sem precedentes.

3. Era de Ultron (Age of Ultron) - Ultron, uma inteligência artificial, decide erradicar a humanidade e os heróis da Marvel devem encontrar uma maneira de detê-lo.

4. Dinastia M (House of M) - Após um colapso nervoso, a Feiticeira Escarlate altera a realidade para criar um mundo onde os mutantes são a classe dominante, com consequências devastadoras.

5. Infinito (Infinity) - Thanos busca as Joias do Infinito para impor sua vontade sobre a realidade, levando os heróis da Terra e do espaço a se unirem para detê-lo.

6. Aniquilação (Annihilation) - Uma saga cósmica onde Annihilus, do Universo Negativo, lança uma invasão ao universo principal, ameaçando toda a vida existente.

7. Planeta Hulk - O Hulk é exilado no espaço por um grupo de heróis da Terra e acaba em um planeta onde se torna um gladiador e eventualmente um rei.

8. A Queda de Mutantes (The Fall of the Mutants) - Uma série de eventos que afetam drasticamente os X-Men e outros mutantes, levando a mudanças significativas para muitos personagens.

9. Guerra dos Reinos (War of the Realms) - Malekith, o Maldito, lidera um exército de criaturas míticas em uma invasão aos Nove Reinos, incluindo a Terra.

10. X-Men: Fênix Negra (The Dark Phoenix Saga) - Jean Grey se torna possuída pela força da Fênix, transformando-a na Fênix Negra, uma entidade de poder imenso e destrutivo.
Estas sagas oferecem uma variedade de temas e aventuras, desde conflitos internos entre heróis até ameaças cósmicas, ideais para explorar diferentes aspectos do Universo Marvel.

11. King in Black - é uma saga épica da Marvel Comics que serve como culminação de várias histórias escritas por Donny Cates, especialmente aquelas envolvendo o personagem Venom. Lançada entre 2020 e 2021, a história centraliza-se em torno da chegada de Knull, o deus dos simbiontes, à Terra. Knull é uma entidade cósmica antiga que criou os simbiontes (a raça alienígena à qual pertence o Venom) e deseja trazer escuridão e destruição ao universo, eliminando toda a luz e vida que encontra pelo caminho.

``[COMENTARIO] Verificar com o professor a possibilidade de continuar com o projeto fiel a ideia inicial formulada durante a aula, no momento em que a ideia do projeto foi formulada não havia o escopo apresentado acima. Desta forma é necessário verificar a viabilidade de manter a ideia original.``
