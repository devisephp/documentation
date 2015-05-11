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
In essence, Apis are no different then Pages/Routes, but the main difference is the method type. Where Pages are limited to the GET method, Apis are can be a GET, POST, PUT, DELETE or ANY method type. Apis are intended to handle retrieving and processing data whereas Pages just render a view. We decided to separate out Pages and Apis to better organize our applications and eliminate having a massive, mixed list of pages and public/private apis.

##<a name="creating-new-apis" class="ia"></a>[#](#creating-new-apis)Creating New Apis

From the admin dashboard click the APIs card, you will then see a button in the top right-hand corner labeled 'Create New Api'. Click it and you will be redirected to the Create A New Api form.

###API Settings

 **Name of Request**: This field is used as a label for the administrative list of apis. It really isn't meant for anything on the front-end.

---

###API Routing Options

**Route Type**: The route type determines how the api can be accessed by a browser. Let's break down your options and what they are typically used for.

  - **_Retrieve (GET)_**: An api route with the type GET is basically no different than a page, because it is getting the response from a url.
  - **_Create (POST)_**: Used for sending data to the server behind the scenes. If the api is accepting a contact form or a form creating some new resource would be ideal for the POST type.
  - **_Update (PUT)_**: An api set as the type PUT can be used for updating a record already stored in the db.
  - **_Delete (DELETE)_**: This route type is used for deleting things.
  - **_Any Method (ANY)_**: Api can be accessed with any browser methods we've listed.

**For a quick example on route types**: Let's say our beer site has an api route listing all the breweries in the world. We would create a new api request called 'Brewery List' with a **GET** route type. At the bottom of that view is a form allowing users to submit new breweries. This form's action attribute would be pointed at another api with a **POST** route type. If we allowed users to edit we would use **PUT** and delete would use **Delete**.

>> In the event a browser tries to access a page with a method you have not specified. For instance, you set a page as a regular GET page and someone tries to POST data to it that user will experience a good 'ol fashioned 404 response.

---

**Request Slug**: The request slug is the url for the api entry. You can structure these however you like, but it's important to note that the slug must be unique as this will be used to generate links, form actions and many more routing-related functions.

---

**Response Class**: Essentially, there is two parts needed to attach an api to the internal logic inside the application. This is the first part which tells Devise what class we want to relate the api to. The class can be the namespaced of the class, like so:

```
BeerApp\Brewers\BrewersManager
```

Or, it could be any valid classname available within the application. For instance, a the DatabaseSeeder Class which has been autoloaded into Laravel 5 with composer.

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
