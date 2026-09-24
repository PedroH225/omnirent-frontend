# OmniRent Frontend

> Read in other languages: [English](README-eng.md)

## Descrição

Frontend da plataforma OmniRent, um marketplace para aluguel de equipamentos variados.

A aplicação permite que usuários anunciem equipamentos, pesquisem itens disponíveis, realizem aluguéis, acompanhem pagamentos e gerenciem suas operações através de uma interface responsiva integrada à OmniRent API.

## Objetivo

O projeto foi desenvolvido com o objetivo de compor um portfólio em desenvolvimento frontend, aplicando práticas utilizadas em aplicações web modernas e integração com uma arquitetura backend próxima de ambientes de produção.

## Tecnologias

* **Frontend**: Angular 19, TypeScript, HTML, SCSS
* **Componentes de Interface**: PrimeNG, PrimeIcons
* **Autenticação**: JWT através de cookies HttpOnly, OAuth2 com Google e GitHub
* **Comunicação com API**: Angular HttpClient, interceptors e tratamento centralizado de erros
* **Tempo Real**: WebSocket, STOMP e SockJS
* **Pagamentos**: Integração com Stripe (Sandbox)
* **Cache**: Cache local com expiração, versionamento e invalidação
* **Internacionalização**: Suporte a múltiplos idiomas, locale e fusos horários
* **Segurança**: Proteção CSRF, guards de autenticação e autorização
* **Responsividade**: Interface adaptada para desktop e dispositivos móveis
* **Deploy / Hospedagem:** Cloudflare Workers

## Execução

**1.** Configure o endereço da API nos arquivos de ambiente da aplicação.
- [Development](src/scripts/proxy.conf.json) 
- [Production](worker/src/index.js)

**2.** Instale as dependências:

```bash
npm install
```

**3.** Execute o servidor de desenvolvimento:

```bash
ng serve
```

## Funcionalidades

### Equipamentos

* Feed de equipamentos disponíveis para aluguel
* Pesquisa por título
* Filtragem por categoria, subcategoria e condição
* Ordenação por data e preço
* Visualização detalhada dos anúncios
* Cadastro e edição de equipamentos
* Upload e visualização de imagens
* Gerenciamento de disponibilidade dos anúncios
* Interface responsiva para listagem de equipamentos

### Aluguéis

* Criação de solicitações de aluguel
* Visualização de aluguéis realizados e recebidos
* Acompanhamento do ciclo de vida do aluguel
* Atualização das etapas de preparação, envio, uso e devolução
* Exibição de informações operacionais atualizadas
* Tratamento de alterações de estado e indisponibilidade

### Pagamentos

* Redirecionamento para Stripe Checkout
* Acompanhamento do processamento do pagamento
* Atualização do status de pagamento em tempo real
* Integração com eventos recebidos via WebSocket
* Tratamento dos estados de pagamento pendente, processando e confirmado

### Autenticação

* Cadastro de usuários
* Login com email e senha
* Login utilizando Google e GitHub
* Sessão baseada em JWT armazenado em cookie HttpOnly
* Proteção de rotas autenticadas
* Controle de acesso baseado em permissões
* Tratamento de expiração e invalidação de sessão

### Conta do Usuário

* Dashboard da conta
* Gerenciamento de perfil
* Cadastro, edição e remoção de endereços
* Gerenciamento de equipamentos anunciados
* Visualização de equipamentos alugados e disponibilizados para aluguel
* Configurações da conta
* Navegação adaptada para desktop e dispositivos móveis

### Administração

* Área protegida por permissão administrativa
* Consulta e gerenciamento de usuários
* Banimento e reativação de usuários
* Consulta de equipamentos
* Aprovação e rejeição de anúncios
* Bloqueio e desbloqueio de equipamentos
* Interface específica para operações administrativas

### Cache

* Cache local de informações utilizadas com frequência
* Diferentes períodos de expiração conforme o tipo de dado
* Cache separado por usuário quando necessário
* Invalidação automática após operações de criação, edição ou remoção
* Versionamento dos dados armazenados
* Limpeza de entradas expiradas ou incompatíveis
* Redução de chamadas desnecessárias à API

### Internacionalização

* Interface disponível em múltiplos idiomas
* Tradução dinâmica de textos e enums
* Formatação de dados baseada no locale selecionado
* Tratamento de datas e fusos horários

### Tratamento de Erros

* Interceptor HTTP centralizado
* Tratamento de erros retornados pela API
* Mensagens de feedback através de notificações
* Tratamento específico para limite de requisições
* Tratamento de indisponibilidade do servidor
* Tratamento de recursos não encontrados
* Redirecionamento em casos de acesso não autorizado

### Interface

* Layout responsivo
* Navbar adaptativa
* Drawer de navegação
* Feedback visual de carregamento
* Skeletons durante carregamento de dados
* Estados específicos para conteúdo vazio ou não encontrado
* Suporte a tema visual da aplicação

