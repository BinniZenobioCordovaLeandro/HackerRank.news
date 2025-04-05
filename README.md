# HACKERRANK.NEWS

Developed by Binni Cordova
@binnicordova

****************************************************

## HOW TO USE THIS APP PROJECT

# RUN THE APP

Run the HACKERRANK.NEWS app

```sh
pnpm start # to run the PRODUCTION environment
pnpm dev # to run the DEVELOPMENT environment
pnpm preview # to run the PREVIEW environment
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

I focused the unit tests primarily on testing the business logic. I also added a GitHub Action to run tests in the CI/CD pipeline, and I set up pre-commit hooks to ensure tests run before I commit any code.

```sh
pnpm run test
```

# Code Formatting

I formatted the codebase using Biome. I added a pre-commit hook to auto-format the code before committing and configured a GitHub Action to check formatting in the CI/CD pipeline.

```sh
pnpm run format
```

# Quality Control (QA)

I added a GitHub task that shows a QR code to preview the app using the Expo Go app. Just scan the QR code and you’ll see the app running on your device in less than a second.

try it locally using the command
```sh
pnpm run eas-preview
```

`note`: first install EXPO GO from PlayStore/AppStore then scan the QR

## Continuous Integration and Continuous Deployment (CI/CD)
Each time I push to the main branch, a build is triggered in EAS. It gets deployed to the preview environment and generates APK/AAB and IPA files for Android and iOS, which I can share with testers or submit to the stores.

# Code Quality Control (DEVS)
I ensured code quality by using Biome, Husky, and Commitlint. I added a pre-commit hook to check code quality before committing and set up a GitHub Action to verify code quality in the CI/CD pipeline.

```sh
npx lint-staged # to run the pre-commit hook
```

## Pull Request template
I added a pull request template to help me (and collaborators) create clean and structured PRs. It’s located at `.github/pull_request_template.md`.

# Deep Linking

I integrated Expo Router to enable deep linking in the app. Once installed, I can use the following commands to open specific screens based on the schema URL environment defined in the `app.config.ts` file.

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
I implemented push notifications using `expo-notifications`. I use the Expo tool at https://expo.dev/notifications to send notifications to the app. Here's an example payload I use:

`token`: ExponentPushToken[ZVTyFpJdsVdUNROGenHpyv]
`title`: Article Title, `Is Expo launching dev to the moon?`
`body`: Article Body, `Recently, Expo announced the launch of dev to the moon.`
`data`: {"url": "https://knightride.rakhim.org/"}

# Background Task
I added a background task that checks for new articles every 15 minutes. It uses `expo-task-manager` and `expo-notifications` to notify the user based on their selected categories. This task runs in the background when the device is connected to the internet.

## How to test background TASKS
1. Open the **Instruments** app. The Instruments app can be searched through Spotlight (`⌘ + Space`) or opened from:  
   `/Applications/Xcode.app/Contents/Applications/Instruments.app`
2. Select **Time Profiler**.
3. Select your **device/simulator** and pick the **Expo Go** app.
4. Press the **Record** button in the top left corner.
5. Navigate to the **Document Menu** and select:  
   **Simulate Background Fetch - Expo Go**.

# Notification Handler
I added a handler to manage what happens when a user taps a notification. It redirects them to the WebView screen to display the article content.


---
# INTERNAL NOTES

### TODO tasks
I added TODO's annotations with future tasks
track them using vscode extension
https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree

# TRACK TASKS:
## Wed Mar 26
- [*] Initial Project Setup with EXPO ReactNative
- [*] Add Storybook to documentate the UI
- [*] Add Jest to run UnitTests
- [*] Add Biome to format the codebase
- [*] Add Husky, to run precommit tasks
- [*] Add commitlint to Validate commit messages
- [*] create SRC directory
- [*] Config PNPM with Expo

## Thu Mar 27
- [*] Init EAS project
- [*] Add EAS task to CI/CD using expo-github-action
- [*] Add Biome task to check code in PR's
- [*] Add Unit Tests task
- [*] Add Expo Router to manage navigation in the app

-- Initial Setup finished

## Sat Mar 29, Core Functionality in CHALLENGE.md 
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

## Sun Mar 30, Enhanced Features in CHALLENGE.md
- [*] Add action to mark article as favorite, and save it in localStorage
- [*] Add action to mark article as deleted, and save it in localStorage
- [*] filter deleted articles when fetching, using localStorage
- [*] Add custom field to article to show if it is favorite
- [*] Add screen to list favorite articles
- [*] Add screen to list deleted articles
- [*] Add Custom expo tab bar to navigate through articles, favorites and deleted articles

## Mon Mar 31, Push Notifications
- [*] Add push notifications to the app using expo-notifications
- [*] I added an alert to redirect the user to the settings screen to allow push notifications when is not granted
- [*] Add an Onboarding screen to ask user preferences
- [*] Save the notification token in localStorage
- [*] Add a BACKGROUND TASK to check for new articles
- [*] Sent notification from the background task using expo notifications service
- [*] when open the notification REDIRECT to the WEB-VIEW screen tho show the article content

## Tue Apr 01
Let's take a coffee and present the app to the client 🚀🚀🚀