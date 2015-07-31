---
layout: default
title: Templates
description: Creating templates in Devise is extremely easy - especially if you are used to Laravel's Blade syntax - but it's easy no matter what your experience is with Laravel. One of our major focuses was to give developers a super-easy and quick way to take a standard sliced-and-diced HTML / CSS / JavaScript page and make it content manageable.
use: [docs]
converters: [markdown]
sections:
  - Creating New Templates
  - Getting Data to Templates
  - Getting Data from Templates
  - Introduction to Blade Syntax
---

> #### A quick note about template setup
> There are limitless ways of organizing your templates but the majority of our projects follow the structure we are suggesting here. That said, you can always branch out and find new ways to leverage Devise. There are only two "rules" for the system to operate correctly without tinkering with the guts of Devise:

> 1. Devise expects templates to be in the ```/resources/views/``` directory. We recommend creating a templates directory inside this directory.
> 2. Any blade files in the ```/resources/views/``` directory prefixed with an underscore will be considered a partial and not presented in the dropdown on the template registration form. For example: ```/resources/views/templates/_jumbotron.blade.php``` would be considered a partial.


##<a name="creating-new-templates" class="ia"></a>[#](#creating-new-templates)Creating New Templates

Great, so you know some sweet Blade syntax. So, how do we take a design we've gotten from our hipster designers down the hall and actually apply it to a Devise page? It's simple - really.

###1. Cut up the design

Hire that off-shore company to slice-and-dice your design into HTML / CSS / JavaScript. Or, get the intern to do it.

###2. Divide the HTML into parts

Just think to yourself: *"What sections will appear more than once throughout the site? What might be used as a subset of those pages?* The part which appears across several different pages is your layout (e.g. header, footer) and the part within the layout is the template itself (e.g. title, content, images, etc.).

Take a look at [Intro to Blade Syntax](#introduction-to-blade-syntax) below for more guidance on this.

If you've never done this you'll make mistakes here, but don't worry because shuffling parts of your markup around after the fact is not a big deal; so just experiment. A lot of what determines where to put things is foresight on what's coming.

A good way to start is to spread out your entire design deck and identify what parts of the design wrap around a bunch of pages? These are probably *layouts*. What parts of the design appear within different designs but appear in different locations? Those are probably *partials*. The rest of the designs are probably your main template files.


> ####As a General Rule

> Usually, if a designer sends over 10 files, we'll probably have 10 templates.

###3. Remember to include Devise

Devise requires a two simple includes, one in the head and another before the closing body tag of your layout, this allows Devise to inject the JavaScript magic it needs:

```html
@include('devise::styles')
```

Place this include within the ```<head></head>``` tags.

Also:

```html
@include('devise::scripts')
```

Place this include right before the closing ```</body>``` tag.


###4. Register that sucker

We're pretty eager to see the design and make sure the template is loading so let's go ahead and register the new template. Log in to the administration of your application and click on *Templates* on the main menu.

Click on *Register New Template* in the top right-hand corner of the administration. Select your template blade file from the dropdown and give it a more friendly name. Aaaaand done.

###5. Apply the template to a page

In the admin head back to the *Pages Section*. Once there, either create a page or edit an existing page and then select the template we just registered in the "View Template To Use" dropdown. Now when you view the page you should see your design. (applause)

###6. Add Any Blade Syntax and/or Devise Editable Areas

I know what you're thinking: *"Great, I've got a static page in Devise... amazing.... but it doesn't **do** anything!*

Easy bro... Easy.

In the following sections we're going to show you some of the tools which are immediately available within Devise, so that you can start making some educated decisions on how you want to build whatever it is you want to build. Essentially, you have consumed all the potatoes and arrived at the meat.



##<a name="getting-data-to-templates" class="ia"></a>[#](#getting-data-to-templates)Getting Data to Templates

In more advanced applications where you have Models, custom classes, and an application data structure you’re going to need to get your data to the template. This is one of the best features of Devise so sit back and hold on to your butts!

For this lets use the example of Beers (as usual). Let’s say you have a database of Beers and you want to show a list of all of these beers on a page. Let’s do that. 

Step 1:

Create a file called ```BeersRepository.php``` in the directory ```/app/Beer/BeersRepository.php```. Inside that file place the following code:

```php
<?php namespace App\Beer;

use App\Beer;

class BeersRepository
{
	function __construct(Beer $Beer)
	{
		$this->Beer = $Beer;
	}

	function getAllBeers()
	{
		return $this->Beer->orderBy('name', 'DESC')->paginate();
	}
}
```
###### /app/Beer/BeersRepository.php

> What the heck is that query?!

> If you're unfamiliar with the syntax check out the [Laravel docs on Eloquent ORM](http://laravel.com/docs/master/eloquent). It's magical.

Ok, so now we have a class with a method that will return us all the Beer paginated. Great! But how do we get it on our template? Simple. Head to the 'Templates' section in the administration and click edit on the template you want to add this data to. Click 'Add New Variable'. Stay on the 'Create new Variable' tab and put a variable name of ```beers```, a class path of ```/app/Beer/BeersRepository``` and a method name of ```getAllBeers```

What we just did is make a variable available called ```$beers``` that will have the paginated results for your template. For this specific example you might put this code on your template somewhere:

```html
<table>
@foreach($beers as $beer)
    <tr>
        <td><?= $beer->name ?></td>
        <td><?= $beer->description ?></td>
        <td><img src="<?= $beer->image_url ?>" width="<?= $beer->width ?>" height="<?= $beer->height ?>"></td>
    </tr>
@endforeach
</table>
```
###### /resources/views/templates/sometemplate.blade.php



##<a name="getting-data-from-templates" class="ia"></a>[#](#getting-data-from-templates)Getting Data from Templates

Ok, so now how do you get data from a template *into* a class? For instance, what if someone submits a form into the system and you want to store that in the database? Well, what I would suggest is working backwards:

####Step 1: Build out your classes

These classes can do whatever you want them to do. We're going to keep this very, very simple for this example. See the tip at the bottom of this section for a more extensive example.

Create a class at ```/app/Beer/BeerRules.php``` and populate that class with the following:

```php
<?php namespace App\Beer;

use Illuminate\Routing\Redirector;

class BeersResponseHandler
{
	function __construct(Redirector $Redirect)
	{
		$this->Redirect = $Redirect;
	}

	function doSomethingDamnIt($input)
	{
		dd($input);
	}
}
``` 
######/app/Beer/BeerRules.php

Now, you need to create a POST [API](/docs/apis) that points a route to this class. Once that is complete create your form like-a-so.

```html
<?= Form::open(array('method' => 'POST', 'route' => 'whatever-the-route-to-your-api-is')) ?>

    <div>
        <?= Form::label('Name of Beer') ?>
        <?= Form::text('name') ?>
	</div>
	<div>
        <?= Form::label('Description') ?>
        <?= Form::textarea('description') ?>
	</div>

    <?= Form::submit('Do something with my Beer') ?>
<?= Form::close() ?>

```

When you submit the form you should get a ```dd()``` (die/dump) of the data you submitted. Congrats! See the tip below for going all ninja-advanced!


> #### For a more complex example

> We have a model generator tool within Devise. This will generate classes, API's, Pages, and templates for your model. Take a look at the ```/app/{ModelName}/{ModelName}Manager.php``` file and the ```/app/{ModelName}/{ModelName}ResponseHandler.php``` class files to see how we typically submit data and handle the requests and responses.


##<a name="introduction-to-blade-syntax" class="ia"></a>[#](#introduction-to-blade-syntax)Introduction to Blade Syntax

> ####A note about other templating engines
> Blade is the templating system bundled in Laravel. Some folks prefer using other systems which you are welcome to use. Milage may vary but I'm not quite sure why they wouldn't work in Devise. However, our team digs Blade and have developed Devise with Blade in mind.

Blade is *incredibly* easy to use - especially if you have any knowledge of basic programming operators. All it does is allow you to drop in some simple additional text into your HTML to make them more dynamic. Here is an example that will write out 10 list items. Simple.

```php
{% verbatim %}
<html>
<body>
  <ul>
    @for($i=0; $i<10; $i++)
    <li>I have guzzled {{ $i }} beers. </li>
    @endfor
  </ul>
</body>
</html>
{% endverbatim %}
```

###Echoing out variables

```
{% verbatim %}
{{{ $i }}}
{% endverbatim %}
```

or unescaped

```
{% verbatim %}
{!! $i !!}
{% endverbatim %}
```

or give an alternative if the variable isn't set (thank you Laravel!)

```
{% verbatim %}
{{{ $beer->name or 'Unknown' }}}
{% endverbatim %}
```

###Including and Extending

Templates are just files that are either autonomous, extend another file, include other files, or extend and include files. This allows you to extend templates containing things like menus or headers and footers appearing on every page and when they need to change, only modify one file to make a site-wide change.

A common pattern we tend to use is a three tier system. Note that **all of these files are simply blade files regardless of our nomenclature**. They are *all* templates.

* **Layouts**: These are the top-level files containing the ```<html>, <head>, <body>``` tags along with the header and footer markup appearing on every page.
* **Templates**: These are the mid-level files holding the guts of a page layout. Tends to have majority of the markup.
* **Partials**: Partials are the bottom-level and can be re-used across several templates. We like to think of them as a grouping(s) of elements. They could be user profile cards, message notifications, anything used over and over.

With these three types of templates in mind you will ```@extend()``` and ```@include()``` from the middle-tier template files to build out a template. Here is an example of an index which represents our list of breweries:

**Layout**

```html
{% verbatim %}
<html>
<head>

</head>
<body>

<ul id="main-menu">
	<li><a href="/">Home</a></li>
    <li><a href="/beers">Beers</a></li>
    <li><a href="/breweries">Breweries</a></li>
</u>

@yield('content')

</body>
</html>
{% endverbatim %}
```
######/resources/views/layouts/application.blade.php

**Template**: /resources/views/templates/breweries/index.blade.php

```php
{% verbatim %}
@extends('layouts.application')

@section('content')

@include('_jumbotron') <!-- Include the partial? -->

<p>This is the content that is specific to this template</p>

@stop
{% endverbatim %}
```

**Partial**: /resources/views/templates/_jumbotron.blade.php

```php
{% verbatim %}
<div class="jumbotron">
	<h1>{{ $page->title }}</h1>
	<p>{{ $page->meta_description }}</p>
</div>
{% endverbatim %}
```

###If / Else

```php
{% verbatim %}
@if($beers == 'amazing')
	<h2>Hey there!</h2>
@else
	</h6>Get out...</h6>
@endif
{% endverbatim %}
```

```php
{% verbatim %}
@if($favoriteBeer == 'lambic')
	<h2>Me too!</h2>
@elseif($favoriteBeer == 'stout')
	<h2>Respect</h2>
@else
	<h2>That's cool</h2>
@endif
{% endverbatim %}
```

###Loops

```php
{% verbatim %}
@for($i = 0; $i < 10; $i++)
	<h2>I guzzled {{ $i }} beers</h2>
@endfor
{% endverbatim %}
```

```php
{% verbatim %}
@foreach($beers as $beer)
	<li>{{ $beer->name }}</li>
@endforeach
{% endverbatim %}
```

###Comments

```php
{% verbatim %}
{{-- Nobody will find my hidden beer stash!!! --}}
{% endverbatim %}
```

###Other resources for learning Blade

There is a bunch of other goodies in Blade. You can even extend it and your make your own ```@beerbong``` if you want.

* [Laravel documentation on Blade](http://laravel.com/docs/5.0/templates)
* [Code Bright by Dayle Rees on Blade](http://daylerees.com/codebright/blade)
* [Laracasts on Blade](https://laracasts.com/index/blade)