Devise Documentation
=====================

Source for the documentation for [Devise](https://github.com/devisephp/cms). 

Contributing to this documentation
----------------------------

We don't have too strict of a style-guide yet for the documentation but you will need to follow a few conventions to ensure some things are automatically generated correctly.

This source contains everything needed to generate the documentation but the primary location you'll want to look to edit are the documents located in ```/source/docs```

###New sections

Ensure that for any new sections you add the section to the top of the document in the sections... section. 

```markdown
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
  - **New Section**
---
```

And then in the document you can add the section link the following way:

```markdown
##<a name="new-section" class="ia"></a>[#](#new-section)New Section
```

We know. It's a little fugly. 

###Style Guides

####Sub-sections

```markdown
###Sub-section of my new section
```

####Code

Since Sculpin uses the Twig rendering engine you have to watch out for those curly braces. Be sure to add a verbatim ```{% verbatim %}``` and ```{% endverbatim %}``` around your code blocks

```markdown
{% verbatim %}
I need to show echoing a variable like {{ $i }}
{% endverbatim %}
```


####Advanced and beginner sections

```html
<div class="advanced" markdown="1">

This will only appear for ninja bad-asses.

</div>
```

```html
<div class="beginner" markdown="1">

This will only appear for new dudes.

</div>
```

###New pages
If you want to create completely new pages maybe reach out to the team do discuss what your game plan is first so we can be on the same... page. [mail

Acknowledgements 
----------------------------

This documentation is powered by the awesome work from the guys over at the [Sculpin](http://sculpin.io) project. 