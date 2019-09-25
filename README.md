# master-nativescript

Projekt stworzony na potrzeby pracy magisterskiej na Wydziale Zastosowań Informatyki i Matematyki SGGW w Warszawie. Tytuł pracy: _Metody tworzenia wieloplatformowych aplikacji mobilnych na przykładzie PWA oraz NativeScript_. Projekt aplikacji PWA znajduje się [TUTAJ](https://github.com/pawelkosmala/master-pwa).
Treść pracy chwilowo nie jest dostępna (in progress...)

## Instalacja NativeScript

Szczegóły dotyczące instalacji NativeScript znajdują się [TUTAJ](https://docs.nativescript.org/angular/start/quick-setup#full-setup). W celu uruchomienia tego projektu należy wykonać pełną instalację. 

## Wymagania dotyczące urządzeń

Można sprawdzić, czy urządzenie jest widoczne za pomocą polecenia: `tns devices`. 

### Android

Telefon należy wcześniej podłączyć do komputera i zezwolić na debugowanie po podłączeniu kabla USB - w przeciwnym wypadku NativeScript nie znajdzie urządzenia. 

## Uruchomienie aplikacji - urządzenie Android / iOS

W przypadku urządzeń z Androidem należy wykonać polecenie `tns run android --bundle`, natomiast dla iOS: `tns run ios --bundle`. Ważnym jest, że w tym projekcie nie zadziała uruchomienie bez flagi `--bundle`, ze względu na to, iż jest to projekt oparty o [CODE SHARING](https://www.nativescript.org/nativescript-is-how-you-build-native-mobile-apps-with-angular/code-sharing-angular-and-nativescript).

## Uruchomienie aplikacji - Desktop

W terminalu należy wpisać `ng serve`. Strona uruchomi się pod adresem `http://localhost:4200`. 