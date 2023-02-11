# ToDo List
Mobile task management application for Android and iOS.

<a href="https://play.google.com/store/apps/details?id=com.jetteam.todolist"><img src="./Google_Play.png"></a>

Stack: JavaScript, TypeScript, React Native, Redux, Redux-Saga, Firebase, i18next, Font Awesome, ESLint, Prettier.

Implemented: adding task or task list, removing task or task list, renaming task or task list, collapsing and uncollapsing task lists, marking the completed task, marking the uncompleted task, snack bar, marking task with any color, receiving tasks notification at a certain date and time, screens for todo tasks and for done tasks, notepad screen, sign in with Google and Facebook, user data storage and synchronizing with cloud database, translations into 15 languages, change app language button, dark theme button, app accent color picker button, contact the author button, rate app button, share app button, delete account button, internet connection checking, splash screen.

![ToDo List preview](./preview.png)

Before commit or push, please, run the script "husky_install" once. This command will enable git hooks "pre-commit" and "pre-push" for the repository. These hooks will make it possible to check commits.

If the git hooks still don't work, enter the following command in the IDE terminal. This command will grant access rights to Husky files. For Linux/MacOS/WSL: chmod ug+x .husky/*
