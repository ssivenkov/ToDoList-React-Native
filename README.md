# ToDo List
Mobile task management application for Android.

<a href="https://play.google.com/store/apps/details?id=com.jetteam.todolist"><img src="./Google_Play.png"></a>

Stack: JavaScript, TypeScript, React Native, Redux, Redux-Saga, Firebase, i18next, Font Awesome, ESLint, Prettier.

The application requires the presence of Google services on the device.

Implemented: adding task and task list, removing task and task list, renaming task and task list, collapsing and uncollapsing task lists, sorting settings for task list, marking the completed task, marking the uncompleted task, snack bar, marking task with any color, creation date and modification date for task, receiving tasks notification at a certain date and time, screens for todo tasks and for done tasks, notepad screen, sign in with Google account and Email, user data storage and synchronizing with cloud database, translations into 15 languages, change app language, dark theme, app accent color picker, adjust text sizes, contact the author ability, rate app ability, share app ability, delete account ability, internet connection checking, splash screen.

![ToDo List preview](./preview.png)

Before commit or push, please, run the script "husky_install" once. This command will enable git hooks "pre-commit" and "pre-push" for the repository. These hooks will make it possible to check commits.

If the git hooks still don't work, enter the following command in the IDE terminal. This command will grant access rights to Husky files. For Linux/MacOS/WSL: chmod ug+x .husky/*
