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
Any site has pages. These pages might contain simple, static information like pictures and text or it might contain dynamic information from a database. In this section we will cover how to create simple pages, complex pages, pages that nobody can see, even drunk pages. Let's get started.

##<a name="pages-and-routing" class="ia"></a>[#](#pages-and-routing)Pages and Routing

<div class="beginner" markdown="1">

###New to routing?

So, if you are new to Laravel or new to the concept of routing you may want to read this: A route is how you, the developer, instruct the system where to go when a user requests a url or submits data to a url.

So a route is usually similar to one of these examples:
    - beerzrule.com/top-10-beers: When a user goes to this page the route returns the HTML needed to draw out the beer list.
    - beerzrule.com/add-new-beer: This url gets called when a user submits the "Add New Beer" form which puts it into the database. 

There are other things routes can return but for now just think of it as routes that return HTML and routes that receive and process data.

> ###'Page' vs. 'Route'
> Keep in mind that a 'page' in Devise is a route. You can interchange the terms 'page' and 'route' in context of Devise. They are the same. We decided to use the term 'Page' because we felt our customers would understand more easily. You're a developer. Man / Woman up. 
</div>

<div class="advanced" markdown="1">

###How Devise routing works alongside Laravel

If you're coming from the Laravel world you're probably familiar with routing and how it works in good 'ol Laravel. Devise works alongside the Laravel routing engine by simply bootstrapping our routes stored in the database. 

This allows you to still use the routes.php file or however you have done routing in the past alongside Devise. 

>>> ### About Laravel 5
>>> Once Laravel 5 launches we will fully implement the route caching system into Devise to help accelerate load times and reduce queries.
</div>

##<a name="creating-new-pages" class="ia"></a>[#](#creating-new-pages)Creating New Pages

Creating a page is easy. From the administration dashboard click on *ahem*... Pages. Click on 'Create New Page' in the top right-hand corner and you will be presented the Create A New Page form. 

###Page Options

 **Title of the page**: The purpose of this field is to supply a label for the administrative list of pages. It really isn't meant for anything on the front-end. 

---

**Short description of the page**: A place to put any notes about what this pages is and what it's purpose is.

---

**Language**: This is the language of this page. We'll go more into languages in another section.

---

**Route Type**: The route type determines how the page can be accessed by a browser.d Let's break down your options and what they are typically used for.

  - Regular Page (GET): These most likely represent the majority of your pages. They are pages that a user simply goes to load a page or some other response. 
  -  Create (POST): Post pages are typically used for sending data to the server behind the scenes. If the page is accepting a contact form or a form that created some new thing we would use POST.
  -  Update (PUT): Pages that accept PUT's are typically used for updating a record in the database.
  -  Delete (DELETE): Typically this route type will delete things.
  -  Any Method: Users can access this page with any browser method.

**For a quick example**: Let's say our beer site has a page that lists all the breweries in the world. We would create a page called 'Brewery List' with a **GET** route type. At the bottom of that page is a form that allows users to submit new breweries. That form would be pointed at another page with a **POST** route type. If we allowed users to edit we would use **PUT** and delete would use **Delete**. 

>> If a browser tries to access a page with a method you have not specified. For instance, you set a page as a regular GET page and someone tries to post data to it that user will experience a good 'ol fashioned 404.

---

**Page Slug**: The page slug is the url of the page. You can structure these however you like. So our breweries list page could be ```/breweries-list``` or ```/breweries/list```. Structure your pages however you see fit. What if it's a view that is a little more complex like a page that shows the details of a specific brewery? Then you might do something like this:

```
/breweries/{breweryId}
```

That allows you to set a url parameter we can use to load the appropriate brewery. 

---

**Response Path**: Response Path is only valid for any route type other than GET. Essentially, this is where we tell Devise what method to execute when the page is called. Simply add your class path to this field followed by a period and the method that it needs to execute. 

*Example:* If the class we wanted to go to when we made the POST page to create a new brewery looked like the following:

```php
<?php namespace BeerApp\Brewers;

/**
 * Manages the requests to modify the 
 * Brewers model.
 */
class BrewersManager
{
    /**
     * Adds a new brewery to the system
     *
     * @return bool
     */
    public function createBrewery() {
	...
    }
}
```

We would put the following in the response path field:

```
BeerApp\Brewers\BrewersManager.createBrewery
```

---

**Response Parameters**: So, some what if your method needs us to pass something into it? Well, the response parameters field will allow you to pass in the parameters that are expected to the method. This can be a difficult concept to understand but stick with me. 

There are only two sources that we can pass to these methods: URL parameters and data input values. 

*Params* are parameters that are in the slug, a URL that you defined in your slug up above. Remember this?

```
/breweries/{breweryId}
```

Ok, we can use that variable now and pass it into our method. So when someone goes to:

```
/breweries/10
```

 and you put this into the response parameters field: 

```
params.breweryId
```

Devise would pass a "10" as the first argument in your method. 

*Input* values are the other source that we can pass to your methods. Input values are any values passed by a form to a URL. *Input* allows us to pass either all the inputs or a particular value in the input array. So you can do this:

```
params.breweryId, input 
```

or

```
params.breweryId, input.name
```

If you do the first example it will come in as an array of all of the input values passed in. 

---

**View Template To Use**: Templates are layouts you have placed in your ```app/view/templates``` directory. You can read more on how templates work in the [templates](Templates) section of the documentation.

---

**Publish on Save**: This will make the page live when it is created.

---

**Show Advanced Options**: When toggled you get to see all the goodies!

---

**Meta Title**: This is the title that will populate the ```<title>``` of the template. 

---

**Meta Description / Meta Keywords**: These are used to populate their respective meta tags.

---

**Head Code**: If your page needs any additional HTML or JavaScript inserted into the <head> section of the DOM you can place it here.

---

**Footer Code**: Likewise, footer code will be injected just before the </body> tag. This can be used for additional JavaScript inclusions, script calls, whatever.

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