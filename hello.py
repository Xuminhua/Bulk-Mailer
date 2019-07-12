import eel
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.orm import Session
import pandas as pd
import win32com.client as win32

engine = create_engine('sqlite:///test_db.db')
Base = automap_base()
Base.prepare(engine, reflect=True)

# 反射得到orm
Group = Base.classes.groups
Customer = Base.classes.customers
# 通信
session = Session(bind=engine)

# 增加数据
@eel.expose
def insert_group(groupname,groupdesc):
    group = Group(groupname=groupname,groupdesc=groupdesc)
    session.add(group)
    session.commit()
    return {'groupname':groupname,"groupdesc":groupdesc}

# 修改数据
@eel.expose
def update_group(id,groupname,groupdesc):
    group = session.query(Group).filter_by(id=id).first()
    group.groupname = groupname
    group.groupdesc = groupdesc
    session.add(group)
    session.commit()
    return (id,groupname,groupdesc)

# 查询数据
@eel.expose
def get_groups():
    rlt = session.query(Group).all()
    return [{'id':x.id,'groupname':x.groupname,'groupdesc':x.groupdesc} for x in rlt]

# 删除数据
@eel.expose
def delete_group(id):
    group = session.query(Group).filter_by(id=id).first()
    session.delete(group)
    session.commit()
    return id

# 批量上传数据
@eel.expose
def insert_customers(list):
    num = 0
    for customer in list:
        cust = Customer(email = customer['email'], 
                        corpname = customer['corpname'],
                        customername = customer['customername'],
                        group_id = customer['group_id'])

        session.add(cust)
        num += 1
    session.commit()
    str = "Successfully upload %s records" %num
    return str

# 增加一个
@eel.expose
def insert_customer(email,corpname,customername,group_id):
    cust = Customer(email = email,
                    corpname = corpname,
                    customername=customername,
                    group_id=group_id)
    session.add(cust)
    session.commit()
    return {'email':corpname,"corpname":corpname,'customername':customername,'group_id':group_id}

# 查询数据
@eel.expose
def get_customers(group_id):
    rlt = session.query(Customer).filter_by(group_id=group_id).all()
    return [{'customer_id': x.customer_id,
                'email': x.email,
                'corpname': x.corpname,
                'customername': x.customername, 
                'group_id':x.group_id } for x in rlt]

# 删除整组数据
@eel.expose
def delete_customers(group_id):
    rlt = session.query(Customer).filter_by(group_id=group_id).all()
    # group = session.query(Group).filter_by(id=id).first()
    for cust in rlt:
        session.delete(cust)
    session.commit()
    str = "删除%s" %len(rlt)
    return str


# 删除数据
@eel.expose
def delete_customer(customer_id):
    cust = session.query(Customer).filter_by(customer_id=customer_id).first()
    session.delete(cust)
    session.commit()
    # return "删除客户ID:s%" % customer_id
# def select():
#     res = session.query(Human).filter(Human.id > 7)
#     print([i for i in res])



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
            print("源数据缺少相关列:",e)
        except Exception  as e:
            print(e)
    except TypeError as e:
        return "文件类型不支持"
    except Exception  as e:
        return e

    
@eel.expose
def send_mail(receiver,subject,html_body,attachments):
    outlook = win32.Dispatch('Outlook.Application')

    mail_item = outlook.CreateItem(0) # 0: olMailItem

    # mail_item.Recipients.Add('minhux')

    mail_item.To = receiver
    mail_item.Subject = subject

    mail_item.BodyFormat = 2          # 2: Html format
    mail_item.HTMLBody  = html_body
    for attachment in attachments:
        mail_item.Attachments.Add(attachment)
    # mail_item.SentOnBehalfOfName = 'taihui.@amazon.com'
    # mail_item.Sender = 'taihui.@amazon.com'
    # mail_item.Send()
    send_str = "send to %s" %receiver
    return send_str


eel.init('web')                     # Give folder containing web files

# @eel.expose                         # Expose this function to Javascript
# def say_hello_py(x):
#     print('Hello from %s' % x)

@eel.expose
def sum_test(x,y):
    return x + y

# say_hello_py('Python World!')


# eel.say_hello_js('Python World!')   # Call a Javascript function

eel.start('hello.html')             # Start (this blocks and enters loop)