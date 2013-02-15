"Hello World" from Azure
========================

All of our instruction today will be done with the tools mentioned in Getting Started and deployed to Azure. Let's make sure you've got all the ingredients ready before we start cooking:

Checklist
------------
1. Sublime Text
2. Node.js runtime
3. Azure subscription
4. Node.js SDK for Azure
5. GitHub account
6. GitHub for Mac/PC 



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

