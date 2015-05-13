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

Deciding how to construct your application has a lot to do with who is _using_ your application. Users and Groups, in tandem with <a href="{{ site.url }}/docs/7-permissions">permissions</a>, can really do anything that you want it to do. To start, you need to decide how that should be constructed that makes the most sense. Devise is very flexible.

To start, Devise supports users and groups out of the box. From our experience a lot of applications have one of three scenarios or some variation from it.

1. Administrative staff and public users that do not log in.
1. Administrative staff with public users that do log in.
1. All users log in and have some varied experience based on their role.

Scenario 1 probably doesn't even have to worry about groups but scenarios 2 and 3 need to think about the different roles the users are going to play. **In Devise a user can be in many group** so one thing to think about is sketching out many groups that will have access to a particular part of your application and assigning those groups to the users that will need to access it.

Another consideration when designing your groups are things like achievements, interest groups, clans, clubs, newsletters, etc. These are actual business / application logic that have nothing to do with permissions. In these cases you may need to define permission based rules around these 'real life' groups.


##<a name="enabling-user-registration" class="ia"></a>[#](#enabling-user-registration)Enabling User Registration

Out of the box, Devise has been configured so *front-end user registration is DISABLED*.



##<a name="password-recovery" class="ia"></a>[#](#password-recovery)Password Recovery

Password recovery has been built-in to the core of Devise, but you will need to configure your mail settings to allow the recovery emails to be sent.

##<a name="managing-users" class="ia"></a>[#](#managing-users)Managing Users

Managing users is about as simple as it gets. Click on the "Users" link in the administration and then click "Create New User" in the upper right-hand corner of the screen. Fill out the form and you're done. Once created you can edit the user and assign them to any groups necessary.

> #### For Your Information
> When creating/editing/removing users or changing user passwords from the admin back-end, no email notifications will be sent.


##<a name="managing-groups" class="ia"></a>[#](#managing-groups)Managing Groups

Groups are about as straight forward as they come. Click "Create New Group" in the top right-hand corner of the screen on the "Groups" page, supply a name, and click "Create Group". Simple.