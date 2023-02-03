# Passwortcheck

Die Passwortcheck-Anwendung wird in zwei "Flavors" angeboten.

- Im Branch `main` findet sich die umfassende Variante mit Beschreibungen, Tipps und Hintergrund-Informationen zum Thema "Passwörter".
- Im Branch `iframe` findet sich eine reduzierte Version. Sie enthält lediglich den Passwortcheck selbst und ist für die Integration in einem iframe ausgelegt.



Die Icons wurden aus Copyright Gründen ausgetauscht.

## Backend-API
- Die Resultate des Passwortchecks (lediglich "stark" oder "schwach") werden an einen definierten Backend-URL übermittelt. 
- Die Informationen werden für die Erzeugung der Statistik verwendet.
- Details zu den Backend-Funktionen (Anforderungen, Endpunkte, DB-Schema) sind in einem separaten [git-Projekt](https://github.com/cnlab-software-ag/passwortcheck-backend) zu finden.
- Die URL für das Backend-API muss vor dem Bauen der Anwendung in der Datei `environment.ts` bzw. `environment.prod.ts` angepasst werden.

## Neue Sprache hinzufügen
Folgende Schritte sind nötig, um eine neue Sprache hinzufügen zu können.

1. Neue Sprachdatei im Verzeichnis "assets/i18n" anlegen entsprechend der Sprache (fr.json für Französisch). Es wird empfohlen eine bestehende zu kopieren und diese anzupassen.
2. Sprache ergänzen in der Datei "app/app.component.ts". Das bestehende Array auf Zeile 11 kann beliebig erweitert werden. Sprachen in diesem Array werden dem Benutzer zur Verfügung gestellt.

Die Applikation muss neu kompiliert und deployed werden. Bei Änderungen an den Sprachdateien ist keine Kompilierung nötig. Der Inhalt des Browsers muss jedoch neu geladen werden, damit die aktualisierte Sprachdatei verwendet wird. 

## Neues Wörterbuch hinzufügen
Folgende Schritte sind nötig, um ein neues Wörterbuch hinzufügen zu können.

1. Das neue Wörterbuch muss im Ordner "assets/wordlists" gespeichert werden. Der Inhalt des Wörterbuchs ist jeweils ein Eintrag pro Zeile, das Encoding der Datei muss UTF-8 sein.
2. Erstellen eines neuen Eintrags mit den Angaben zum Wörterbuch in der Datei `/app/passwordcheck/wordbook.service.ts`. 
   - Über den Parameter `lang` kann festgelegt werden, ob ein Wörterbuch zu einer spezifischen Sprache gehört. Ohne Angabe wird das Wörterbuch für alle Sprachen verwendet.
   - Der Parameter `name` wird benutzt, um die korrekte Bezeichnung aus den sprachabhängigen Ressourcen zu beziehen. Es wird dabei nach dem Eintrag mit dem Namen `wordBook.names.<name>` gesucht, um die Übersetzung abzufragen.
   - der Parameter `source` kann verwendet werden um einen Hinweis auf die Quelle des Wörterbuch-Inhalts zu geben. Diese Angabe wird aktuell in der Anwendung nicht verwendet.
   - Der Parameter `file` verweist auf den Dateienamen (ohne Pfad).
   - Der Parameter `enabled` legt fest, ob das Wörterbuch per Default aktiv ist.
   - Der Parameter `displayed` legt fest, ob der Benutzer das Wörterbuch selber aktivieren/deaktivieren kann (d.h. ob eine entsprechende Checkbox angezeigt wird).
   - Der Parameter `normalized` teilt mit, ob das Wörterbuch bereits "de-leeted" ist, d.h. ob Sonderzeichen bereits durch "normale" Buchstaben ersetzt worden sind. (siehe [Leetspeak](https://de.wikipedia.org/wiki/Leetspeak)).
   
Die Applikation muss neu kompiliert und deployed werden.

## Bauen der Anwendung
- Während der Entwicklung kann die Anwendung mit `ng serve` gestartet und auf dem lokalen Development-Server getestet werden. Es wird die Konfiguration aus `environment.ts` verwendet.
- Zum Releasen kann die Anwendung mit `ng build --configuration production` gebaut werden. Dabei wird die Konfiguration aus `environment.prod.ts` verwendet, die Ausgabe erfolgt in den Ordner `dist`.
