# ToDo List
Mobile task management application for Android and iOS.

<a href="https://play.google.com/store/apps/details?id=com.jetteam.todolist"><img src="./Google_Play.png"></a>

Stack: JavaScript, TypeScript, React Native, Redux, Redux-Saga, Firebase, i18next, Font Awesome, ESLint, Prettier.

Implemented: adding task or task list, removing task or task list, renaming task or task list, collapsing and uncollapsing task lists, marking the completed task, marking task with any color, screens for todo tasks and for done tasks, notepad screen, receiving tasks notification at a certain date and time, sign in with Google, user data storage and synchronizing with cloud database, translations into 15 languages, dark theme button, app accent color picker button, contact the author button, delete account button, change app language button, internet connection checking, splash screen.

![ToDo List preview](./preview.png)

Before commit or push, please, run the script "husky_install" once. This command will enable git hooks "pre-commit" and "pre-push" for the repository. These hooks will make it possible to check commits.

If the git hooks still don't work, enter the following command in the IDE terminal. This command will grant access rights to Husky files. For Linux/MacOS/WSL: chmod ug+x .husky/*
