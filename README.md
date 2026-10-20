
# Secure by Design Lab

Protótipo educacional em Next.js App Router, TypeScript, Tailwind CSS e shadcn/ui para demonstrar controles de autenticação alinhados à OWASP Top 10:2025.

## Executar

Requisitos: Node.js 20+ e pnpm 10+.

```bash
pnpm install
cp .env.example .env.local
```

Gere o hash da senha demo e preencha `DEMO_USER_PASSWORD_HASH`:

```bash
node -e 'const c=require("node:crypto"); const s=c.randomBytes(16); const h=c.scryptSync("Pass@word123!",s,32,{N:16384,r:8,p:1}); console.log(`scrypt$16384$8$1$${s.toString("hex")}$${h.toString("hex")}`)'
```

Gere também um segredo aleatório para `SESSION_SECRET`:

```bash
node -e 'console.log(require("node:crypto").randomBytes(32).toString("base64url"))'
```

Inicie a aplicação:

```bash
pnpm dev
```

Abra `http://localhost:3000`. A credencial demo é `user@security.local` / `Pass@word123!`.

O cookie de sessão usa `Secure=true` por requisito de segurança. Navegadores modernos tratam `localhost` como contexto confiável; para outros hosts, use HTTPS.

## Rotas

- `/`: entrada do laboratório.
- `/login`: login com React Hook Form e Zod.
- `/dashboard`: área restrita com verificação server-side.
- `POST /api/auth/login`: valida credenciais, rate limiting e criação da sessão.
- `POST /api/auth/logout`: expiração completa do cookie.
- `POST /api/notes`: validação, sanitização e processamento server-side de notas.

## Controles OWASP Top 10:2025

### A01:2025 - Broken Access Control

- `proxy.ts` intercepta `/dashboard/:path*` e redireciona requisições sem sessão válida.
- `lib/auth.ts` executa `requireUser()` durante o render server-side. O Proxy é defesa adicional, não a autorização principal.
- `app/api/notes/route.ts` também chama `requireUser()`, impedindo acesso direto à API sem autenticação.
- O dashboard usa o e-mail da sessão criptografada, nunca um valor de identidade enviado pelo cliente.

### A05:2025 - Injection

- `lib/auth-schema.ts` limita tipo, tamanho, formato e conteúdo dos campos com Zod.
- `lib/server-schemas.ts` usa `sanitize-html` sem tags ou atributos permitidos antes de processar notas.
- `app/api/notes/route.ts` valida e sanitiza novamente no servidor.
- A renderização usa escape padrão do React e não utiliza `dangerouslySetInnerHTML`.
- CSP, `X-Content-Type-Options`, `X-Frame-Options` e `Referrer-Policy` estão em `next.config.ts`.

### A07:2025 - Authentication Failures

- A sessão é um token JWE criptografado com `jose`, armazenado apenas em cookie HttpOnly.
- O cookie usa `Secure`, `SameSite=Strict`, `Path=/` e expiração curta de 15 minutos.
- O login compara um hash scrypt com comparação resistente a timing attacks.
- Falhas de login retornam mensagens genéricas para evitar enumeração de contas.
- `lib/rate-limit.ts` bloqueia temporariamente tentativas repetidas por IP e e-mail.
- Logout executa no servidor e sobrescreve o cookie com expiração no passado.
- O token não é salvo em `localStorage` nem em `sessionStorage`.

## Decisões e limitações

O Next.js 16 renomeou a convenção `middleware.ts` para `proxy.ts`; por isso o projeto usa `proxy.ts`, que exerce a mesma função de proteção antecipada. A autorização server-side continua obrigatória.

O usuário demo, o rate limiting e a sessão existem em memória/configuração local. Para produção, substitua-os por um provedor de identidade ou banco, armazenamento distribuído de rate limiting, revogação persistente de sessões, auditoria e observabilidade. O formulário de notas não persiste dados.

Este projeto é didático e não substitui revisão de segurança, threat modeling ou testes de penetração antes de produção.