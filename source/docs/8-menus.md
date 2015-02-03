---
layout: default
title: Menus
use: [docs]
converters: [markdown]
sections:
    - Managing Menus
    - Implementing Menus
---

#Menus

Menus in Devise are designed to accomodate issues the Devise Team typically have with our own projects. We wanted the ability to:

1. Create as many "menus" as we needed.
1. Localize a menu and keep it in sync with the page easily.
1. Have an unlimited nesting capbility.
1. Easily loop through and write a menu in a logical way.
1. Quickly and easily link both internally and externally.

With these items satisfied we use the menus system for more than just a top-level navigation. We use it for footer navigations, sitemaps, tabbed content, or any section that _feels_ menuey that needs a resortable list of items that link to something (even if that something is just a named anchor).

##<a name="managing-menus" class="ia"></a>[#](#managing-menus)Managing Menus

Managing menus in Devise couldn't be easier. We set it up with your customers in mind so you should have very little problems using the interface to create and update your menus.

First, click on the "Menus" option on the navigation. Here you can create a new menu by providing a name and clicking the create button. Once inside your menu is created you can update it by specifying new menu items and dragging and dropping them to set their order of appearance.

There are two link modes for menu items: URLs and Pages. If "Page" is selected the last field will autocomplete and link itself to the page you select. This way, if that page's URL changes the menu will automatically adjust.

##<a name="implementing-menus" class="ia"></a>[#](#implementing-menus)Implementing Menus

Implementing menus is simple even in the more complex scenarios.

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