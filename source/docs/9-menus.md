---
layout: default
title: Menus
description: With Devise setting up a robust menu system couldn't be easier.
use: [docs]
converters: [markdown]
sections:
    - Managing Menus
    - Implementing Menus
---



Menus in Devise are designed to accomodate issues the Devise Team has with their own projects. They wanted the ability to:

1. Create as many "menus" as They needed.
1. Localize a menu and keep it in sync with the page easily.
1. Have an unlimited nesting capbility.
1. Easily loop through and write a menu in a logical way.
1. Quickly and easily link both internally and externally.

With these items satisfied they use the menus system for more than just a top-level navigation. They use it for footer navigations, sitemaps, tabbed content, or any section that _feels_ menuey that needs a resortable list of items that link to something (even if that something is just a named anchor).

##<a name="managing-menus" class="ia"></a>[#](#managing-menus)Managing Menus

Managing menus in Devise couldn't be easier. They set it up with your customers in mind so you should have very little problems using the interface to create and update your menus.

First, click on the "Menus" option on the navigation. Here you can create a new menu by providing a name and clicking the create button. Once inside your menu is created you can update it by specifying new menu items and dragging and dropping them to set their order of appearance.

There are two link modes for menu items: URLs and Pages. If "Page" is selected the last field will autocomplete and link itself to the page you select. This way, if that page's URL changes the menu will automatically adjust.

##<a name="implementing-menus" class="ia"></a>[#](#implementing-menus)Implementing Menus

Implementing menus is simple even in more complex scenarios.

First, they need to add the menu variable to the template or layout that you want the menu to be available on. If the menu is something like a main menu you probably want to add it to your layout file so you don't have to add it to _every_ template, right? But if it's a menu that only appears on one template then just add it to that single template. Here's how they do that:

1. Head to Templates
1. Click edit on the template that they want to add a variable to
1. Click 'Add new variable'
1. Give it a variable name of whatever you want. For example: ```mainNavigation``` (no dollar sign needed sir/ma'am)
1. Give it a class path of ```Devise\Menus\MenusRepository```
1. Give it a method name of ```buildMenu```
1. Add a parameter: Change the type to 'Static Value' and set the value to the name of your menu.

This is a snippet from the default administration template. It loops through each of the top tier menu items and then through each of their children.

```php
{% verbatim %}
@foreach ($dvsAdminMenu as $menuGroup)
    <h5>{{ $menuGroup->name }}</h5>
    <ul class="dvs-admin-links">
        @foreach ($menuGroup->children as $link)
            <li><a class="{{ isActiveLink($link->url) }}" href="{{ $link->url }}">{{ $link->name }}</a></li>
        @endforeach
    </ul>
@endforeach
{% endverbatim %}
```

Here are the properties you have access to on menu items:

Label of the Menu Item.
```php
{% verbatim %}
$menuGroup->name
{% endverbatim %}
```

URL of the Menu Item.
```php
{% verbatim %}
$link->url
{% endverbatim %}
```

Returns true if the menu item has a child link that is currently the active link.
```php
{% verbatim %}
$menuItem->activeAncestor
{% endverbatim %}
```

Returns true if the menu item is the currently active item.
```php
{% verbatim %}
$menuItem->activeItem
{% endverbatim %}
```