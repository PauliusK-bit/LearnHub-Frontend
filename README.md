# Akademinės platformos valdymo sistema

## Aprašymas

Šis projektas – tai internetinė platforma, sukurta mokymų ar akademinei veiklai valdyti. Jame galima administruoti temų kategorijas, dėstytojus, studentus, įkelti video ar kitus mokomuosius resursus. Projekto pagrindinės funkcijos apima naudotojų autentifikaciją, lankstų puslapių naršymą ir duomenų valdymą.

## Pagrindinės funkcijos

- Prisijungimas, profilis ir registracija (`LoginPage`, `ProfilePage`, `RegisterPage`)
- Administratoriaus valdymo skyriai: kategorijų, dėstytojų, studentų ir temų valdymas
- Studentų ir dėstytojų sąrašai bei informacija
- Video ir kitų mokomųjų resursų įkėlimas ir peržiūra (`VideoPage`)
- Puslapių navigacija ir sąsaja, naudodama įvairius komponentus

## Technologijos

- React su TypeScript
- CSS moduliai
- JSX
- React Router (numanoma, kad naudojama dėl kelių puslapių)
- Komponentų ir formų valdymas (pvz., `ActivityForm`, `CategoryForm` ir kt.)

## Projektos struktūra

- `src/components` – įvairūs komponentai, skirti UI ir funkcionalumo dalims
- `src/pages` – skirtingi puslapiai, tokie kaip Prisijungimo, Dėstytojo, Studentų ir kt.
- `src/config` – konfigūracijos failai
- `src/api.tsx` – API sąsaja duomenų mainams
- `src/App.css` – bendras stiliaus failas

## Paleidimas

1. Atsisiųskite arba klonuokite šį repozitoriją:

```bash
git clone {repo nuoroda}
```
