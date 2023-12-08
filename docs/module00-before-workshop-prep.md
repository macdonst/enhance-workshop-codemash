---
title: Enhance Workshop Preparation
layout: default
---

[Module Index](/enhance-workshop)

# Module 0: Preliminary Setup (complete before the workshop)

## Objective:

- Check that tools needed for the seminar are installed
- Identify any hardware, software, or permissions problems in advance
- Tools needed:
  - Terminal
  - Git (and GitHub account to deploy)
  - Node and NPM
  - Editor: VSCode
  - Begin CLI

## Time to complete:

- ~10-20 minutes

## Do I really need to do this?

If you regularly use Node and Git and are confident that your machine is set up for local development, you may skip the instructions below.
You may still need to install the Begin CLI (at the bottom of this section) to deploy your workshop project.

## Instructions:

1.  **Open Terminal**:

- Press `Command` + `Space` to open Spotlight search.
- Type "Terminal" and hit `Enter`.
- Alternatively, you can find Terminal in `Applications` -> `Utilities` -> `Utilities`.

2. **Check for Git**:

- In the Terminal, type the following command and press `Enter`:

```bash
git --version
```

- If Git is installed on your Mac, you should see a message with the version number, something like "git version 2.XX.X".
- If you receive a message like "command not found: git", it means Git is not installed.

3. **Install Git** (Optional, in case Git is not installed):

- To install Git, you can download it from the official Git website.
- Open your web browser and navigate to the Git downloads page: [https://git-scm.com/downloads](https://git-scm.com/downloads).
- Click on the download link for Mac OS X. Once the download is complete, open the installer.
- Follow the on-screen instructions to install Git.
- After the installation is complete, go back to the Terminal and type `git --version` again to confirm that Git is installed properly.

4. **Setup Git** (Optional, if you've just installed Git or haven't set it up):

- It's a good practice to set your Git username and email address before you start using it. These details will be associated with any commits that you create.
- Set your username by typing:

```bash
git config --global user.name "Your Name"
```

- Set your email address by typing:

```bash
git config --global user.email "you@example.com"
```

- Now Git is installed and configured on your Mac.

5. **Check for Node.js**:

- In the Terminal, type the following command and press `Enter`:

```bash
node --version
```

- If Node.js is installed on your Mac, you should see a message with the version number, something like "vXX.XX.X".
- If you receive a message like "command not found: node", it means Node.js is not installed.

6. **Install Node.js** (Optional, in case Node.js is not installed):

- You can download Node.js from the official website.
- Open your web browser and navigate to the Node.js downloads page: [Node.js Downloads](https://nodejs.org/en/download/).
- Click on the download link for macOS. Once the download is complete, open the installer.
- Follow the on-screen instructions to install Node.js.
- After the installation is complete, go back to the Terminal and type `node --version` again to confirm that Node.js is installed properly.

7. **Check for npm**:

- Node.js comes with npm, which is the package manager for Node.js. It's a good idea to also check that npm is installed.
- In the Terminal, type the following command and press `Enter`:

```bash
npm --version
```

- If npm is installed, you should see a message with the version number.

8. **Check for VSCode:**

- Press `Command` + `Space` to open Spotlight search.
- Type "Visual Studio Code" or "VSCode" and see if the application appears in the search results.
- If it appears, it means VSCode is already installed on your system. You can simply click on it to open the application. If it's not appearing in the search results, you need to install it.

9. **Install VSCode** (Optional, in case VSCode is not installed):

- Open your web browser and navigate to the Visual Studio Code download page: [VSCode Download](https://code.visualstudio.com/Download).
- Click on the "Download for Mac" button. This will download a `.zip` file.
- Once the download is complete, locate the `.zip` file (usually in the Downloads folder) and double-click it to extract the VSCode application.
- Drag the extracted “Visual Studio Code” application to the Applications folder to install it.
- You might be prompted to confirm that you want to open an application downloaded from the internet. Confirm that you want to open it.

10. **Open VSCode**:

- After installation, you can open VSCode by pressing `Command` + `Space` and typing "Visual Studio Code" or "VSCode" and hitting `Enter`.
- Alternatively, you can navigate to the Applications folder and double-click on the “Visual Studio Code” application to open it.

11. **Installing the Begin CLI**

- In your terminal run the following command:

```
curl -sS https://dl.begin.com/install.sh | sh
```

- Then follow the printed instructions to add the Begin CLI to your $PATH.

12. **Clone the workshop app**

- In the terminal enter the following commands and hit enter:

```
git clone https://github.com/beginner-corp/enhance-workshop-codemash.git
cd enhance-workshop-codemash
npm i
```

- Start the local dev server like so:

```
npm start
```

13. **No JavaScript Chrome Extension (Optional)**

- Install “Toggle JavaScript” in Chrome to see the app working without JS.
- [https://chrome.google.com/webstore/detail/toggle-javascript/cidlcjdalomndpeagkjpnefhljffbnlo?hl=en-US](https://chrome.google.com/webstore/detail/toggle-javascript/cidlcjdalomndpeagkjpnefhljffbnlo?hl=en-US)

## Windows Instructions:

1.  **Open Terminal**:

- In the Windows Search Bar type `cmd` to open Command Prompt.
- Alternatively, you can find the Command Prompt in `Windows Menu` -> `Windows System` -> `Command Prompt`.

2. **Check for Git**:

- In the Command Prompt, type the following command and press `Enter`:

```bash
git --version
```

- If Git is installed on your Windows box, you should see a message with the version number, something like "git version 2.XX.X".
- If you receive a message like "command not found: git", it means Git is not installed.

3. **Install Git** (Optional, in case Git is not installed):

- To install Git, you can download it from the official Git website.
- Open your web browser and navigate to the Git downloads page: [https://git-scm.com/downloads](https://git-scm.com/downloads).
- Click on the download link for Windows. Once the download is complete, open the installer.
- Follow the on-screen instructions to install Git.
- After the installation is complete, go back to the Terminal and type `git --version` again to confirm that Git is installed properly.
- If you get an error that:

```
'git' is not recognized as an internal or external command,
operable program or batch file.
```

- In the Windows Search Bar type `environment variables` to open `Edit the system environment variables control panel`.
- Click the `Environment Variables` button at the bottom of the control panel.
- In the `User variables for <your user>` click on `Path` then on the `edit` button.
- In the dialog that opens click the `New` button.
- Add the string `C:\Program Files\Git\bin` and click `Okay`
- Click `New` once more.
- Add the string `C:\Program Files\Git\cmd` and click `Okay`
- Click `Okay` 3 more times to close all the dialogs.
- Restart your Command Prompt
- The `git` command should now be recognized.

4. **Setup Git** (Optional, if you've just installed Git or haven't set it up):

- It's a good practice to set your Git username and email address before you start using it. These details will be associated with any commits that you create.
- Set your username by typing:

```bash
git config --global user.name "Your Name"
```

- Set your email address by typing:

```bash
git config --global user.email "you@example.com"
```

- Now Git is installed and configured on your Windows machine.

5. **Check for Node.js**:

- In the Terminal, type the following command and press `Enter`:

```bash
node --version
```

- If Node.js is installed on your Windows machine, you should see a message with the version number, something like "vXX.XX.X".
- If you receive a message like "'node' is not recognized as an internal or external command, operable program or batch file.", it means Node.js is not installed.

6. **Install Node.js** (Optional, in case Node.js is not installed):

- You can download Node.js from the official website.
- Open your web browser and navigate to the Node.js downloads page: [Node.js Downloads](https://nodejs.org/en/download/).
- Click on the download link for Windows Installer. Once the download is complete, open the installer.
- Follow the on-screen instructions to install Node.js.
- After the installation is complete, go back to the Terminal and type `node --version` again to confirm that Node.js is installed properly.
- You may need to add `node` to your PATH. Follow the same instructions for adding items to your path as we did while installing git in step 3.
- This time you will be adding the following items:
  - .\node_modules\.bin
  - C:\Program Files\nodejs
- Restart your command prompt and check for `node` again.

7. **Check for npm**:

- Node.js comes with npm, which is the package manager for Node.js. It's a good idea to also check that npm is installed.
- In the Terminal, type the following command and press `Enter`:

```bash
npm --version
```

- If npm is installed, you should see a message with the version number.

8. **Check for VSCode:**

- In the Windows Search Bar type `Visual Studio Code` to open VS Code.
- If it appears, it means VSCode is already installed on your system. You can simply click on it to open the application. If it's not appearing in the search results, you need to install it.

9. **Install VSCode** (Optional, in case VSCode is not installed):

- Open your web browser and navigate to the Visual Studio Code download page: [VSCode Download](https://code.visualstudio.com/Download).
- Click on the "Download for Windows" button. This will download a `.zip` file.
- Once the download is complete, run the VSCode installer to install VSCode.

10. **Open VSCode**:

- In the Windows Search Bar type `Visual Studio Code` to open VS Code.

11. **Installing the Begin CLI**

- In the Windows Search Bar type `Power Shell` to open Power Shell.
- In your Power Shell run the following command:

```
iwr https://dl.begin.com/install.ps1 -useb | iex
```

- Close Power Shell and restart your Command Prompt to that the Begin CLI is available.

12. **Clone the workshop app**

- In the terminal enter the following commands and hit enter:

```
git clone https://github.com/beginner-corp/enhance-workshop-codemash.git
cd enhance-workshop-codemash
npm i
```

- Start the local dev server like so:

```
npm start
```

13. **No JavaScript Chrome Extension (Optional)**

- Install “Toggle JavaScript” in Chrome to see the app working without JS.
- [https://chrome.google.com/webstore/detail/toggle-javascript/cidlcjdalomndpeagkjpnefhljffbnlo?hl=en-US](https://chrome.google.com/webstore/detail/toggle-javascript/cidlcjdalomndpeagkjpnefhljffbnlo?hl=en-US)
