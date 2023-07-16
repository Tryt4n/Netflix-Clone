# Netflix Clone

My goal is to recreate the [Netflix](https://www.netflix.com) website but not only the home page, but also all account settings and individual profiles, along with all viewing history and ratings, viewing restrictions, subtitle appearance or profile blocking. In addition I added internationalization by adding translations (only available languages are: english and polish, if user select language that doesn't have translations then everything would be in english).  
_When creating the website, I paid special attention to the semantically correct code along with accessibility._  
**Site isn't done yet. The only features that work are profiles settings and account settings.**

## Used Frameworks:

- React
- Sass

## Used Libraries:

- react-router-dom
- react MUI components
- swiperJS
- react-textarea-autosize
- moment.js
- i18next

## Functionality with screenshots

# Starting Page

![Starting Page](/public/screenshots/profil-select.png)

# Logging if profile has PIN code

After entering the PIN correctly, the user will be automatically redirected to the home page. **_PIN for John profile is 1234_**  
![Profile Lock Page](/public/screenshots/PIN.png)

# Manage Profiles

To edit profiles settings click button Manage Profiles and then choose profile to edit  
![Manage Profile](/public/screenshots/manage-profiles.png)

# Profile Settings

On this page you can change your username, create a nickname in Game Handle, change your profile avatar by pressing the edit button in the current avatar or change user interface language. Username and nick inputs have error states if something isn't correct.  
![Edit Profile](/public/screenshots/profile-settings.png)

Language Select List was created with accessibility in mind. Keyboard navigation with all arrows keys and ESC, Enter, Space, Home and End keys.  
![Changing Language for user](/public/screenshots/profile-language-select.png)

By clicking in _Edit_ button in **Maturity Settings** you will be redirected to viewing restrictions page, but firstly you will need to enter your account password (password is **NOT** set, just enter anything and press continue)

By clicking avatar change button (where the blue arrow is pointed) you will be redirected to the **_avatar selection page_**.  
![Avatar Selection Page](/public/screenshots/profile-select-avatar.png)

# Profile Advanced Settings

To enter advanced settings you can go there directly via this [link](https://clone-netflix-213214.netlify.app/account) or go there through the navbar after selecting a profile  
![Account Settings](/public/screenshots/account-settings.png)

**_The only thing that works on this page is the advanced settings of individual profiles._**  
After clicking on any user the settings list will expand.  
The main profile will have the most setting options and the children's profile will have the fewest.  
![Account User Settings List](/public/screenshots/profile-advanced-settings.png)

# Language Select Page

After changing _"Display Language"_ the _"Shows & Movies Languages"_ will change automatically. In addition we can add more languages to _"Shows & Movies Languages"_.  
![Languages Select Page](/public/screenshots/language-select.png)

# Viewing Restrictions Page

Before entering the site you must enter account password (**_there is no account password, just type anything_**)  
![Password Confirmation](/public/screenshots/password-confirmation.png)

Both lists are fully accessibly with keyboard navigation.  
![Viewing Restrictions](/public/screenshots/viewing-restriction.png)

You can search for titles both by entering their title and the actors playing in them  
![Viewing Restrictions List](/public/screenshots/viewing-restriction-list.png)
![Viewing Restrictions List](/public/screenshots/viewing-restriction-list-by-actor.png)  
**The only titles available are:**

- Fubar
- Bridgerton
- Wednesday
- The Mother
- all parts of Shrek

# Profile Lock Page

After pressing the checkbox, a pin `input` will appear in which you must enter the PIN  
![Profile Lock Page](/public/screenshots/profile-lock.png)
![Profile Lock Page](/public/screenshots/profile-lock-tooltip.png)

# Viewing Activity and Rating Activity

Any title can be deleted from viewing history or can be reported. By clicking "Hide all" all history will be deleted. By clicking "Download all" all history will be downloaded in `.txt` file.  
![Viewing Activity](/public/screenshots/viewing-activity.png)  
By clicking on "Hide series?" the whole series will be deleted from viewing history.  
![Viewing Activity](/public/screenshots/viewing-activity-hide-series.png)  
Rating can be modified by clicking different rating button. When you press the same rating button, that rating will be deleted.  
![Viewing Activity](/public/screenshots/rating-activity.png)

After clicking on "Report a problem" you will be redirected to **Report a problem Page**.  
The height of `textarea` is set automatically.  
![Report a problem Page](/public/screenshots/report-problem.png)

# Subtitle Appearance Page

Here you can set the appearance of the subtitles in the video with real-time preview.  
![Subtitle Appearance](/public/screenshots/subtitles-appearance.png)

# Playback Settings

![Playback Settings](/public/screenshots/playback-settings.png)

# Communications Settings

![Communications Settings](/public/screenshots/communications-settings.png)

# Privacy and Data Settings

A message will appear each time the input changes.  
![Privacy and Data Settings](/public/screenshots/privacy-data-settings.png)

![Privacy and Data Settings 2](/public/screenshots/privacy-data-settings_2.png)

# Navbar

So far the only functionalities in the navbar are changing the profile and "Manage Profiles" and "Account" (yellow ones).

![Navbar](/public/screenshots/navbar-profiles-settings.png)