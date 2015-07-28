---
layout: default
title: Common Errors
description: Below are some common errors that you may experience during configuration, installation, or developing on Devise.
use: [docs]
converters: [markdown]
sections:
    - Route Caching
---

##<a name="route-caching" class="ia"></a>[#](#route-caching)Route Caching

If you are seeing this error message you most likely need to clear Laravel's route cache using the following command:

```
php artisan route:clear
```

If you would like to utilize Laravel's route caching we suggest that you only do this on production and enable Devise's route cache support by enabling it in your .env file.

```
DEVISE_CACHE_ENABLED=true
```

Now, whenever a page or API is added via Devise the routes cache will be refreshed.