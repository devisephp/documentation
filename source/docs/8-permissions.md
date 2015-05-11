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

There are two types of permissions that you can use: _**permission rules**_ (regular PHP functions that you register with us) and _**permission conditions**_. Permissions conditions use multiple permission rules to see if a user is allowed to see or use a particular feature of your web application.




##<a name="preloaded-permission-rules" class="ia"></a>[#](#preloaded-permission-rules)Preloaded Permission Rules

Devise comes preloaded with several permission rules that are fairly common in applications our team builds. You may use these in templates or in permission conditions without having to do anything extra.

```php
{% verbatim %}
isLoggedIn();
isNotLoggedIn();
isInGroup($groupname);
isNotInGroup($groupname);
hasUserName($username); // Will check both name and email
hasEmail($email);
hasFieldValue($field, $value); // Tests any property of the user
{% endverbatim %}
```
######Preloaded permission rules





##<a name="implementing-in-templates" class="ia"></a>[#](#implementing-in-templates)Implementing In Templates

####Using Permission Functions

To hide or show a specific part of a template based on a permission function you will need to something like the following:

```php
{% verbatim %}
@if(DeviseUser::checkRule('isInGroup', ['Super Administrator']))
    <a href="/secret-beer-stash">The secret beer stash!</a>
@endif
{% endverbatim %}
```


```php
{% verbatim %}
@if(DeviseUser::isInGroup('Super Administrators'))
    <a href="/secret-beer-stash">The secret beer stash!</a>
@endif
{% endverbatim %}
```
######Or the shorthand...



####Using Permission Conditions

```php
{% verbatim %}
@if(DeviseUser::checkConditions('isBeerDrinker'))
    <h1>Beer Drinkers Only!</h1>
@endif
{% endverbatim %}
```
######Checking a single condition

```php
{% verbatim %}
@if(DeviseUser::checkConditions(
    array(
        'isLoggedIn',
        'isDeviseAdmin',
        'isNotAppAdmin',
        'isNotEditor'
        )
    )
)
    <ul>
        <li>{{ link_to(URL::route('create-page'), 'Create New Page', array('class'=>'button')) }}</li>
    </ul>
@endif
{% endverbatim %}
```
######Checking multiple conditions

```php
{% verbatim %}
@if(
    !DeviseUser::checkConditions('isLoggedIn') &&
    DeviseUser::checkConditions(
        array(
            'isDeviseAdmin',
            'isNotAppAdmin'
        )
    )
)
    {{ link_to(
        URL::route('create-page'),
        'Create New Page',
        array('class'=>'button')
    ) }}
@endif
{% endverbatim %}
```
######Advanced example






##<a name="implementing-on-pages" class="ia"></a>[#](#implementing-on-pages)Implementing On Pages

To implement permissions on Devise pages you can do it by adding your permission condition (or conditions) to the before filter in the advanced settings of the page in the administration. You can also pass multiple permission conditions by separating them with a pipe. For example```permissionCondition1|permissionCondition2```.

>####Note
> * If you pass multiple conditions all conditions must be true for the user to view the page.
> * There is no way to pass a permission rule into this field, only conditions.
> * _Where_ the user is redirected to along with the message is set in the permission settings.




##<a name="implementing-in-routes" class="ia"></a>[#](#implementing-in-routes)Implementing In Routes

Implementing permissions (rules or conditions) in ```routes.php``` works the same way they work in templates. Just redirect the user somewhere like so:

```php
{% verbatim %}
if(DeviseUser::checkRule('isInGroup', ['Super Administrator'])){
    Route::get('user/profile', array('as' => 'profile', 'uses' => 'UserController@showProfile'));
}
{% endverbatim %}
```

>####We Already Registered Your Permission Conditions
>Any permission conditions that you have created are already registered as filters so you can feel free to use them as you wish. For more information on filters see the [laravel documentation on filters](http://laravel.com/docs/4.2/routing#route-filters)

```php
{% verbatim %}

Route::get('face', array('before'=>'canAccessAdmin'));

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
######Without parameters

```php
{% verbatim %}
//Let's add another rule called doesDrinkBourbon
RuleManager::addRule('drinksRightTypeOfBeer', function($type) {
    return $type == 'stout';
});
{% endverbatim %}
```
######With a parameter


Below is an example of where you might want to register these rules. You can do it many places but this might be a good place to start if you just have a rule or two.


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
######```/app/Providers/AppServiceProvider.php```






##<a name="creating-new-permission-conditions" class="ia"></a>[#](#creating-new-permission-conditions)Creating New Permission Conditions

Permission conditions use one or multiple permission rules to create a conditional formula that will return a true or false determining if a client has whatever they need to load a route or see a particular portion of a page.

To create a permission formula log in to the administration of your Devise application and click on, you guessed it, "Permissions". Here you can construct conditions using the web-based UI to combine the registered permission rules with ```AND / OR``` statements. This gives you an amazing amount of freedom to combine small/broad permissions to make very specific rules.