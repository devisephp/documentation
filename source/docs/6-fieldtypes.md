---
layout: default
title: Field Types
use: [docs]
converters: [markdown]
sections:
  - Audio
  - Checkbox Group
  - Checkbox
  - Color
  - Date/Time
  - File
  - HTML
  - Images
  - Link
  - Map
  - Select
  - Text
  - Textarea
  - Video
  - WYSIWYG
---


#Field Types

##<a name="audio" class="ia"></a>[#](#audio)Audio

>####Attention
>This field requires a third-party API. Devise ships with one for [Zencoder](http://zencoder.com). Simply, provide us your application with an API key from Zencoder. **Important**: When Zencoder receives a request from your application it passes along a callback URL that they use to send back the re-encoded audio file. To do this you will need to do it from a public URL that they can actually see. To do this during development take a look at [ngrok](https://ngrok.com/) or a similar tunneling project.

```html
{% verbatim %}
 <audio data-dvs-audio1-id="audio1" src="{{ $page->audio1->file }}" controls loop>
    HTML5 audio not supported
</audio>
{% endverbatim %}
```

| Attribute       | Description                                           | How To Reference               |
|-----------------|-------------------------------------------------------|--------------------------------|
| file            | URL of the audio file location                        | $page->audio1->file            |
| mp3             | Create/encode file to mp3 version                     | $page->audio1->mp3             |
| mp3_url         | URL of the mp3 location                               | $page->audio1->mp3_url         |
| ogg             | Create/encode file to ogg version                     | $page->audio1->ogg             |
| ogg_url         | URL of the ogg location                               | $page->audio1->ogg_url         |
| wav             | Create/encode file to wav version                     | $page->audio1->wav             |
| wav_url         | URL of the wav location                               | $page->audio1->wav_url         |
| audio channels  | How many channels do we have, 1 or 2? Mono or stereo? | $page->audio1->audio channels  |
| audio_bit_depth | The audio depth can be set to 16, 24 or 32 bits.      | $page->audio1->audio_bit_depth |





##<a name="checkbox-group" class="ia"></a>[#](#checkbox-group)Checkbox Group

```php
{% verbatim %}
<div data-dvs-checkboxGroup1-id="checkboxGroup1">
   @foreach ($page->checkboxGroup1->checkboxes as $checkbox)
      <label>
         <input type="checkbox" value="{{ $checkbox->key }}" {{ $checkbox->default ? 'checked' : '' }}>
         {{ $checkbox->label }}
      </label>
    @endforeach
</div>
{% endverbatim %}
```

| Attribute  | Description                                        | How To Reference                  |
|------------|----------------------------------------------------|-----------------------------------|
| checkboxes | An array of key, labels and defaults of checkboxes | $page->checkboxGroup1->checkboxes |





##<a name="checkbox" class="ia"></a>[#](#checkbox)Checkbox

```php
{% verbatim %}
<p data-dvs-checkbox1-id="checkbox1">
    {{ $page->checkbox1->value ? 'Do something with check' : 'Do something else' }}
</p>
{% endverbatim %}
```

| Attribute | Description                           | How To Reference        |
|-----------|---------------------------------------|-------------------------|
| value     | Value of this checkbox field (0 or 1) | $page->checkbox1->value |





##<a name="color" class="ia"></a>[#](#color)Color

```
{% verbatim %}
<p data-dvs-color1-id="color1" style="background-color: {{ $page->color1->color('blue') }};">
	Showing the color {{ $page->color1->color('blue') }}
</p>
{% endverbatim %}
```

| Attribute | Description                             | How To Reference     |
|-----------|-----------------------------------------|----------------------|
| color     | #hexidecimal color value for this field | $page->color1->color |






##<a name="date%2Ftime" class="ia"></a>[#](#date%2Ftime)Date/Time

```php
{% verbatim %}
<p data-dvs-datetime1-id="datetime1">
	Concert starts at {{ $page->datetime1->datetime }}
</p>
{% endverbatim %}
```

| Attribute     | Description                                                                  | How To Reference                |
|------------------------------------------------------------------------------|---------------------------------|
| datetime      | Formated date and time                                                       | $page->datetime1->datetime      |
| datetimevalue | Unformatted date and time                                                    | $page->datetime1->datetimevalue |
| format        | PHP datetime format which will be used to format datetimevalue into datetime | $page->datetime1->format        |





##<a name="file" class="ia"></a>[#](#file)File

```php
{% verbatim %}
Download file
<a data-dvs-file1-id="file1" href="{{ $page->file1->file }}">Download file</a>
{% endverbatim %}
```
| Attribute    | Description                                    | How To Reference           |
|--------------|------------------------------------------------|----------------------------|
| file         | URL to file that was uploaded by user          | $page->file1->file         |
| sizeLimit    | Limit the size of files (in KB?)               | $page->file1->sizeLimit    |
| allowedTypes | List of allowed file types seperated by spaces | $page->file1->allowedTypes |






##<a name="html" class="ia"></a>[#](#html)HTML

```php
{% verbatim %}
<div data-dvs-html1-id="html1">
	{{ $page->html1->html }}
</div>
{% endverbatim %}
```

| Attribute | Description      | How To Reference   |
|-----------|------------------|--------------------|
| html      | HTML stored here | $page->html1->html |






##<a name="images" class="ia"></a>[#](#images)Image

```php
{% verbatim %}
<img src="{{ $page->image1->image_url('/imgs/default-images/special-occasions-gallery-img-2.jpg')}}" class="dvs-test-frame" data-dvs-image1-id="image1">
{% endverbatim %}
```

| Attribute         | Description                              | How To Reference                 |
|-------------------|------------------------------------------|----------------------------------|
| image             | URL of the image location                | $page->image1->image             |
| alt               | The intended alt tag attribute           | $page->image1->alt               |
| has_thumbnail     | String "1" or "0" for true or false      | $page->image1->has_thumbnail     |
| image_width       | Width of the image                       | $page->image1->image_width       |
| image_height      | Height of the image                      | $page->image1->image_height      |
| image_crop_x      | Top left-hand corner's x of the crop     | $page->image1->image_crop_x      |
| image_crop_y      | Top left-hand corner's y of the crop     | $page->image1->image_crop_y      |
| image_crop_x2     | Bottom right-hand corner's x of the crop | $page->image1->image_crop_x2     |
| image_crop_y2     | Bottom right-hand corner's y of the crop | $page->image1->image_crop_y2     |
| image_crop_w      | Width of the crop                        | $page->image1->image_crop_w      |
| image_crop_h      | Height of the crop                       | $page->image1->image_crop_h      |
| thumbnail_width   | Width of the image                       | $page->image1->thumbnail_width   |
| thumbnail_height  | Height of the image                      | $page->image1->thumbnail_height  |
| thumbnail_crop_x  | Top left-hand corner's x of the crop     | $page->image1->thumbnail_crop_x  |
| thumbnail_crop_y  | Top left-hand corner's y of the crop     | $page->image1->thumbnail_crop_y  |
| thumbnail_crop_x2 | Bottom right-hand corner's x of the crop | $page->image1->thumbnail_crop_x2 |
| thumbnail_crop_y2 | Bottom right-hand corner's y of the crop | $page->image1->thumbnail_crop_y2 |
| thumbnail_crop_w  | Width of the crop                        | $page->image1->thumbnail_crop_w  |
| thumbnail_crop_h  | Height of the crop                       | $page->image1->thumbnail_crop_h  |
| image_url         | URL of the image                         | $page->image1->image_url         |
| thumbnail_url     | URL of the thumbnail                     | $page->image1->thumbnail_url     |





##<a name="link" class="ia"></a>[#](#link)Link

```php
{% verbatim %}
<a data-dvs-link1-id="link1" href="{{ $page->link1->url }}" target="{{ $page->link1->target }}">
    {{ $page->link1->text }}
</a>
{% endverbatim %}
```

| Attribute | Description                                                                  | How To Reference     |
|-----------|------------------------------------------------------------------------------|----------------------|
| text      | Link text that would likely be clickable                                     | $page->link1->text   |
| route     | Use a route defined in pages table, if defined url is overridden             | $page->link1->route  |
| url       | Use a regular URL, unless route is set then this will point to the route URL | $page->link1->url    |
| target    | Open the window in _self or _blank                                           | $page->link1->target |






##<a name="map" class="ia"></a>[#](#map)Map

```php
{% verbatim %}
<p data-dvs-map1-id="map1">figure out how to display google map here</p>
{% endverbatim %}
```

| Attribute | Description                                         | How To Reference       |
|-----------|-----------------------------------------------------|------------------------|
| address   | Full address to be displayed in map                 | $page->map1->address   |
| latitude  | Latitude on map                                     | $page->map1->latitude  |
| longitude | Longitude on map                                    | $page->map1->longitude |
| mode      | Show map in Streets, Satellite or Hybrid mode       | $page->map1->mode      |
| minZoom   | Amount allowed to zoom in on map scaled 1 thru 19   | $page->map1->minZoom   |
| maxZoom   | Amount allowed to zoom out on map scalled 1 thru 19 | $page->map1->maxZoom   |







##<a name="select" class="ia"></a>[#](#select)Select

```php
{% verbatim %}
<select data-dvs-select1-id="select1">
    @foreach ($page->select1->options as $option)
        <option value="{{ $option->value }}">{{ $option->name }}</option>
    @endforeach
</select>
```

| Attribute | Description                                       | How To Reference        |
|-----------|---------------------------------------------------|-------------------------|
| value     | Current value of the select box                   | $page->select1->value   |
| options   | Array of name, value pairs for this select field. | $page->select1->options |






##<a name="text" class="ia"></a>[#](#text)Text

```php
{% verbatim %}
<p data-dvs-text1-id="text1">
    {{ $page->text1->text('This is some default text') }}
<p>
{% endverbatim %}
```

| Attribute | Description                                       | How To Reference        |
|-----------|---------------------------------------------------|-------------------------|
| text      | The value of the text field                       | $page->text1->text      |
| maxlength | The maximum amount of characters that can be used | $page->text1->maxlength |







##<a name="textarea" class="ia"></a>[#](#textarea)Textarea

```php
{% verbatim %}
<p data-dvs-textarea1-id="textarea1">
    {{ $page->textarea1->text('This is some default text') }}
<p>
{% endverbatim %}
```

| Attribute | Description                                       | How To Reference            |
|-----------|---------------------------------------------------|-----------------------------|
| text      | The value of the text field                       | $page->textarea1->text      |
| maxlength | The maximum amount of characters that can be used | $page->textarea1->maxlength |








##<a name="video" class="ia"></a>[#](#video)Video

>####Attention
>This field requires a third-party API. Devise ships with one for [Zencoder](http://zencoder.com). Simply, provide us your application with an API key from Zencoder. **Important**: When Zencoder receives a request from your application it passes along a callback URL that they use to send back the re-encoded video file. To do this you will need to do it from a public URL that they can actually see. To do this during development take a look at [ngrok](https://ngrok.com/) or a similar tunneling project.

```php
{% verbatim %}
 <video data-dvs-video1-id="video1"
    id="example_video_1"
    class="video-js vjs-default-skin"
    controls preload="auto"
    poster="{{ $page->video1->poster_image }}"
    width="100%"
    height="100%"
    style="max-height: 500px;"
    data-setup='{"example_option":true}'>
        @if ($page->video1->mp4_url)
            <source src="{{ $page->video1->mp4_url }}" type='video/mp4' />
        @endif
        @if ($page->video1->webm_url)
            <source src="{{ $page->video1->webm_url }}" type='video/webm' />
        @endif
        @if ($page->video1->ogg_url)
            <source src="{{ $page->video1->ogg_url }}" type='video/ogg' />
        @endif
        <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading
            to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
</video>
{% endverbatim %}
```

| Attribute     | Description                                                                                   | How To Reference             |
|-----------------------------------------------------------------------------------------------|------------------------------|
| video         | URL Path to the video file (if remote URL is given then fetch and encode using options below) | $page->video1->video         |
| poster_image  | Image to show as poster before video is loaded                                                | $page->video1->poster_image  |
| mp4           | Create/encode a mp4 file from video path URL                                                  | $page->video1->mp4           |
| ogg           | Create/encode an ogg file from video path URL                                                 | $page->video1->ogg           |
| webm          | Create/encode a webm file from video path URL                                                 | $page->video1->webm          |
| audioEncoding | Choose the audio encoding (not working yet)                                                   | $page->video1->audioEncoding |
| width         | Choose width of video (not working yet)                                                       | $page->video1->width         |
| height        | Choose height of video (not working yet)                                                      | $page->video1->height        |
| upscale       | Should the video be upscaled? (Yes or No)                                                     | $page->video1->upscale       |
| aspectMode    | Crop, stretch, pad or preserve the video aspect ratio (not working yet)                       | $page->video1->aspectMode    |









##<a name="wysiwyg" class="ia"></a>[#](#wysiwyg)WYSIWYG

```php
{% verbatim %}
<div data-dvs-wysiwyg1-id="wysiwyg1" style="width: 100%; height: 200px; overflow: scroll; background-color: #eee; padding: 5px;" >
	{{$page->wysiwyg1->text }}
</div>
{% endverbatim %}
```

| Attribute | Description                              | How To Reference      |
|-----------|------------------------------------------|-----------------------|
| text      | HTML content delivered by WYSIWYG editor | $page->wysiwyg1->text |
