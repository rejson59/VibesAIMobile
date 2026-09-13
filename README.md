# VibesAIMobile

**Mobilny podgląd oryginalnej strony [vibes.ai](https://vibes.ai).**
Oficjalna strona nie ma wersji mobilnej, a dodatkowo wysyła nagłówek
`X-Frame-Options: DENY` (i CSP `frame-ancestors 'none'`), więc **żywej witryny
nie da się osadzić w iframe w żadnej przeglądarce** (scan: securityheaders.com,
13.09.2026). Ten projekt omija problem uczciwie, na trzy sposoby:

| Źródło | Jak działa | Kiedy działa |
| ------ | ---------- | ------------ |
| **Archiwum** (domyślne) | iframe z replayem archive.org w trybie `if_` (`web.archive.org/web/<ts>if_/https://vibes.ai/`) — oryginalne bajty strony, skalowane do telefonu (zoom − / +, tryby „Dopasuj” i „1:1”) | zawsze; snapshot domyślnie `2026-09-01`, chip u góry pokazuje datę, a viewer próbuje odkryć nowszy snapshot przez API availability |
| **Live (czytnik)** | aktualny HTML pobierany w przeglądarce użytkownika przez publiczne proxy CORS (allorigins → corsproxy.io → codetabs), łamany do mobilnego layoutu; obrazy przez to samo proxy; cache 3 h w localStorage | gdy proxy działają (bywają przeciążone — jest ekran błędu z „ponów”) |
| **Oryginał** | przycisk-strzałka otwiera vibes.ai w nowej karcie | zawsze |

Nic z treści vibes.ai nie jest przechowywane ani serwowane z tego repozytorium —
wszystko jest pobierane na żywo w przeglądarce użytkownika.

## Uruchomienie

```bash
python3 -m http.server 8080     # albo dowolny serwer statyczny
# → http://localhost:8080
```

## Plik

- `index.html` — samodzielna nakładka (HTML + CSS + JS w jednym pliku):
  pasek z przełącznikiem źródła i PL/EN, stage z ramką/czytnikiem, dolny dok
  z zoomem i trybami, panel „Info”, safe-area insets, cele dotykowe ≥44 px.

## Bezpieczeństwo / prywatność

- iframe archive.org jest sandboxowany bez `allow-top-navigation` (frame-busting
  nie wyrwie użytkownika z nakładki).
- Czytnik nigdy nie wstrzykuje zdalnego HTML przez `innerHTML` — buduje DOM
  z sanowanego modelu (teksty przez `textContent`, linki tylko `http(s)`).
- Nieoficjalny projekt; treści i znaki towarowe należą do vibes.ai / Meta.

## Historia

- `52ef62c` — zarzucony koncepcyjny redesign mobilny (usunięty z drzewa roboczego).
- `c4332ff` — pierwsza nakładka iframe (okazała się niemożliwa przez X-Frame-Options: DENY).
- HEAD — nakładka tri-źródłowa (archive.org replay / live czytnik / oryginał).
