# Capa

Título do Projeto: Plataforma de Rotulagem Colaborativa de Imagens para Ensino de IA e Aprendizagem de Máquina (Label4Learn).<br>
Nome do Estudante: Lucas Henrique da Silva.<br>
Curso: Engenharia de Software - Centro Universitário - Católica de Santa Catarina – Jaraguá do Sul, SC – Brasil<br>
Data de Entrega: 29/10/2025<br>

# Resumo

<p align="justify">
  &emsp;A Label4Learn é uma plataforma web colaborativa voltada ao ensino de Inteligência Artificial e Machine Learning, que permite a criação e rotulagem de imagens em sala de aula. O projeto busca superar a dependência de datasets prontos e repetitivos, oferecendo aos estudantes a oportunidade de vivenciar a etapa mais prática e demorada da Ciência de Dados — a rotulagem. Professores podem criar projetos personalizados e acompanhar a participação dos alunos, enquanto a turma colabora na construção de datasets originais que poderão ser usados em atividades e experimentos de IA. A proposta alia aprendizado ativo, colaboração e aplicação prática, promovendo uma formação mais completa e realista para futuros engenheiros de software na Ciência de Dados.
</p>
  
# 1. Introdução
<p align="justify">
  &emsp;No contexto do ensino de Engenharia de Software e Inteligência Artificial, este projeto propõe o desenvolvimento de uma plataforma web de rotulagem colaborativa de imagens, voltada para o meio acadêmico, com foco em cursos de Inteligência Artificial e Machine Learning.
</p>

<p align="justify">
  &emsp;A proposta surge da necessidade de superar a dependência de datasets prontos e repetitivos (como Iris, Titanic e MNIST), amplamente utilizados em sala de aula, mas que não oferecem aos alunos uma experiência prática sobre a etapa mais desafiadora e demorada da Ciência de Dados: a coleta e rotulagem de dados originais.<br>
</p>
<p align="justify">
  &emsp;Essa etapa é fundamental, pois a qualidade e a eficiência do processo de rotulagem impactam diretamente o desempenho dos modelos de Machine Learning — sendo impossível alcançar alta acurácia se os dados de treinamento não forem bem rotulados.
</p>
  
<p align="justify">
  &emsp;Com a plataforma, professores poderão criar projetos de rotulagem específicos para suas disciplinas, enquanto os alunos, de forma colaborativa, participarão do processo de anotação. O resultado será a geração de datasets inéditos e contextualizados, que poderão ser utilizados em atividades práticas de treinamento e avaliação de modelos de IA.<br>
</p>
<p align="justify">
  &emsp;Nesse sentido, a proposta busca aproximar o estudante do processo real de preparação de dados, permitindo vivenciar de forma prática a importância da qualidade dos rótulos na construção de modelos de IA mais precisos e confiáveis.
</p>
  
# 2. Descrição do Projeto
<p align="justify">
  &emsp;O Label4Learn é uma plataforma web inovadora na linha de projetos com Inteligência Artificial (IA), que integra conceitos de Machine Learning e Ciência de Dados aplicados ao contexto educacional. Seu objetivo é proporcionar uma experiência prática e colaborativa no ensino de IA, permitindo que professores e alunos participem ativamente da criação de datasets personalizados e contextualizados.<br>
</p>

<p align="justify">
  &emsp;O projeto propõe o desenvolvimento de uma plataforma de rotulagem colaborativa de imagens, na qual professores criam projetos específicos de anotação e os alunos colaboram rotulando imagens de forma supervisionada. Essa dinâmica possibilita a geração de datasets originais voltados a atividades práticas de IA, superando a dependência de conjuntos de dados prontos e genéricos, como MNIST, Iris ou Titanic, que limitam a criatividade e o aprendizado aplicado.<br>
</p>

<p align="justify">
  &emsp;Na prática, a plataforma permite que docentes desenvolvam projetos de rotulagem em áreas diversas — como classificação de plantas, frutas, objetos ou resíduos — e que os estudantes participem da anotação das imagens que comporão datasets inéditos. Esses dados poderão ser exportados para treinar e avaliar modelos de Machine Learning, tornando o aprendizado mais participativo, completo e alinhado à realidade profissional da Ciência de Dados.<br>
</p>

<p align="justify">
  &emsp;O público-alvo do Label4Learn é composto por professores e estudantes de graduação em Engenharia de Software, Ciência da Computação, Sistemas de Informação e áreas correlatas, além de instituições de ensino técnico e superior que oferecem disciplinas de IA e Machine Learning. Pesquisadores e iniciantes que necessitam criar seus próprios datasets acadêmicos também se beneficiam da ferramenta, que democratiza o acesso a práticas fundamentais da área.<br>
</p>

<p align="justify">
  &emsp;O projeto busca resolver problemas concretos do ensino de IA, como a dependência de datasets genéricos, a ausência de vivência prática nas etapas de coleta e rotulagem de dados e a dificuldade dos professores em propor atividades colaborativas realistas sobre preparação de dados. Atualmente, há uma lacuna entre teoria e prática: não existem ferramentas educacionais que combinem aprendizado ativo com rotulagem acessível e didática em sala de aula.<br>
</p>

<p align="justify">
  &emsp;O diferencial do Label4Learn está justamente em seu foco educacional. Ao contrário de plataformas comerciais como Labelbox ou Supervisely, que atendem empresas e pesquisadores avançados, o Label4Learn foi pensado para o ambiente acadêmico, priorizando simplicidade, colaboração e usabilidade didática. A plataforma incentiva o aprendizado do ciclo completo de Machine Learning — desde a coleta até a preparação dos dados — e será distribuída sob formato open source, permitindo adaptação e adoção em diferentes instituições de ensino.<br>
</p>

<p align="justify">
  &emsp;Em sua fase inicial, o MVP será restrito à rotulagem de imagens, sem suporte a texto, áudio ou vídeo, e não incluirá integração com APIs externas de IA. A validação ocorrerá em ambiente acadêmico controlado, com grupos limitados de alunos, e seu uso será voltado exclusivamente para fins educacionais e de pesquisa.<br>
</p>

# 3. Especificação Técnica

## 3.1 Requisitos de Software

### Requisitos Funcionais (RF)

| Código | Descrição                                                                                                          | Prioridade |
| :----- | :----------------------------------------------------------------------------------------------------------------- | :--------- |
| RF01   | Permitir o cadastro e autenticação de usuários (professores e alunos).                                             | Alta       |
| RF02   | Permitir que professores criem projetos de rotulagem de imagens.                                                   | Alta       |
| RF03   | Permitir que alunos participem de projetos e realizem a rotulagem de imagens.                                      | Alta       |
| RF04   | Permitir a visualização e o acompanhamento do progresso da rotulagem.                                              | Média      |
| RF05   | Permitir o download/exportação dos datasets rotulados em formato CSV.                                              | Alta       |
| RF06   | Exibir estatísticas básicas do projeto (quantidade de imagens rotuladas, participantes). | Média      |

### Requisitos Não-Funcionais (RNF)

| Código | Descrição                                                                            | Categoria        |
| :----- | :----------------------------------------------------------------------------------- | :--------------- |
| RNF01  | A aplicação deve ser acessível via navegador web responsivo.                         | Usabilidade      |
| RNF02  | O sistema deve suportar ao menos 50 usuários simultâneos.                            | Desempenho       |
| RNF03  | As imagens e rótulos devem ser armazenados em banco de dados seguro e versionado.    | Segurança        |
| RNF04  | As ações críticas (criação, edição, exclusão de projetos) devem exigir autenticação. | Segurança        |
| RNF05  | O tempo médio de carregamento das páginas não deve exceder 3 segundos.               | Desempenho       |
| RNF06  | O código deve seguir boas práticas de clean code e arquitetura modular (MVC).        | Manutenibilidade |
| RNF07  | A interface deve ser intuitiva e acessível.     | Usabilidade      |

### Representação dos Requisitos

O diagrama principal envolve três atores:

- Professor → cria e gerencia projetos.
- Aluno → realiza a rotulagem das imagens.
- Sistema → armazena, valida e exporta os dados rotulados.

<img width="3094" height="1828" alt="Label4Learn (2)" src="https://github.com/user-attachments/assets/91541757-8081-44b8-b170-a3d6e8e0ea72" />

Fluxo resumido:

- Professor cria projeto → adiciona imagens → define classes/rótulos → alunos acessam → rotulam → professor revisa → exporta dataset final.

### Aderência à Linha de Projeto – Projetos com IA

O projeto atende integralmente aos requisitos obrigatórios da linha:

- Aplica conceitos de Machine Learning e Data Labeling, parte essencial do ciclo de IA.
- Promove aprendizado prático de coleta e rotulagem de dados, essencial à Engenharia de Software aplicada à IA.

## 3.2 Considerações de Design

### Visão Inicial da Arquitetura

O Label4Learn adota uma arquitetura web moderna baseada em serviços gerenciados, utilizando Next.js para a interface da aplicação e Supabase como plataforma Backend as a Service (BaaS).

A arquitetura é composta pelas seguintes camadas:

- Frontend: Aplicação web desenvolvida com Next.js e React, responsável pela interface do usuário, navegação, gerenciamento de estado e interação com os serviços do sistema.
- Camada de Serviços: Integração com o Supabase para autenticação de usuários, acesso aos dados, armazenamento de arquivos e controle de permissões.
- Banco de Dados: PostgreSQL gerenciado pelo Supabase, responsável pelo armazenamento das informações de usuários, projetos, imagens, rótulos, participantes e anotações.
- Armazenamento de Arquivos: Supabase Storage para armazenamento e gerenciamento das imagens utilizadas nos projetos de rotulagem.
- Autenticação e Controle de Acesso: Supabase Auth para gerenciamento de usuários e definição dos perfis de professor e aluno.

### Padrões de Arquitetura

- Arquitetura em Camadas: Separação entre interface, serviços e persistência de dados, promovendo organização e facilidade de manutenção.
- Backend as a Service (BaaS): Utilização do Supabase para fornecer autenticação, banco de dados e armazenamento sem a necessidade de um servidor backend dedicado.
- Componentização: Uso de componentes React reutilizáveis para promover modularidade e reutilização de código.
- Client-Server Architecture: Comunicação entre a aplicação cliente (Next.js) e os serviços fornecidos pelo Supabase.
- App Router (Next.js): Organização das rotas e páginas seguindo o modelo moderno de roteamento do Next.js.

### Protótipos Iniciais

#### Tela Principal (Home)

<img width="1290" height="730" alt="tela_inicial" src="https://github.com/user-attachments/assets/51f4e471-26ac-4551-ba18-802020e48fbe" />

#### Tela de Cadastro

<img width="1254" height="750" alt="tela_cadastro" src="https://github.com/user-attachments/assets/32f40cf6-aca2-4e14-a5d9-a59d17ba23ee" />

#### Tela de Login

<img width="1251" height="638" alt="tela_login" src="https://github.com/user-attachments/assets/bd9e8e57-dc59-4242-ae80-64f6f4bb27d8" />

#### Tela de Gerenciamento de Projetos do Professor

<img width="1389" height="745" alt="gerencia_projetos" src="https://github.com/user-attachments/assets/39bc575f-6b28-49f7-851a-6c9df4113832" />

#### Tela de Criação de Projetos

<img width="1366" height="661" alt="criacao_projeto1" src="https://github.com/user-attachments/assets/4f07be9b-3f12-44ce-8c57-9bc548063f51" />
<img width="1376" height="533" alt="criacao_projeto2" src="https://github.com/user-attachments/assets/f519f1a6-ed4f-4781-9b5b-28a60ea8f41d" />

#### Tela de Gerenciamento de Projetos do Aluno

<img width="1368" height="744" alt="gerencia_projetos_aluno" src="https://github.com/user-attachments/assets/e0cd0a76-30e1-4e03-8eed-3b306171ab6e" />

#### Tela de Rotulagem das Imagens

<img width="1373" height="734" alt="rotula_imagem" src="https://github.com/user-attachments/assets/0a2329f4-e4ff-4ec8-a2dc-775318f17238" />

### Decisões e Alternativas Consideradas

- React foi escolhido para melhor experiência visual e interação fluida.
- Alternativas descartadas: Django (mais robusto, mas pesado para MVP) e Vue.js (menor domínio técnico da equipe).

### Critérios de Escalabilidade, Resiliência e Segurança

- Deploy em ambiente escalável (Docker + Render ou Railway).
- Banco de dados com backup automático e controle de versão.
- Controle de acesso baseado em função (professor/aluno).
- Criptografia de senhas com bcrypt.
- Validação de entrada e sanitização de dados conforme OWASP Top 10.

## 3.3 Stack Tecnológica

| Categoria          | Tecnologia              | Justificativa                                          |
| :----------------- | :---------------------- | :----------------------------------------------------- |
| Linguagem Backend  | **Node.js**             | Simplicidade e ampla integração com bibliotecas de IA. |
| Frontend           | **ReactJS**             | Framework moderno, responsivo e eficiente.             |
| Banco de Dados     | **PostgreSQL**          | Confiável, open source e robusto.                      |
| Armazenamento      | **AWS S3 / Cloudinary** | Gerenciamento de imagens e escalabilidade.             |
| Controle de Versão | **Git + GitHub**        | Colaboração e versionamento.                           |
| IDE                | **VS Code**             | Leve, multiplataforma e produtiva.                     |
| Design             | **Figma**               | Criação de mockups interativos.                        |
| Hospedagem         | **Render / Railway**    | Deploy gratuito e escalável para MVP.                  |

Licenciamento:

- Todas as tecnologias são open source (MIT, Apache 2.0, ou equivalentes).

## 3.4 Considerações de Segurança

### Riscos Identificados

- Injeção de código (SQL Injection, XSS).
- Vazamento de credenciais.
- Upload indevido de arquivos não permitidos.
- Exposição indevida de dados de usuários.

### Medidas de Mitigação

- Sanitização e validação de todas as entradas.
- Autenticação segura (JWT).
- Criptografia de senhas com bcrypt.
- Controle de permissões baseado em função (RBAC).
- Armazenamento de imagens apenas em ambientes restritos.

### Normas e Boas Práticas Seguidas

- OWASP Top 10 (prevenção de vulnerabilidades web).
- LGPD (proteção e uso ético de dados).
- Princípios de Ética em IA (UNESCO / OECD).

### Responsabilidade Ética

- Os dados utilizados (imagens) serão obtidos de bases de domínio público ou gerados academicamente.
- O sistema não processará dados pessoais, respeitando a privacidade, consentimento e finalidade educacional.

## 3.5 Conformidade e Normas Aplicáveis

| Norma / Lei                    | Aplicação no Projeto                                                                           |
| :----------------------------- | :--------------------------------------------------------------------------------------------- |
| **LGPD (Lei nº 13.709/2018)**  | Coleta mínima de dados pessoais; uso acadêmico restrito; política de consentimento e exclusão. |
| **WCAG 2.1**                   | Diretrizes básicas de acessibilidade na interface.                                             |
| **OWASP Top 10**               | Prevenção contra vulnerabilidades web comuns.                                                  |
| **UNESCO – Ética em IA**       | Compromisso com uso educacional e não discriminatório de dados.                                |
| **Creative Commons (imagens)** | Uso de imagens livres de direitos autorais.                                                    |

# 4. Próximos Passos

## 4.1. Visão Geral

<p align="justify">
O projeto Label4Learn será desenvolvido em duas etapas principais — Portfólio I e Portfólio II — correspondendo ao ciclo completo de concepção, implementação e validação da solução.<br>
O foco inicial será construir um MVP funcional (mínimo produto viável) voltado à rotulagem colaborativa de imagens no contexto acadêmico, garantindo base sólida para expansão futura.
</p>

## 4.2. Portfólio I – Planejamento e Prototipagem (Semestre Atual)

Objetivo geral: Estruturar os fundamentos conceituais, técnicos e visuais da plataforma.
| Mês / Etapa | Descrição da Atividade | Entregável |
| :--------------------------- | :------------------------------------------------------------------------------------------ | :---------------------------------------------------- |
| **Outubro** | Finalização do RFC e definição dos requisitos funcionais e não funcionais. | Documento RFC completo e validado. |
| **Outubro – Novembro** | Desenvolvimento dos mockups no Figma e estruturação do design do sistema (arquitetura MVC). | Protótipo navegável e diagrama de arquitetura. |
| **Novembro** | Implementação inicial do backend (API Express) e configuração do banco de dados. | API base funcional e conexão com PostgreSQL. |
| **Dezembro** | Integração com o frontend (ReactJS) e teste das rotas principais. | MVP funcional: criação de projeto e rotulagem básica. |
| **Encerramento Portfólio I** | Apresentação do MVP parcial e relatório técnico intermediário. | Apresentação + relatório técnico parcial. |

## 4.3. Portfólio II – Implementação, Testes e Entrega Final

Objetivo geral: Consolidar o MVP, incluir funcionalidades complementares e validar o uso em contexto acadêmico.
| Mês / Etapa | Descrição da Atividade | Entregável |
| :---------- | :-------------------------------------------------------------------------------- | :--------------------------------------------- |
| **Março** | Revisão da arquitetura e integração com armazenamento de imagens (S3 ou similar). | Sistema completo com upload de imagens. |
| **Abril** | Implementação da área do professor e módulo de estatísticas. | Painel administrativo e controle de rotulagem. |
| **Maio** | Testes de usabilidade com turmas piloto e ajustes na interface. | Relatório de testes e refinamento do sistema. |
| **Junho** | Preparação da documentação final e defesa do projeto. | Relatório final + demonstração funcional. |

## 4.4. Marcos de Acompanhamento (Checkpoints)

| Marco                                 | Descrição                                                | Data Prevista |
| :------------------------------------ | :------------------------------------------------------- | :------------ |
| **M1 – RFC Validado**                 | Entrega e aprovação do documento RFC completo.           | Outubro/2025  |
| **M2 – Mockup e Arquitetura Prontos** | Protótipo navegável e definição da arquitetura técnica.  | Novembro/2025 |
| **M3 – MVP Básico**                   | Plataforma com rotulagem de imagens funcional.           | Dezembro/2025 |
| **M4 – MVP Expandido**                | Sistema completo com painel do professor e estatísticas. | Abril/2026    |
| **M5 – Testes Acadêmicos**            | Uso piloto com estudantes em disciplina de IA.           | Maio/2026     |
| **M6 – Entrega Final / Defesa**       | Relatório técnico e demonstração funcional.              | Junho/2026    |

## 4.5. Próximos Passos Imediatos

- Finalizar e submeter o RFC à validação do orientador.
- Desenvolver os mockups e o diagrama de arquitetura inicial (C4 e casos de uso).
- Configurar ambiente de desenvolvimento (GitHub, Node, PostgreSQL e React).
- Iniciar implementação do backend e integração básica para criação e rotulagem de imagens.

# 5. Referências

- Universidade Federal de Santa Catarina (UFSC). Desenvolvimento de uma aplicação web para rotulagem colaborativa de imagens voltada ao ensino de IA. Disponível em: https://repositorio.ufsc.br/handle/123456789/228154
- Insper – Projeto IBM. Plataforma de rotulagem e curadoria de dados para modelos de Machine Learning. Disponível em: https://pfe.insper.edu.br/arquivos/ibm/projeto39/Grupo_IBM_trabalho.pdf
- Universidade Federal de Santa Catarina (UFSC). Análise e desenvolvimento de uma ferramenta de anotação de dados para visão computacional. Disponível em: https://repositorio.ufsc.br/handle/123456789/232649
- Rubeus. Machine Learning na Educação: o futuro do ensino personalizado. Disponível em: https://rubeus.com.br/blog/machine-learning-na-educacao/
- Alura. Qual é a diferença entre Data Science, Machine Learning e Inteligência Artificial? Disponível em: https://www.alura.com.br/artigos/qual-e-a-diferenca-de-data-science-machine-learning-e-inteligencia-artificial
- Amazon Web Services (AWS). O que é rotulagem de dados? Disponível em: https://aws.amazon.com/pt/what-is/data-labeling/
