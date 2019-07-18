# Bulk-Mailer
A tool help you bulk sending mail to a group of people with their name and corp name one by one on windows platform using Outlook.

This tool built using [Eel](https://github.com/ChrisKnott/Eel) and [PyInstaller](http://www.pyinstaller.org/), the front page is build via [Vue](https://cn.vuejs.org/)


## How to use

### Prerequisites
- Google Chrome installed
- Download the composed version via this link [sending mails](https://pan.baidu.com/s/1XxpmxcbXk7ru4idzaHSjIQ) (Extracting Code: id8v)


### Simple Guide
- Several steps after run the exe file(the custome and group only need setup once, the infomation will be stored locally in mails/test_db.db file):
  
  - Step 1: add group
  key in a group name and group description and then click add button, a new group will show in the list
  ![add group](screeshots%20for%20readme/add%20group.PNG)
 

  - Step 2: add customer in selected group
  after select a group you created, can add a customer in similar way. You can also upload bunch of customers infomation via upload button in this page. using the csv template in this git repo(the csv file should contain the three column names: email,corpname,customername).
  ![add customer](screeshots%20for%20readme/add%20customers%20in%20selected%20group.PNG) 
 

  - Step 3: setting the mail subject and Html-body
  you can edit the mail content in mail setting page. using HTML for the mail body and you can insert the  corp name or customer name using {0} or {1}
   ![edit mail](screeshots%20for%20readme/edit%20mail.PNG)
  
 
  - Step 4:  preview the email and sending
  then, in preview page will show you how the mail look like with the corp name and customer name
   ![edit mail](screeshots%20for%20readme/preview.PNG)


  - Step 5: send the mails
  after confirm the mail content, you can click the button down below the preview page. It shows you how many mails you will send together with the recepients list. This will send via you outlook account.
  ![edit mail](screeshots%20for%20readme/send.PNG)
