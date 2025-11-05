---
aliases:
  - Dictionary
title: Dictionary
---
```dataview
TABLE definition,partOfSpeech,notes,relatedWords
FROM "LANGUAGES/Varae/Documentation/Dictionary"
WHERE definition
SORT file.name ASC
```
