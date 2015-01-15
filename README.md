Devise Documentation
=====================

Source for the documentation for [Devise](https://github.com/devisephp/cms). 

Contributing to this documentation
----------------------------

We don't have too strict of a style-guide yet for the documentation but you will need to follow a few conventions to ensure some things are automatically generated correctly.

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

Acknowledgements 
----------------------------

This documentation is powered by the awesome work from the guys over at the [Sculpin](http://sculpin.io) project. 