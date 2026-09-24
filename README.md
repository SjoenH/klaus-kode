# Klaus Kode

The "Claude Code killer" CLI harness.

> Hei, dette er ett løsningsforslag koblet opp mot Gemini flash som språkmodell, med ett enkelt oppsett for tool-calling.
> Laget til faggruppen i Miles - KI-fra-førsteprinsipp [23 September 2026](https://life.miles.no/events/fde56f67-894c-418f-b3a8-9cd2c55575d0).

## Exorsa

Vi begynner med å se Kit Langton sin video [Claude Code from Scratch with Effect](https://youtu.be/aueu9lm2ubo?si=QMWyKZeA-hFvUXSt) for så å prøve vår egen hånd på å reprodusere noe lignende ett typisk Agentisk Harness som Claude Code.

[Kit Langton](https://kitlangton.com/) er over gjennomsnittet interessert i [Effect](https://effect.website/) som i seg selv er et interessant tema, men vi ønsker ikke å gå for mye i dybden her i dag. Derfor har jeg laget ett kjapt - og kanskje mer familiert, oppsett.

## Før du begynner

> Når det kommer til tankearbeid så sitter ting ofte bedre om man gjør det selv. [ref](https://www.anthropic.com/research/AI-assistance-coding-skills)
> ...så ikke be claude eller en annen agent om å skrive kode for deg.

### Installer:

- Node.js - https://nodejs.org/en/download
- pnpm - https://pnpm.io/installation
  - (bare en preferanse, npm burde også fungere fint)

## Spoonfeeding

1. Installer pakker

```bash
pn i
```

2. Sett opp miljøvariabler. Se [./.env.example](./.env.example).

3. Kjør koden

```bash
pn dev
```

Du kan gi kommandoer på samme måte som ett vanlig cli program slik

```bash
 pn dev greet Henry
```

4. Koden (og `TODO`s ) finner du i [./src/index.ts](./src/index.ts).

--- Ekstra exstra ---

| Kommando  | Forklaring             |
| --------- | ---------------------- |
| `pn fmt`  | Formater koden         |
| `pn lint` | Lint koden             |
| `pn fix`  | Formater og lint koden |
