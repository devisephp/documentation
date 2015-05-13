---
layout: default
title: Apis
use: [docs]
converters: [markdown]
sections:
    - Api Basics
    - Creating New Apis
    - Managing Apis
---

#Api Basics
Devise Api's are similar to Pages, but the main difference are the options for method type. While Pages are limited to the GET method, Apis can be set as GET, POST, PUT, DELETE or ANY. Apis are intended to handle retrieving and/or processing data whereas Pages are meant to simply render a view. The decision to separate Pages and Apis was aimed at improving application organization by eliminating a large mismatched list of pages and apis. Also, from the CMS side of things, it enables clients to administrate pages and the developer to manage api routes.

##<a name="creating-new-apis" class="ia"></a>[#](#creating-new-apis)Creating New Apis

From the admin dashboard click the APIs card to go to the Apis index. On the inddx you'll see a button in the top right-hand corner labeled "Create New Api". Click the button and you will be redirected to the Create A New Api form.

###API Settings

 **Name of Request**: This field is used as a label for the admin apis index. Currently, it's not being used for anything else on the front-end.

---

###API Routing Options

**Route Type**: The route type determines how the api can be accessed by a browser. Let's break down your options and what they are typically used for.

  - **_Retrieve (GET)_**: An api route with the type GET is no different than a page, because it just returns the response from a url.
  - **_Create (POST)_**: Used for sending data to the server behind the scenes. If the api is accepting a contact form or creating some new resource then a POST typed route would be ideal.
  - **_Update (PUT)_**: An api set as the type PUT can be used for updating a record already stored in the database.
  - **_Delete (DELETE)_**: This route type is used for deleting things.
  - **_Any Method (ANY)_**: The route can be accessed with any browser methods we've listed above.

**For a quick example on route types**: Let's say our beer site has an api route listing all the breweries in the world. We would create a new api called "Brewery List" with a **GET** route type. At the bottom of that view is a form allowing users to submit new breweries and the form action would be pointed at another api route with a method type of **POST**. If we allowed users to edit we would use **PUT** and delete would use **Delete**.

>> In the event a browser tries to access a page with a method you have not specified. For instance, you set a page as a regular GET page and someone tries to POST data to it that user will experience a good 'ol fashioned 404 response.

---

**Request Slug**: The request slug is the url for the api entry. You can structure these however you like, but it's important to note that the slug must be unique as this will be used to generate links and other routing-related functions.

---

**Response Class**: Essentially, there is two parts required to attach an api route to the logic inside of the application. The response class is the first part and it points Devise to what class we want the the api to use. Any valid class name available in the application will work, but we recommend using the complete namespace for the class, like so:

```
BeerApp\Brewers\BrewersManager
```

But keep in mind it could be any valid classname available within the application. For instance, the DatabaseSeeder Class which has been autoloaded into Laravel 5 with composer.

```
DatabaseSeeder
```

---

**Response Method**: The response method is the second part needed to connect an api entry with an actual function located within the Response Class. This is the connection between the api slug, and the code. Now, Devise knows what Class and method to execute when an api's url is accessed by a web browser.


*Example:* If we were attempting to create a new brewery, we would likely have a class which looked something like the following:

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

We would put the following in the Response Class field:

```
BeerApp\Brewers\BrewersManager
```

And for the Response Method field:

```
createBrewery
```

So, in summary, when a user submits the form to create a new brewery, it would POST to our api slug which knows the class and method to execute.

---

**Response Parameters**: So, some what if your method needs us to pass something into it? Well, the response parameters field will allow you to pass in the parameters that are expected to the method. This can be a difficult concept to understand but stick with me.

There are only two sources that we can pass to these methods: **_URL parameters_** and **_data input values_**.

*Params* are parameters that are in the slug. From the Page docs, you defined a URL to show the details of a brewery. The parameter we are passing in is named breweryId as parameters are always enclosed in single curly braces ({}). In the slug below, our parameter is named "breweryId"

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
