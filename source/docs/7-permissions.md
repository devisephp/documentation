---
layout: default
title: Permissions
use: [docs]
converters: [markdown]
sections:
    - Preloaded Permission Rules
    - Implementing In Templates
    - Implementing On Pages
    - Implementing In Routes
    - Creating New Permission Rules
    - Creating New Permission Conditions
---

#Permissions

There are two types of permissions that you can use: permission rules (regular PHP functions that you register with us) and permission conditions. Permissions conditions use multiple permission rules to see if a user is allowed to see or use a particular feature of your web application.

##<a name="preloaded-permission-rules" class="ia"></a>[#](#preloaded-permission-rules)Preloaded Permission Rules

Devise comes preloaded with several permission rules that are fairly common in applications our team builds.

```php
{% verbatim %}
isLoggedIn();
isNotLoggedIn();
isInGroup($groupname);
isNotInGroup($groupname);
hasUserName($username); // Will check both user
hasEmail($email);
hasFieldValue($field, $value); // Tests any property of the user
{% endverbatim %}
```

##<a name="implementing-in-templates" class="ia"></a>[#](#implementing-in-templates)Implementing In Templates

To hide or show a specific part of a template based on a permission function you will need to something like the following:

```php
{% verbatim %}
@if(DeviseUser::checkRule('doesDrinkBeer', ['like this']))
    <a href="/secret-beer-stash">The secret beer stash!</a>
@endif
{% endverbatim %}
```

Or the shorthand...

```php
{% verbatim %}
@if(DeviseUser::doesDrinkBeer('like this'))
    <a href="/secret-beer-stash">The secret beer stash!</a>
@endif
{% endverbatim %}
```

##<a name="creating-new-permission-rules" class="ia"></a>[#](#creating-new-permission-rules)Creating New Permission Rules

>>####One rule about permission functions
>>All permission functions must return a boolean response to work correctly.

```php
{% verbatim %}
//Let's add another rule called doesDrinkBourbon
RuleManager::addRule('doesDrinkBourbon', function() {
    return true;
});
{% endverbatim %}
```

With a parameter

```php
{% verbatim %}
//Let's add another rule called doesDrinkBourbon
RuleManager::addRule('drinksRightTypeOfBeer', function($type) {
    return $type == 'stout';
});
{% endverbatim %}
```

```php
{% verbatim %}
class AppServiceProvider extends ServiceProvider {
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //Let's add a rule called doesDrinkBeer
        RuleManager::addRule('doesDrinkBeer', function() {
            return true;
        });

        //Let's add another rule called doesDrinkBourbon
        RuleManager::addRule('doesDrinkBourbon', function() {
            // You'll need some actual logic in here
            return false;
        });
    }

    ...

}
{% endverbatim %}
```

##<a name="creating-new-permission-conditions" class="ia"></a>[#](#creating-new-permission-conditions)Creating New Permission Conditions

Permission conditions use one or multiple permission rules to create a conditional formula that will return a true or false determining if a client has whatever they need to load a route or see a particular portion of a page.

To create a permission formula log in to the administration of your Devise application and click on, you guessed it, "Permissions". Here you can construct conditions using the web-based UI to combine the registered permission rules with ```AND / OR``` statements. This gives you an amazing amount of freedom to combine small/broad permissions to make very specific rules.