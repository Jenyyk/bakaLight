
# bakaLight

lightweight web a desktop aplikace bakalářů, která poskytuje jen to, co je důležité  
aplikace je postavená v HTML, CSS a vanilla Javascriptu, zkompilovaná v electron forge


## Schopnosti

- Zapamatuje si přihlašovací údaje ✓
- Rozvrh ✓
- Známky ✓


## Instalace  
**Metoda 1**
- Vyber si release
- Stáhni si setup.exe pro svou příslušnou architekturu
  - setup.exe nainstaluje aplikaci do `C:\Users\<uživatel>\AppData\Local\BakaLight` a vytvoří desktop shortcut
- Nebo stáhni HTML.zip pro webovou verzi
  - extrahuj archiv a uvnitř spusť `index.html`
**Metoda 2**
- Stáhni si .zip celého repozitáře
- Extrahuj .zip soubor
- Pro kompilaci je potřeba stažené [Node.js](https://nodejs.org/en)
- Uvnitř extrahovaného souboru spusť následující bash kód pro kompilaci:
```shell
npm install
npm run make
```
- Zkompilovanou aplikaci najdeš v souboru `out`


## Co si můžete vzít z projektu

- [JavaScript knihovna](bakaInteract.js)  pro lehčí interakci s [bakalari-api-v3](https://github.com/bakalari-api/bakalari-api-v3)
  - [dokumentace](bakaInteract.md) pro knihovnu
- zkompilovaná electron aplikace pro windows PC
- nekompilovaný HTML soubor a příslušné dependencies


## Autoři

- [@Jenyyk](https://github.com/Jenyyk)
