---
layout: default
title: Localization
description: Localizing is one of those features that, as a developer, can be intimidating on other systems. In Devise it's a snap. It is built in out of the box and just takes a few clicks to get up and running.
use: [docs]
converters: [markdown]
sections:
    - Enabling A New Language
    - Static vs Dynamic
---

##<a name="enabling-a-new-language" class="ia"></a>[#](#enabling-a-new-language)Enabling A New Language

Click on the "Languages" section in the administration to view all of the languages preloaded. You can filter these languages using the "Filter" box above the language names. Click "Active" next to the language you wish to activate and... that's it.

##<a name="static-vs-dynamic" class="ia"></a>[#](#static-vs-dynamic)Static vs. Dynamic

There are two ways you can utilize localization.

###Dynamic

First, your content managers or clients can provide a translated version of a page or menu out of the box with Devise. This is perfect if pages have dynamic content that needs to be managed in multiple languages. To utilize this most of the time we use the 'Copy' action next to an existing page and then select 'Translate Page'.

You can then provide the new content for the language you selected. The pages are also connected in Devise so that if the user utilizes the language selector they will be redirected to the duplicated page in the other language.

###Static

On the other hand, you may have some strings and content that is static (never changes really) that is hard-coded in to the template. Devise's localization engine leans on Laravel's localization so you can utilize the ```trans()``` method to translate your strings.

To start create a file within the ```resources/lang/{whatever the 2-character ISO code is for the languages you're working with}``` directory.

For example: If I was working on the about section of a site I might create the files called ```/resources/lang/es/about.php``` and ```/resources/lang/en/about.php```. Inside each of those files I create an array that I return like so:

```
return [
    'title' => 'About'
];
```
######/resources/lang/en/about.php (example file name)

```
return [
    'title' => 'Acerca de'
];
```
######/resources/lang/es/about.php (example file name)

Then, in my template we can do this:

```
{% verbatim %}
<body>
    <h1>{{ trans('about.title') }}</h1>

    ...
{% endverbatim %}
```
###### /resources/views/templates/about.blade.php (example file name)

You can read more about Laravel's localization here: [http://laravel.com/docs/5.0/localization](http://laravel.com/docs/5.0/localization)

