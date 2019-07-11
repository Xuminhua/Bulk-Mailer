import eel
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.orm import Session
# import pandas as pd

engine = create_engine('sqlite:///test_db.db')
Base = automap_base()
Base.prepare(engine, reflect=True)

# 反射得到orm
Group = Base.classes.groups
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

# def add_customers(list):
#     res = []
#     num = 0
#     for a in list:
#         group = Group(a.groupname,a.groupdesc)
#         res.append(group)
#         num += 1
#     session.add_all(res)
#     session.commit
#     return "新增s%个"


# def select():
#     res = session.query(Human).filter(Human.id > 7)
#     print([i for i in res])


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