# Klaus Kode

The "Claude Code killer" CLI harness.

En workshop der du bygger din egen kodeagent fra bunnen av: en chat som husker, en agentløkke, og verktøy som får lov til å gjøre ting. Oppgavene ligger i kurset [Klaus Kode](https://kurs-ldjjntgtrq-lz.a.run.app/kurs/klaus-kode) på Kurs, og du kommer inn med kurskoden. Du kan ta det i ditt eget tempo, eller som en workshop på to timer.

> Laget til faggruppen i Miles - KI-fra-førsteprinsipp [23 September 2026](https://life.miles.no/events/fde56f67-894c-418f-b3a8-9cd2c55575d0).

## Regelen: skriv koden selv

> Når det kommer til tankearbeid så sitter ting ofte bedre om man gjør det selv. [ref](https://www.anthropic.com/research/AI-assistance-coding-skills)

Så ikke be Claude eller en annen agent om å skrive koden for deg. Bruk den heller til å forstå: spør hvorfor, og la den forklare. Repoet har en `AGENTS.md` som ber agenter om å være veileder, og KI er skrudd av i Zed og VS Code for denne mappa.

## Før du begynner

- [Node.js](https://nodejs.org/en/download) 22 eller nyere.
- [pnpm](https://pnpm.io/installation) 11 eller nyere, som har den korte kommandoen `pn`. npm burde også fungere fint.
- En nøkkel til Gemini. Lag en gratis i [Google AI Studio](https://aistudio.google.com/api-keys), eller få en av Henry på workshopen.
- Se gjerne Kit Langton sin video [Claude Code from Scratch with Effect](https://youtu.be/aueu9lm2ubo?si=QMWyKZeA-hFvUXSt) først. Han bygger det samme med [Effect](https://effect.website/). Her gjør vi det enklere.

## Kom i gang

```bash
git clone https://github.com/SjoenH/klaus-kode.git
cd klaus-kode
pn i
cp .env.example .env
```

Legg nøkkelen din i `.env`, og kjør:

```bash
pn dev greet Henry
```

Ser du banneret og `Hello, Henry!`, er du klar. Koden, og `TODO`-ene, finner du i [./src/index.ts](./src/index.ts).

## Stegene

| Steg | Du bygger                                                     | Du er ferdig når                                      | Løsningen  |
| ---- | ------------------------------------------------------------- | ----------------------------------------------------- | ---------- |
| 1    | En chat: en kommando, en løkke, hukommelse, en personlighet   | Klaus husker hva du heter                             | `steg-1`   |
| 2    | Et første verktøy: en terning                                 | Terningen blir kastet, men Klaus sier ingenting       | `steg-2`   |
| 3    | Agentløkka                                                    | Klaus forteller selv hva terningen viste              | `steg-3`   |
| 4    | Verktøy med input, og tilgang til maskinen din, med lov først | Klaus leser sin egen kode, og spør før han kjører noe | `steg-4`   |
| ★    | Klaus skriver kode                                            | Klaus har lagt til et verktøy i seg selv              | `SOLUTION` |

## Henger du etter?

Hver gren har løsningen på steget sitt. Legg bort det du har gjort, og hopp dit:

```bash
git stash -u
git switch steg-2
```

Det du la bort, får du tilbake med `git stash pop`.

## Kommandoer

| Kommando       | Forklaring                      |
| -------------- | ------------------------------- |
| `pn dev`       | Start Klaus                     |
| `pn dev greet` | Eksempelkommandoen              |
| `pn dev chat`  | Snakk med Klaus, fra steg 1     |
| `pn fmt`       | Formater koden                  |
| `pn lint`      | Lint koden, og rett det som kan |
| `pn fix`       | Formater og lint koden          |
