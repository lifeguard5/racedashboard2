# RACE PIT WALL

**Endurance & GT Dashboard** — inoffizielles Multi-Race-Motorsport-Dashboard für GitHub Pages.

> Inoffizielles Fan-Dashboard. Keine Verbindung zu FIA, ACO, ADAC, SRO, Nürburgring oder anderen Veranstaltern. Angaben ohne Gewähr.

## Fertiger Stand

Diese Version vereinheitlicht die zuvor gemischte alte HTML/CSS/JS-Struktur und den begonnenen Vite-Umbau zu **einer einzigen Vite-MPA-Anwendung**.

Enthalten:

- **Pit Wall / Hub** mit Featured Race, Race Radar und Live-Status
- **Rennliste** mit Filtern nach Serie, Klasse und Status
- **Kalender** aller hinterlegten Rennen
- **Serienübersicht** für 9 Serien
- **Seriendetail** mit allen Rennen der gewählten Serie
- **Race Center** mit Countdown, Wetter, Zeitplan, YouTube-/Serienlinks, Live-Timing/Quicklinks und News, soweit Daten vorhanden
- **Watchlist** mit `localStorage` sowie JSON-Export/-Import
- **About** und **404-Seite**
- **Live-Bar**, wenn aktuell ein Rennen läuft
- Responsive Layout für Desktop, Tablet und Mobil
- GitHub-Pages-Deployment via GitHub Actions

Der Milestone-2-Datensatz enthält **62 Rennen**, **9 Serien** und **38 Strecken**. Acht Rennen besitzen zusätzlich ausführliche Detaildateien mit Zeitplan/Links; bei allen anderen Rennen funktioniert das Race Center mit den vorhandenen Indexdaten und zeigt für noch nicht gepflegte Detailbereiche einen Fallback.

## Einmalige GitHub-Einstellung

Nach dem Hochladen in das Repository `lifeguard5/Race-Dashboard`:

1. GitHub öffnen → **Settings**
2. Links **Pages**
3. Bei **Build and deployment** → **Source**
4. **GitHub Actions** auswählen

Danach startet bei jedem Push auf `main` automatisch `.github/workflows/deploy.yml`.

Die fertige Seite liegt anschließend unter:

`https://lifeguard5.github.io/Race-Dashboard/`

## Lokal starten

Node.js muss installiert sein.

```bash
npm ci
npm run dev
```

Vite zeigt danach die lokale URL an.

Produktions-Build:

```bash
npm run build
npm run preview
```

## Projektstruktur

```text
Race-Dashboard/
├── .github/workflows/deploy.yml
├── public/
│   ├── .nojekyll
│   └── data/
│       ├── config.json
│       ├── races.json
│       ├── series.json
│       ├── tracks.json
│       └── races/              # vorhandene ausführliche Race-Dateien
├── src/
│   ├── app.js                  # gemeinsame App + Seitenrenderer
│   └── styles.css              # gemeinsames Design
├── index.html
├── rennen.html
├── kalender.html
├── serien.html
├── serie.html
├── race.html
├── watchlist.html
├── about.html
├── 404.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Daten pflegen

### Neues Rennen

Der zentrale Index ist:

`public/data/races.json`

Pflichtfelder:

- `slug`
- `name`
- `season`
- `seriesSlug`
- `trackSlug`
- `startUtc`
- `endUtc`
- `classTags`

Eine zusätzliche Datei unter `public/data/races/<slug>.json` ist optional. Sie kann weitere Informationen enthalten, z. B.:

- `schedule`
- `liveTimingUrl`
- `liveTimingEmbed`
- `newsFeeds`
- `quicklinks`
- `timezone`
- `edition`

### Serien

`public/data/series.json`

Wichtige Felder:

- `slug`
- `name`
- `shortName`
- `classes`
- `canonicalClasses`
- `officialUrl`
- `youtubeUrl`
- `description`

### Strecken

`public/data/tracks.json`

`lat` und `lng` werden für die Wetteranzeige über Open-Meteo verwendet.

## Klassenfilter

Kanonische Klassen aus dem Milestone-2-Konzept:

- HYPERCAR
- GTP
- LMP2
- LMP3
- GT3
- GT4

Damit werden serienabhängige Bezeichnungen bewusst zusammengeführt, z. B. LMGT3/GTD/SP9 → GT3.

## Hinweise zum bestehenden 2026-Datensatz

Aus den ursprünglichen Milestone-2-Notizen wurden folgende Hinweise übernommen:

- Einzelne Rennen haben `startTimeConfirmed: false`; dort ist die exakte Startzeit noch nicht bestätigt.
- Mehrere ELMS-Termine wurden ursprünglich aus vergleichbaren 2025-Wochenenden abgeleitet.
- Der Qatar-Termin war im ursprünglichen Datensatz als Näherung markiert.
- Die vorhandenen Daten sollten vor einer längerfristigen Nutzung regelmäßig gegen offizielle Serienkalender geprüft werden.

## Externe Dienste

- **Open-Meteo** für Wetterdaten, ohne API-Key
- **rss2json.com** als RSS-Bridge für News, soweit erreichbar
- YouTube-Links führen auf den jeweiligen Serienkanal; es werden keine Streams eingebettet

## Deployment-Technik

Vite benötigt einen Build-Schritt. Deshalb wird GitHub Pages über **GitHub Actions** veröffentlicht und nicht direkt aus dem `main`-Branch. `vite.config.js` verwendet:

```js
base: '/Race-Dashboard/'
```

Das entspricht dem Repository-Namen und sorgt dafür, dass CSS, JavaScript und Daten unter GitHub Pages korrekt geladen werden.
