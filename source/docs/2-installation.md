---
layout: default
title: Installation
use: [docs]
converters: [markdown]
sections:
    - Installing through command line
    - Installing through the browser
    - Environmental Configuration
---

#Installation

>>>####Work in Progress
>>>Installation is one of the most important features of making a CMS accessible to developers. We want this process to be as simple as it can be to make it easy the first and thirty-first times you do it. With the huge changes that have come with Laravel 5 we are waiting for stability to work on the web-based installer and round out the command-line installer. Expect this note to be removed in 1.0.

##<a name="installing-through-command-line" class="ia"></a>[#](#environmental-configuration)Installing Through The Command Line

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


##<a name="installing-through-the-browser" class="ia"></a>[#](#installing-through-the-browser)Installing through the browser

>>>####In Development
>>>This feature will be upcoming in 1.0 (Mid March 2015)


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
        'Eloquent'        => 'Devise\Support\Sortable\EloquentModel',
        'Sort'            => 'Devise\Support\Sortable\SortableFacade',
        'DeviseUser'      => 'Devise\Users\DeviseUser',
        'RuleManager'     => 'Devise\Users\Permissions\RuleManagerFacade',
        'Form'            => 'Illuminate\Html\FormFacade',
        'HTML'            => 'Illuminate\Html\HtmlFacade',
{% endverbatim %}
```
######/config/app.php


##<a name="environmental-configuration" class="ia"></a>[#](#environmental-configuration)Environmental Configuration

Below we will cover setting up Devise, Laravel and Homestead in an OSX environment. For more information on setting up Homestead please refer to the [Laravel documentation](http://laravel.com/docs/4.2/homestead#installation-and-setup) or for Windows check out [this video](http://blog.teamtreehouse.com/laravel-homestead-on-windows) on Treehouse.

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

####4. SSH into the Vagrant box

While still in the Homestead directory, SSH into vagrant with the command "vagrant ssh."

####5. Set the application environment

Next we will need to set the to application's environment to "local" with the listed steps below:

a. First, open the sites-available entry for devise-example.com by running ```bash sudo vi /etc/nginx/sites-available/devise-example.com```

b. Then find the text ```bash location ~ \.php$ {```

c. On the next line paste ```bash fastcgi_param LARAVEL_ENV "local"; ```

```bash
    It should look like this:
    location ~ \.php$ {
        fastcgi_param LARAVEL_ENV "local";
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }
```

d. Write to file and quit with ":wq" command
e. Restart nginx service by running "sudo service nginx restart"; now LARAVEL_ENV is set to "local."

All of the above steps can be found in more detail on the [Laravel documetation page on Homestead](http://laravel.com/docs/4.2/homestead)


####6. Run Migrations and Seeds
1. SSH into vagrant box by running "vagrant ssh" from the Homestead directory
2. Then cd into the root of devise-example application and run the following commands:

```bash
php artisan migrate --package="devisephp/cms" --env=local  (devisephp migrations)
php artisan migrate --env=local (application migrations)

php artisan db:seed --env=local --class="DeviseSeeder" (devisephp seeds)
php artisan db:seed --env=local  (application seeds)
```