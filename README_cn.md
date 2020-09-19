# 邮件群发 

[go to EN page](README.md)

本工具可以帮助你发送邮件给一组客户，邮件标题和正文可以显示对应客户的名称。前提需要你安装google chrome浏览器，登录过Outlook邮箱。

编写过程中用到了 [Eel](https://github.com/ChrisKnott/Eel), 界面主要利用了 [Vue](https://cn.vuejs.org/)

免责申明：本工具为免费工具。未经过大量测试，请下载的朋友小规模测试后再使用。使用过程中发现任何问题，欢迎和我联系和交流(me@xuminhua.com)。

## 如何使用

### 前提
- Google Chrome 已安装
- 下载编译好的exe版本 [百度云盘下载](https://pan.baidu.com/s/1XxpmxcbXk7ru4idzaHSjIQ) (提取码: id8v) 或者： [Dropbox下载](https://www.dropbox.com/s/rjjky2dj0kvmhzh/mails-public.zip?dl=0)


### 操作指南
下载解压缩后，运行mails.exe(客户组和客户名单只需要添加一次, 信息保存在你的本地电脑上，路径是：mails/test_db.db):
  
- 第一步: 添加客户组

在Customers Setting页面左下角输入组的名称和组的介绍后点击Add Group按钮, 一个组就添加好了
![add group](screeshots%20for%20readme/add%20group.PNG)


- 第二步: 在选择的组内添加客户名称

选择一个你创建好的组, 在右边用类似的方式，输入客户邮箱，客户公司名称，客户名称后点击添加客户. 也可批量上传. 利用这个csv文件(csv文件里需要包含着三列: email,corpname,customername).
![add customer](screeshots%20for%20readme/add%20customers%20in%20selected%20group.PNG) 


- 第三步: 设置邮件主题和内容，可添加附件

在Mail Setting页面编辑邮件标题和内容. 内容是HTML格式的，公司名称(corp name)用{0} 表示, 客户名称(customer name) 用 {1}
![edit mail](screeshots%20for%20readme/edit%20mail.PNG)


- 第四步:  预览邮件

最后, 在Preview and Sending页面，你可以通过点击previous和next按钮来预览发送给各个客户的邮件
![edit mail](screeshots%20for%20readme/preview.PNG)


- 第五步: 发送邮件

确认信息无误后, 可以点击预览页面最下方的按钮来发送邮件. 按钮会提示你一共要发送多少封邮件和具体的收件人列表
![edit mail](screeshots%20for%20readme/send.PNG)
