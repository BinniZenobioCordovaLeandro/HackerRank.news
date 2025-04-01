# React Native Technical Test

Welcome to the React Native Technical Test! This test is designed to assess your knowledge and skills in react native development.

The detailed instructions and requirements for this test are defined in the `CHALLENGE.md` file. Please read it carefully before you start.

Good luck!

## HOW TO USE THIS APP PROJECT

# RUN THE APP

Run the HACKERRANK.NEWS app

```sh
pnpm start # tu run PRODUCTION environment
pnpm dev # to run DEVELOPMENT environment
pnpm preview # to run PREVIEW environment
```


# RUN Storybook (ondevice)

Look and interact with components in the app using Storybook

```sh
# either
pnpm run storybook

# ios
pnpm run storybook:ios

# android
pnpm run storybook:android

# web
pnpm storybook:web
```

# How Run Unit Tests

Unit tests are principally oriented to test the BUSSINESS LOGIC.
It also has a Github Action to run the tests in the CI/CD pipeline
and pre-commit hooks to run the tests before commiting the code.

```sh
pnpm run test
```

# Code Formatting

The codebase is formatted using Biome
It has a pre-commit hook to format the code before commiting
and GItHub Action to check the code format in the CI/CD pipeline

```sh
pnpm run format
```

# Quality Control (QA)

I added Gihub Task to show a QR CODE to preview the app using EXPO GO APP.
Just SCAN the QR CODE and see the app running on your device in less than 1 SECOND.

try it locally using the command
```sh
pnpm run eas-preview
```

`note`: first install EXPO GO from PlayStore/AppStore then scan the QR

## Continuous Integration and Continuous Deployment (CI/CD)
Each push to the main branch will trigger a build in EAS.
The build will be deployed to the preview environment.
It creates the APK/AAB and IPA files for Android and iOS respectively
that can be used or distributed to the TESTERS or STORES

# Code Quality Control (DEVS)
This repo guarantees the code quality using BIOME, HUSKY and COMMITLINT.
It has a pre-commit hook to check the code quality before commiting
and a GitHub Action to check the code quality in the CI/CD pipeline.

```sh
npx lint-staged # to run the pre-commit hook
```

## Pull Request template
I added a pull request template to the repo to help you to create a good PR.
Follow `.github/pull_request_template.md` to create a good PR.

# Deep Linking

I added EXPO-ROUTER that allows to use deep linking in the app easily.
First install the app then you can use the following command to open the app in a specific screen
according to the SCHEMA URL environment (dev, preview, prod) defined in the app.config.ts file

```sh
npx uri-scheme open hackerrank.news://index --android
npx uri-scheme open preview.hackerrank.news://index --android
npx uri-scheme open dev.hackerrank.news://index --android
```

```sh
npx uri-scheme open hackerrank.news://index --ios
npx uri-scheme open preview.hackerrank.news://index --ios
npx uri-scheme open dev.hackerrank.news://index --ios
```

# Push Notifications
I added push notifications to the app using expo-notifications.

You can use the following TOOL to send push notifications to the app
https://expo.dev/notifications

with the required values, as example

`token`: ExponentPushToken[ZVTyFpJdsVdUNROGenHpyv]
`title`: Article Title, `Is Expo launching dev to the moon?`
`body`: Article Body, `Recently, Expo announced the launch of dev to the moon.`
`data`: {"url": "https://knightride.rakhim.org/"}

# Background Task
I added a background task to check for new articles every 15 minutes.
It uses the expo-task-manager and expo-notifications to send a notification to the user when a new article is available according to the user category preferences.
The background task is registered in the app and it will run when the app is in the background and the device is connected to the internet.

## Hot to test background TASKS
1. Open the **Instruments** app. The Instruments app can be searched through Spotlight (`⌘ + Space`) or opened from:  
   `/Applications/Xcode.app/Contents/Applications/Instruments.app`
2. Select **Time Profiler**.
3. Select your **device/simulator** and pick the **Expo Go** app.
4. Press the **Record** button in the top left corner.
5. Navigate to the **Document Menu** and select:  
   **Simulate Background Fetch - Expo Go**.

# Notification Handler
I added a notification handler to handle the notification when the user clicks on it.
It uses the expo-notifications to handle the notification and redirect the user to the web view screen to show the article content.


---
# INTERNAL NOTES

### TODO tasks
I added TODO's annotations with future tasks
track them using vscode extension
https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree

### TRACK TASKS
# Wed Mar 26
- [*] Initial Project Setup with EXPO ReactNative
- [*] Add Storybook to documentate the UI
- [*] Add Jest to run UnitTests
- [*] Add Biome to format the codebase
- [*] Add Husky, to run precommit tasks
- [*] Add commitlint to Validate commit messages
- [*] create SRC directory
- [*] Config PNPM with Expo

# Thu Mar 27
- [*] Init EAS project
- [*] Add EAS task to CI/CD using expo-github-action
- [*] Add Biome task to check code in PR's
- [*] Add Unit Tests task
- [*] Add Expo Router to manage navigation in the app

-- Initial Setup finished

# Sat Mar 29, Core Functionality in CHALLENGE.md 
- [*] Add api to fetch articles
- [*] Order by article.created_at_i when fetching articles
- [*] Add cache to http that invalidates when online
- [*] Add flashlist to ensure performance in long lists
- [*] Add Swipeable component to show Articles data in the list and interact with the Article
- [*] Add RefreshControl gesture to Article List
- [*] Add WebView to open the article
- [*] Add local storage to save deleted articles
- [*] Filter deleted articles when fetching, using localStorage
- [*] Add unit test components, AppBar, Button, Icon, Text, Swipeable.

# Sun Mar 30, Enhanced Features in CHALLENGE.md
- [*] Add action to mark article as favorite, and save it in localStorage
- [*] Add action to mark article as deleted, and save it in localStorage
- [*] filter deleted articles when fetching, using localStorage
- [*] Add custom field to article to show if it is favorite
- [*] Add screen to list favorite articles
- [*] Add screen to list deleted articles
- [*] Add Custom expo tab bar to navigate through articles, favorites and deleted articles

# Mon Mar 31, Push Notifications
- [*] Add push notifications to the app using expo-notifications
- [*] I added an alert to redirect the user to the settings screen to allow push notifications when is not granted
- [*] Add an Onboarding screen to ask user preferences
- [*] Save the notification token in localStorage
- [*] Add a BACKGROUND TASK to check for new articles
- [*] Sent notification from the background task using expo notifications service
- [*] when open the notification REDIRECT to the WEB-VIEW screen tho show the article content

# Tue Apr 01, Deep Linking
Let's take a coffee and present the app to the client 🚀🚀🚀