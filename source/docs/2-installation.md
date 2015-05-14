---
layout: default
title: Installation
use: [docs]
converters: [markdown]
sections:
    - Installing through the browser
    - Installing through command line
    - Environmental Configuration
    - Mail and Additional Configuration
---

#Installation

##<a name="installing-through-the-browser" class="ia"></a>[#](#installing-through-the-browser)Installing through the browser

Installing Devise via browser is simple and painless. After grabbing the latest version of Devise and then properly adding it's resources to your project, simply open a browser and navigate to your project's url. Your browser will be redirected to the installer's welcome page.

![Devise Web Installer Welcome Screen]
({{ site.url }}/imgs/installation/welcome-screen.jpg)

>>####Watch out
>> If you are having issues with your application's url resolving and/or being redirected to the installation welcome screen, you most likely have an issue in your "homestead.yaml" or "/etc/hosts". Review the steps listed under within the ##<a name="environmental-configuration" class="ia"></a>[#environmental configuration section](#environmental-configuration).

Complete the form on each step to configure your environment, database, application settings and admin user credentials. Then let Devise take care of the connecting the dots and getting the application up-and-running.


##<a name="installing-through-command-line" class="ia"></a>[#](#installing-through-command-line)Installing Through The Command Line

Installation through the command line is as simple as:

```bash
php artisan devise:install
```

Currently, this command simply runs these commands

```bash
php artisan devise:migrate
php artisan devise:assets
php artisan devise:seed
```


##<a name="installing-devise-on-an-existing-project" class="ia"></a>[#](#installing-devise-on-an-existing-project)Installing Devise On An Existing Project

If you are installing Devise "by hand" on an existing Laravel 5 project take the following steps.

####1. Add Devise to your composer

```php
{% verbatim %}
"require": {
    "laravel/framework": "5.*",
    "devisephp/cms": "*",
    "illuminate/html": "5.*"
}
{% endverbatim %}
```
######/composer.json

####2. Add Devise service provider and facades

```php
{% verbatim %}
...
'Illuminate\Validation\ValidationServiceProvider',
'Illuminate\View\ViewServiceProvider',

/*
 * Devise Service Provider
 */
'Devise\DeviseServiceProvider',

/*
 * Application Service Providers...
 */
'App\Providers\AppServiceProvider',
...
{% endverbatim %}
```
######/config/app.php

>>####Watch Out!
>>Make sure the deviseServiceProvider appears **above** the Application Service Providers

```php
{% verbatim %}
        /*
         * Devise Facades...
         */
        'Sort'            => 'Devise\Support\Sortable\SortableFacade',
        'DeviseUser'      => 'Devise\Users\DeviseUser',
        'RuleManager'     => 'Devise\Users\Permissions\RuleManagerFacade',
        'Form'            => 'Illuminate\Html\FormFacade',
        'HTML'            => 'Illuminate\Html\HtmlFacade',
{% endverbatim %}
```
######/config/app.php


##<a name="environmental-configuration" class="ia"></a>[#](#environmental-configuration)Environmental Configuration

Below we will cover setting up Devise, Laravel and Homestead in an OSX environment. For more information on setting up Homestead please refer to the [Laravel documentation](http://laravel.com/docs/5.0/homestead#installation-and-setup) or for Windows check out [this video](http://blog.teamtreehouse.com/laravel-homestead-on-windows) on Treehouse.

####1. Add entry to /etc/hosts like a-so:

```bash
127.0.0.1 devise-example.com
```

####2. Add your site to your Homestead.yaml

In you Homestead.yaml file (the main configuration file for Homestead) add an entry for devise-example.com and map it to the **application's public directory**. It should look similiar to this:

```
    - map: devise-example.com
      to: /home/vagrant/Code/devise-example/public
```
>>####Watch out
>> Currently, in Homestead if you map the site incorrectly in the ```to:``` filepath that URL (devise-example.com) will need to be changed manually in the Nginx config file. Simply, changing it in the homestead config and reprovisioning doesn't seem to work. You can find this file by SSH'ing into your vagrant box and editing the file for your site entry. It is located (in this example) here: ```/etc/nginx/sites-enabled/devise-example.com```. Just edit the ```root``` parameter's file path towards the top of the file. It should look something like this to get to it:

####Only do the following if you have the problem listed above otherwise move to step 3.

SSH into your vagrant box

```bash
homestead ssh
```

Edit your configuration file (replace devise-example.com with whatever domain you are working on.)

```bash
sudo vi /etc/nginx/sites-available/devise-example.com
```

Edit your root path (it should end with public)

```bash
root /vagrant/whatever/whatever/site/public
```

####3. Provision the new site

```cd``` into your Homestead directory (where homestead.yaml is located) and run "vagrant reload --provision". NOTE: If your vagrant box is not already up-and-running, you might need to run "vagrant up" rather than ".

All of the above steps can be found in more detail on the [Laravel documetation page on Homestead](http://laravel.com/docs/5.0/homestead)


##<a name="mail-and-additional-configuration" class="ia"></a>[#](#mail-and-additional-configuration)Mail and Additional Configuration
