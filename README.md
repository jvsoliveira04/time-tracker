# Meu Ponto - Controle Pessoal de Ponto de Trabalho

Aplicativo web para controle e monitoramento pessoal do seu ponto de trabalho.

## 📋 Sobre

**Meu Ponto** é um aplicativo pessoal que funciona como um espelho/controle do seu registro de ponto. Ele **NÃO substitui** o sistema oficial da empresa, apenas oferece uma visualização prática das suas horas e saldo.

## 🚀 Como Usar no GitHub Codespaces (iPhone)

### Passo 1: Abrir o Codespaces

1. Acesse: https://github.com/jvsoliveira04/time-tracker
2. Clique em **Code** → **Codespaces** → **Create codespace on main**
3. Aguarde o ambiente abrir (pode levar 1-2 minutos)

### Passo 2: Instalar Dependências

No terminal do Codespaces, execute:

```bash
npm install
```

### Passo 3: Iniciar o Servidor

```bash
npm run dev
```

Você verá uma mensagem como:

```
VITE v5.0.0  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Passo 4: Abrir no Safari do iPhone

1. No Codespaces, clique no botão **Ports** (na parte inferior)
2. Você verá a porta `5173` listada
3. Clique no ícone de globo (abrir em navegador)
4. A URL será algo como: `https://xxx-5173.preview.app.github.dev`
5. Copie essa URL
6. No Safari do iPhone, abra a URL
7. A página deve carregar e mostrar: **"Meu Ponto"**

## 📁 Estrutura do Projeto (Fase 1)

```
src/
├── App.tsx          # Componente principal
├── App.css          # Estilos
├── main.tsx         # Entrada da aplicação
└── index.css        # Estilos globais

index.html           # HTML principal
vite.config.ts       # Configuração do Vite
tsconfig.json        # Configuração do TypeScript
package.json         # Dependências
```

## 🛠️ Tecnologias Usadas

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **CSS Puro** - Sem frameworks adicionais

## 📝 O que foi criado na Fase 1

✅ Estrutura React + TypeScript + Vite  
✅ Página inicial com "Meu Ponto"  
✅ Design responsivo (Mobile First)  
✅ Pronto para rodar no Codespaces  
✅ Funciona no Safari do iPhone  

## ❌ O que NÃO foi implementado ainda

- ❌ Botão "BATER PONTO"
- ❌ Banco de dados (IndexedDB)
- ❌ Cálculos de horas
- ❌ Histórico de marcações
- ❌ PWA
- ❌ Comprovantes
- ❌ Notificações

## 🔄 Próximos Passos (Fase 2)

1. Adicionar IndexedDB com Dexie.js
2. Criar tipos de dados (TimeEntry, WorkSchedule, etc)
3. Implementar o botão "BATER PONTO"
4. Criar identificação automática do próximo ponto
5. Salvar marcações no banco local

## 🧪 Testes Básicos

Para verificar se tudo está funcionando:

1. ✅ Página carrega sem erros
2. ✅ Título "Meu Ponto" aparece
3. ✅ Design responsivo (teste no iPhone)
4. ✅ Sem erros no console

## 📱 Comandos Disponíveis

```bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build
npm run type-check   # Verificar erros TypeScript
```

## 📞 Problemas?

Se encontrar erro ao executar `npm run dev`:

1. Certifique-se de ter executado `npm install`
2. Tente limpar cache: `rm -rf node_modules && npm install`
3. Verifique se a porta 5173 está disponível

## 📄 Licença

Projeto pessoal - Uso privado

---

**Status**: Fase 1 - Estrutura Básica ✅  
**Última atualização**: 09/09/2026
