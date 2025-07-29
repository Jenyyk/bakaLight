
# BakaLight

lightweight web, desktop a android aplikace bakalářů, která poskytuje jen to, co je důležité
aplikace je postavená v HTML, CSS a vanilla Javascriptu, zkompilovaná v electron forge pro windows a linux, v cordova apache pro android


## Schopnosti

- Zapamatuje si přihlašovací údaje ✓
- Rozvrh ✓
- Známky ✓
- Kalkulačka absence ✓


## Instalace
**Windows**
- Vyber si release
- Stáhni si setup.exe pro svou příslušnou architekturu
  - setup.exe nainstaluje aplikaci do `C:\Users\<uživatel>\AppData\Local\BakaLight` a vytvoří desktop shortcut

**Linux**
- Vyber si release
- Stáhni `.deb` nebo `.rpm` soubor podle distribuce linuxu
- Nainstaluj stejně, jako se instalují lokální package pro tvůj systém
  - Ubuntu příklad: `sudo apt install ./bakalight_setup.deb`

**Android**
- Vyber si release
- Stáhni `.apk` soubor
- Spusť stažený `.apk` soubor
  - Telefon bude křičet, že si instaluješ virus. Je dobré kontrolovat každý kód, který si stahuješ z internetu, každopádně moje aplikace je bezpečná a můžes ji nainstalovat i přes protesty telefonu.

## Building a debugging:
**Desktop Aplikace:**
- Naklonuj git repozitář:
```shell
git clone https://github.com/Jenyyk/bakaLight.git
cd bakaLight
```
- Pro kompilaci je potřeba stažené [Node.js](https://nodejs.org/en) a electron-packager
- Kompilace se liší pro různé systémy, nyní doporučuji zkusit tento příkaz:
```shell
npx electron-packager . build --overwrite
```



**Android Aplikace:**
- naklonuj android branch repozitáře
- pusť v android studio
- Pokračuj v obvyklém android studio workflow


## Co si můžete vzít z projektu

- [JavaScript knihovna](bakaInteract.js)  pro lehčí interakci s [bakalari-api-v3](https://github.com/bakalari-api/bakalari-api-v3)
  - [dokumentace](bakaInteract.md) pro knihovnu
- zkompilovaná electron aplikace pro windows a linux PC
- zkompilovaná cordova aplikace pro android
- nekompilovaný HTML soubor a příslušné dependencies


## Autoři

- [@Jenyyk](https://github.com/Jenyyk)
