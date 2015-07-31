---
layout: default
title: About This Documentation
description: We know how it feels to find a new project resource, like what you see, and then find a skeleton of documentation. It sucks! Even in its first release we are attempting to supply you with robust documentation.
use: [docs]
converters: [markdown]
sections:
    - Code Blocks
    - Achtung!
    - Beer!
---

##<a name="code-blocks" class="ia"></a>[#](#code-blocks)Code Blocks

When ever we want to throw some code your way it will look like the following. Notice at the bottom we may throw you a file name where you could (or possible should) find this file.

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
######/resources/views/layouts/application.blade.php (example file name)

##<a name="achtung%21" class="ia"></a>[#](#achtung%21)Achtung!

If you've ever read a programming book you've undoubtedly seen these. If not, no worries. We're just trying to get your attention with them. We only use them when we really do have an important thing you should watch out for. There are three flavors:

###Tips

> #### Quick tips
> Don't want our opinion on how to do things? Skip these.

###Warnings

>> #### Careful, careful, careful
>> It's easy to make a mistake when you see one of these notifications. We have either made the mistake ourselves or have received feedback from other developers that it is easy to misunderstand or miss a step. Tread carefully.

###Upcoming Features

>>> #### New Upcoming Feature (10.1)
>>> When a feature is brand new or maybe is just about to be released we will notate above it with this block.

##<a name="beer%21" class="ia"></a>[#](#beer%21)Beer!
To make this novel a little easier to understand and use some real world examples we will use a fictitious narrative of a website about beer. We could have made a blog or a site about cats but this team loves beer. Good beer.

You love code. You love beer. Why not crack open a cold one right now before you get started.... we'll wait while you run to the fridge.



