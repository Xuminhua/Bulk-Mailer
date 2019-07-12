from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Session
engine = create_engine('sqlite:///test_db.db')

Base = declarative_base()

class Group(Base):
    __tablename__ = 'groups'
    id = Column(Integer, primary_key=True)
    groupname = Column(String)
    groupdesc = Column(String)
    # cust_num = Column(Integer)
    def __repr__(self):
       return "<Group(name='%s')>" % (self.groupname)

class Customer(Base):
    __tablename__ = 'customers'
    customer_id = Column(Integer, primary_key=True)
    email = Column(String)
    corpname = Column(String)
    customername = Column(String)
    group_id = Column(Integer, ForeignKey('groups.id'))
    def __repr__(self):
       return "<Group(email='%s')>" % (self.email)   

Base.metadata.create_all(bind=engine) # 建表
session = Session(bind=engine)
group = Group(groupname="king001", groupdesc="这是测试新建的第一个组")
session.add(group)
customer = Customer(email='abc@adf.com', corpname='ABC company', customername = "Mr wang", group_id=5)
session.add(customer)

session.commit()
session.close()



# def add_column(engine, table_name, column):
#     column_name = column.compile(dialect=engine.dialect)
#     column_type = column.type.compile(engine.dialect)
#     engine.execute('ALTER TABLE %s ADD COLUMN %s %s' % (table_name, column_name, column_type))

# column = Column('new column', String(100), primary_key=True)
# add_column(engine, table_name, column)