# Passwortcheck

Die Icons wurden aus Copyright Gründen ausgetauscht.

## Neue Sprache hinzufügen
Folgende Schritte sind nötig, um eine neue Sprache hinzufügen zu können.

1. Neue Sprachdatei im Verzeichnis "assets/i18n" anlegen entsprechend der Sprache (fr.json für Französisch). Es wird empfohlen eine bestehende zu kopieren und diese anzupassen.
2. Sprache ergänzen in der Datei "app/app.component.ts". Das bestehende Array auf Zeile 11 kann beliebig erweitert werden. Sprachen in diesem Array werden dem Benutzer zur Verfügung gestellt.

Die Applikation muss neu kompiliert und deployed werden. Bei Änderungen an den Sprachdateien ist keine Kompilierung nötig. 
