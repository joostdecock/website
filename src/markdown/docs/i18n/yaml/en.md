---
title: Translating YAML
path: /en/docs/i18n/yaml
---

## Things are in flux right now

We are planning to extract our YAML files with string and put them in a 
seperate repository. That way, it will be easier for us to re-use them
across different projects (like our website and backend).

This hasn't happened yet, an for the time being, the YAML files are
in the `src/data/i18n` folder of 
[our website repository](https://github.com/freesewing/website).

Each language has it's own folder, based on its language code.
For example, all Spanish strings are in the `es` folder.

Within each language folder, there are different YAML files to translate:

 - `app.yaml`: This is the main file with strings for the website
 - `i18n.yaml`: Contains the names of languages
 - `measurements.yaml`: Contains the names of measurements
 - `optiongroups.yaml`: Contains the names of option groups
 - `options.yaml`: Contains the names and descriptions of pattern options 
 - `patterns.yaml`: Contains the title and descriptions of our patterns

## YAML structure

YALM consists of `key: value` pairs. Here's an example:

```yaml
aboutFreesewing: About Freesewing
```

You never translate the key, as that's how we look up the translation.
You only translate the value. For example, in the Spanish langauge file, this
looks like:

```yaml
aboutFreesewing: Acerca de Freesewing
```

Most of the time, you will see these simple `key: value` pairs.
But in some YAML files, you'll find a hierarchical structure like this:


```yaml
adjustmentRibbon:
  description: Add a ribbon to make the tie adjustable.
  options:
    - Do not include ribbon
    - Include ribbon
  title: Adjustment Ribbon
```

As before, do not translate the keys, only the values. In the case the Spanish looks as such:

```yaml
adjustmentRibbon:
  description: Añadir una banda para hacer la corbata ajustable.
  options:
    - No incluír banda
    - Incluír banda
  title: Banda de ajuste
```

## Syntax

Most strings are just text, but sometimes you'll find a little markup sprinkled in.


### HTML formatting

When you encounter HTML tags, simply translate around them. For example:

```yaml
txt-consentProfileAnswerShare: '<b>No</b>, never.'
```

looks like this in Spanish:

```yaml
txt-consentProfileAnswerShare: '<b>No</b>, nunca. '
```

### Placeholders

When you encounter a `{key}` between curly braces, leave it as-is.
These will be filled in later with the correct value. For example:

```yaml
rowsFromToOfTotal: 'Rows {from} to {to} of {total}'
```

looks like this in Spanish

```yaml
rowsFromToOfTotal: 'Filas {from} a la {to} de {total} '
```

### Plurals

When you see translation seperated with a `|` character, this indicated plurals.
Here's an example:

```yaml
yearsAgo: '{years} year ago | {years} years ago'
```

If years is 1, the part before the `|` will be used. If it's 2 or more, the part after `|` will be used.

Simply translate the text, but keep the references intact. Here is what it looks like in Spanish:

```yaml
yearsAgo: 'hace {years} años | hace {years} años'
```
