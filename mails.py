import eel
import sys
import platform
import sqlite3
import pandas as pd
import win32com.client as win32
try:
    from tkinter import Tk
except ImportError:
    try:
        from Tkinter import Tk
    except ImportError:
        # If no versions of tkinter exist (most likely linux) provide a message
        if sys.version_info.major < 3:
            # print("Error: Tkinter not found")
            # print('For linux, you can install Tkinter by executing: "sudo apt-get install python-tk"')
            sys.exit(1)
        else:
            # print("Error: tkinter not found")
            # print('For linux, you can install tkinter by executing: "sudo apt-get install python3-tk"')
            sys.exit(1)
try:
    from tkinter.filedialog import askopenfilename, askdirectory, askopenfilenames, asksaveasfilename
except ImportError:
    from tkFileDialog import askopenfilename, askdirectory, askopenfilenames, asksaveasfilename




# 执行一条语句,创建 user表
# sql = "create table login (id varchar(20) primary key, name varchar(30), password varchar(30))"
# cursor.execute(sql)

eel.init('mails')                     # Give folder containing web files

db_path = 'mails/test_db.db'

# 增加数据
@eel.expose
def insert_group(groupname,groupdesc):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    sql = "insert into groups (groupname, groupdesc) values ('{0}', '{1}')".format(groupname,groupdesc)
    cursor.execute(sql)
    conn.commit()
    conn.close()
    return {'groupname':groupname,"groupdesc":groupdesc}

# 修改数据
@eel.expose
def update_group(id,groupname,groupdesc):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    sql = "update groups set groupname={1}, groupdesc={2} where id = {0}".format(id,groupname,groupdesc)
    cursor.execute(sql)
    conn.commit()
    conn.close()
    return (id,groupname,groupdesc)

# 查询数据
@eel.expose
def get_groups():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    sql = "select id,groupname,groupdesc from groups"
    cursor.execute(sql)
    rlt = cursor.fetchall()
    conn.close()   
    return [{'id':x[0],'groupname':x[1],'groupdesc':x[2]} for x in rlt]

# 删除数据
@eel.expose
def delete_group(id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    sql = "delete from groups where id={0}".format(id)
    cursor.execute(sql)
    conn.commit()
    conn.close()   
    return id

# 批量上传数据
@eel.expose
def insert_customers(list):
    num = 0
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    for customer in list:
        sql = "insert into customers (email,corpname, customername,group_id) values ('{0}','{1}','{2}','{3}')".format(customer['email'],
        customer['corpname'],customer['customername'],customer['group_id'])
        cursor.execute(sql)
        num += 1
    conn.commit()
    conn.close()   
    str = "Successfully upload %s records" %num
    return str

# 增加一个
@eel.expose
def insert_customer(email,corpname,customername,group_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    sql = "insert into customers (email,corpname, customername,group_id) values ('{0}','{1}','{2}','{3}')".format(email,corpname,customername,group_id)
    cursor.execute(sql)
    conn.commit()
    conn.close() 
    return {'email':corpname,"corpname":corpname,'customername':customername,'group_id':group_id}

# 查询数据
@eel.expose
def get_customers(group_id):
    if group_id:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        sql = "select customer_id,email,corpname, customername,group_id from customers where group_id={0}".format(group_id)
        cursor.execute(sql)
        rlt = cursor.fetchall()        
        return [{'customer_id': x[0],
                    'email': x[1],
                    'corpname': x[2],
                    'customername': x[3], 
                    'group_id':x[4] } for x in rlt]
    else:
        return []

# 删除整组数据
@eel.expose
def d_allcusts(group_id):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        sql = "delete from customers where group_id={0}".format(group_id)
        cursor.execute(sql)
        conn.commit()
        conn.close()   
        str = "cust deleted"
    except:
        str = "del_cust_issue"
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        sql = "delete from groups where id={0}".format(group_id)
        cursor.execute(sql)
        conn.commit()
        conn.close()       
        str += "| group deleted"
    except:
        str += "| del_group_issue"
    return str


# 删除数据
@eel.expose
def delete_customer(customer_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    sql = "delete from customers where customer_id={0}".format(customer_id)
    cursor.execute(sql)
    conn.commit()
    conn.close()   



@eel.expose
def read_csv(file_path):
    try:
        rlt = pd.read_csv(file_path, encoding='GBK')
        try:
            rlt = rlt[['email', 'corpname', 'customername']]
            txt = rlt.to_json(orient='records')
            # print(txt)
            return txt
        except KeyError as e:
            # print("源数据缺少相关列:",e)
            resp = 'Need columns:email,corpname,customername ' 
            return resp

        except Exception  as e:
            return e
    except TypeError as e:
        return "File type not supported"
    except Exception  as e:
        return e

    
@eel.expose
def send_mail(receiver,subject,html_body,attachments,on_behalf):
    outlook = win32.Dispatch('Outlook.Application')
    # print(receiver)
    # print(subject)
    # print(html_body)
    # print(attachments)
    mail_item = outlook.CreateItem(0) # 0: olMailItem

    # mail_item.Recipients.Add('minhux')

    mail_item.To = receiver
    mail_item.Subject = subject

    mail_item.BodyFormat = 2          # 2: Html format
    mail_item.HTMLBody  = html_body
    for attachment in attachments:
        mail_item.Attachments.Add(attachment)
    if on_behalf :
        mail_item.SentOnBehalfOfName = on_behalf
    # mail_item.Sender = 'taihui.@amazon.com'
    mail_item.Send()
    send_str = "send to %s" %receiver
    return send_str


@eel.expose
def ask_file(file_type):
    """ Ask the user to select a file """
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    if (file_type is None) or (platform.system() == "Darwin"):
        file_path = askopenfilename(parent=root)
    else:
        if file_type == 'python':
            file_types = [('Python files', '*.py;*.pyw'), ('All files', '*')]
        elif file_type == 'icon':
            file_types = [('Icon files', '*.ico'), ('All files', '*')]
        elif file_type == 'json':
            file_types = [('JSON Files', '*.json'), ('All files', '*')]
        elif file_type == 'csv':
            file_types = [('CSV Files','*.csv'), ('All files', '*')]
        elif file_type == 'all':
            file_types = [('All files', '*')]
        else:
            file_types = [('All files', '*')]
        file_path = askopenfilename(parent=root, filetypes=file_types)
    root.update()
    return file_path






eel.start('mails.html')             # Start (this blocks and enters loop)