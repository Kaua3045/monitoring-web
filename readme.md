# Monitoring API

## Ferramentas utilizadas
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Sobre

Eu criei um projeto para verificar a disponibilidade do seu site através de uma url fornecida, você pode escolher se quer verificar uma única vez, se você quer verificar todos os dias no mesmo horário ou então a cada mês, tendo um painel que mostra a porcentagem de tempo online, podendo filtrar as verificações por um período, você também pode ver qual foi o tempo de resposta da sua aplicação, para cada verificação e o status.

- Porquê decidiu fazer esse projeto?
  - Para aplicar o que eu estudava, aprender mais sobre deploy e aplicar tudo em um projeto grande

- Quais foram os desafios de implementá-lo?
  - Toda a integração com backend, organização, o frontend todo em sí foi um desafio

- O que eu aprendi com ele?
  - Aprendi a integrar com o backend, como os dados são enviados e também aprendi sobre css

## Tabela de conteúdos

- [Requsitos para rodar o projeto](#requisitos)
- [Instruções para executar o projeto](#instruções-para-executar-o-projeto)
- [Contribua com o projeto](#contribuindo-com-o-projeto)
- [Changelog](#changelog)

## Requisitos para rodar o projeto

1. Node.Js 18.13.0
2. yarn, npm ou pnpm (preferencialmente o yarn)

## Instruções para executar o projeto

1. Baixe a aplicação e instale as dependências:
```bash
# Baixando o projeto e acessando o diretorio
git clone https://github.com/Kaua3045/monitoring-web.git cd monitoring-web

# Baixando as dependências
yarn install
```

2. Antes de executar a aplicação, você precisa configurar o arquivo .env.example, depois renomeie ele para .env

3. Agora inicie a aplicação:
```bash
# Iniciando a aplicação
yarn dev
```
4. A url base da aplicação é: *localhost:5173/*

## Contribuindo com o projeto

Para contribuir com o projeto, veja mais informações em [CONTRIBUTING](doc/CONTRIBUTING.md)

## Changelog

Para ver as últimas alterações do projeto, acesse [AQUI](doc/changelog.md)