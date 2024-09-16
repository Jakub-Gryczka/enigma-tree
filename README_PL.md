# Dokumentacja Projektu (Polski)

Witamy w projekcie! Ta dokumentacja poprowadzi Cię przez proces instalacji i użytkowania projektu.

## Spis Treści

1. [Wprowadzenie](#wprowadzenie)
2. [Instalacja](#instalacja)
3. [Użytkowanie](#użytkowanie)
4. [Live](#live)
5. [Opis rozwiązania](#opis-rozwiązania)
6. [Testy](#testy)
7. [Technologie](#technologie)

## Wprowadzenie

Aplikacja służy do modyfikacji tworzonych przez użytkownika drzew liściastych lub iglastych. Aby używać aplikacji należy się zalogować następującymi danymi:
`login: test@test.pl`
`hasło: test1234`
Aplikacja ta jest napisana w TypeScript oraz paradygmacie OOP co jest moją pierwszą stycznością z tym językiem programowania oraz tym paradygmatem w praktyce.
Strona została stworzona w ramach zadania dla Enigma Systemy Ochrony Informacji Sp. z o.o.

## Instalacja

Krok po kroku instrukcje instalacji projektu.

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/Jakub-Gryczka/enigma-tree.git
   ```

2. Zainstaluj wymagane zależności:

   ```bash
   npm install
   ```

3. Skonfiguruj środowisko:

   - Utwórz plik `.env` na podstawie pliku `.env.example` i wypełnij odpowiednimi wartościami.

4. Uruchom projekt:
   ```bash
   npm start
   ```

## Użytkowanie

1. Aby zalogować się do aplikacji należy użyć `login: test@test.pl` oraz `hasło: test1234`.
2. Aplikacja obsługuje dwa języki.
3. Po zalogowaniu wyświetlą się funkcjonalne przyciski tworzące drzewa, służące wylogowaniu, zmiany koloru, wysokości itd.

## Live

Live: [LINK](https://enigma-tree.netlify.app/);

## Opis rozwiązania

1. Implementacja dwóch języków:

   - utworzenie pliku oraz klasy HandleLanguage, która odpowiada za wszystko związane z tworzeniem prostego switcha umożliwiającego zmianę języka.
   - HandleLanguage posiada jeden obiekt stworzony z interface Translations. Obiekt ten posiada podobiekty zawierające etykietę języka (selectedLang) oraz jego klucz (key). Klucz jest odpowiednią dla języka wersją tekstową jaka ma się wyświetlić na stronie (np. klucz title posiada wartość dla `selectedLang = pl`: `Zaloguj się`). Program wie jaki język wybrał użytkownik poprzez `<input type="checkbox">`, który gdy jest nie zaznaczony posiada wartość `pl`, a gdy jest zaznaczony - `en`. Następnie za pomocą metody `updateContent()` sprawdza wszystkie elementy posiadające atrybut `data-translate-key` i odpowiednio zmienia ich zawartość tekstu.
   - aplikacja sprawdza, czy na stronie jest stworzony switch do zmiany języka, jeśli jest to nic nie robi, a jeśli go nie ma - dodaje go.
   - `selectedLang` jest udostępniane pomiędzy dwiema "warstwami" co oznacza, że jeśli użytkownik wybierze język angielski na stronie logowania, angielski będzie też na właściwej stronie bez potrzeby klikania `<input type="checkbox">` kolejny raz.

2. Implementacja logowania:

   - plik oraz klasa Auth odpowiada za wszystko co związane z logowaniem i autoryzacją.
   - do logowania użyłem Firebase, które służyło mi jako backend aplikacji, który uwierzytelnia użytkowników.
   - gdy użytkownik poda poprawne dane logowania - aplikacja wygeneruje nową zawartość strony bez odświeżania jej oraz wyczyści formularz do logowania.
   - gdy użytkownik poda niepoprawne dane logowania - aplikacja pozostawi źle wpisane dane w formularzu.
   - klucze API do Firebase są przechowywane w environment variables na serwerze Netlify. Nie są one otrzymywane przez serwer za pomocą HTTP request ponieważ klucze te służą jedynie identyfikacji projektu lub aplikacji Firebase, a nie do autoryzacji API.
   - strona po odświeżeniu dalej pozostaje w stanie zalogowania ponieważ Firebase Auth śledzi, czy użytkownik kliknął przycisk wylogowania, czy nie.
   - formularz do logowania został stworzony tak, aby zapobiec atakom XSS poprzez użycie funkcji `sanitizeEmail()`.

3. Implementacja strony właściwej:

   - plik oraz klasa ContentPage odpowiada za wyświetlanie części właściwej strony.
   - Po utworzeniu instancji ContentPage (`new ContentPage()`) jej contructor wywołuje funkcje służące wygenerowaniu strony.
   - Po pomyślnym zalogowaniu na stronie tworzony jest formularz oraz 2 przyciski odpowiadające za wybór jakie drzewo użytkownik chce stworzyć. Po wybraniu któregoś z przycisków, wyłączają się one (otrzymują atrybut `disabled = true`) i generuje się wybrane drzewo oraz kolejne przyciski odpowiadające za zmianę koloru liści oraz wysokości drzew.
   - do tworzenia kolejnych przycisków używana jest metoda `createInputElement()`, która przyjmuje takie argumenty jak: wartość do atrybutu `data-translate-key` dla `<label></label>`, atrybut jaki mają przyjmować tworzone przyciski, tablicę z nazwami klas dzięki czemu funkcja tworzy tyle przycisków ile zadeklarowanych jest elementów tablicy, wartości dla przycisków do atrybutu `data-translate-key`, typ jakiego mają być `<input/>` oraz opcjonalnie jaką wartość mają one mieć (`value`). Takie rozwiązanie zapewnia elastyczność i możliwość tworzenia tylu elementów `<input/>` ile potrzebujemy.

4. Implementacja funkcjonalności drzew
   - plik oraz klasa Tree odpowiadają za utworzenie abstrakcji klasy Tree, jego prototype chain oraz dziedziczenia pomiędzy rodzajami drzew. Klasa Tree posiada metody `render()` odpowiadającą za utworzenie drzewa, `grow()` odpowiadającą za zwiększanie wysokości drzewa oraz `shrink()` odpowiadającą za zmniejszanie wysokości drzewa.
   - Wysokość drzew jest ograniczana do minimalnie 1m i nieskończonej wysokości.
   - Zmiana wysokości drzewa zmienia się o 1m.
5. Implementacja zdjęć drzew
   - plik images.ts zawiera tagi `<svg>`, które odpowiadają za ilustrację drzew. Takie rozwiązanie umożliwia modyfikację stylu drzew za pomocą CSS oraz zapobiega zmniejszeniu czytelności kodu, ponieważ pliki svg zawierają dużą ilość tekstu czytelność poszczególnych modułów byłoby znacznie utrudnione.
6. Implementacja funkcji globalnych
   - funkcje globalne są w pliku utils i mogą być importowane do każdego pliku.
   - funkcja `sanitizeEmail()` zwraca string email, który zamienia znaki mniejszości i większości na ich HTML entities co zapobiega atakom XSS.
   - funkcja `createElement()` tworzy element oraz dodaje go do `document.body` za pomocą metody `appendChild`, aby uniknąć XSS. Przyjmuje on takie wartości jak element jaki chcemy stworzyć, jego klasę oraz opcjonalnie atrybut oraz wartość atrybutu.

## Testy

Testy zostały napisane w bibliotece Jest.
Aby je uruchomić należy użyć `npm run test`. Wygeneruje to również raport z pokrycia kodu jaki jest testowany.
Nie jestem w 100% usatysfakcjonowany z napisanych przeze mnie testów, ponieważ nie posiadają one dużego pokrycia w aplikacji, ale było to moje pierwsze spotkanie z testowaniem jednostkowym aplikacji.

## Technologie

Użyte w projekcie technologie:

1. TypeScript
2. WebPack
3. Jest
4. Sass (SCSS)
5. Firebase Auth
6. Netlify CLI

### O autoryzacji

Przed rozpoczęciem projektu robiłem research dotyczący tego jak powinienem prawidłowo zaimplementować autoryzację użytkowników i zacząłem implementować bibliotekę Auth0. Niestety po wielu godzinach oraz próbach implementacji tej biblioteki zakończyło się to porzuceniem tej technologii. W późniejszym czasie stwierdziłem też, że Auth0 mógłby być przesadą i po kolejnym researchu zdecydowałem się użyć Firebase.

### O stylach

Na początku chciałem użyć frameworka TailwindCSS. Skonfigurowałem go i zacząłem pisać kod. Niestety po kilku linijkach stwierdziłem, że nie ma to większego sensu bez IntelliSense, które nie działało z racji tego, że wszystkie klasy pisałem w formie stringów w TS. Tailwind sprawdziłby się idealnie, gdybym używał np. React.js, ale niestety do programowania modułów w vanilla TS TailwindCSS nie jest najlepszym narzędziem.
