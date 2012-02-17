"Hello World" from Azure
========================

All of our instruction today will be done in the Cloud9 IDE and deployed to Azure. 
So, the very first thing you'll need to do is sign up for both of those services.

Step 1: Sign up your trial Azure account
----------------------------------------
* See your class instructor for directions on how to sign up for your trial Azure account.
* Visit http://windows.azure.com and make sure that you can sign in.

Step 2: Sign up for the Cloud9 IDE
----------------------------------
* Using the same browser that you used to sign in to Windows Azure in Step 1:
* Visit http://c9.io 
  * Enter in your "Desired username", "Your email", and "Re-enter your email".
  * Click "Sign me up".
* Check your email for an email from "info@c9.io" with the Subject line of "Welcome to Cloud9! Please activate your account!"
  * Click on the link that looks like this: http://c9.io/activate.html?uid=xxxxx&code=xxxxxx&redirect=%2Fdashboard.html
* You will be sent to an "Activate account" page.
  * Enter in your "Password", and "Confirm password"
  * Click "ACTIVATE"
* Create a new project:
  * Look for the "MY PROJECTS" pane on the left side of your screen.
  * Click on the "+" that is pointed to by the "Create a project here" arrow.
  * Select the "Create a new project" option.
    * Name your project. (We suggest you name it "helloworld".
    * Leave the "Project type" set to "Git".
    * Click "CREATE".

Step 3: Write your "Hello World" in Cloud9!
-------------------------------------------
* Click the green "START EDITING" button.
* If this is your first Cloud9 project, you will be prompted with a "Here are a few pointers to get you started!" dialog.
  * Read the text and click on the "click here!" link to see a brief demo.
  * This is a short, useful walkthrough, we suggest following it. You'll learn some useful stuff!
* Create a new file named "server.js"
  * Click on the "File" menu, select the "New File" option.
  * Paste in [this "Hello world" code](https://gist.github.com/1794418).
  * Click on the "File" menu, select the "Save" option.
  * In the "Save as": box, enter "server.js", then click "Save"
* Run your code!
  * Click on the "debug" button.
  * Wait a few moments for the "Output" pane to pop up at the bottom of your screen.
  * In the output pane, you should see a link that looks like: http://nodebootcamp.xxxxxx.c9.io/
  * Click on that link.
  * You should see "Hello world" in your browser!

Step 4: Deploy to Azure
-----------------------
* Click on the "Deploy" button on the left side of the Cloud9 IDE:
* ![Image of the Deploy button](http://content.screencast.com/users/franusic/folders/Jing/media/671b7cf1-deee-403e-9c4d-e44808afcc35/2012-02-10_1918.png)
* Click on the "+" button. You should see some green text saying "Create a Deploy Server" pointing at it.
* ![Image of "Create a Deploy Server"](http://content.screencast.com/users/franusic/folders/Jing/media/dec9e426-4ad7-43cf-94c0-32c4571c9723/2012-02-10_1921.png)
* On the "Choose type:" menu, select "Windows Azure".
* Click on the green "DOWNLOAD WINDOWS AZURE SETTINGS" button.
  * This will open a new window or tab in your browser.
  * A file ending in ".publishsettings" should automatically start to download
* ![Image of the Add a deploy target" window](http://content.screencast.com/users/franusic/folders/Jing/media/0067ad35-cd2f-4aee-b4e3-063d4cd75311/2012-02-10_1929.png)
* Switch back to the window or tab where the Cloud9 IDE is running.
* Press the "Choose File" button.
* Select the ".publishsettings" file that was downloaded in the step above.
* Press the green "UPLOAD" button.
* ![What the UPLOAD button looks like](http://content.screencast.com/users/franusic/folders/Jing/media/70151c98-bb61-4c63-9e17-ce281bfb6bce/2012-02-10_1941.png)
* (If you have multiple subscriptions, you'll be prompted to select one)
* Click the "+ Create New" button.
* Give your deployment a name. (We suggest: "nodecamp-" + $your_twitter_handle)
* Change the number of instances to "2"
* Leave all the rest of the settings at their defaults.
* Click the green "CREATE" button.
* (You may be prompted to enter a RDP username and password. If you are, do so.)
* ![What the settings dialog looks like](http://content.screencast.com/users/franusic/folders/Jing/media/11a2a76e-e0dc-42e6-af80-a1f6764b3ef6/2012-02-10_1950.png)
* Wait for the Windows Azure deploy target to say "Active"
* Click on the Windows Azure deploy target. You'll see a fly-out with some options and a big green "DEPLOY" button.
* Click the big green "DEPLOY" button.
* ![What the fly-out looks like](http://content.screencast.com/users/franusic/folders/Jing/media/9398026a-a3d4-4b3b-b038-10e9864c181e/2012-02-10_1957.png)
* You'll be prompted to create "web.config". Click "Yes".
* You'll be prompted to create a "csdef" file. Click "Yes".
  * You'll be prompted to select an instance size for the csdef file. Select "Extra small" and click "Create".
* You should see a deploy status with a faint grey spinning gear.
  * (You may have to hit "reload" in your browser to get status updates)
* When the deployment finishes (this will take 5-8 minutes). Click on the deploy target, then click on the "Url:" in the flyout.
  * (If your followed our naming suggestion above, this Url will look like this: http://nodecamp-xxxxxx.cloudapp.net)
* When you see "Hello World" on your .cloudapp.net url. You're done!
* Hooray!

See also:
=========

* Getting started with the Cloud 9 IDE:
  * http://support.cloud9ide.com/entries/20583558-lesson-1-creating-a-new-account
  * http://support.cloud9ide.com/entries/20548092-lesson-2-creating-a-new-project
  * http://support.cloud9ide.com/entries/20640198-lesson-3-writing-a-node-js-hello-world-program
* Connecting Cloud 9 to Windows Azure:
  * http://cloud9ide.posterous.com/windows-azure-on-cloud9