---
layout: default
title: Templates
use: [docs]
converters: [markdown]
sections:
  - File Locations and Structures
  - Introduction to Blade Syntax
  - Creating new templates
  - Creating arbitrary editable areas
  - Editing your models
  - Examples
---

#Templates
Creating templates in Devise is extremely easy - especially if you are used to Laravel's Blade syntax - but easy no matter what. One of our major focuses was to give developers a super-easy way to take a standard sliced-and-diced HTML / CSS / JavaScript page and make it content manageable quickly and easily. 

##<a name="file-locations-and-structures" class="ia"></a>[#](#file-locations-and-structures)File Locations and Structures

> **A quick note about file organization**: There are limitless ways of organizing your templates but a lot of projects follow the structure we are suggesting here. That said, you can always branch out and try new ways of doing things. 

We suggest breaking your templates out into two tiers: 

  - **Layouts**: These are the 'wrapper' of the page. The ```<html>, <head>, <body>``` that needs to appear on all of your templates. This might also include your main menu or whatever else you have on all your pages. Maybe you need a few of these layouts but we like to think of these as 'wrapper' templates that all the other templates will extend. Again, you can get as complicated as you want with includes and extensions - this just works for us most of the time.
  - **Templates**: This folder contains the *guts* of the layouts we will use throughout the site. For the documentation for devise I have the following templates:  
    - Homepage
    - Documentation
    - Generic

    All the pages at devisephp.com use one of those three templates. 

> Any template files that you prefix with an underscore in the filename will be considered partials which we expect you to ```@include()``` in one of your main templates.

##<a name="introduction-to-blade-syntax" class="ia"></a>[#](#introduction-to-blade-syntax)Introduction to Blade Syntax

> **A note about other templating engines**: Blade is the templating system bundled in Laravel. Some folks prefer using other systems which you are welcome to use. Milage may vary but I'm not quite sure why they wouldn't work in Devise. However, our team digs Blade and have developed Devise with Blade in mind. 

Blade is *incredibly* easy to use - especially if you have any knowledge of basic programming operators. All it does is allow you to drop in some simple additional text into your HTML to make them more dynamic. Here is an example that will write out 10 list items. Simple.

```html
<html>
<body>
  <ul>
    @for($i=0; $i<10; $i++)
    <li>I have guzzled {{ $i }} beers. </li>
    @endfor
  </ul>
</body>
</html>
```

**Including and Extending**

Templates are just files that are either autonomous, extend another file, include other files, or extend and include files. This allows you to extend templates that contain things like menus or headers and footers that appear on every page, and when those things need to change, only modify one file to make a site-wide change. 

A common pattern that we tend to use is a three tier system. Note that **all of these files are simply blade files regardless of our nomenclature**. The are *all* templates.

* **Layouts**: These are the top-level files that contain the ```<html>, <head>, <body>``` tags along with the header and footer stuff that appears on every page.
* **Templates**: These are the mid-level files that contain the guts of a page layout. Most of this markup
* **Partials**: Partials the bottom-level of templates that tend to be re-used across several templates. They could be user profile cards, message notifications, anything that is used over and over again. That way if your message notification format changes - again, you only have to change it in one place.

With these three types of templates in mind you will ```@extend()``` and ```@include()``` from the middle-tier template files to build out a template. Here is an example of an index that might represent our list of breweries:

**Layout**: /app/views/layouts/master.blade.php

```
<html>
<head>

</head>
<body>

<ul id="main-menu">
	<li><a href="/">Home</a></li>
    <li><a href="/beers">Beers</a></li>
    <li><a href="/breweries">Breweries</a></li>
</ul>

@yield('content')

</body>
</html>
```

---

**Template**: /app/views/templates/breweries-index.blade.php

```
@extends('layouts.master')

@section('content')

@include('_hero') <!-- See how we include the partial? -->

<p>This is the content that is specific to this template</p>

@stop
```

---

**Partial**: /app/views/templates/_hero.blade.php

```
<div class="hero">
<h1>{{ $page->title }}
<p>{{ $page->meta_description }}</p>
</div>
```


**Other resources for learning Blade**

* [Laravel documentation on Blade](http://laravel.com/docs/4.2/templates#blade-templating)
* [Code Bright by Dayle Rees on Blade](http://daylerees.com/codebright/blade)
* [Laracasts on Blade](https://laracasts.com/index/blade)