---
layout: default
title: Fields
description: One of the greatest parts of Devise is to quickly drop in editable areas in your front-end markup. This section will show you how to do that, as well as providing some strategies for implementing editable areas.
use: [docs]
converters: [markdown]
sections:
  - Creating Your First Editable Area
  - Simple Field
  - Grouping Fields
  - Collections of Fields
  - Editing Models
  - To Model Or Not To Model
---

##<a name="creating-your-first-editable-area" class="ia"></a>[#](#creating-your-first-editable-area)Creating Your First Editable Area

Front-end editing is one of the most interesting and diversifying features offered in Devise. It gives users the ability to edit data in the context of the page instead of ping ponging back and forth between an adminstrative page and the front-end content.

The real excitement becomes apparent when developers see how quick and painless it is to implement. By adding an attribute to an element's markup and refreshing the page the item(s) become editable. No, really. Seriously, watch:

```html
{% verbatim %}
<html>
<body>
	<p>This is a bunch of boring information that should be replaced with stories of beers... and attractive people... and dragons.</p>
</body>
</html>
{% endverbatim %}
```

Now, let's imagine your client comes back to you 3 months after you've deployed this smoking hot application and wants the ability to edit your paragraph about dragons whenever he or she wants. What now?

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

And that's it! Seriously.

##<a name="simple-field" class="ia"></a>[#](#simple-field)Simple Field

Drop in attributes roughly where they appear in the markup with the following syntax:

*Syntax*

```php
{% verbatim %}
<p data-devise="[propertyName], [type], [label]">
	{{ $page->propertyName->text('Default value when null') }}
</p>
{% endverbatim %}
```

*'Real' Example*

```php
{% verbatim %}
<h1 data-devise="title, text, Title of the Page">
	{{ $page->title->text('Default value when null') }}
</h1>
{% endverbatim %}
```

##<a name="grouping-fields" class="ia"></a>[#](#grouping-fields)Grouping Fields

Sometimes you will want to present several fields together as a group. This will put a single editing node on the side instead of an arrow for each field. Additionally, Devise will adjust the sidebar layout allowing the user to select from the various grouped fields. This might be desirable if the fields all make up a single component of the page.

*Syntax*

```php
{% verbatim %}
<p data-devise="[propertyName], [type], [label], [group label]">
	{{ $page->propertyName->text('Default value when null') }}
</p>
{% endverbatim %}
```

*A couple of 'Real' Examples*

```php
{% verbatim %}
<h1 data-devise="pageTitle, text, Title of Page, Main Guts">
	{{ $page->pageTitle->text('Default Title') }}
</h1>
{% endverbatim %}
```

```php
{% verbatim %}
<div data-devise="pageBodyText, wysiwyg, Body of Page, Main Guts">
	{{ $page->pageBodyText->text('<p>Default content which is just for an example</p>') }}
</div>
{% endverbatim %}
```

##<a name="collections-of-fields" class="ia"></a>[#](#collections-of-fields)Collections of Fields

Collections are repeatable groups of fields. You can have as many or as few as you like. Devise provides the mechanics to create new instances of a collection, remove those instances, and re-sort the order of those instances.

A good example of a collection might be a slideshow which has several content manageable components that make up a single slide. Maybe, it has a title, description, and an image. However, you don't know how many slides your customer will have and they want to manage the content and images of the slides. Collections are a good solution for this scenario.

*Syntax example:*

```php
{% verbatim %}
<p data-devise="collectionAlias[propertyName], [type], [label], [group label], [collection label]">
	{{ $page->propertyName->text('Default value when null') }}
</p>
{% endverbatim %}
```

*Example of how to build a simple and manageable slider:*

```php
{% verbatim %}
@foreach($page->slides as $slide)

<h3 data-devise="slides[title], text, Slide Title, Slides, Slides">
	{{ $slide->text('No Slide Title') }}
</h3>

<div data-devise="slides[description], wysiwyg, Slide Description, Slides, Slides">
	{{ $slide->text('No Slide Description') }}
</div>

<img data-devise="slides[image], image, Slide Image, Slides, Slides" src="{{ $slide->image }}">

@endforeach
{% endverbatim %}
```

##<a name="editing-models" class="ia"></a>[#](#editing-models)Editing Models

So, now you want to edit more substantial data, like a model, from within the sidebar? No problem: Just pass the model instance or the model attribute as the first parameter and Devise does the heavy lifting for you. But first, just a little setup:

###Configuring the model-mapping

Open up the model-mapping config file. This gives Devise a little knowledge about which of the model's fields to show, how they should validate, and which editor sidebar type to use with each of them. For this example we are going to edit a model called 'Beer' with a table called 'beers'.

```
'Beer' =>
[
	'rules' =>
	[
		'name' => 'required',
		'description' => 'required',
	],

	'picks' =>
	[
		'Name' => [ 'name' => 'text' ],
		'Description' => [ 'description' => 'text' ],
		'Picture of the Beer' => [ 
			'image_url' => 'image', 
			'height' => 'image_height', 
			'width' => 'image_width' 
		],
	],

	'types' =>
	[
		'Name' => 'text',
		'Description' => 'wysiwyg',
		'Picture of the Beer' => 'image',
	]
],
```
###### /config/devise/model-mapping.php

Let's break this down a little. 

#### Rules
First the ```rules``` section defines the validation rules that you want to run on for each of the fields. You don't have to run any if you like - just don't include them in the array.

#### Picks
Next is the ```picks``` section. This tells us what the human name of the button label is, the database fields you want to save to, and, finally, what field from the Devise editor you want to save. 

*Syntax*

```
'picks' =>
[
	'Human Name' => [  'modelAttr1' => 'fieldAttr1', 'modelAttr2' => 'fieldAttr2' ]
]
```

You can find a list of the available field attributes for the editor type you want to use on the [Field Types](/docs/field-types)

#### Types
Finally, the types section defines what sidebar editor you want to use. The keys must match the keys in the picks section. Again, for the values you can use any of the types listed on the [Field Types](/docs/field-types) page.

#### So what is this going to do?
What this does is map fields in your database to an editor. So when we do click on a model editor it will have 3 sub-sections: "Name", "Description", and "Picture of the Beer". Once you click on "Name" you get a text field, "Description" a wysiwyg editor, and "Picture" will give you the image editor and media browser. It's like... that easy. Let's place some editors!


### Placing the editors

Now that you are properly configured you can start adding data-devise tags into your template telling Devise where you want to edit the model. 

### Just One
```php
{% verbatim %}
<!-- Note that your $beer data should probably 
be coming from the template configuration
And not just a direct call on your template.
This is just poor form for the sake of the 
demo. -->
@php $beer = Beer::find(2);  @endphp
<div data-devise="$beer, Edit the Beer">
	{{ $beer->email }} has an id of {{ $beer->id }}
</div>
{% endverbatim %}
```

### Groups
```php
{% verbatim %}
@php $beers = Beer::where('id', '<', 4)->get(); @endphp
@foreach ($beers as $beer)
	<div data-devise="$beer, User $beer->id, Edit Beers">
		We might want to edit user {{ $beer->id }} inside a group.
	</div>
@endforeach
{% endverbatim %}
```
######Note that your $beers data should probably be coming from the template configuration and not just a direct call on your template. This is just poor form for the sake of the demo.

### As a Single Attribute
```php
{% verbatim %}
@php $beer = Beer::find(2); @endphp
<div data-devise="$beer->email, Edit the Beer Descriptoin">
	So... {{ $beer->email }} has an id of {{ $beer->id }} but you already knew that right?
</div>
{% endverbatim %}
```
######Note that your $beer data should probably be coming from the template configuration and not just a direct call on your template. This is just poor form for the sake of the demo.

##<a name="to-model-or-not-to-model" class="ia"></a>[#](#to-model-or-not-to-model)To Model Or Not To Model

The question is: Should the data your users are manipulating be its own database table as model or just a simple collection?

Sometimes this is a tough question, but here are a few tips to help you decide.

**It should probably be a model**

- It is repeatable and can have multiple instances
- It has related data that can be shared over those intances (i.e. blogs have categories, car has a manufacturer, or images with tags)
- Will this data or any of its related data need to be searched/queried/filtered?

Of course, these are not ALL the deciding factors when choosing if data should be a model or not. But, typically if one or more of those are true you might just want to make it into a model.