---
layout: default
title: Fields
use: [docs]
converters: [markdown]
sections:
  - Creating Your First Rando Editable Area
  - Simple Field
  - Grouping Fields
  - Collections of Fields
  - Editing Models
  - To Model Or Not To Model
---

#Fields
One of the greatest parts of Devise is to quickly drop in editable areas in your front-end markup. This section will show you how to do that as well as providing you some strategies for how you might want to implement them.

##<a name="creating-your-first-rando-editable-area" class="ia"></a>[#](#creating-your-first-rando-editable-area)Creating Your First Rando Editable Area

Front-end editing defines one of the more interesting and diversifying features of Devise. It gives users the ability to edit data in the context of the page, the data itself instead of ping ponging back and forth between an administration and the content they want to review.

What makes this even more exciting is how easy it is to implement for developers. Just a couple snippets of code in your markup and you'll be editing in no time. No, really. Seriously, watch:

```html
{% verbatim %}
<html>
<body>
	<p>This is a bunch of boring information that should be replaced with stories of beers... and attractive people... and dragons.
</body>
</html>
{% endverbatim %}
```

Now, let's imagine that your client comes back to you 3 months after you've deployed this smoking hot application and want the ability to edit your paragraph about dragons whenever he or she wants. What now?

```html
{% verbatim %}
<html>
<body>
	<p data-devise="dragonParagraph, textarea">This is a bunch of boring information that should be replaced with stories of beers... and attractive people... and dragons.</p>
</body>
</html>
{% endverbatim %}
```

See what I did there? I added the ```data-devise="dragonParagraph, textarea"``` attribute to the paragraph tag and now it's editable for any front-end users.

No, seriously, that's it.


##<a name="simple-field" class="ia"></a>[#](#simple-field)Simple Field

Drop in attributes roughly where they appear in the markup with the following syntax:

```php
{% verbatim %}
<p data-devise="[pagePropertyName], [type], [label]">
	{{ $page->pagePropertyName->text or 'Placeholder when null' }}
</p>
{% endverbatim %}
```

'Real' example

```php
{% verbatim %}
<h1 data-devise="title, text, Title of the Page">
	{{ $page->title->text or 'Placeholder when null' }}
</h1>
{% endverbatim %}
```

##<a name="grouping-fields" class="ia"></a>[#](#grouping-fields)Grouping Fields

Sometimes you will want to present several fields together as a group. This will put a single editing node on the side instead of an arrow for each field. Additionally, Devise will change the layout of the sidebar to allow the user to select from the various grouped fields. This might be desirable if the fields all make up a single component of the page.

Syntax:

```php
{% verbatim %}
<p data-devise="[pagePropertyName], [type], [label], [group label]">
	{{ $page->pagePropertyName->text or 'Placeholder when null' }}
</p>
{% endverbatim %}
```

What that might look like with a pair of fields:

```php
{% verbatim %}
<h1 data-devise="pageTitle, text, Title of the Page, Main Guts">
	{{ $page->featuredEvent->text or 'Placeholder when null' }}
</h1>
{% endverbatim %}
```

```php
{% verbatim %}
<div data-devise="bodyOfThisBeast, wysiwyg, Body of the Page, Main Guts">
	{{ $page->bodyOfThisBeast->text or 'Placeholder when null' }}
</div>
{% endverbatim %}
```

##<a name="collections-of-fields" class="ia"></a>[#](#collections-of-fields)Collections of Fields

Collections are repeatable groups of fields. You can have as many or as few as you like. Devise provides the mechanics to create new instances of a collection, remove those instances, and resort the order of those collection instances.

A good example of a collection might be a slideshow that has several content manageable components that make a single slide up. Maybe, it has a big title, description, and an image. However, you don't know how many slides your customer will have at any time. Collections are a good solution for this scenario.

Syntax example:

```php
{% verbatim %}
<p data-devise="[pagePropertyName], [type], [label], [group label], [collection label]">
	{{ $page->pagePropertyName->text or 'Placeholder when null' }}
</p>
{% endverbatim %}
```

Example that might build a slider system:

```php
{% verbatim %}
@foreach($page->slides as $slide)

<h3 data-devise="slides[title], text, Title of the Slide, Slides, Slides">
	{{ $slide->text or 'Placeholder when null' }}
</h3>

<div data-devise="slides[description], wysiwyg, Description of the Slide, Slides, Slides">
	{{ $slide->text or 'No Description' }}
</div>

<img data-devise="slides[description], wysiwyg, Description of the Slide, Slides, Slides" src="{{ $slide->image }}">

@endforeach
{% endverbatim %}
```

##<a name="editing-models" class="ia"></a>[#](#editing-models)Editing Models

So, how do you edit more substancial data using the sidebars? Simple: Just pass the model instance or the model attribute as the first parameter and Devise does the heavy lifting for you.

###Just One
```php
{% verbatim %}
@php $user = DvsUser::find(2); @endphp
<div data-devise="$user, Edit the User">
	{{ $user->email }} has an id of {{ $user->id }}
</div>
{% endverbatim %}
```

### Groups
```php
{% verbatim %}
@php $users = DvsUser::where('id', '<', 4)->get(); @endphp
@foreach ($users as $user)
	<div data-devise="$user, User $user->id, Edit Users">
		We might want to edit user {{ $user->id }} inside a group.
	</div>
@endforeach
{% endverbatim %}
```

###As a Single Attribute

```php
{% verbatim %}
@php $user = DvsUser::find(2); @endphp
<div data-devise="$user->email, Edit the User Email">
	So... {{ $user->email }} has an id of {{ $user->id }} but you already knew that right?
</div>
{% endverbatim %}
```

##<a name="to-model-or-not-to-model" class="ia"></a>[#](#to-model-or-not-to-model)To Model Or Not To Model

The question is: Does the data your users are manipulating need to be it's own database table or just a simple collection?

Sometimes this is a tough question but here are a few tips that might help you decide.

**It should probably be a model**

- It is repeatable and can have multiple instances.
- It has related data that can be shared over those intances (Think categories, states, or tags)
- I will need to query this data
- I will need to query this data based on it's related data (Ex: all of one category)

If many or all those are untrue then you may just want to use a simple Devise field.