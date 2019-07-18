# -*- mode: python ; coding: utf-8 -*-

block_cipher = None


a = Analysis(['mails.py'],
             pathex=['C:\\Users\\minhux\\Workbooks\\Adhoc\\2019 Adhoc Tasks\\mails\\pyeel for mails'],
             binaries=[],
             datas=[('C:\\Users\\minhux\\WORKBO~1\\Adhoc\\2019AD~1\\mails\\PYEELF~1\\venv\\lib\\site-packages\\eel\\eel.js', 'eel'),
            ('mails', 'mails'),
            ('C:\\Users\\minhux\\AppData\\Local\\Continuum\\anaconda3\\Lib\\distutils','distutils')],
             hiddenimports=['bottle_websocket'],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)

def get_pandas_path():
    import pandas
    pandas_path = pandas.__path__[0]
    return pandas_path
 
dict_tree = Tree(get_pandas_path(), prefix='pandas', excludes=["*.pyc"])
a.datas += dict_tree
a.binaries = filter(lambda x: 'pandas' not in x[0], a.binaries)

pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
        a.datas,
          [],
          name='mails',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=False, icon='mails\\favicon.ico'  )