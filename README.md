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