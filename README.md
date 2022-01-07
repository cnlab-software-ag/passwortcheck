# Passwortcheck

Die Passwortcheck-Anwendung sind in zwei "Flavors" angeboten.

- Im Branch `master` findet sich die umfassende Variante mit Beschreibungen, Tipps und Hintergrund-Informationen zum Thema "Passwörter".
- Im Branch `iframe` findet sich eine reduzierte Version. Sie enthält lediglich den Passwortcheck selbst und ist für die Integration in einem iframe ausgelegt.



Die Icons wurden aus Copyright Gründen ausgetauscht.

## Backend-API
- Die Resultate des Passwortchecks (lediglich "stark" oder "schwach") werden an einen definierten Backend-URL übermittelt. 
- Die Informationen werden für die Erzeugung der Statistik verwendet.
- Details zu den Backend-Funktionen (Anforderungen, Endpunkte, DB-Schema) sind in einem separaten git-Projekt zu finden.
- Die URL für das Backend-API muss vor dem Bauen der Anwendung in der Datei `environment.ts` bzw. `environment.prod.ts` angepasst werden.

## Neue Sprache hinzufügen
Folgende Schritte sind nötig, um eine neue Sprache hinzufügen zu können.

1. Neue Sprachdatei im Verzeichnis "assets/i18n" anlegen entsprechend der Sprache (fr.json für Französisch). Es wird empfohlen eine bestehende zu kopieren und diese anzupassen.
2. Sprache ergänzen in der Datei "app/app.component.ts". Das bestehende Array auf Zeile 11 kann beliebig erweitert werden. Sprachen in diesem Array werden dem Benutzer zur Verfügung gestellt.

Die Applikation muss neu kompiliert und deployed werden. Bei Änderungen an den Sprachdateien ist keine Kompilierung nötig. 

## Bauen der Anwendung
Die Anwendung kann, wie für Angular üblich, mit `ng build --prod` gebaut werden, die Ausgabe erfolgt in den Ordner `dist`.
