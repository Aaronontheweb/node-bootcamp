"Hello World" from Azure
========================

* Sign up for a Windows Live ID (You'll need this to sign up for your Azure trial)
  Skip this step if you already have a Windows Live ID!
  * Visit: http://live.com
  * Click on the "Sign up" button next to the text "Don't have a Windows Live ID?"
    ![Screenshot of live.com](http://content.screencast.com/users/franusic/folders/Jing/media/b88c42e4-fb39-4b16-bd0e-cfd499d2366f/2012-02-10_1709.png)
  * Click on the "Or use your own email address" link:
    ![Where to find the "Or use your own email address" link](http://content.screencast.com/users/franusic/folders/Jing/media/fcfd560f-4a3b-4a6f-932c-4a49cf9cfda7/2012-02-10_1711.png)
  * Fill out the information.
    * DO NOT use the same password as you use for your emaill acount. Make up a new one!
  * Click the "I accept" button at the bottom.
  * Check your email inbox. Find the email from Windows Live and confirm your account by clicking on the link.
  * Make sure you are logged in to Windows Live. 
    You'll know that you're logged into Windows Live if you visit: http://live.com and see something like this:
  * ![What it looks like to be logged in to Windows Live](http://content.screencast.com/users/franusic/folders/Jing/media/73c9124c-a515-4ca6-9660-18fd1b2fa296/2012-02-10_1716.png)
  * Stay logged in to Windows Live and use the SAME BROWSER for the next step.
* Sign up for an Azure Pass:
  * Visit: http://windowsazurepass.com/
  * Set your country to "United States"
  * Enter in your promo code
    (you should have recieved one from your instructor)
  * Click "Submit"
    ![Screenshot of the Try Windows Azure Pass page](http://content.screencast.com/users/franusic/folders/Jing/media/bcdf9097-2fb5-49be-b346-65468d8d7490/2012-02-10_1653.png)
  * Click on the "Sign In" button to continue to the Windows Live signup page.
    ![Screenshot of the page the "Sign In" button is on](http://content.screencast.com/users/franusic/folders/Jing/media/3f2ba174-8f81-41d3-8809-63f42a68ac37/2012-02-10_1657.png)
  * Fill out the remaining information, then click submit.
    NOTE: The phone number you enter MUST be able to receive SMS messages!
    ![Screenshot of remaining information form](http://content.screencast.com/users/franusic/folders/Jing/media/2ea607ed-28de-431e-af97-c9e50c7eacc9/2012-02-10_1719.png)
  * Accept the "Windows Azure Pass terms of service" by reading the terms of service, checking the box,
    filling out your first and last name, then clicking "Accept".
  * Wait for your Azure Pass to be approved.
* Sign up for the Cloud9 IDE: http://c9.io
    * Enter in your "Desired username", "Your email", and "Re-enter your email".
    * Click "Sign me up".
* Check your email for an email from "info@c9.io" with the Subject line of "Welcome to Cloud9! Please activate your account!"
    * Click on the link that looks like this: http://c9.io/activate.html?uid=xxxxx&code=xxxxxx&redirect=%2Fdashboard.html
* You will be sent to a "Activate account" page.
    * Enter in your "Password", and "Confirm password"
    * Click "ACTIVATE"
* Create a new project:
    * Look for the "MY PROJECTS" pane on the left side of your screen.
    * Click on the "+" that is pointed to by the "Create a project here" arrow.
    * Select the "Create a new project" option.
    * Name your project. (We suggest you name it "helloworld".
    * Leave the "Project type" set to "Git".
    * Click "CREATE".
* Start coding!
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
* Deploy to Azure.
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
---------

* Getting started with the Cloud 9 IDE:
  * http://support.cloud9ide.com/entries/20583558-lesson-1-creating-a-new-account
  * http://support.cloud9ide.com/entries/20548092-lesson-2-creating-a-new-project
  * http://support.cloud9ide.com/entries/20640198-lesson-3-writing-a-node-js-hello-world-program
* Connecting Cloud 9 to Windows Azure:
  * http://cloud9ide.posterous.com/windows-azure-on-cloud9