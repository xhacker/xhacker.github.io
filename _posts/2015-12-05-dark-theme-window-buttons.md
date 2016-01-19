---
layout: post
title: How to Make Window Buttons Look Proper for Dark-Themed Mac Apps
---

<style>
@media only screen and (min-device-width: 480px) {
    #screenshot-window-buttons-assets {
        width: 822px;
        margin-left: -61px;
    }
}
</style>

It’s been a while since OS X El Capitan came out. Inboard still doesn’t support [Split View](https://support.apple.com/en-us/HT204948). It’s not because we don’t want. It’s because of we are not using the system standard window buttons. Instead, as a dark-themed app, we are using customized window buttons for a better look.

When a window is inactive, OS X will draw gray window buttons automatically. However, if the window has a dark theme, the “gray” is actually too bright compared to the dark background. Here is a screenshot showing 6 apps ([PDF Expert](https://pdfexpert.com), [CleanMyMac](http://macpaw.com/cleanmymac), [iStat Menus](https://bjango.com/mac/istatmenus/), [Tweetbot](http://tapbots.com/tweetbot/mac/), [Reveal](http://revealapp.com), [Inboard](http://inboardapp.com), and FaceTime) with dark window background. Needless to day, the window buttons for PDF Expert and CleanMyMac are not ideal.

<img class="" alt="Screenshot of 6 dark apps" width="680" src="/static/images/dark-theme-window-buttons/6-apps.png">

What we are doing for Inboard, is to hide the system buttons first, then add our own `NSButton`s. By using customized buttons, we can choose a darker color for the window buttons in the inactive state. This needs a huge amount of assets. But it’s worth it.

<figure id="screenshot-window-buttons-assets">
    <img class="bordered" alt="Screenshot of assets for window buttons" width="822" src="/static/images/dark-theme-window-buttons/traffic-lights.png">
    <figcaption>Inboard assets for window buttons</figcaption>
</figure>

When El Capitan came out, it introduced Split View. It should be trivial for a Mac app to support that. However, the split mode is fired by holding down the full-screen button, which is very hard to mimic using a normal `NSButton`. For this reason, we still don’t support Split View until 1.0.6.

Today I got another chance to look into it. I found that both Tweetbot and FaceTime have the correct behavior, and they support Split View. With a little help from [Hopper](http://www.hopperapp.com), I realized OS X would use a darker color if the window is in the vibrant dark appearance. But setting the whole window as vibrant dark will affect all the widgets inside that window. However, we can set appearance only for those buttons:

{% highlight objc %}
self.closeButton = [self standardWindowButton:NSWindowCloseButton];
self.miniaturizeButton = [self standardWindowButton:NSWindowMiniaturizeButton];
self.zoomButton = [self standardWindowButton:NSWindowZoomButton];
	
self.closeButton.appearance = [NSAppearance appearanceNamed:NSAppearanceNameVibrantDark];
self.miniaturizeButton.appearance = [NSAppearance appearanceNamed:NSAppearanceNameVibrantDark];
self.zoomButton.appearance = [NSAppearance appearanceNamed:NSAppearanceNameVibrantDark];
{% endhighlight %}

Yay! Problem solved. Split View, see you in Inboard 1.0.7.
