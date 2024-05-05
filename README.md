# Marvel NFT

Prova prática para a disciplina de Desafio Profissional V do 5º semestre do curso de graduação de Engenharia de Software da Unicesumar.

Desenvolvido por **Kauan Muriel Rossi (2214501-2)** e **Daniel Bonam Rissardi (22013838-2)**

## Sumario

- Visão geral
- Tecnologias utilizadas
- Funcionalidades
- CI/CD
- Testes
- Observações

## Visão Geral

Nossa prova prática consiste em uma aplicação web o qual os usuário podem minerar tokens unícos que podem ser colecionados ou vendidos á outros usuarios do sistema.

Semelhante a um ecosistema de NFT’s, a plataforma permite a mineração de tokens únicos que podem ser vendidos dentro do marketplate. Os tokens são gerados a partir de consultas da API da marvel, e armazenam os dados relacionados ao conteudo em formato json, que pode ser lido e utilizado em outras aplicacoes

## Tecnologias utilizadas

- [Typescript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [Swagger](https://swagger.io/)
- [Artillery](https://www.artillery.io/)
- [Inversify](https://inversify.io/)
- [JWT](https://jwt.io/)
- [Postgresql](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker-compose](https://docs.docker.com/compose/)
- [Github Actions](https://docs.github.com/pt/actions)

Iniciando pelo o backend, ele foi inteiramente desenvolvido em Typescript, a fim de garantir que o desenvolvimento do sistema pudesse utilizar dos benefícios da tipagem estática. Para o desenvolvimento da API utilizamos o framework Fastify, que possibilita uma alta produtividade devido a sua simplicidade, juntamente com a simples criação de documentação utilizando Swagger. O ORM escolhido foi o TypeORM que oferece uma abstração do banco de dados para manipular os dados da aplicação, reduzindo a quantidade de códigos SQL necessários para o desenvolvimento das funcionalidades.

Toda a autenticação e autorização do sistema é manipulada internamente pela solução, sem a utilização de bibliotecas externas, com exceção da geração e validação de JWTs, que aliás é utilizado em todas as etapas para garantir uma maior segurança, devido à sua simplicidade e ao manuseio de informações.

Para a testagem E2E da aplicação escolhemos a biblioteca jest, devido à sua grande comunidade e facilidade de uso, e com a possibilidade de integrar a funcionalidade de envio de requests do próprio Fastify e validar os resultados com o jest, tornou-se perfeito para a cobertura da solução. Já para a realização do teste de carga utilizamos o Artillery, que diferentemente das demais bibliotecas, trabalha como uma aplicação separada, garantindo maior fidelidade aos testes em comparação com um possível deploy para produção.

O banco escolhido para o armazenamento das informações do sistema foi o PostgreSQL, devido à sua alta estabilidade, facilidade de utilização, integração com ORMs e ao fato de ser uma aplicação Open Source.

Por fim, toda a solução foi desenvolvida utilizando containers Docker, garantindo que todos os testes, utilizações de códigos de terceiros, variáveis de ambiente e etc, funcionassem tanto localmente, enquanto era realizado o desenvolvimento, quanto em ambientes em nuvem. Facilitando, assim, o deploy da aplicação, que pode ser inicializada a partir do arquivo docker-compose disponibilizado no repositório de código do marvel-nft.

## Funcionalidades

Abaixo as funcionalidades desenvolvidas.

- Autenticação
    - O sistema conta com uma autenticação, onde para realizar ações relevantes na aplicação é necessário que o usuário esteja tenha criado uma conta válida e esteja logado ao sistema.
- Carteira do usuário
    - Os usuários possuem uma carteira própria onde podem depositar ou sacar dinheiro. Os usuários utilizam a carteira para comprar novos tokens ou ganhar dinheiro por meio da venda dos mesmos.
- Minerar tokens
    - O usuário faz uma requisição para a rota de mineração e recebe como retorno um token como recompensa de seu esforço.
    - Cada token é unico, o mesmo é gerado por meio da API da marvel.
    - O token gerado é armazenado no banco de dados e atrelado ao usuário que o minerou.
- Marketplace de tokens
    - O usuário é capaz de anunciar os seus tokens em um marketplace onde outros usuários podem compra-lo.
    - O anuncio possui um valor fixo com valor definido.
    - O usuário é capaz de adquirir novos tokens por meio de seu dinheiro na plataforma.
- Obter detalhes do conteúdo do token
    - O usuário pode visualizar os detalhes de um tokens.
    - Os dados podem ser do seu token ou de tokens de outros usuários.

## CI/CD

Para este projeto, foi implementado um fluxo de integração e entrega contínua por meio do Github Actions.

![image](https://github.com/KauanMuriel/marvel-nft/assets/85623265/2012e01e-f7d9-4276-a958-fe2d7241673b)

A implementação do CI/CD permitiu que a cada nova funcionalidade desenvolvida, a aplicação seria preparada em um contêiner e testada de forma completamente automatica.

O fluxo desenvolvido segue as seguinte etapas:

- build_node_job
    - Está etapa é responsável por gerar a imagem docker marvelnft:node o qual possui a nossa aplição node pronta para ser executada.
    - Após gerar está imagem corretamente, a mesma é salva no Dockerhub.
- aplication_tests
    - Está etapa é responsável por realizar os testes gerais da aplicação, por meio da imagem gerada na etapa anterior são realizados todos os testes e caso haja algum teste inválido ele nos gera um alerta e o fluxo é encerrado.
- aplication_load_test
    - Está etapa é responsável por realizar os testes de carga da aplicação, por meio da imagem gerada na primeira etapa, iniciamos a aplicação e realizamos os testes de carga por meio do artillery.

> Você pode visualizar a pipeline clicando [aqui](https://github.com/KauanMuriel/marvel-nft/actions/runs/8955291704) ou clicando em Actions>Build and Deploy
> 

## Testes

Abaixo estão descritos os testes realizados em nossa aplicação.

![image](https://github.com/KauanMuriel/marvel-nft/assets/85623265/62b51806-8bdc-456d-817d-e822c1304b1b)

Assim como é mostrado na imagem acima, o domínio de testes está separado em três principais elementos. mocks, performance e routes.

- **Mocks**
    - Abrange os testes gerais do sistema, testa os services, controllers, repositories e muito mais de forma individual e unitaria.
    - Os testes mocks também são responsáveis por simular um banco de dados para os demais testes, fazendo assim, com que não seja necessário um banco de dados populado apenas para testes.
- **Performance**
    - Abrange os testes de carga da aplicação, nesta pasta é definido o arquivo de testes que é executado pelo CI/CD
- **Routes**
    - Abrange os testes das rotas do sistema, aqui são definidos os testes E2E da aplicação.

Como explicado anteriormente, todos os testes são executados pelo Github Actions (CI/CD). Desta forma, o resultado dos testes pode ser observado no log da pipeline.

**Testes Gerais (Testes Unitários, E2E, etc…):**

![image](https://github.com/KauanMuriel/marvel-nft/assets/85623265/b7f8520f-2984-4ff2-bac5-7a2a6781b27d)

**Testes de carga:**

![image](https://github.com/KauanMuriel/marvel-nft/assets/85623265/9588d44c-1ffe-4ec5-868d-4932e844c50d)

## Observações

- Todas as rotas implementadas no sistema foram organizadas utilizando a ferramenta Swagger, que pode ser acessada na rota localhost:3000/docs, assim que os containers do docker-compose estiverem em execução.
    
    ![image](https://github.com/KauanMuriel/marvel-nft/assets/85623265/9f974910-f8de-4b8c-a6c1-6a4f67f2d9f8)
    

- A fim de aplicar os princípios SOLID e de Clean Architecture na aplicação, foi fortemente utilizado o desacoplamento das classes a partir de interfaces e a implementação da inversão de dependências. Isso permitiu a utilização de abstrações de bancos de dados diferentes durante a execução do sistema ou testes, de maneira facilitada, sem a necessidade de modificações nas classes que as utilizavam. Para isso, foi utilizada a biblioteca TypeDI, que fornece o container de injeção de dependências utilizado no sistema.
    
    ![image](https://github.com/KauanMuriel/marvel-nft/assets/85623265/8213151f-e3c0-4835-8eaa-ba0803f61e08)
    

- O nosso projeto utilizou fortemente a tecnologia Docker durante todo o seu ciclo de vida. Desde o desenvolvimento, testes e por fim a entrega final está diretamente ligada a conteiners. A aplicação é executada e distribuida em uma imagem docker, o banco de dados postgres utilizado foi um conteiner e a entrega, o Docker-compose.yml consiste na junção do conteiner postgres com o conteiner marvelnft:node com a versão mais recente da aplicação. Basta executar docker-compose up para ter todo o nosso sistema em perfeita execução.

    ![image](https://github.com/KauanMuriel/marvel-nft/assets/85623265/37dc00a5-efe6-4187-9b28-c436091abe99)


- Outro ponto interessante a ser destacado, é como driblamos o limite de 3000 requests da API da marvel. Por padrão, a API da marvel limita 3000 requisições por dia, o que para nossa aplicação completamente insustentável. A alternativa que encontramos foi a de cadastrar mais de uma chave na aplicação e alternar entre as chaves para as requisições.

    ![image](https://github.com/KauanMuriel/marvel-nft/assets/85623265/d6f71227-4bc3-4503-92bd-d228d76771e7)


- Links interessantes:
    - [Github actions](https://github.com/KauanMuriel/marvel-nft/actions)
    - [Dockerhub](https://hub.docker.com/r/b0nam/marvelnft)

## Escopo do projeto - Solicitação do professor.

### Abaixo a solicitação original da avaliação com a inclusão de comentários a respeito de nosso projeto.

### Os estarão marcados da seguinte maneira: `[COMENTARIO] Texto do comentario.`

## Avaliação - Sagas do Universo Marvel

O Universo Marvel, repleto de super-heróis, vilões e histórias épicas, tem sido uma fonte inesgotável de entretenimento e inspiração. Com a Marvel API, você tem acesso a uma riqueza de informações sobre este universo, desde personagens até as sagas que definem eras.

Objetivo da Atividade

Nesta atividade, você irá desenvolver uma API própria que servirá como um intermediário entre a Marvel API e o usuário final. Sua API irá focar em uma saga específica do Universo Marvel, permitindo aos usuários explorar os personagens envolvidos, os quadrinhos que compõem a saga, e mais. Você irá modelar esta informação através de entidades em seu sistema, sobre as quais você implementará operações CRUD (Create, Read, Update, Delete).

As primeiras rotas de sua API serão para buscar os dados da API da Marvel e salvar em seu banco de dados. Suas outras rotas serão para consulta e manipulação em seu próprio banco de dados.
Descrição da Atividade

1. Registro na Marvel API: Obtenha sua chave de API registrando-se no Marvel Developer Portal. Esta chave permitirá que sua API faça requisições para buscar dados necessários.

`[COMENTARIO] Será utilizado mais de uma chave API no projeto para driblar a limitação máxima de requests permitidos.`

1. Escolha de uma Saga: Selecione uma saga do Universo Marvel para ser o foco da sua API. Esta escolha determinará os dados que você irá buscar e disponibilizar através da sua API.

`[COMENTARIO] O nosso projeto não se limita a uma só saga. Se permitido, a aplicação final suportará todas as sagas em conjunto.`

1. Modelagem das Entidades:
Personagens: Crie uma entidade Personagem para mapear os dados dos personagens que aparecem na saga escolhida. Inclua atributos como nome, descrição, e URL da imagem.

Quadrinhos (Comics): Desenvolva uma entidade Comic que armazena informações sobre os quadrinhos que fazem parte da saga, como título, descrição, data de publicação, e capa.

Criadores: Crie uma entidade Criador que represente os criadores dos quadrinhos (roteiristas, desenhistas, etc.), incluindo nome, função, e quais quadrinhos contribuíram.

`[COMENTARIO] As modelagens solicitadas foram desenvolvida utilizando como base a API da marvel, elas foram aplicadas a funcionalidade de criação de novas contas, onde é solicitado o personagem, o quadrinho e o criador favorito.`

1. Implementação do CRUD: Para cada uma das entidades (Personagem, Comic, Criador), implemente operações CRUD que permitam criar, ler, atualizar e deletar registros no seu sistema.

`[COMENTARIO] O crud solicitado foi desenvolvido, onde os usuários admin podem realizar o crud dos personagens, quadrinhos e criadores favoritos para que os usuários utilizem no momento da criação de novas contas.`

1. Rotas Auxiliares: Deverão ser criadas pelo menos 5 rotas auxiliares para complementar a funcionalidade de sua aplicação. O que cada rota irá fazer fica a seu critério.
Exemplos: Rota para listar somente os roteiristas, uma rota para buscar todas as personagens do sexo feminino de determinada sagas, uma rota para contar o total de revistas de derminada saga, e assim por diante.

`[COMENTARIO] Como todo nosso projeto se sustenta em "Rotas Auxiliares", finalizamos o mesmo com 14 rotas auxiliares.`

1. Desenvolvimento de Testes:
Testes Automatizados: Escreva testes unitários e de integração para garantir o correto funcionamento das operações CRUD e da lógica de negócios da sua API.
Testes End-to-End (E2E): Implemente testes E2E para simular o fluxo completo de uso da sua API, desde a requisição inicial até a resposta final.
Teste de Carga: Realize um teste de carga para avaliar a performance e a estabilidade da sua API sob condições de uso elevado.

`[COMENTARIO] Os testes foram desenvolvidos conforme o solicitado. Os mesmo são executados no CI/CD desenvolvido utilizando o Github Actions`

Entregáveis
Código Fonte da API: Inclua todo o código desenvolvido para a API, organizado e documentado.
Documentação das Rotas: Forneça uma documentação clara das rotas disponíveis na sua API, incluindo os métodos HTTP suportados e os formatos de requisição/resposta.
Relatórios de Testes: Apresente os resultados dos testes automatizados, E2E, e de carga, incluindo qualquer ferramenta ou abordagem utilizada para realizá-los.
A ferramenta Jest gera um relatório de cobertura de testes, sendo assim, a meta é alcançar 90% de cobertura de testes na aplicação.

`[COMENTARIO] Outro entregavel gerado pelo nosso trabalho é a imagem docker da aplicação. O codigo fonte se encontra no github, as documentações das rotas foram geradas pelo swagger e os relatorios de testes podem ser vistos nos logs no CI/CD`

Critérios de Avaliação
Completeness das operações CRUD para cada entidade.
Qualidade e cobertura dos testes implementados.
Performance e robustez da API, especialmente sob carga.
Clareza da documentação e facilidade de uso da API.

`[COMENTARIO] Todos os critérios foram atingidos.`

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
