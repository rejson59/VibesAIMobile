# VibesAIMobile

**Mobilna nakładka na oryginalną stronę [vibes.ai](https://vibes.ai).**
Oficjalna strona nie ma wersji mobilnej, więc ten projekt wyświetla ją
po telefonowemu: żywa witryna vibes.ai jest ładowana w ramce dopasowanej
do ekranu telefonu.

> To **nie jest kopia** treści — nic nie jest przechowywane ani serwowane
> z tego repozytorium. Przeglądarka użytkownika pobiera stronę bezpośrednio
> z vibes.ai. Nieoficjalny projekt, bez powiązań z vibes.ai / Meta.

## Uruchomienie

```bash
python3 -m http.server 8080     # albo dowolny serwer statyczny
# → http://localhost:8080
```

## Jak to działa

- `index.html` — pojedynczy plik: pasek górny, ramka ze stroną, dolny dok ze sterowaniem.
- **Tryb „Dopasuj”** — pulpitowy layout (domyślnie 1280 px szerokości) jest skalowany
  do szerokości ekranu telefonu; zoom **− / +** zmienia wirtualną szerokość (360–1920 px).
- **Tryb „1:1”** — strona w natywnej ostrości, z przewijaniem także w poziomie.
- Przyciski: odśwież ramkę, otwórz oryginał w nowej karcie, pomoc (PL/EN).
- UI nakładki jest mobile-first: safe-area insets, cele dotykowe ≥46 px, dolny dok
  w strefie kciuka, `prefers-reduced-motion`.

## Ograniczenie (ważne!)

Jeżeli vibes.ai wysyła nagłówki **X-Frame-Options** lub **Content-Security-Policy:
frame-ancestors**, przeglądarka odmówi wyświetlenia strony w iframe (pusta ramka /
komunikat). To decyzja po stronie vibes.ai i nie da się jej obejść z poziomu
przeglądarki bez proxy. Nakładka wyjaśnia to w panelu „Info” i oferuje przycisk
„Otwórz oryginał”.

## Historia

Wcześniejszy commit (`52ef62c`) zawierał zarzucony koncepcyjny redesign mobilny
(zbudowany bez dostępu do oryginału). Został usunięty z drzewa roboczego na rzecz
nakładki na żywą stronę; historia gita zachowuje go do wglądu.
