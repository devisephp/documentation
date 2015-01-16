---
layout: default
title: Templates
use: [docs]
converters: [markdown]
sections:
  - Creating New Templates
  - Introduction to Blade Syntax
  - Creating Rando Editable Areas
  - Editing Your Models
  - Workflows
  - Examples
---

#Templates
Creating templates in Devise is extremely easy - especially if you are used to Laravel's Blade syntax - but easy no matter what your experience with Laravel. One of our major focuses was to give developers a super-easy way to take a standard sliced-and-diced HTML / CSS / JavaScript page and make it content manageable quickly and easily. 

> ####A quick note about how we setup our templates 
>There are limitless ways of organizing your templates but a lot of projects follow the structure we are suggesting here. That said, you can always branch out and try new ways of doing things. There is only two "rules" that we have for the system to operate correctly without tinkering with the Devise guts:

  - We are expecting the templates you want to apply to pages to be in the ```/app/views/templates``` directory.
  - Any blade files in the ```/app/views/templates``` directory that are prefixed with an underscore will be considered a partial. For example: ```/app/views/templates/_jumbotron.blade.php```


#<a name="creating-new-templates" class="ia"></a>[#](#creating-new-templates)Creating New Templates

Great, so you know some sweet Blade syntax. So, how do we take a design we've gotten from our hipster designers down the hall and actually apply it to a Devise page? It's simple - really.

###1. Cut up the design

Hire that off-shore company to slice-and-dice your design into HTML / CSS / JavaScript. Or, get the intern to do it. 

###2. Divide the HTML into parts

Just think to yourself: *"What is going to appear several sections of the site and what might be used on a subset of those pages?* The part that is going to appear across several different designs is your layout and the part that is specific to a design is your template. 

Take a look at [Intro to Blade Syntax](#introduction-to-blade-syntax) below for more guidance on this.

<div class="beginner" markdown="1">

If you've never done this you'll make mistakes here but don't worry, shuffling parts of your markup around after the fact is not a big deal so just experiment. A lot of what determines where to put things is foresight on what's coming.

A good way to start is to spread out your entire design deck and identify what parts of the design wrap around a bunch of pages? These are probably *layouts*. What parts of the design appear within different designs but appear in different locations? Those are probably *partials*. The rest of the designs are probably your main template files. 

> ####A General Rule
> I find that if my designer sends me 10 files I'll probably have 10 templates. 

</div>

###3. Register that sucker

We're pretty eager to see the design and make sure the template is loading so let's go ahead and register the template. Log in to the administration of your application and click on *Templates* on the main menu. 

Click on *Register Template* in the top right-hand corner of the administration. Select your template blade file from the dropdown and give it a more friendly name. Aaaaand done.

###4. Apply the template to a page we can test on.

In the administration head back to *Pages* and either create a page or edit an existing page and select the template we just registered. View or preview the page and we should see your design. 

###5. Add Any Blade Syntax or Devise Editable Areas

I know what you're thinking: *"Great, I've got a static page in Devise... amazing.... but it doesn't **do** anything!*

Easy bro. Easy. 


##<a name="introduction-to-blade-syntax" class="ia"></a>[#](#introduction-to-blade-syntax)Introduction to Blade Syntax

> ####A note about other templating engines
> Blade is the templating system bundled in Laravel. Some folks prefer using other systems which you are welcome to use. Milage may vary but I'm not quite sure why they wouldn't work in Devise. However, our team digs Blade and have developed Devise with Blade in mind. 

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

###Echoing out variables 

```
{{{ $i }}}
```

or unescaped

```
{{ $i }}
```

or give an alternative if the variable isn't set (thank you Laravel!)

```
{{{ $beer->name or 'Unknown' }}}
```

###Including and Extending

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

@include('_jumbotron') <!-- Include the partial? -->

<p>This is the content that is specific to this template</p>

@stop
```

---

**Partial**: /app/views/templates/_jumbotron.blade.php

```
<div class="jumbotron">
<h1>{{ $page->title }}
<p>{{ $page->meta_description }}</p>
</div>ds
```

###If / Else

```
@if($beers == 'amazing')
<h2>Hey there!</h2>
@else
</h6>Get out...</h6>
@endif
```

```
@if($favoriteBeer == 'lambic')
<h2>Me too!</h2>
@elseif($favoriteBeer == 'stout')
<h2>Respect</h2>
@else
<h2>That's cool</h2>
@endif
```

###Loops

```
@for($i = 0; $i < 10; $i++)
<h2>I guzzled {{ $i }} beers</h2>
@endfor
```

```
@foreach($beers as $beer)
<li>{{ $beer->name }}</li>
@endforeach
```

###Comments

```
{{-- Ain't nobody going to see this --}}
```

###Other resources for learning Blade

There is a bunch of other goodies in Blade. You can even extend it and your make your own ```@beerbong``` if you want. 

* [Laravel documentation on Blade](http://laravel.com/docs/4.2/templates#blade-templating)
* [Code Bright by Dayle Rees on Blade](http://daylerees.com/codebright/blade)
* [Laracasts on Blade](https://laracasts.com/index/blade)
