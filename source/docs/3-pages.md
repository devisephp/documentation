---
layout: default
title: Pages
use: [docs]
converters: [markdown]
sections:
    - Pages and Routing
    - Creating New Pages
    - Managing Pages
    - Understanding page versions
    - Sharing An Unpublished Page With A Non-Admin
    - Working with the Calendar
---

#Pages
Any site has pages. These pages might contain simple, static information like pictures and text or it might contain dynamic information from a database. In this section we will cover how to create simple pages, complex pages, pages that nobody can see. Let's get started.

##<a name="pages-and-routing" class="ia"></a>[#](#pages-and-routing)Pages and Routing

<div class="beginner" markdown="1">

###New to routing?

So, if you are new to Laravel or new to the concept of routing you will want to read this: A route is how you, the developer, instruct the system where to go when a user requests a url or submits data to a url.

So, a route is usually similar to one of these examples:
    - beerzrule.com/top-10-beers: When a user goes to this page the route returns the HTML needed to draw out the beer list. In simple terms, it accomplishes this by mapping the route's url to a view file which is located in the "/resources/views/" directory.
    - beerzrule.com/add-new-beer: This url gets called when a user submits the "Add New Beer" form which puts it into the database.

There are other things routes can return, but for now just think of it as routes that return HTML and routes that receive and process data.

> ###'Page' vs. 'Route'
> Keep in mind that a 'page' in Devise is a route. You can interchange the terms 'page' and 'route' in context of Devise. They are the same. We decided to use the term 'Page' because we felt our customers would understand more easily. You're a developer. Man / Woman up.
</div>

<div class="advanced" markdown="1">

###How Devise routing works alongside Laravel

If you're coming from the Laravel world you're probably familiar with routing and how it works in good 'ol Laravel. Devise works alongside the Laravel routing engine by simply bootstrapping our routes stored in the database.

This allows you to still use the routes.php file or however you have done routing in the past alongside Devise.

>>> ### About Laravel 5
>>> With the launch of Laravel 5, we have fully implemented the route caching system into Devise to help accelerate load times and reduce queries.
</div>

##<a name="creating-new-pages" class="ia"></a>[#](#creating-new-pages)Creating New Pages

Creating a page is easy. From the administration dashboard click on *ahem*... Pages. Click on 'Create New Page' in the top right-hand corner and you will be presented the Create A New Page form.

###General Page Options

 **Title of the page**: The purpose of this field is to supply a label for the administrative list of pages. It really isn't meant for anything on the front-end.

---

**Short description of the page**: A place to put any notes about what this page is and what it's purpose is.

---

**Language**: This is the language of this page. We'll go more into languages in another section.

---

**View Template To Use**: Templates are layouts you have placed in your ```app/view/templates``` directory. You can read more on how templates work in the [templates](Templates) section of the documentation.

---

### Page Routing Options

**Page Slug**: The page slug is the url of the page. You can structure these however you like. So our breweries list page could be ```/breweries-list``` or ```/breweries/list```. Structure your pages however you see fit. What if it's a view that is a little more complex like a page that shows the details of a specific brewery? Then you might do something like this:

```
/breweries/{breweryId}
```

That allows you to set a url parameter we can use to load the appropriate brewery.

---

**Publish on Save**: This will make the page live when it is created.

---

**Show Advanced Options**: When toggled you get to see all the goodies!

---

### Advanced/Meta Options

**Meta Title**: This is the title that will populate the ```<title>``` of the template.

---

**Meta Description / Meta Keywords**: These are used to populate their respective meta tags.

---

**Head Code**: If your page needs any additional HTML or JavaScript inserted into the <head> section of the DOM you can place it here.

---

**Footer Code**: Likewise, footer code will be injected just before the closing </body> tag. This can be used for additional JavaScript inclusions, script calls, whatever.

>> Note that the meta fields, head code, and footer code must be inserted correctly in the templates your site uses. They don't just magically appear. see the [templatefs](Templates) documentation to see how this should be formatted.

##<a name="managing-pages" class="ia"></a>[#](#managing-pages)Managing Pages

There are essentially two things you can do with a page once it has been created:

  - **Copy**: This copies all settings of the page along with the page versions you select from the dialog.
  - **Delete**: This well... kills a page. Dead. Gone. Bye-bye.

##<a name="understanding-page-versions" class="ia"></a>[#](#understanding-page-versions)Understanding Page Versions

Page versions are simply instances of a page. If a *page* is the URL itself the *page version* is the content *on* that page. You can find the page versions of a page by clicking *Expand page versions* under the title of each page on the *page index* of administration.

###So what can you do with page versions?

  - Work on a page before it ever goes live.
  - Work on a new version of a page before it ever goes live.
  - Schedule a page to go live.
  - Share an unpublished version of a page with someone to review.
  - Copy a page version

###Here are some rules to keep in mind:

  - If there is not a page version currently published the page will return a 404 error.
  - If no end date is set the page version will be live forever.
  - The page version with the most recent start date will take priority.

##<a name="sharing-an-unpublished-page-with-a-non-admin" class="ia"></a>[#](#sharing-an-unpublished-page-with-a-non-admin)Sharing An Unpublished Page With A Non-Admin

One of the things that we, as developers, need to do is have our customers review new layouts and content without having it published for the public to see. Devise makes this very easy to do. From the *pages index* find the page that you wish to share. Click *Expand page versions* under the page title to show the page versions.

Click the dropdown and select *enable sharing* and then click *ok* in the JavaScript alert.

##<a name="working-with-the-calendar" class="ia"></a>[#](#working-with-the-calendar)Working With The Calendar

The calendar gives you and your customers a great way of seeing when page versions will be published and which pages need to go live. To manage when pages go live you can either drag them around the calendar or click on any page version and edit their start or end time in the modal window.

If you wish to remove a published page version from the calendar click on the entry and uncheck the *published* checkbox.