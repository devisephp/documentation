---
layout: default
title: Users & Groups
use: [docs]
converters: [markdown]
sections:
    - Building A Philosophy For Your App
    - Enabling User Registration
    - Password Recovery
    - Managing Users
    - Managing Groups
---

#Users &amp; Groups

##<a name="building-a-philosophy-for-your-app" class="ia"></a>[#](#building-a-philosophy-for-your-app)Building A Philosophy For Your App

Constructing your application has a lot to do with who is _using_ the application. Users and Groups, used in tandem with <a href="{{ site.url }}/docs/8-permissions">permissions</a>, can pretty much do anything you want. But, we've decided to leave it up to you, the developer, to determine how to structure user roles and their permissions.

By default, Devise offers admin management of users and groups. From our experience, most applications have one of three common user group scenarios or some variation of it.

1. Administrative staff and public users that do not log in.
2. Administrative staff with public users that do log in.
3. All users log in and have some varied experience based on their role.

Scenario 1 doesn't have to worry about groups, but scenarios 2 and 3 need to think about the different roles the users will require. **In Devise a user can be in many group**, so one thing to keep in mind is sketching out groups which will have access to a particular part of your application, and then relating those users to the groups.

Another consideration when designing your groups are things like achievements, interest groups, clans, clubs, newsletters, etc. These are actual business / application logic that have nothing to do with permissions. In these cases you may need to define permission based rules around these 'real life' groups.


##<a name="enabling-user-registration" class="ia"></a>[#](#enabling-user-registration)Enabling User Registration

Out of the box, Devise has been configured so *front-end user registration is DISABLED*. However, no worries because it's a cinch to enable:

1. Login to the Devise back-end adminstration and navigate to the Pages index.
2. Make sure you've checked-off the box labeled "Admin" and then locate the page entry for "User Registration"; click the settings button.
3. On the page edit form, toggle the "Show Advanced Options" to the on position.
4. At the bottom, in the "Before" input, you will see the value *ifNotLoggedInGoToLogin*. Clear the rule from the input and save the changes.
5. Now, the ```/admin/register``` URL will be publicly accessible and ready to use.

>> #### Do Not Forget to Add the Register Link
>> So, you made the registration form open to public, but most likely you'll want to add the link to the login form or another view.
>> ##<a class="dvs-small dvs-no-decoration dvs-fg dvs-mid-gray"></a>(<?= URL::route('dvs-user-register') ?>)Not a User? Register.


##<a name="password-recovery" class="ia"></a>[#](#password-recovery)Password Recovery

Password recovery has been built-in to the core of Devise, but you will need to configure your mail settings to allow the recovery emails to be sent.

##<a name="managing-users" class="ia"></a>[#](#managing-users)Managing Users

Managing users is about as simple as it gets. Click on the "Users" link in the administration and then click "Create New User" in the upper right-hand corner of the screen. Fill out the form and you're done. Once created you can edit the user and assign them to any groups necessary.

>> #### For Your Information
>> When creating/editing/removing users or changing user passwords from the admin back-end, no email notifications will be sent.


##<a name="managing-groups" class="ia"></a>[#](#managing-groups)Managing Groups

Groups are about as straight forward as they come. Click "Create New Group" in the top right-hand corner of the screen on the "Groups" page, supply a name, and click "Create Group". Simple.